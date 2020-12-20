import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const AddCardioEntry = ({ addNewCardioEntry }) => {
    const [entry, setEntry] = useState('');
    const [note, setNote] = useState('');
    const [saved, setSaved] = useState(false)

    const handleAddCardioEntry = (event) => {
        event.preventDefault();
        console.log(addNewCardioEntry)
        if(entry){
            const userInput = {
                entry: entry,
                note: note
            }
            addNewCardioEntry(userInput);
            setSaved(true)
        } else {
            alert('entry required')
        }
        
    }
    if(saved === true){
        return <Redirect to='/cardio' />
    }

    return (
        <form className='container' onSubmit={handleAddCardioEntry}>
            <h1>Add New Entry</h1>            
            <p>
            <label htmlFor='form-entry'>New Entry:</label>    
            <input
                id='form-entry'                
                placeholder='Entry'
                value={entry} 
                onChange={event => setEntry(event.target.value)}              
            />
            </p>
            <p>
            <label htmlFor='form-note'>Notes:</label>    
            <textarea
                id='form-note'                
                placeholder='Notes ...' 
                value={note}    
                onChange={event => setNote(event.target.value)}           
            />
            </p>
            <p>              
                <button type='submit'>Save</button>
            </p>
        </form>
    )
}

export default AddCardioEntry;