"use client";

import Link from "next/link";
import Image from "next/image";
import Reviews from "@/components/Reviews";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-transparent z-0"></div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }} // Wait for splash screen
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight text-white drop-shadow-lg text-balance">
            Transformiši Svoje Tijelo, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">Oslobodi Svoj Potencijal</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Više od 10 godina profesionalnog iskustva u treningu. Personalizovani programi za mršavljenje, mišićni rast i vrhunsku kondiciju.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/programs"
              className="px-8 py-4 bg-brand-red hover:bg-red-700 text-white font-bold rounded-lg uppercase tracking-wide text-lg transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(229,9,20,0.5)]"
            >
              Započni Svoj Put
            </Link>
            <Link
              href="/blog"
              className="px-8 py-4 bg-transparent border-2 border-brand-red/50 hover:border-brand-red text-white font-bold rounded-lg uppercase tracking-wide text-lg transition-all"
            >
              Moja Priča
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-transparent backdrop-blur-sm border-t border-brand-red/20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">Elitni Programi Treninga</h2>
            <div className="w-24 h-1 bg-brand-red mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">Ostvarite svoje ciljeve sa naučno dokazanim metodama.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Mršavljenje", desc: "Sagorite masti i dođite u formu sa rutinama visokog intenziteta i isplaniranom ishranom." },
              { title: "Mišićni Rast", desc: "Izgradite pravu masu i snagu kroz progresivno opterećenje i hipertrofijski trening." },
              { title: "Kondicija", desc: "Poboljšajte izdržljivost, agilnost i ukupne atletske performanse za bilo koji sport." }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-brand-dark p-8 rounded-xl border border-brand-gray hover:border-brand-red/50 transition-colors group cursor-default"
              >
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-red/20 transition-colors">
                  <div className="w-6 h-6 bg-brand-red rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.desc}</p>
                <Link href="/programs" className="text-brand-red hover:text-red-400 font-bold flex items-center gap-2">
                  Saznaj više <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews Section */}
      <Reviews />
    </div>
  );
}
