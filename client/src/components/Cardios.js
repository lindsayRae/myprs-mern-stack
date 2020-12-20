import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from './Message';

const CardioList = () => {
    const [message, setMessage] = useState(null);
    const [cardios, setCardios] = useState([])
    // const [cardios, setCardios] = useState([
    //     {
    //       id: 1,
    //       slug: '1-mile-run',
    //       title: '1  Mile Run',
    //       entries: [
    //         { id:'1.1', entry: '8 Minutes', date: '12/12/20', note: 'this is a optional note'},
    //         { id:'1.2', entry: '7 Minutes', date: '12/13/20', note: 'this is a optional note'},
    //       ]
    //     },
    //     {
    //       id: 2,
    //       slug: '5k-run',
    //       title: '5K  Run',
    //       entries: [
    //         { id:'1.1', entry: '8 Minutes', date: '12/12/20', note: 'this is a optional note'},
    //         { id:'1.2', entry: '7 Minutes', date: '12/13/20', note: 'this is a optional note'},
    //       ]
    //     },
    //     {
    //       id: 3,
    //       slug: '1000-meter-row',
    //       title: '1000  Meter Row',
    //       entries: [
    //         { id:'1.1', entry: '8 Minutes', date: '12/12/20', note: 'this is a optional note'},
    //         { id:'1.2', entry: '7 Minutes', date: '12/13/20', note: 'this is a optional note'},
    //       ]
    //     },
    //     {
    //       id: 4,
    //       slug: '2000-meter-row',
    //       title: '2000  Meter Row',
    //       entries: [
    //         { id:'1.1', entry: '8 Minutes', date: '12/12/20', note: 'this is a optional note'},
    //         { id:'1.2', entry: '7 Minutes', date: '12/13/20', note: 'this is a optional note'},
    //       ]
    //     }
    //   ])
      

    useEffect(() => {
        console.log('loads now')
        const fetchMovements = async () => {
            const res = await fetch('http://localhost:1234/movements')
            const data = await res.json() 
            console.log(data)     
            setCardios(data)
          }
          fetchMovements();
  
    }, [])
    const addNewCardio = (cardio) => {
        cardio.id = cardios.length + 1;
        cardio.slug = getNewSlugFromTitle(cardio.title);
        setCardios([...cardios, cardio])
        setFlashMessage('savedMovement')
      }
    
      const updateCardio = (cardio) => {
        cardio.slug = getNewSlugFromTitle(cardio.title);
        const index = cardios.findIndex((c) => c.id ===cardio.id);
        const oldCardios = cardios.slice(0, index).concat(cardios.slice(index + 1))
        const updatedCardios = [...oldCardios, cardio].sort((a, b) => a.id - b.id)
        setCardios(updatedCardios);
        setFlashMessage(`updated`);
      }
    
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

    const getNewSlugFromTitle = (title) => encodeURIComponent(title.toLowerCase().split(' ').join('-'));
    
    

    const addNewCardioEntry = (userInput) => {
        console.log('addNewCardioEntry(userInput)', userInput)
        setFlashMessage('savedEntry')
        // setCardios
        
    }
    return (
    <article className='posts container'>
        {message && <Message type={message} />}
        <h1>Cardio</h1>
        <ul>
            {cardios.length < 1 && (
                <li key='empty'>No cardio records yet! Time to get moving!</li>
            )}
            {cardios.map(cardio => (
                <li key={cardio.id}>
                    <h2>
                        <Link to={`/cardio/${cardio.slug}`}>{cardio.title}</Link>
                    </h2>
                    <p>
                        <Link to={`/edit/${cardio.slug}`}><button className='linkLike'>Edit</button></Link>
                        {'  '}
                    <button className='linkLike' onClick={() => deleteCardio(cardio)}>Delete</button>
                    </p>
                </li>
            ))}
        </ul>
        <Link to='/new-cardio'>
            <button className='linkLike'>Add New Cardio</button> 
        </Link>
    </article>
    )
}

export default CardioList;