"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Programs() {
    const plans = [
        {
            id: "weight-loss",
            title: "Protokol Mršavljenja",
            price: "$2",
            numericPrice: "2.00",
            desc: "Naučno strukturiran program od 12 sedmica dizajniran da skine masti dok očuva mišićnu masu.",
            features: ["Personalizovani kalorijski deficit", "HIIT i Kardio Rutine", "Trening Otpora za Cijelo Tijelo"],
            popular: false
        },
        {
            id: "muscle-growth",
            title: "Plan za Hipertrofiju",
            price: "$2",
            numericPrice: "2.00",
            desc: "Ekstreman volumen, progresivno preopterećenje i optimalna sinteza proteina za ozbiljan mišićni rast.",
            features: ["Push/Pull/Legs Raspored", "Ishrana za Masu", "Vodič za Pravilnu Formu"],
            popular: true
        },
        {
            id: "conditioning",
            title: "Elitna Kondicija",
            price: "$2",
            numericPrice: "2.00",
            desc: "Trenirajte kao sportista. Izgradite vrhunsku kardio izdržljivost i eksplozivnu snagu.",
            features: ["Pliometrija", "Vježbe Agilnosti", "Kružni Treninzi Izdržljivosti"],
            popular: false
        }
    ];

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", // Real client ID from .env, fallback to sandbox
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="flex-1 bg-transparent py-16 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-16 text-center">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                            Moji <span className="text-brand-red">Programi</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                            Izaberite svoj cilj, platite bezbjedno, i istog trenutka dobijte prilagođen program direktno na vaš email.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative bg-brand-dark rounded-2xl border ${plan.popular ? 'border-brand-red' : 'border-brand-gray'} p-8 flex flex-col justify-between transition-transform transform hover:-translate-y-2 hover:shadow-2xl`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-brand-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg rounded-tr-xl">
                                        Najpopularnije
                                    </div>
                                )}

                                <div>
                                    <h2 className="text-2xl font-bold text-white uppercase mb-2">{plan.title}</h2>
                                    <div className="text-4xl font-black text-brand-red mb-4">{plan.price}</div>
                                    <p className="text-gray-400 mb-8">{plan.desc}</p>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start text-gray-300 font-medium">
                                                <span className="text-brand-red mr-2">✓</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-4 relative z-10 opacity-90 hover:opacity-100 transition-opacity">
                                    <PayPalButtons
                                        style={{ layout: "horizontal", height: 45, tagline: false }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                intent: "CAPTURE",
                                                purchase_units: [
                                                    {
                                                        description: plan.title,
                                                        amount: {
                                                            currency_code: "USD",
                                                            value: plan.numericPrice
                                                        }
                                                    }
                                                ]
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            if (!actions.order) return;
                                            try {
                                                const order = await actions.order.capture();

                                                alert("Uplata prolazi... Molimo sačekajte.");

                                                const res = await fetch('/api/checkout', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        orderID: order.id,
                                                        programTitle: plan.title,
                                                        price: plan.price
                                                    })
                                                });

                                                const result = await res.json();

                                                if (res.status === 401) {
                                                    alert('Samo ulogovani korisnici mogu završiti kupovinu. Molimo logujte se.');
                                                } else if (result.success) {
                                                    console.log("Email URL:", result.emailPreviewUrl);
                                                    alert(`Uspješna kupovina! Program "${plan.title}" je kupljen.\nOtvorite konzolu (F12) da vidite link za Vaš probni Email!`);
                                                } else {
                                                    alert(`Greška: ${result.error}`);
                                                }
                                            } catch (e) {
                                                console.error(e);
                                                alert('Došlo je do greške prilikom obrade vaše kupovine.');
                                            }
                                        }}
                                        onError={() => {
                                            alert("Došlo je do greške sa PayPal-om. Pokušajte ponovo.");
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}
