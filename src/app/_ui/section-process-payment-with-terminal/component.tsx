import { TagsList } from '@/ui/tags-list';
import { ButtonProcessPaymentWithTerminal } from '@/ui/button-process-payment-with-terminal';

export function SectionProcessPaymentWithTerminal() {
  const tags = ['Stripe', 'Payment'];
  const readerId = 'tmr_FaOk9QQmYa6bnu';
  const paymentIntentId = 'pi_3OZJ7wKTWHV2sRTL1ujQFfEC';

  return (
    <section className='bg-white dark:bg-transparent rounded-lg p-4 border border-violet-500 flex flex-col gap-4'>
      <header className='flex flex-row justify-between items-center'>
        <div>
          <TagsList labels={tags} />
        </div>
      </header>

      <div>
        <ButtonProcessPaymentWithTerminal
          readerId={readerId}
          paymentIntentId={paymentIntentId}
        />
      </div>
    </section>
  );
}
