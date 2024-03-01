'use client'
import Item from '../../Item';
import { useContext, useEffect, useRef } from 'react';
import { VisualizationContext } from '../../Visualization';
import { useItems } from '@/store/useVisualizationStore';

interface ColumnBodyProps {
    id: string,
    index: number
}

export function ColumnBody({ id }: ColumnBodyProps) {
    const context = useContext(VisualizationContext);

    if (!context?.store) {
        throw new Error(`Not exists the required VisualizationContext`);
    }

    const items = useItems(context?.store, {
        prepare: items => items.filter(i => i.column == id)
    })

    return (
        <div className="flex flex-col gap-1 text-zinc-700">
            {items.current.map((item, index) => 
                <Item 
                    key={item.id}
                    id={item.id} 
                    content={item.content} 
                    index={index}
                />
            )}
        </div>
    )
}
