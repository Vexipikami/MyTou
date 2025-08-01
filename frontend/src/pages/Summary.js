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

  if (!summary) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Résumé hebdomadaire</h2>
      <ul>
        <li>📝 Notes prises : {summary.notesCount}</li>
        <li>😴 Nuits enregistrées : {summary.sleepCount}</li>
        <li>🏋️‍♂️ Séances de sport : {summary.workoutsCount}</li>
        <li>🍽️ Repas enregistrés : {summary.mealsCount}</li>
        <li>⏱️ Sommeil moyen : {summary.avgSleepMinutes} min/nuit</li>
        <li>🔥 Calories brûlées (moy. par jour) : {summary.avgCaloriesBurnedPerDay}</li>
        <li>🍔 Calories consommées (moy. par jour) : {summary.avgCaloriesConsumedPerDay}</li>
      </ul>
    </div>
  );
};

export default Summary;
