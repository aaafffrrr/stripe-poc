import { ReactNode, useState } from 'react';
import { Spinner } from '@/ui/spinner';

type Props = {
  children: ReactNode;
  callback: (onComplete: () => void) => void;
};

export function Button({ children, callback = () => {} }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoading(true);
    callback(() => setLoading(false));
  };

  if (loading) {
    return (
      <button className='w-full px-4 py-2 bg-violet-500/50 rounded-lg uppercase cursor-wait'>
        <Spinner />
      </button>
    );
  }

  return (
    <button
      className='w-full px-4 py-2 bg-violet-500 rounded-lg uppercase cursor-pointer'
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
