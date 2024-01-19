'use client';

import { useEffect, useState } from 'react';
import { TagsList } from '@/ui/tags-list';
import { Button } from '@/ui/button';
import { InputText } from '@/ui/input-text';
import {
  cancelActionOnReader,
  createPaymentIntent,
  findOneReader,
  processPaymentIntent,
} from '@/stripe-server';
import { findOnePaymentIntent } from '@/stripe-server';
import Stripe from 'stripe';

export function SectionSendPaymentRequestToTerminal() {
  const tags = ['Stripe', 'Payment'];

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
  const [amount, setAmount] = useState(0);
  const [isReaderBusy, setIsReaderBusy] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<any>();
  const [errorMessage, setErrorMessage] = useState('');
  const readerId = 'tmr_FaOk9QQmYa6bnu';

  const actionCreatePaymentIntent = async (amount: number) => {
    try {
      const cents = amount * 100;
      const destination = 'acct_1OZFm0AjiEy1bJp6'; // Stripe connect account ID (this one is linked to Guaca Shop account)
      const fee = cents * 0.2;
      const paymentIntent = await createPaymentIntent({
        amount: cents,
        stripeAccountDestinationTransfer: destination,
        fee,
      });

      if (!paymentIntent) {
        console.error(`Something went wrong while creating a payment intent`);
      }

      return paymentIntent;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const actionProcessPaymentIntent = async (
    readerId: string,
    paymentIntentId: string
  ) => {
    try {
      const lastActionProcessedByReader = await processPaymentIntent({
        readerId,
        paymentIntentId,
      });

      if (!lastActionProcessedByReader) {
        console.error(
          `Something went wrong while processing payment ${paymentIntentId} with reader ${readerId}`
        );
        return null;
      }

      console.debug(
        `Payment Intent ${paymentIntentId} processed: ${JSON.stringify(
          lastActionProcessedByReader
        )}`
      );
      return lastActionProcessedByReader;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const callback = async (onComplete: () => void) => {
    setErrorMessage('');

    try {
      const reader = await findOneReader({ id: readerId });

      if (!reader) {
        const message = `Please verify that you have the reader ${readerId} added in your dashboard or try again later.`;
        console.error(message);
        setErrorMessage(message);
        onComplete();
        return;
      }

      console.debug(reader);
      if (reader.status === 'offline') {
        const message = `The terminal is offline. Please turn it on.`;
        console.error(message);
        setErrorMessage(message);
        onComplete();
        return;
      }

      // TODO: Does stripe provide a ENUM of action status?
      if (
        reader.action &&
        reader.action.status &&
        reader.action.status === 'in_progress'
      ) {
        const message = `The terminal is already in use. Please wait for the current transaction to complete or cancel it.`;
        console.error(message);
        setErrorMessage(message);
        onComplete();
        return;
      }

      const paymentIntent = await actionCreatePaymentIntent(amount);

      if (!paymentIntent) {
        const message = `Something went wrong while creating a payment intent. Please try again later.`;
        console.error(message);
        setErrorMessage(message);
        onComplete();
        return;
      }

      const lastActionProcessedByReader = await actionProcessPaymentIntent(
        readerId,
        paymentIntent.id
      );

      if (!lastActionProcessedByReader) {
        const message = `Something went wrong while processing the payment. Please try again later.`;
        console.error(message);
        setErrorMessage(message);
        onComplete();
        return;
      }

      setPaymentIntent(paymentIntent);
      setIsReaderBusy(true);
      onComplete();

      console.debug(
        `Payment Intent ${paymentIntent.id} processed: ${JSON.stringify(
          lastActionProcessedByReader
        )}`
      );
    } catch (error) {
      onComplete();
      console.error(error);
    }
  };

  if (isReaderBusy) {
    return (
      <SectionReaderInUse
        readerId={readerId}
        paymentIntentId={paymentIntent.id}
        amount={amount}
        onClose={() => setIsReaderBusy(false)}
      />
    );
  }

  return (
    <form className='flex flex-col gap-4'>
      <div className='flex'>
        <span className='inline-flex font-semibold items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-white border-r-none'>
          $
        </span>
        <InputText
          placeholder='Amount'
          type='number'
          className='rounded-l-none border-l-none'
          onChangeValue={(value) => setAmount(+value)}
        />
      </div>
      {errorMessage.length > 0 && (
        <div className='p-4 rounded-lg gap-1 bg-red-200 text-red-900 flex flex-col'>
          <h3 className='font-semibold'>An error has occured</h3>
          <p className='text-sm'>{errorMessage}</p>
        </div>
      )}
      <Button callback={callback}>Request payment</Button>
    </form>
  );
}

function SectionReaderInUse({
  amount,
  readerId,
  paymentIntentId,
  onClose,
}: {
  amount: number;
  readerId: string;
  paymentIntentId: string;
  onClose: () => void;
}) {
  const handleClickOnCancelTransaction = async () => {
    console.debug(
      `Cancel transaction manually clicked. We can clear the reader.`
    );
    await cancelActionOnReader({ readerId });
    onClose();
  };

  useEffect(() => {
    // Every second, check the state of the payment intent processed by the reader
    const interval = setInterval(async () => {
      console.debug(
        `[Interval job] Checking the current state of paymentIntent ${paymentIntentId}`
      );
      const paymentIntent = await findOnePaymentIntent({ id: paymentIntentId });

      if (!paymentIntent) {
        return null;
      }

      if (paymentIntent.status === 'succeeded') {
        console.debug(
          `Payment intent ${paymentIntent.id} is succeeded. We can clear the reader.`
        );
        await cancelActionOnReader({ readerId });
        onClose();
      }
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [readerId, paymentIntentId, onClose]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 py-4 text-center'>
        <p className='text-slate-400 text-lg'>Total</p>
        <p className='text-3xl font-semibold text-slate-800 dark:text-slate-100'>
          CA${amount}
        </p>
        <p className='text-slate-400 text-sm'>
          Please give the terminal reader to your customer so they can make the
          payment.
        </p>
      </div>
      <div className='flex flex-row justify-end'>
        <button
          className='text-red-400 rounded-lg uppercase text-sm cursor-pointer text-right'
          onClick={handleClickOnCancelTransaction}
        >
          Cancel transaction
        </button>
      </div>
    </div>
  );
}
