import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'ImpulsoVzla | Donaciones para Emprendedores y Causas con Binance Pay',
  description: 'Plataforma comunitaria de donaciones y micro-mecenazgo para metas y proyectos venezolanos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
