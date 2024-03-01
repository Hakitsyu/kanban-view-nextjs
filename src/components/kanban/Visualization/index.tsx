'use client'
import { DragDropContext, DragStart, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import Column from '../Column'
import { createContext, useCallback, useContext, useRef } from 'react';
import { VisualizationState } from '@/store/useVisualizationStore';
import { StoreApi, UseBoundStore } from 'zustand';

interface VisualizationColumn {
    id: string,
    title: string
}

interface VisualizationProps {
    columns: VisualizationColumn[]
}

interface VisualizationContextType {
    store: UseBoundStore<StoreApi<VisualizationState>>
}

export const VisualizationContext = createContext<VisualizationContextType | null>(null)

export default function({ columns }: VisualizationProps) {
    const context = useContext(VisualizationContext);

    const { move } = useRef(context?.store.getState()).current!

    const isDroppedInOtherColumn = (result: DropResult) => 
        result.destination?.droppableId !== undefined && result.source.droppableId !== result.destination.droppableId

    const onDragEnd = useCallback((result: DropResult, provided: ResponderProvided) => {
        if (isDroppedInOtherColumn(result))
            move(result.draggableId, result.destination!.droppableId)
    }, [])

    return (
        <div className="flex p-24 gap-4">
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                {
                    columns.map((column, index) => (
                        <Column
                            key={index}
                            id={column.id} 
                            index={index}
                            title={column.title} 
                        />
                    ))
                }
            </DragDropContext>
        </div>
    )
}