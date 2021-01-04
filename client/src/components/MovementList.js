// 'PostForm Component'
import React, { useState} from 'react';
import AddCardioEntry from './AddCardioEntry';

//const MovementList = ({ cardio: propsCardio, addNewCardio, updateCardio, updatedCardio }) => {
const MovementList = (props) => {
    const [error, setError] = useState('')
    
    const handleSomething = (event) => {
        event.preventDefault();         
                                 
    }
    console.log(props)

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>edit</th>
                        <th>Date</th>
                        <th>Max</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>//</td>
                        <td>1/01/21</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>//</td>
                        <td>1/01/21</td>
                        <td>20</td>
                    </tr>
                </tbody>
            </table>
            <AddCardioEntry />
        </>
    )
}

export default MovementList