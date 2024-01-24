export type Item = {
  id: string;
  date: Date;
  text: string;
}

export const items: Item[] = [
  { id: 'item-1', date: new Date(), text: 'Meet John' },
  { id: 'item-2', date: new Date(), text: 'Sync 24Q1 report' },
];
