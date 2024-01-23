import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'POC Stripe Terminal',
  description: 'A web app to collect payment with Stripe Terminal',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex min-h-screen flex-col-reverse justify-between py-24 lg:flex-col lg:justify-start lg:gap-16 lg:max-w-2xl lg:mx-auto'>
          <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
            <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
              <span className='font-bold'>POC Stripe Terminal</span>
            </p>
            <div className='fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
              <a
                className='flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
                href='https://github.com/guacachips'
                target='_blank'
                rel='noopener noreferrer'
              >
                By <code className='font-mono font-bold'>Guacachips</code>
                <Image
                  src='/guacachips.png'
                  alt='Vercel Logo'
                  className='dark:invert border border-slate-600 bg-slate-100 p-0.5 rounded-full'
                  width={50}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>

          <div className='lg:max-w-5xl lg:w-full md:mx-auto'>{children}</div>
        </main>
      </body>
    </html>
  );
}
