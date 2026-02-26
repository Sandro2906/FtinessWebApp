"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="w-full bg-brand-darker/70 backdrop-blur-md border-b border-brand-red/30 py-4 px-6 md:px-12 sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                <Link href="/" onClick={closeMenu} className="text-2xl font-black text-white uppercase tracking-wider hover:text-brand-red transition-colors flex-shrink-0">
                    Fit<span className="text-brand-red">Pro</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 font-medium">
                    <li>
                        <Link href="/" className="text-gray-300 hover:text-brand-red transition-colors">Početna</Link>
                    </li>
                    <li>
                        <Link href="/blog" className="text-gray-300 hover:text-brand-red transition-colors">O meni</Link>
                    </li>
                    <li>
                        <Link href="/programs" className="text-gray-300 hover:text-brand-red transition-colors">Programi</Link>
                    </li>
                </ul>

                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <Link href="/profile" className="bg-brand-red hover:bg-red-700 text-white px-5 py-2 rounded-md font-bold transition-colors">
                            Moj Profil
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
                                Prijava
                            </Link>
                            <Link href="/register" className="bg-brand-red hover:bg-red-700 text-white px-5 py-2 rounded-md font-bold transition-colors">
                                Pridruži se
                            </Link>
                        </>
                    )}
                </div>

                {/* Hamburger Button for Mobile */}
                <button
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4 bg-brand-darker border border-brand-red/20 rounded-lg p-4 shadow-xl flex flex-col space-y-4 absolute left-6 right-6">
                    <Link href="/" onClick={closeMenu} className="block text-gray-300 hover:text-brand-red font-medium transition-colors">Početna</Link>
                    <Link href="/blog" onClick={closeMenu} className="block text-gray-300 hover:text-brand-red font-medium transition-colors">O meni</Link>
                    <Link href="/programs" onClick={closeMenu} className="block text-gray-300 hover:text-brand-red font-medium transition-colors">Programi</Link>

                    <div className="border-t border-brand-red/20 pt-4 flex flex-col space-y-3">
                        {isLoggedIn ? (
                            <Link href="/profile" onClick={closeMenu} className="text-center bg-brand-red hover:bg-red-700 text-white px-5 py-3 rounded-md font-bold transition-colors w-full">
                                Moj Profil
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" onClick={closeMenu} className="text-center border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white transition-colors px-5 py-3 rounded-md font-medium w-full">
                                    Prijava
                                </Link>
                                <Link href="/register" onClick={closeMenu} className="text-center bg-brand-red hover:bg-red-700 text-white px-5 py-3 rounded-md font-bold transition-colors w-full">
                                    Pridruži se
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
