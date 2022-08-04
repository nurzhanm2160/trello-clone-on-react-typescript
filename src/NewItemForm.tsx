import React, {useState} from 'react';
import { NewItemFormContainer, NewItemButton, NewItemInput } from './styles'
import {useFocus} from "./utils/useFocus";

interface NewItemFormProps {
    onAdd(text: string): void
}

const NewItemForm: React.FC<NewItemFormProps> = ({onAdd}) => {
    const [text, setText] = useState("")
    const inputRef = useFocus()

    return (
        <NewItemFormContainer>
            <NewItemInput
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <NewItemButton onClick={() => onAdd(text)}>
                create
            </NewItemButton>
        </NewItemFormContainer>
    );
};

export default NewItemForm;