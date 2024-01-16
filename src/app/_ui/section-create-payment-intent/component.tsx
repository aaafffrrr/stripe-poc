'use client';

import { useState } from 'react';
import { TagsList } from '@/ui/tags-list';
import { Button } from '@/ui/button';
import { InputText } from '@/ui/input-text';
import { createPaymentIntent } from '@/stripe-server';

export function SectionCreatePaymentIntent() {
  const tags = ['Stripe', 'Payment Intent'];

  return (
    <section className='bg-white dark:bg-transparent rounded-lg p-4 border border-violet-500 flex flex-col gap-4'>
      <header className='flex flex-row justify-between items-center'>
        <div>
          <TagsList labels={tags} />
        </div>
      </header>

      <div>
        <Form />
      </div>
    </section>
  );
}

function Form() {
  const [amount, setAmount] = useState(42);

  const callback = async (onComplete: () => void) => {
    try {
      const cents = amount * 100;
      const destination = 'acct_1OZFm0AjiEy1bJp6'; // Stripe connect account ID (this one is linked to Guaca Shop account)
      const fee = cents * 0.15;
      const paymentIntent = await createPaymentIntent({
        amount: cents,
        stripeAccountDestinationTransfer: destination,
        fee,
      });
      onComplete();

      if (!location) {
        console.error(`Something went wrong while creating a payment intent`);
      }
    } catch (error) {
      onComplete();
      console.error(error);
    }
  };

  return (
    <form className='flex flex-col gap-4'>
      <div className='flex'>
        <span className='inline-flex font-semibold items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
          $
        </span>
        <InputText
          placeholder='Amount'
          type='number'
          className='rounded-l-none'
          onChangeValue={(value) => setAmount(+value)}
        />
      </div>
      <Button callback={callback}>Create payment intent</Button>
    </form>
  );
}
