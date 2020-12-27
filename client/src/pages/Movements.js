import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Movements = () => (
    <section>
        <ul>
            <li key='cardio'>
                <Link to='/cardio'>Cardio</Link>
            </li>
            <li key='lifts'>
                <Link to='/lift'>Lifts</Link>
            </li>
            <li key='skills'>
                <Link to='/skill'>Skills</Link>
            </li>
        </ul>
    </section>
)

export default Movements;