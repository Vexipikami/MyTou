import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Accueil</Link></li>
      <li><Link to="/sleep">Sommeil</Link></li>
      <li><Link to="/workout">Sport</Link></li>
      <li><Link to="/meal">Repas</Link></li>
      <li><Link to="/notes">Notes</Link></li>
      <li><Link to="/summary">Résumé</Link></li>
    </ul>
  </nav>
);

export default Navigation;
