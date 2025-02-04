// app/(main)/layout.tsx
'use client'; // <-- Mark this as a Client Component
import Footer from './components/footer';
import './globals.css'
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import { Open_Sans } from 'next/font/google';
import { Lato } from 'next/font/google';
import { Poppins } from 'next/font/google';
import { Montserrat } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"], variable: '--font-roboto' });
const openSans = Open_Sans({ subsets: ['latin'],  weight: [ "300", "400", "700",], variable: '--font-open-sans' });
const lato = Lato({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"], variable: '--font-lato' });
const poppins = Poppins({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"], variable: '--font-poppins' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ["100", "300", "400", "700", "900"], variable: '--font-montserrat' });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">  

      <body 
      className={`bg-gray-900 min-h-screen ${roboto.variable} ${openSans.variable} ${lato.variable} ${poppins.variable} ${montserrat.variable} `}
      >
        <SessionProvider>
            <main className='font-poppins flex-grow'>
            {children}
            </main>
            <Footer />
        </SessionProvider>
      </body>
    </html>

  );
}