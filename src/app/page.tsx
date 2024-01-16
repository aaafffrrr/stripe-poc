import { SectionCreatePaymentIntent } from '@/ui/section-create-payment-intent';
import { SectionCreatePaymentTerminalLocation } from '@/ui/section-create-payment-terminal-location';
import { SectionProcessPaymentWithTerminal } from '@/ui/section-process-payment-with-terminal';

export default function Home() {
  return (
    <div className='px-6 flex flex-col gap-6'>
      <SectionProcessPaymentWithTerminal />
      <SectionCreatePaymentIntent />
      <SectionCreatePaymentTerminalLocation />
    </div>
  );
}
