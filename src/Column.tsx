import {useAppState} from "./AppStateContext";
import {ColumnContainer, ColumnTitle} from './styles'
import {useDrop} from "react-dnd";

import Card from "./Card";
import AddNewItem from "./AddNewItem";
import {useRef} from "react";
import {useItemDrag} from "./useItemDrag";
import {DragItem} from "./DragItem";
import {isHidden} from "./utils/isHidden";

interface ColumnProps {
    text: string
    index: number
    id: string
    isPreview? : boolean
}

const Column = ({ text, index, id, isPreview }: ColumnProps) => {
    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover(item: DragItem) {
            if (item.type === "COLUMN") {
                const dragIndex = item.index
                const hoverIndex = index

                if (dragIndex === hoverIndex) {
                    return
                }

                dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } })
                item.index = hoverIndex
            } else {
                const dragIndex = item.index
                const hoverIndex = 0
                const sourceColumn = item.columnId
                const targetColumn = id

                if (sourceColumn === targetColumn) {
                    return
                }

                dispatch({
                    type: "MOVE_TASK",
                    payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
                })

                item.index = hoverIndex
                item.columnId = targetColumn
            }
        }
    })

    const { state, dispatch } = useAppState()
    const ref = useRef<HTMLDivElement>(null)

    const { drag } = useItemDrag({type: "COLUMN", id, index, text})

    drag(drop(ref))
    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}>
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                <Card
                    text={task.text}
                    key={task.id}
                    index={i}
                    columnId={id}
                    id={task.id}
                />
            ))}
            <AddNewItem
                toggleButtonText="+ Add another task"
                onAdd={text => dispatch({type: 'ADD_TASK', payload: {text, taskId: id}})}
                dark
            />
        </ColumnContainer>
    )
}

export default Column