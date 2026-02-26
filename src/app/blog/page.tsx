export default function Blog() {
    const sports = [
        { name: "Košarka", duration: "10 godina" },
        { name: "Teretana i Fitnes", duration: "10 godina" },
        { name: "Kik-boks", duration: "2 godine" },
        { name: "Fudbal", duration: "2 godine" },
        { name: "Stoni tenis", duration: "1 godina" },
        { name: "Tenis", duration: "1 godina" }
    ];

    return (
        <div className="flex-1 bg-transparent py-16 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 text-center border-b border-brand-red/30 pb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                        O <span className="text-brand-red">Meni</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light">Decenija discipline, znoja i nezaustavljivog napretka.</p>
                </header>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-white uppercase mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-brand-red inline-block"></span> Moj Put i Iskustvo
                    </h2>
                    <div className="bg-brand-dark p-8 rounded-2xl border border-brand-gray shadow-lg">
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            Strastveno treniram više od 10 godina, počevši u teretani pa sve do takmičarskih sportova.
                            Moje iskustvo predstavlja nemilosrdnu potragu za fizičkim savršenstvom, brzinom, agilnošću i sirovom snagom. Ja ne samo da treniram druge; ja živim taj život.
                        </p>

                        <h3 className="text-xl font-bold text-brand-red uppercase mb-4">Sportska Pozadina</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sports.map((sport, index) => (
                                <div key={index} className="bg-brand-darker border border-brand-red/20 p-4 rounded-xl flex flex-col justify-center items-center text-center hover:border-brand-red transition-colors">
                                    <span className="text-white font-bold text-lg">{sport.name}</span>
                                    <span className="text-brand-red text-sm font-medium">{sport.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-brand-red/10 to-transparent p-1 border-l-4 border-brand-red rounded-r-2xl">
                    <div className="bg-brand-dark p-8 md:p-12 rounded-r-xl">
                        <h2 className="text-3xl font-black text-white uppercase mb-6">Način Života</h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                <strong className="text-white">Sport je život.</strong> Ali sam znoj neće izgraditi Rim. Prava transformacija dešava se na raskršću discipline u teretani i posvećenosti u kuhinji.
                            </p>
                            <p>
                                Kvalitetna osnova u ishrani daje vašem tijelu gorivo za izdržljivost tokom brutalnih treninga i oporavak potrganih mišićnih vlakana. Bez pravog goriva, i Ferrari je samo veoma skupa igračka.
                                Bilo da želite skinuti procenat masti ili dodati ozbiljnu mišićnu masu, vaši makro i mikro nutrijenti, kao i hidratacija, su ključevi uspjeha o kojima se često ne priča.
                            </p>
                            <p className="border-l-2 border-brand-red pl-4 italic text-gray-400">
                                "Um odustaje mnogo prije tijela. Istreniraj svoj um, ispravno nahrani svoje tijelo, i postaćeš nezaustavljiv."
                            </p>
                            <p>
                                Prednosti pretvaranja ovog načina u vaš stil života daleko prevazilaze estetiku. To gradi mentalnu čvrstoću, reguliše vaš hormonski balans, poboljšava kognitivne funkcije i drastično smanjuje stres. To je investicija sa zagarantovanim povratom—sve dok plaćate cijenu u trudu i disciplini.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
