import { generateRandomName } from '@/utils/generate-random-name';

export function TagsList({ labels }: { labels: string[] }) {
  return (
    <ul className='flex flex-row gap-1'>
      {labels.map((label) => {
        const key = `tags-list.${generateRandomName()}.${label}`;
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
