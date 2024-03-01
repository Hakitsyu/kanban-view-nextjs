'use client'
interface ColumnTitleProps {
    title: string
}

export function ColumnTitle({ title }: ColumnTitleProps) {
    return (
        <div className="text-zinc-300">{title}</div>
    )
}