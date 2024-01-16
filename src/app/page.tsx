import { SectionCreatePaymentIntent } from '@/ui/section-create-payment-intent';
import { SectionCreatePaymentTerminalLocation } from '@/ui/section-create-payment-terminal-location';

export default function Home() {
  return (
    <div className='px-6 flex flex-col gap-6'>
      <SectionCreatePaymentTerminalLocation />
      <SectionCreatePaymentIntent />
    </div>
  );
}
