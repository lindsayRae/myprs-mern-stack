import React from 'react';

const Message = ({ type }) => {
    const messages = {
        savedMovement: 'Movement has been saved!',
        savedEntry: 'Entry has been saved!',
        updated: 'Movement has been updated!',
        deleted: 'Movement has been deleted!'
    }

    return (
        <div className={`App-message ${type}`}>
            <p className='container'>
                <strong>{messages[type]}</strong>
            </p>
        </div>
    )
}

export default Message;