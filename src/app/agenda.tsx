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
    <>
      <h1 className="text-xl font-semibold">Your agenda</h1>
      <ol className="list-decimal p-8">
        {data?.map((item) => (
          <li key={item.id} className="p-1">
            {new Date(item.date).toLocaleString()}: {item.text}
          </li>
        ))}
      </ol>
      {date && (
        <div className="text-gray-400 text-sm">
          <p>Updated at: {date.toLocaleString()}</p>
        </div>
      )}
    </>
  );
}
