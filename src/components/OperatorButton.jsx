
import React from 'react';
import { Button } from 'primereact/button';

export const OperatorButton = ({ icon, label, onClick, selected }) => {
  return (
    <Button
      className={`w-full h-12 ${selected ? 'bg-[#9b87f5] text-white' : 'bg-white hover:bg-violet-50'} border-1 border-gray-200 transition-all duration-200`}
      label={label}
      icon={icon}
      onClick={onClick}
      text={!selected}
      raised
    />
  );
};
