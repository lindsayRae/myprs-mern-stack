// 'PostForm Component'
import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

const Duplicate = ({ cardio: propsCardio, addNewCardio, updateCardio }) => {
    const [saved, setSaved] = useState(false);
    const [cardio, setCardio] = useState({ ...propsCardio }) 
    const [error, setError] = useState('')
    
    const handleDuplicate = (event) => {
        event.preventDefault();
        console.log(cardio)  
        updateCardio(cardio)                             
        //setSaved(true)                           
    }
    // if(saved === true) {
    //     return <Redirect to='/cardio' />
    // } 
    return (
        <form className='container' onSubmit={handleDuplicate}>          
                        
            <p>This movement already exists. Would you like to add to the existing record?</p>           
            
            <p>              
                <button type='submit' className='linkLike'>Yes</button>
            </p>            
            {error && <p>{error}</p>}
        </form>
    )
}

export default Duplicate