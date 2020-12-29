import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import Message from '../components/Message';
import Modal from '../components/Modal';

const CardioList = () => {
    const [message, setMessage] = useState(null);
    const [cardios, setCardios] = useState([])

    const {user} = useContext(UserContext);
    console.log('user in Cardios.js', user)
   
    useEffect(() => {       
        const fetchMovements = async () => {
            const headers = {'Content-Type': 'application/json', 'x-auth-token': user.jwt}
            const res = await fetch('http://localhost:1234/api/movements/cardio', {headers})
            const data = await res.json() 
            console.log(data)     
            setCardios(data)
          }
          fetchMovements();
  
    }, [])
    // const addNewCardio = (cardio) => {
    //     cardio.id = cardios.length + 1;
    //     cardio.slug = getNewSlugFromTitle(cardio.title);
    //     setCardios([...cardios, cardio])
    //     setFlashMessage('savedMovement')
    //   }
    
    //   const updateCardio = (cardio) => {
    //     cardio.slug = getNewSlugFromTitle(cardio.title);
    //     const index = cardios.findIndex((c) => c.id ===cardio.id);
    //     const oldCardios = cardios.slice(0, index).concat(cardios.slice(index + 1))
    //     const updatedCardios = [...oldCardios, cardio].sort((a, b) => a.id - b.id)
    //     setCardios(updatedCardios);
    //     setFlashMessage(`updated`);
    //   }
    
      const deleteCardio = (cardio) => {
        if(window.confirm('Delete this post?')){
          const updateCardio = cardios.filter((c) => c.id !== cardio.id)
          setCardios(updateCardio)
          setFlashMessage('deleted')
        }
      }

       
  
    const setFlashMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
        setMessage(null)
        }, 1600);
    }

    const modalRef = React.useRef()
    const openModal = () => {
        modalRef.current.openModal();
    }

    // const getNewSlugFromTitle = (title) => encodeURIComponent(title.toLowerCase().split(' ').join('-'));
    
    

    // const addNewCardioEntry = (userInput) => {
    //     console.log('addNewCardioEntry(userInput)', userInput)
    //     setFlashMessage('savedEntry')
    //     // setCardios
        
    // }
    return (
    <article className='posts container'>
        {message && <Message type={message} />}
        <h1>Cardio</h1>
        <ul>
            {cardios.length < 1 && (
                <li key='empty'>No cardio records yet! Time to get moving!</li>
            )}
            {cardios.map(cardio => (
                <li key={cardio._id}>
                    <h2>
                        <NavLink to={`/cardio/${cardio.slug}`}>{cardio.name}</NavLink>
                    </h2>
                    <p>
                        <NavLink to={`/edit/${cardio.slug}`}><button className='linkLike'>Edit</button></NavLink>
                        {'  '}
                    <button className='linkLike' onClick={() => deleteCardio(cardio)}>Delete</button>
                    </p>
                </li>
            ))}
        </ul>     
           
            <button className='linkLike' onClick={openModal}>Add New Cardio</button> 
            <Modal ref={modalRef}> 
                <h1>New Cardio</h1>
                <p>Add form here ...</p>
                <button onClick={()=> modalRef.current.closeModal()}>Close</button>
            </Modal>
        
    </article>
    )
}

export default CardioList;