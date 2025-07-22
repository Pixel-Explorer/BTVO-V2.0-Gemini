
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col justify-center items-center z-50">
      <Loader2 className="h-12 w-12 text-indigo-400 animate-spin" />
      <p className="mt-4 text-white text-lg font-semibold">{message}</p>
    </div>
  );
};

export default Loader;
