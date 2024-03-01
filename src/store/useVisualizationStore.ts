import { MutableRefObject, useEffect, useRef } from 'react';
import { StoreApi, UseBoundStore, create } from 'zustand';

export interface VisualizationItem {
    id: string,
    content: string,
    column: string,
}

export interface VisualizationState {
    items: VisualizationItem[],
    move: (itemId: string, columnId: string) => void
}

const getItemById = (state: VisualizationState, id: string) => {
    const item = state.items.find(i => i.id == id);
    if (!item)
        throw new Error(`Not found a item with this id ${id}`)

    return item
}

export const useVisualizationStore = (items: VisualizationItem[]) => {
    return create<VisualizationState>((set) => ({
        items,
        move: (itemId: string, columnId: string) => {
            set((state) => {
                const item = getItemById(state, itemId)

                state.items.splice(state.items.indexOf(item), 1)
                item.column = columnId

                return {
                    items: [...state.items, item]
                }
            })
        }
    }))
}

export type UseItemsPrepareFunction = (items: VisualizationItem[]) => VisualizationItem[]

interface UseItemsOptions {
    prepare?: UseItemsPrepareFunction
}

export const useItems = (store: UseBoundStore<StoreApi<VisualizationState>>, options?: UseItemsOptions): MutableRefObject<VisualizationItem[]> => {
    const items = store.getState().items
    const prepareItems = (items: VisualizationItem[]) => options?.prepare ? options?.prepare(items) : items

    const itemsRef = useRef(prepareItems(items))

    useEffect(() => store.subscribe(s => itemsRef.current = prepareItems(s.items)), [])

    return itemsRef
}