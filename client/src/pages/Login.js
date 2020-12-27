import React, { useState, useContext, useEffect } from 'react';
import {UserContext} from '../context/UserContext';

// eslint-disable-next-line
export default ({history}) => {
 //   const { onLogin } = useContext(UserContext)
 console.log('history', history)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {user, setUser} = useContext(UserContext)
    console.log('user', user)

    useEffect(() => {
        if(user){
            history.push('/')
        }
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault();      
       try {
            const response = await fetch('http://localhost:1234/api/auth', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
    
            const data = await response.json()
            console.log('data', data)
    
            if(data.message){
                setError(data.message)
                return
            }
            console.log(data)
            setUser(data)
       } catch (err) {
           setError(`Something went wrong: ${err}`)
       }
    }

    return (
        <div>
            <form className='container' name='login' onSubmit={handleSubmit}>
                <p>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' value={email} onChange={(event) => {
                        setError('')
                        setEmail(event.target.value)
                    }} />
                </p>
                <p>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' value={password} onChange={(event) => {
                        setError('')
                        setPassword(event.target.value)
                    }} />
                </p>
                <p>
                    <button type='submit' disabled={!email && !password}>Login</button>
                </p>
            </form>
            {error && <p>{error}</p>}
        </div>
        
    )
}