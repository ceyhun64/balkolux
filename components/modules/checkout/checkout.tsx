// PaymentPage.tsx - Quantity Bug Fixed
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PaymentStepper from "@/components/modules/checkout/paymentStepper";
import StepAddress from "@/components/modules/checkout/stepAddress";
import StepPaymentCard from "@/components/modules/checkout/stepPayment";
import BasketSummaryCard from "@/components/modules/checkout/cartSummary";
import { AddressFormData } from "@/components/modules/profile/addressForm";
import { getCart, clearGuestCart, GuestCartItem } from "@/utils/cart";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const cargoOptions = [
  { id: "standart", name: "Standart Kargo", fee: 0.0 },
  { id: "express", name: "Hızlı Kargo", fee: 0.0 },
];

interface Address {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  neighborhood?: string | null;
  zip?: string;
  phone?: string;
  country?: string;
  email?: string;
  tcno?: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  role?: string;
  phone?: string;
  addresses?: Address[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  mainImage: string;
  oldPrice?: number;
  category: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface UserUser {
  user: User;
}

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [user, setUser] = useState<UserUser | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [step, setStep] = useState(1);
  const [selectedCargo, setSelectedCargo] = useState<string>(
    cargoOptions[0].id
  );

  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderName, setHolderName] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const initialAddressForm: AddressFormData & { email?: string } = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    district: "",
    city: "",
    neighborhood: "",
    zip: "",
    phone: "",
    country: "Türkiye",
    tcno: "",
  };
  const [newAddressForm, setNewAddressForm] = useState(initialAddressForm);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const userRes = await fetch("/api/user", {
        credentials: "include",
        cache: "no-store",
      });

      let userData = null;
      if (userRes.ok) {
        userData = await userRes.json();
        setUser(userData);
      } else {
        setUser(null);
      }

      if (userData?.user?.id) {
        const cartRes = await fetch("/api/cart", {
          credentials: "include",
          cache: "no-store",
        });

        if (cartRes.ok) {
          const cartData = await cartRes.json();
          setCartItems(cartData);
        } else {
          setCartItems([]);
        }
      } else {
        const guestCart = localStorage.getItem("cart");
        setCartItems(guestCart ? JSON.parse(guestCart) : []);
      }
    } catch (err) {
      console.error("Veri yükleme hatası:", err);
      setError(
        "Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin."
      );
      setUser(null);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = item.product.price * item.quantity;
      return acc + itemPrice;
    }, 0);
  }, [cartItems]);

  const selectedCargoFee = useMemo(() => {
    const cargo = cargoOptions.find((c) => c.id === selectedCargo);
    return cargo ? cargo.fee : 0;
  }, [selectedCargo]);

  const totalPrice = useMemo(() => {
    const baseTotal = subTotal + selectedCargoFee;
    const totalWithMarkup = baseTotal * 1.1;
    return totalWithMarkup;
  }, [subTotal, selectedCargoFee]);

  const validateAddressForm = (): boolean => {
    const required = [
      "firstName",
      "lastName",
      "address",
      "city",
      "district",
      "phone",
    ];
    for (const field of required) {
      if (!newAddressForm[field as keyof typeof newAddressForm]) {
        alert(`Lütfen ${field} alanını doldurun.`);
        return false;
      }
    }

    if (
      newAddressForm.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAddressForm.email)
    ) {
      alert("Geçerli bir e-posta adresi girin.");
      return false;
    }

    return true;
  };

  const handleSaveAddress = async () => {
    if (!validateAddressForm()) return;

    try {
      setIsSavingAddress(true);
      let userId = user?.user?.id;
      let passwordForLogin: string | undefined;

      if (!userId) {
        const guestEmail =
          newAddressForm.email || `guest_${Date.now()}@example.com`;
        const password = Math.random().toString(36).slice(-8);
        passwordForLogin = password;

        const registerRes = await fetch("/api/account/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newAddressForm.firstName,
            surname: newAddressForm.lastName,
            email: guestEmail,
            password,
          }),
        });

        if (!registerRes.ok) {
          const errorData = await registerRes.json().catch(() => ({}));
          throw new Error(errorData.message || "Kullanıcı kaydı başarısız");
        }

        const registerData = await registerRes.json();
        userId = registerData.user.id;
        setUser({ user: registerData.user });

        if (passwordForLogin) {
          const signInResult = await signIn("credentials", {
            email: guestEmail,
            password: passwordForLogin,
            redirect: false,
          });

          if (signInResult?.error) {
            console.error("Otomatik giriş hatası:", signInResult.error);
          }

          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      const addressRes = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAddressForm,
          userId,
          country: "Türkiye",
        }),
      });

      if (!addressRes.ok) {
        const errorData = await addressRes.json().catch(() => ({}));
        throw new Error(errorData.message || "Adres kaydedilemedi");
      }

      const addressData = await addressRes.json();

      setUser((prev) =>
        prev
          ? {
              ...prev,
              user: {
                ...prev.user,
                addresses: [
                  addressData.address,
                  ...(prev.user.addresses ?? []),
                ],
              },
            }
          : prev
      );

      setSelectedAddress(addressData.address.id);

      const guestCart: GuestCartItem[] = getCart();
      if (guestCart.length > 0) {
        for (const item of guestCart) {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: item.productId,
              quantity: item.quantity || 1,
            }),
          });
        }
        clearGuestCart();
        await fetchData();
      }

      setIsAddingNewAddress(false);
      setNewAddressForm(initialAddressForm);
    } catch (err) {
      console.error("Adres kaydetme hatası:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Adres kaydedilemedi. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSavingAddress(false);
    }
  };

  const validatePaymentInfo = (): boolean => {
    if (!holderName.trim()) {
      alert("Kart sahibinin adını girin.");
      return false;
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Geçerli bir kart numarası girin.");
      return false;
    }

    if (!expireMonth || !expireYear) {
      alert("Son kullanma tarihini girin.");
      return false;
    }

    if (cvc.length !== 3) {
      alert("Geçerli bir CVV kodu girin.");
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentInfo()) return;

    setProcessingPayment(true);

    try {
      let currentUser = user;
      let passwordForLogin: string | undefined = undefined;

      if (!currentUser) {
        const guestEmail =
          newAddressForm.email || `guest_${Date.now()}@example.com`;
        const password = Math.random().toString(36).slice(-8);
        passwordForLogin = password;

        const registerRes = await fetch("/api/account/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newAddressForm.firstName,
            surname: newAddressForm.lastName,
            email: guestEmail,
            password,
          }),
        });

        if (!registerRes.ok) {
          throw new Error("Kullanıcı oluşturulamadı");
        }

        const registerData = await registerRes.json();
        currentUser = { user: registerData.user };
        setUser(currentUser);

        if (passwordForLogin) {
          const signInResult = await signIn("credentials", {
            email: guestEmail,
            password: passwordForLogin,
            redirect: false,
          });

          if (signInResult?.error) {
            console.error("Otomatik oturum açma hatası:", signInResult.error);
          }
        }
      }

      const userId = Number(currentUser?.user?.id);
      if (isNaN(userId) || userId <= 0) {
        throw new Error("Geçersiz kullanıcı bilgisi");
      }

      const shippingAddr =
        currentUser.user.addresses?.[0] || (newAddressForm as Address);

      const buyer = {
        id: userId.toString(),
        buyerName: shippingAddr.firstName || "Ad",
        buyerSurname: shippingAddr.lastName || "Soyad",
        email: currentUser.user.email ?? "",
        identityNumber: shippingAddr.tcno || "11111111111",
        registrationDate: new Date().toISOString(),
        lastLoginDate: new Date().toISOString(),
        phone: shippingAddr.phone ?? "",
        city: shippingAddr.city ?? "",
        country: shippingAddr.country ?? "Türkiye",
        zipCode: shippingAddr.zip ?? "",
        ip: "127.0.0.1",
        tcno: shippingAddr.tcno ?? "",
      };

      const shippingAddress = {
        contactName: `${shippingAddr.firstName ?? ""} ${
          shippingAddr.lastName ?? ""
        }`.trim(),
        city: shippingAddr.city ?? "",
        country: shippingAddr.country ?? "Türkiye",
        address: shippingAddr.address ?? "",
        zipCode: shippingAddr.zip ?? "",
        phone: shippingAddr.phone ?? "",
        tcno: shippingAddr.tcno ?? "",
        district: shippingAddr.district ?? "",
        neighborhood: shippingAddr.neighborhood ?? "",
      };

      const billingAddress = { ...shippingAddress };

      // 🔥 BUG FIX: Quantity değeri doğru şekilde gönderiliyor
      const basketItemsFormatted = cartItems.map((item) => {
        const unitPrice = item.product.price;
        const quantity = item.quantity || 1; // quantity değerini al
        const totalPrice = unitPrice * quantity; // toplam fiyat hesapla

        console.log(
          `Item: ${item.product.title}, Quantity: ${quantity}, Unit Price: ${unitPrice}, Total: ${totalPrice}`
        );

        return {
          id: item.product.id.toString(),
          name: item.product.title,
          category1: item.product.category || "Genel",
          itemType: "PHYSICAL",
          price: totalPrice.toFixed(2), // Iyzico için toplam fiyat (price = unitPrice * quantity)
          quantity: quantity, // Adet bilgisi
          unitPrice: unitPrice.toFixed(2), // Birim fiyat
          totalPrice: totalPrice.toFixed(2), // Toplam fiyat
        };
      });

      const paymentCardFormatted = {
        cardHolderName: holderName,
        cardNumber: cardNumber.replace(/\s/g, ""),
        expireMonth,
        expireYear,
        cvc,
      };

      const orderPayload = {
        userId,
        basketItems: basketItemsFormatted,
        shippingAddress,
        billingAddress,
        totalPrice,
        paidPrice: totalPrice,
        currency: "TRY",
        paymentMethod: "iyzipay",
        paymentCard: paymentCardFormatted,
        buyer,
      };

      console.log("Order Payload:", JSON.stringify(orderPayload, null, 2));

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Ödeme işlemi başarısız");
      }

      const data = await res.json();

      if (data.status === "success") {
        await Promise.all(
          cartItems.map((item) =>
            fetch(`/api/cart/${item.id}`, { method: "DELETE" }).catch((err) =>
              console.error("Sepet temizleme hatası:", err)
            )
          )
        );

        localStorage.removeItem("cart");
        router.push("/checkout/success");
      } else {
        throw new Error("Ödeme onaylanmadı");
      }
    } catch (err) {
      console.error("Ödeme hatası:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Ödeme işlemi sırasında bir hata oluştu"
      );
      router.push("/checkout/unsuccess");
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => fetchData()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Güvenli Ödeme
          </h1>
          <p className="text-gray-600">
            Siparişinizi tamamlamak için bilgilerinizi girin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <PaymentStepper currentStep={step} />

            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <StepAddress
                  addresses={user?.user.addresses ?? []}
                  selectedAddress={selectedAddress}
                  onSelectAddress={setSelectedAddress}
                  onNext={() => setStep(2)}
                  newAddressForm={newAddressForm}
                  setNewAddressForm={setNewAddressForm}
                  onSaveAddress={handleSaveAddress}
                  isAddingNewAddress={isAddingNewAddress}
                  setIsAddingNewAddress={setIsAddingNewAddress}
                  isSavingAddress={isSavingAddress}
                />
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <StepPaymentCard
                  holderName={holderName}
                  setHolderName={setHolderName}
                  cardNumber={cardNumber}
                  setCardNumber={setCardNumber}
                  formattedCardNumber={cardNumber}
                  expireMonth={expireMonth}
                  setExpireMonth={setExpireMonth}
                  expireYear={expireYear}
                  setExpireYear={setExpireYear}
                  cvc={cvc}
                  setCvc={setCvc}
                  totalPrice={totalPrice}
                  setStep={setStep}
                  handlePayment={handlePayment}
                  isProcessing={processingPayment}
                />
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">256-bit SSL Şifreleme</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">PCI DSS Uyumlu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                <img
                  src="/iyzico/iyzico_ile_ode_colored_horizontal.webp"
                  alt="iyzico ile güvenli ödeme"
                  className="h-10 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <BasketSummaryCard selectedCargoFee={selectedCargoFee} />
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <Link href="/contact">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Yardıma mı ihtiyacınız var?
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Ödeme işleminizle ilgili sorularınız için müşteri
                    hizmetlerimizle iletişime geçebilirsiniz.
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    İletişime Geç →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {processingPayment && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-indigo-900/95 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md mx-4 text-center">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center animate-pulse">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ödemeniz İşleniyor
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ödeme işleminiz güvenli bir şekilde gerçekleştiriliyor.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs text-amber-800">
                Lütfen bu sayfayı kapatmayın.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
