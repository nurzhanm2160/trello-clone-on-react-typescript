import React, {useState} from 'react';
import {AddItemButton} from "./styles";
import NewItemForm from "./NewItemForm";


interface AddNewItemProps {
    onAdd(text: string): void
    toggleButtonText: string
    dark?: boolean
}

const AddNewItem: React.FC<AddNewItemProps> = (props) => {
    const [showForm, setShowForm] = useState(false)
    const {onAdd, toggleButtonText} = props

    if(showForm) {
        return (
            <NewItemForm onAdd={text => {
                onAdd(text)
                setShowForm(false)
                }}
            />
        )
    }

    return <button onClick={() => setShowForm(true)}>{toggleButtonText}</button>
};

export default AddNewItem;