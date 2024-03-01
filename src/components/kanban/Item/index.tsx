'use client'
import { Draggable } from 'react-beautiful-dnd'

export interface ItemProps {
    id: string,
    content: string,
    index: number
}

export default function({ id, index, content }: ItemProps) {
    return (
        <Draggable 
            draggableId={id} 
            index={index}
            key={id}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    className="flex rounded-sm min-h-14 p-4 text-zinc-400 border border-zinc-700 bg-zinc-900"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {content}
                </div>
            )}
        </Draggable>
    )
}