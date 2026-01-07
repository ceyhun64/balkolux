// app/api/payment/route.ts - Taksit Farkı Düzeltildi
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Taksit oranları
const INSTALLMENT_RATES: { [key: number]: number } = {
  1: 0,
  2: 3.5,
  3: 5.2,
  6: 9.8,
  9: 13.5,
  12: 17.0,
};

/**
 * İyzipay için HMAC-SHA256 signature oluşturur
 */
function generateIyzicoSignature(
  randomKey: string,
  uri: string,
  requestBody: string,
  secretKey: string
): string {
  const dataToSign = randomKey + uri + requestBody;
  return crypto
    .createHmac("sha256", secretKey)
    .update(dataToSign)
    .digest("hex");
}

/**
 * İyzipay authorization header'ı oluşturur
 */
function createAuthorizationHeader(
  apiKey: string,
  secretKey: string,
  uri: string,
  requestBody: string
): {
  authorization: string;
  randomKey: string;
} {
  const randomKey = crypto.randomBytes(16).toString("hex");
  const signature = generateIyzicoSignature(
    randomKey,
    uri,
    requestBody,
    secretKey
  );

  const authString = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`;
  const authorization = `IYZWSv2 ${Buffer.from(authString).toString("base64")}`;

  return { authorization, randomKey };
}

/**
 * Tarihleri İyzipay formatına çevirir
 */
function formatDateForIyzipay(date: string | Date): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

/**
 * Fiyat hesaplama ve taksit farkı ekleme
 */
function calculatePricing(basketItems: BasketItem[], installment: number = 1) {
  // Sepet toplamı
  const subtotal = basketItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string" ? parseFloat(item.price) : item.price;
    return sum + price;
  }, 0);

  // %10 hizmet bedeli (KDV)
  const serviceFee = subtotal * 0.1;

  // Ara toplam (ürünler + KDV)
  const baseTotal = subtotal + serviceFee;

  // Taksit farkını hesapla
  const installmentRate = INSTALLMENT_RATES[installment] || 0;
  const installmentFee = baseTotal * (installmentRate / 100);

  // Nihai toplam
  const total = baseTotal + installmentFee;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    serviceFee: parseFloat(serviceFee.toFixed(2)),
    baseTotal: parseFloat(baseTotal.toFixed(2)),
    installmentFee: parseFloat(installmentFee.toFixed(2)),
    installmentRate,
    total: parseFloat(total.toFixed(2)),
  };
}

// Tipler
interface PaymentCard {
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
}

interface Buyer {
  id: string;
  name: string;
  surname: string;
  email: string;
  identityNumber: string;
  registrationDate: string;
  lastLoginDate: string;
  phone: string;
  city: string;
  country: string;
  zipCode: string;
  ip: string;
}

interface Address {
  contactName: string;
  city: string;
  country: string;
  address: string;
  zipCode: string;
}

interface BasketItem {
  id: string | number;
  name?: string;
  category1?: string;
  itemType?: string;
  price: number | string;
}

interface PaymentRequestBody {
  paymentCard: PaymentCard;
  buyer: Buyer;
  shippingAddress: Address;
  billingAddress: Address;
  basketItems: BasketItem[];
  currency?: string;
  basketId?: string;
  installment?: number;
}

/**
 * POST /api/payment
 * İyzipay ödeme işlemini gerçekleştirir
 */
export async function POST(req: NextRequest) {
  try {
    const body: PaymentRequestBody = await req.json();
    const {
      paymentCard,
      buyer,
      shippingAddress,
      billingAddress,
      basketItems,
      currency = "TRY",
      basketId,
      installment = 1,
    } = body;

    // Environment variables kontrolü
    const apiKey = process.env.IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;
    const baseUrl =
      process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";

    if (!apiKey || !secretKey) {
      console.error("İyzipay API credentials eksik!");
      return NextResponse.json(
        {
          status: "error",
          error: "Payment configuration error. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Buyer tarihlerini formatla
    const formattedBuyer = {
      ...buyer,
      registrationDate: formatDateForIyzipay(buyer.registrationDate),
      lastLoginDate: formatDateForIyzipay(buyer.lastLoginDate),
    };

    // Fiyat hesaplaması (TAKSİT FARKI DAHİL)
    const pricing = calculatePricing(basketItems, installment);

    console.log("💰 Fiyat Hesaplaması:", {
      subtotal: pricing.subtotal,
      serviceFee: pricing.serviceFee,
      baseTotal: pricing.baseTotal,
      installment: installment,
      installmentRate: `%${pricing.installmentRate}`,
      installmentFee: pricing.installmentFee,
      total: pricing.total,
    });

    // Sepet ürünleri
    const formattedBasketItems = basketItems.map((item) => {
      const price =
        typeof item.price === "string" ? parseFloat(item.price) : item.price;
      return {
        id: item.id.toString(),
        name: item.name || "Ürün",
        category1: item.category1 || "Genel",
        itemType: item.itemType || "PHYSICAL",
        price: price.toFixed(2),
      };
    });

    // Hizmet bedeli (KDV) ekle
    formattedBasketItems.push({
      id: "SERVICE_FEE",
      name: "Hizmet Bedeli (KDV %10)",
      category1: "Hizmet",
      itemType: "VIRTUAL",
      price: pricing.serviceFee.toFixed(2),
    });

    // 🔥 TAKSİT FARKI EKLE (Eğer varsa)
    if (installment > 1 && pricing.installmentFee > 0) {
      formattedBasketItems.push({
        id: "INSTALLMENT_FEE",
        name: `Taksit Farkı (${installment} Taksit - %${pricing.installmentRate})`,
        category1: "Hizmet",
        itemType: "VIRTUAL",
        price: pricing.installmentFee.toFixed(2),
      });
    }

    // İyzipay ödeme request body'si
    const paymentRequest = {
      locale: "tr",
      conversationId: Date.now().toString(),
      price: pricing.total.toFixed(2), // 🔥 TAKSİT FARKLI TOPLAM
      paidPrice: pricing.total.toFixed(2), // 🔥 TAKSİT FARKLI TOPLAM
      currency,
      installment: installment,
      basketId: basketId || `B${Date.now()}`,
      paymentChannel: "WEB",
      paymentCard: {
        cardHolderName: paymentCard.cardHolderName,
        cardNumber: paymentCard.cardNumber.replace(/\s/g, ""),
        expireMonth: paymentCard.expireMonth,
        expireYear: paymentCard.expireYear,
        cvc: paymentCard.cvc,
        registerCard: 0,
      },
      buyer: formattedBuyer,
      shippingAddress: {
        contactName: shippingAddress.contactName,
        city: shippingAddress.city,
        country: shippingAddress.country,
        address: shippingAddress.address,
        zipCode: shippingAddress.zipCode,
      },
      billingAddress: {
        contactName: billingAddress.contactName,
        city: billingAddress.city,
        country: billingAddress.country,
        address: billingAddress.address,
        zipCode: billingAddress.zipCode,
      },
      basketItems: formattedBasketItems,
    };

    const requestBody = JSON.stringify(paymentRequest);

    const uri = "/payment/auth";
    const { authorization, randomKey } = createAuthorizationHeader(
      apiKey,
      secretKey,
      uri,
      requestBody
    );

    console.log("📤 İyzipay ödeme isteği gönderiliyor...", {
      endpoint: `${baseUrl}${uri}`,
      subtotal: pricing.subtotal,
      serviceFee: pricing.serviceFee,
      installmentFee: pricing.installmentFee,
      total: pricing.total,
      installment: installment,
      itemCount: formattedBasketItems.length,
    });

    // İyzipay API'ye istek gönder
    const response = await fetch(`${baseUrl}${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
        "x-iyzi-rnd": randomKey,
        Accept: "application/json",
      },
      body: requestBody,
    });

    const result = await response.json();

    // Başarılı ödeme kontrolü
    if (result.status === "success") {
      console.log("✅ İyzipay ödeme başarılı:", {
        paymentId: result.paymentId,
        conversationId: result.conversationId,
        amount: pricing.total,
        installment: installment,
        installmentFee: pricing.installmentFee,
      });

      return NextResponse.json({
        status: "success",
        paymentId: result.paymentId,
        conversationId: result.conversationId,
        fraudStatus: result.fraudStatus,
        installment: installment,
        pricing: {
          subtotal: pricing.subtotal,
          serviceFee: pricing.serviceFee,
          baseTotal: pricing.baseTotal,
          installmentFee: pricing.installmentFee,
          installmentRate: pricing.installmentRate,
          total: pricing.total,
        },
        ...result,
      });
    }

    // Hatalı ödeme
    console.error("❌ İyzipay ödeme hatası:", {
      errorCode: result.errorCode,
      errorMessage: result.errorMessage,
      errorGroup: result.errorGroup,
    });

    return NextResponse.json(
      {
        status: "error",
        error: result.errorMessage || "Ödeme işlemi başarısız oldu",
        errorCode: result.errorCode,
        errorGroup: result.errorGroup,
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("💥 Payment API kritik hata:", error);

    return NextResponse.json(
      {
        status: "error",
        error: "Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
