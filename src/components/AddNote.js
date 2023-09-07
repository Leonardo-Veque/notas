import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
    const[noteText, setNoteText] = useState('');
    const characterLimit = 200;

    const handleChange = (event) =>{
        if(characterLimit - event.target.value.length >=0){
            setNoteText(event.target.value);
        }   
    };

    const handleSaveClick = () => {
        if(noteText.trim().length > 0){
        handleAddNote(noteText);
        setNoteText('');
        }
    };

    return(
        <div className="note new">
            <textarea 
                rows="8"
                cols="10"
                placeholder="Clique para escrever..." 
                value = {noteText}
                onChange={handleChange}
            ></textarea>
            <div className="note-footer">
                <small>{characterLimit - noteText.length} Letras Restantes</small>
                <button className="save" onClick={handleSaveClick}>Adicionar</button>
            </div>
        </div>
    )
};

export default AddNote;