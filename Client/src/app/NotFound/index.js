'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirige a la página principal después de 3 segundos
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 3000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Redirigiendo a la página principal...</p>
    </div>
  );
};

export default NotFoundPage;