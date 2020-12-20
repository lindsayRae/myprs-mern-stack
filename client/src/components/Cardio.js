import React from 'react';
import { Link } from 'react-router-dom';

const Cardio = ({ cardio }) => {
    console.log(cardio)
    return (
    <div className='post container'>
        <h1>{cardio.title}</h1>
        <div>
            {cardio.entries.length === 0 && (
                <>
                    <p>No {cardio.title} records yet! Time to get moving!</p>
                    <Link to='/new-cardio-entry'>
                        <button className='linkLike'>Add {cardio.title} Entry</button>
                    </Link>
                </>
            )}
            <div key={cardio.id}>
                <ul>
                {cardio.entries.map(entry => (            
                    <li key={entry.id}>
                        {entry.entry} {entry.date}
                        <br />
                        {entry.note}
                        <br />
                        <button className='linkLike'>Edit</button>
                        {'  '}
                        <button className='linkLike'>Delete</button>
                    </li>                       
                ))}
                </ul>       
            </div>           
        </div>
    </div>
    )
}

export default Cardio
