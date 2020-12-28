import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';

const Movements = () => (
    <section>
        <ul>
            <li key='cardio'>
                <NavLink to='/cardio' exact>Cardio</NavLink>
            </li>
            <li key='lifts'>
                <NavLink to='/lift' exact>Lifts</NavLink>
            </li>
            <li key='skills'>
                <NavLink to='/skill' exact>Skills</NavLink>
            </li>
            <li key='wod'>
                <NavLink to='/wod' exact>WODs</NavLink>
            </li>
        </ul>
    </section>
)

export default Movements;