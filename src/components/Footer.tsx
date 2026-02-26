import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">O nama</h3>
          <p className="text-sm">
            Posvećeni smo pružanju najboljih usluga našim klijentima.
            Pridružite nam se danas da iskusite vrhunski kvalitet.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Brzi Linkovi</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Početna
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-white transition-colors">
                Programi
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors">
                Prijava
              </Link>
            </li>
          </ul>
        </div>

        {/* Location & Map */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Naša Kancelarija</h3>
          <p className="text-sm mb-4">
            Posjetite nas u našem sjedištu.
          </p>
          <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-700">
            <iframe
              src="https://maps.google.com/maps?q=Trn,+Laktasi&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Lokacija"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Naša Kompanija. Sva prava zadržana.</p>
      </div>
    </footer>
  );
}
