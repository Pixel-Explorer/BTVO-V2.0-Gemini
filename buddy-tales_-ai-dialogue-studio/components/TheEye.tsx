
import React from 'react';

const eyeStyles: React.CSSProperties = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  border: '3px solid var(--glow-primary)',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 0 20px var(--glow-primary), 0 0 40px var(--glow-secondary) inset',
  animation: 'pulse 5s infinite ease-in-out',
};

const pupilStyles: React.CSSProperties = {
  width: '40px',
  height: '40px',
  backgroundColor: 'var(--glow-secondary)',
  borderRadius: '50%',
  boxShadow: '0 0 15px var(--glow-secondary)',
  animation: 'movePupil 10s infinite ease-in-out',
};

const keyframes = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 20px var(--glow-primary), 0 0 40px var(--glow-secondary) inset;
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 30px var(--glow-primary), 0 0 50px var(--glow-secondary) inset;
    }
  }

  @keyframes movePupil {
    0%, 100% { transform: translate(0, 0); }
    15% { transform: translate(15px, -10px); }
    30% { transform: translate(-10px, 15px); }
    45% { transform: translate(5px, 5px); }
    60% { transform: translate(-15px, -15px); }
    75% { transform: translate(10px, 10px); }
  }
`;

export const TheEye: React.FC = () => {
  return (
    <>
      <style>{keyframes}</style>
      <div style={eyeStyles}>
        <div style={pupilStyles} />
      </div>
    </>
  );
};
