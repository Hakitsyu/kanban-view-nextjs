'use client'
import { Droppable } from 'react-beautiful-dnd'
import { ColumnBody } from './Body'
import { ColumnTitle } from './Title'
import { cn } from '@/lib/utils'

interface ColumnProps {
    id: string,
    index: number,
    title: string
}

export default function({ id, index, title }: ColumnProps) {
    return (
        <Droppable
            droppableId={id}
        >
            {(provided, snapshot) =>
                <div 
                    ref={provided.innerRef}
                    className={
                        cn(
                            "flex bg-zinc-900 border border-zinc-700 flex-col py-4 px-3 rounded-md gap-4 min-w-60",
                            {
                                "transition duration-500 ease-in-out border-zinc-100": snapshot.isDraggingOver
                            }
                        )
                    }
                >
                    <ColumnTitle title={title}></ColumnTitle>
                    <ColumnBody id={id} index={index}></ColumnBody>
                    {provided.placeholder}
                </div>
            }
        </Droppable>
    )
}