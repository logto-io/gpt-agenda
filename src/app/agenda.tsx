'use client';

import { Item } from '@/utils/storage';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json());

export default function Agenda({ initialData }: { initialData?: Item[] }) {
  const [date, setDate] = useState<Date>();
  const { data, isValidating } = useSWR<Item[]>('/data', fetcher, { refreshInterval: 1000, fallbackData: initialData });

  // First render
  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    if (!isValidating && data) {
      setDate(new Date());
    }
  }, [data, isValidating]);

  return (
    <section className="mb-2">
      <h1 className="text-xl font-semibold">Your agenda</h1>
      <p className="text-gray-400 text-sm mt-2 mb-4">
        Interact with the{' '}
        <a className="text-blue-600 hover:underline" href="https://chat.openai.com/g/g-gThGKWoMB-agenda-assistant-by-logto" target="_blank" rel="noopener">
          Agenda Assistant
        </a>{' '}
        GPT and see the results here.
      </p>
      <ol className="list-decimal p-2 ml-4 mb-4">
        {data?.map((item) => (
          <li key={item.id} className="p-1">
            {new Date(item.date).toLocaleDateString()}: {item.text}
          </li>
        ))}
      </ol>
      {date && (
        <div className="text-gray-400 text-sm">
          <p>Updated at: {date.toLocaleString()}</p>
        </div>
      )}
    </section>
  );
}
