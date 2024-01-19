import Head from 'next/head';
import { SectionSendPaymentRequestToTerminal } from '@/ui/section-send-payment-request-to-terminal';

export default function Home() {
  return (
    <div className='px-6 flex flex-col gap-6 md:max-w-[280px] md:px-0'>
      <SectionSendPaymentRequestToTerminal />
    </div>
  );
}
