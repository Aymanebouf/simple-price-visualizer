
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export const ParameterSelector = ({ onClose }) => {
  const parameters = [
    { name: 'VolumePrestation', unit: 'm³', description: 'Volume des packages liés au prestation' },
    { name: 'PoidsPrestation', unit: 'kg', description: 'Poids des packages liés au prestation' },
    { name: 'PrixPrestation', unit: 'CHF', description: 'Prix de la prestation' },
  ];

  const header = (
    <div className="flex justify-content-between align-items-center bg-violet-600 -mx-4 -mt-4 p-4 text-white">
      <h3 className="text-xl font-semibold">Sélection Paramètre</h3>
      <Button icon="pi pi-times" onClick={onClose} text className="text-white hover:bg-violet-700" />
    </div>
  );

  return (
    <Card className="p-4 bg-white/95 backdrop-blur-sm animate-slideIn" header={header}>
      <div className="grid gap-4">
        {parameters.map((param) => (
          <div
            key={param.name}
            className="p-4 border-1 border-gray-100 border-round hover:bg-violet-50 transition-colors cursor-pointer"
          >
            <div className="flex justify-content-between align-items-start">
              <div>
                <h4 className="font-medium text-gray-800">{param.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
              </div>
              <span className="text-sm font-medium text-violet-600">{param.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
