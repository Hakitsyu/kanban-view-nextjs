'use client'
import Kanban from '@/components/kanban/Kanban';

export default function Home() {
  const columns = [
    {
      id: '1',
      title: 'Hello World',
    },
    {
      id: '2',
      title: 'Hello World', 
    },
    {
      id: '3',
      title: 'Hello World',
    }
  ]

  const items = [
    {
      id: '1',
      content: 'Hello World 1',
      column: '1',
    },
    {
      id: '2',
      content: 'Hello World 2',
      column: '2',
    },
    {
      id: '3',
      content: 'Hello World 3',
      column: '3',
    },
    {
      id: '4',
      content: 'Hello World 4',
      column: '3',
    }
  ]

  return (
    <main>
      <Kanban columns={columns} items={items}></Kanban>
    </main>
  );
}
