import { cookies } from 'next/headers';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
    // Await cookies() for Next.js 15+ compatibility
    const cookieStore = await cookies();
    const authSession = cookieStore.get('auth_session');
    const isLoggedIn = !!authSession;

    return <NavbarClient isLoggedIn={isLoggedIn} />;
}
