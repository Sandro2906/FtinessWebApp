"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Pogrešni podaci');

            // Next.js refresh or redirect to profile
            router.push('/profile');
            window.location.href = '/profile'; // Force reload to update Navbar state properly as simple approach
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-950">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-black text-white text-center mb-2">Dobrodošli nazad</h1>
                <p className="text-gray-400 text-center mb-8">Prijavite se na vaš nalog</p>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Korisničko Ime</label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                            placeholder="Unesite korisničko ime"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Lozinka</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 mt-4 rounded-lg transition-colors">
                        {loading ? 'Prijavljivanje...' : 'Prijavi se'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Nemate nalog? <Link href="/register" className="text-brand-red hover:text-red-400 hover:underline">Registrujte se</Link>
                </p>
            </div>
        </div>
    );
}
