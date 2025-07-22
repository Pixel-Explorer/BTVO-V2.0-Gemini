
import React from 'react';
import { DialogueLine } from '../types';

interface ActionBlockProps {
  line: DialogueLine;
}

const ActionBlock: React.FC<ActionBlockProps> = ({ line }) => {
  return (
    <div className="px-4 py-2 my-2 text-center">
      <p className="text-[var(--text-secondary)] italic text-sm leading-relaxed">{line.text}</p>
    </div>
  );
};

export default ActionBlock;
