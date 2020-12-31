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
        console.log(cardio)
     

        if (cardio.name){           
            if(updateCardio){
                updateCardio(cardio)
            } else {
                addNewCardio(cardio)
            }                    
            setSaved(true)
        } else {
            alert('Name required')
        }                     
    }
    if(saved === true) {
        return <Redirect to='/cardio' />
    } 
    return (
        <form className='container' onSubmit={handleAddCardio}>           
            <h1>{updateCardio ? 'Edit' : 'Add New'} Cardio</h1>                
            <p>
                <label htmlFor='form-name'>New Movement:</label>
                <input                   
                    id='form-name'
                    value={cardio.name}
                    placeholder='Movement Name'
                    onChange={event => setCardio({
                        ...cardio, 
                        name: event.target.value
                    })}
                />
            </p>
            <p>
                <label htmlFor='form-pr'>PR:</label>               
                <input                  
                    id='form-pr'                    
                    placeholder='Personal Record'
                    value={cardio.personalRecord}
                    onChange={event => setCardio({
                        ...cardio, 
                        personalRecord: event.target.value
                    })}
                />
            </p>
            <p>
                <label htmlFor='form-notes'>Notes:</label>               
                <textarea                  
                    id='form-notes'                    
                    placeholder='Notes...'
                    value={cardio.comment}
                    onChange={event => setCardio({
                        ...cardio, 
                        comment: event.target.value
                    })}
                />
            </p>
            <p>              
                <button type='submit' className='linkLike'>Add</button>
            </p>
        </form>
    )
}

export default AddCardio