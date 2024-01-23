import Head from 'next/head';
import { SectionSendPaymentRequestToTerminal } from '@/ui/section-send-payment-request-to-terminal';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <meta name='robots' content='noindex,nofollow' />
        </Head>
      </div>

      <div className='px-6 flex flex-col gap-6 md:max-w-[280px] md:px-0'>
        <SectionSendPaymentRequestToTerminal />
      </div>
    </>
  );
}
