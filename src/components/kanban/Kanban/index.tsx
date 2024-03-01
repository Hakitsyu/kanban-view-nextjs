import { VisualizationItem, useVisualizationStore } from '@/store/useVisualizationStore'
import Visualization, { VisualizationContext } from '@/components/kanban/Visualization';

interface KanbanColumn {
    id: string,
    title: string
}

interface KanbanProps {
    columns: KanbanColumn[],
    items: VisualizationItem[]
}

export default function({ columns, items }: KanbanProps) {
    const store = useVisualizationStore(items)

    return (
        <VisualizationContext.Provider value={{ store }}>
            <Visualization columns={columns}></Visualization>
        </VisualizationContext.Provider>
    )
}