
import React from 'react';
import PersonalCollection from '../components/PersonalCollection';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handlePlayGame = (words: any[]) => {
    navigate('/practice?mode=collection');
  };

  return (
    <PersonalCollection 
      onBack={handleBack}
      onPlayGame={handlePlayGame}
    />
  );
};

export default Collection;
