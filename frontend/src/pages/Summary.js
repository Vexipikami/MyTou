import React, { useEffect, useState } from 'react';
import api from '../api';

const Summary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await api.get('/summary');
      setSummary(res.data);
    };
    fetchSummary();
  }, []);

  return (
    <div>
      <h2>Résumé hebdomadaire</h2>
      {summary ? (
        <ul>
          <li>Notes prises : {summary.notesCount}</li>
          <li>Nuits de sommeil : {summary.sleepCount}</li>
          <li>Séances de sport : {summary.workoutsCount}</li>
          <li>Repas enregistrés : {summary.mealsCount}</li>
        </ul>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Summary;
