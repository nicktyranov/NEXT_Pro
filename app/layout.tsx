import type { Metadata } from 'next';
import Menu from '@/components/Menu/Menu';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import ToasterProvider from '@/components/ToasterProvider/ToasterProvider';
import { Suspense } from 'react';
import { CartProvider } from '@/components/CartContext/CartContext';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Shop App',
   description: 'Generated by NT'
};

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={font.className}>
            <Suspense fallback={<div>Loading...</div>}>
               <CartProvider>
                  <header>
                     <Menu />
                  </header>

                  <div>{children}</div>
                  <Footer />
                  <ToasterProvider />
               </CartProvider>
            </Suspense>
         </body>
      </html>
   );
}
