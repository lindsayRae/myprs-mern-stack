// 'PostForm Component'
import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

const AddCardio = ({ cardio: propsCardio, addNewCardio, updateCardio }) => {
    const [saved, setSaved] = useState(false);
    const [cardio, setCardio] = useState({ ...propsCardio }) 

    const prevCardioRef = useRef();
    useEffect(() => {
        prevCardioRef.current = cardio;
    }, [cardio]);
    const prevCardio = prevCardioRef.current;
    
    const handleAddCardio = (event) => {
        event.preventDefault();
       
        if (cardio.title){           
            if(updateCardio){
                updateCardio(cardio)
            } else {
                addNewCardio(cardio)
            }                    
            setSaved(true)
        } else {
            alert('title required')
        }                     
    }
    if(saved === true) {
        return <Redirect to='/cardio' />
    } 
    return (
        <form className='container' onSubmit={handleAddCardio}>           
            <h1>{updateCardio ? 'Edit' : 'Add New'} Cardio</h1>           
            <p>
            <label htmlFor='form-title'>New Movement:</label>    
            <input
                defaultValue={cardio.title}
                id='form-title'
                value={cardio.title}
                placeholder='Movement Title'
                onChange={event => setCardio({
                    ...cardio, 
                    title: event.target.value
                })}
            />
            </p>
            <p>              
                <button type='submit'>Save</button>
            </p>
        </form>
    )
}

export default AddCardio