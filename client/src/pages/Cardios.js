import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import Message from '../components/Message';
import Modal from '../components/Modal';
import AddCardio from '../components/AddCardio';
import MovementList from '../components/MovementList'

const CardioList = () => {
    const [message, setMessage] = useState(null);
    const [cardios, setCardios] = useState([]);
    const [error, setError] = useState('');
    const [updatedCardio, setUpdatedCardio] = useState(null);
    const [viewMovementList, setViewMovementList] = useState(false)

    const {user, setUser} = useContext(UserContext);
    console.log('user in Cardios.js', user);   
    useEffect(() => {          
        buildMovementMenu();
    }, [])

    const buildMovementMenu = async () => {
        const defaultMovements = await defaultMovementMenu()
        const userMovements = await userMovementMenu()            
        const allMovements = defaultMovements.concat(userMovements);
        
        sessionStorage.setItem('All Movements', JSON.stringify(allMovements))

        let defaultMovementName = defaultMovements.map((movement) => {
            return movement.name
        })
     
        if(userMovements && userMovements.length != 0){
            //* use map() to get just the name
            let userDefinedMovementNames = userMovements.map((movement) => {
                return movement.name
        })
        //* concat() the two arrays together 
        let allMovements = userDefinedMovementNames.concat(defaultMovementName);        
        
        //* new Set() removes duplicate values -> returns object 
        let uniqueMenu = new Set(allMovements);      
        
        //* ... spread puts back into array 
        let usersMenu = [...uniqueMenu]; 
        
        setCardios(usersMenu.sort())
        return ;
        } else {
            setCardios(defaultMovementName)
            return defaultMovementName;
        }   
        
       
    }
    const defaultMovementMenu = async () => {

        try {       
            const url = `http://localhost:1234/api/movements/cardio`;
            
             const headers = {
                 'Content-Type': 'application/json',
                 'x-auth-token': localStorage.getItem('jwt')
             }
     
             const res = await fetch(url, {
                 method: "GET",
                 headers: headers
             })
             const data = await res.json()
           
             if(data.message){
                setError(data.message)
                return
             } else {
                 return data
             }            
         } catch (err) {
            setError(err.message)
         }

    }
    const userMovementMenu = async () => {
        console.log('** heard here')
        const user_ID = localStorage.getItem('UserID')
        try {       
            const url = `http://localhost:1234/api/prs/${user_ID}?movement=cardio`;
            
             const headers = {
                 'Content-Type': 'application/json',
                 'x-auth-token': localStorage.getItem('jwt')
             }
     
             const res = await fetch(url, {
                 method: "GET",
                 headers: headers
             })
             const data = await res.json()
             console.log(data)
             if(data.message){
                setError(data.message)
                return
             } else {
                 return data
             }            
         } catch (err) {
            setError(err.message)
         }

    }
    const currentDate = () => {
        const today = new Date();
        const year = today.getFullYear().toString().substr(2,2);
        
        return `${(today.getMonth()+1)}/${today.getDate()}/${year}`;
    }
    const addNewCardio = async (cardio) => {
            
        try {    
            let body = {
                user_id: localStorage.getItem('UserID'),
                name: cardio.name.trim().toLowerCase(),
                type: 'cardio',       
                personalRecord: cardio.personalRecord.trim(),
                comment: cardio.comment ? cardio.comment.trim() : '',
                date: currentDate(),
                preDefined: false
            }                     
    
            const res = await fetch(`http://localhost:1234/api/prs/cardio`, {
                method: 'POST',
                headers: {
                    'x-auth-token': localStorage.getItem('jwt'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await res.json();
            
            if(data.message === 'Success'){
                buildMovementMenu();
                modalRef.current.closeModal();
            } else {         
                setError(data.message)
            }
            
        } catch (err) {
            setError(err.message)
        }      
     
    
        // cardio.id = cardios.length + 1;
        // //cardio.slug = getNewSlugFromTitle(cardio.title);
        // setCardios([...cardios, cardio])
        // setFlashMessage('savedMovement')
      }        
    const updateCardio = async (cardio) => {
        console.log('Updating cardio...', cardio)
       

        try {
            const d = cardio.results
            let userID = localStorage.getItem('UserID');
            let body = {
                prID: d._id,
                name: d.name,
                personalRecord: d.personalRecord,
                date: d.date,
                comment: d.comment,
                type: d.type
            }
            console.log(body)
            const res = await fetch(`http://localhost:1234/api/prs/${userID}`, {
                method: 'PUT',
                headers: {
                    'x-auth-token': localStorage.getItem('jwt'),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await res.json();
            console.log(data)


            
        } catch (error) {
            
        }
    // cardio.slug = getNewSlugFromTitle(cardio.title);
    // const index = cardios.findIndex((c) => c.id ===cardio.id);
    // const oldCardios = cardios.slice(0, index).concat(cardios.slice(index + 1))
    // const updatedCardios = [...oldCardios, cardio].sort((a, b) => a.id - b.id)
    // setCardios(updatedCardios);
    // setFlashMessage(`updated`);
    }
    
    const deleteCardio = (cardio) => {
    if(window.confirm('Delete this post?')){
        const updateCardio = cardios.filter((c) => c.id !== cardio.id)
        setCardios(updateCardio)
        setFlashMessage('deleted')
    }
    }       
    const viewMovement = () => {
        console.log('heard')
    }
    const setFlashMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
        setMessage(null)
        }, 1600);
    }

    //* find the PR from selected lift 
    async function movementPR(movementName) {

        let movementRecords = await selectedMovementRecords(movementName);
        console.log('movementRecords', movementRecords)
        if (movementRecords.length < 1) {
       // noEntries();
        } else {
        
    
       // highestRecord(movementRecords);
       // recordTable(movementRecords);
        }
    }
    //* find all the records for selected lift 
    const selectedMovementRecords = async(movementName) => {
        
        let allRecords = await allMovementRecords();
       
        if (allRecords.length <= 0) {
            return []
        } else {
        let selectedMovement = allRecords.filter(el => el.name === movementName);
        
        return selectedMovement;
        }
    }
   //* get all of the lift records from the server
   const allMovementRecords = async () => {

    let userID = localStorage.getItem('UserID');
    //let movement = sessionStorage.getItem('Movement')
    try {
      let url = `/api/prs/${userID}?movement=cardio`;
      let headers = {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem('jwt')
      }
  
      let res = await fetch(url, {
        method: "GET",
        headers: headers
      })
      let json = await res.json()
     

      if (res.status === 200) {
        return json;
      } else if (res.status === 404) {
        console.log(json.message)
      } else if (res.status === 400) {
        console.log(json.message)
      } else {
        console.log("Some other error")
      }
    } catch (error) {
      console.log(error);
    }
  }
    const modalRef = React.useRef()
    const openModal = (cardio) => {
        console.log(cardio)
        
        movementPR(cardio)
        modalRef.current.openModal(cardio);
    }
        
    // const addNewCardioEntry = (userInput) => {
    //     console.log('addNewCardioEntry(userInput)', userInput)
    //     setFlashMessage('savedEntry')
    //     // setCardios
        
    // }
    return (
    <div className='posts container'>
        {message && <Message type={message} />}
        <h1>Cardio</h1>
        <ul>
           
            {cardios.map(cardio => (
                
                <li key={cardio} className='capitalize'> 
              
                <span onClick={()=> {
                    openModal(cardio)
                    setViewMovementList(true)
                }}>{cardio}</span> 
                </li>
            ))}
        </ul>     
           {cardios.length > 0 && (
                <p>
                <button className='linkLike' onClick={openModal}>Add New Cardio</button>
            </p> 
            )}
            
            <Modal ref={modalRef}>  

            {!viewMovementList &&
                <AddCardio addNewCardio={addNewCardio} />
            }
            {viewMovementList &&
                <MovementList movementPR={movementPR} />
            }           
                <button className='linkLike' onClick={()=> {                    
                    setViewMovementList(false)
                    modalRef.current.closeModal()

                }}>Close</button>

            </Modal>
            {error && <p>{error}</p>}
    </div>
    )
}

export default CardioList;