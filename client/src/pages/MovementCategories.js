import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const MovementCategories = () => (
  <section>
    <ul>
      <li key='cardio'>
        <NavLink to='/cardios' exact>
          Cardio
        </NavLink>
      </li>
      <li key='lifts'>
        <NavLink to='/lifts' exact>
          Lifts
        </NavLink>
      </li>
      <li key='skills'>
        <NavLink to='/skills' exact>
          Skills
        </NavLink>
      </li>
      <li key='wod'>
        <NavLink to='/wods' exact>
          WODs
        </NavLink>
      </li>
    </ul>
  </section>
);

export default MovementCategories;
