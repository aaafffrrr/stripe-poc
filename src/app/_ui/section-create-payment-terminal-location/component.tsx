import { ButtonCreatePaymentTerminalLocation } from '@/ui/button-create-payment-terminal-location';
import { TagsList } from '@/ui/tags-list';

export function SectionCreatePaymentTerminalLocation() {
  const tags = ['Stripe', 'Location'];

  return (
    <section className='bg-white dark:bg-transparent rounded-lg p-4 border border-violet-500 flex flex-col gap-4'>
      <header className='flex flex-row justify-between items-center'>
        <div>
          <TagsList labels={tags} />
        </div>
      </header>

      <div>
        <ButtonCreatePaymentTerminalLocation />
      </div>
    </section>
  );
}
