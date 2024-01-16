import { Button } from '@/ui/button';
import { ButtonCreatePaymentTerminalLocation } from '@/ui/button-create-payment-terminal-location';

export function SectionCreatePaymentTerminalLocation() {
  console.debug(`[SectionCreatePaymentTerminalLocation] Component started`);
  const tags = ['Stripe', 'Location'];

  return (
    <section className='bg-white dark:bg-transparent rounded-lg p-4 border border-violet-500 flex flex-col gap-4'>
      <header className='flex flex-row justify-between items-center'>
        <div>
          <SectionTagsList labels={tags} />
        </div>
      </header>

      <div>
        <ButtonCreatePaymentTerminalLocation />
      </div>
    </section>
  );
}

function SectionTagsList({ labels }: { labels: string[] }) {
  return (
    <ul className='flex flex-row gap-1'>
      {labels.map((label) => {
        const key = `${SectionCreatePaymentTerminalLocation.name}.${label}`;
        return <Tag label={label} key={key} />;
      })}
    </ul>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <li className='text-xs bg-violet-300 px-2 py-1 text-center rounded-full text-violet-950'>
      {label}
    </li>
  );
}
