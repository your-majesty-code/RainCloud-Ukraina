import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/chrome/Header';
import { ShellBody } from '@/components/chrome/ShellBody';
import { getPlatformStats } from '@/lib/queries';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RainCloud Ukraina',
  description:
    'Powering global business to build the new Ukraine — the live platform connecting people, companies, products, opportunities, events and insight around the reconstruction of Ukraine.',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = await getPlatformStats();

  return (
    <html lang="en" data-theme="light" className={montserrat.variable}>
      <body>
        <div className="app-canvas">
          <Header stats={stats} />
          <ShellBody>{children}</ShellBody>
        </div>
      </body>
    </html>
  );
}
