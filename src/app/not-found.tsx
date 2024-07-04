'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        router.push('/home'); // Redirigir inmediatamente
    }, [router]);

    return null; // No se muestra nada mientras se redirige
}