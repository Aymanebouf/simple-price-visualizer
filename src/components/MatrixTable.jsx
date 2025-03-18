
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const MatrixTable = ({ onClose }) => {
  const matrixData = [
    { code: 'MAT001', description: 'Prix standard', dimension: 1, fieldName: 'Prix prestation', unit: 'CHF' },
    { code: 'MAT002', description: 'Volume', dimension: 2, fieldName: 'Volume prestation', unit: 'm³' },
  ];

  const header = (
    <div className="flex justify-content-between align-items-center bg-violet-600 -mx-4 -mt-4 p-4 text-white">
      <h3 className="text-xl font-semibold">Sélection Matrice</h3>
      <Button icon="pi pi-times" onClick={onClose} text className="text-white hover:bg-violet-700" />
    </div>
  );

  return (
    <Card className="p-4 bg-white/95 backdrop-blur-sm animate-slideIn" header={header}>
      <div className="mb-4">
        <InputText type="text" placeholder="Rechercher..." className="w-full" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Code</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Dimension</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nom du champ</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Unité</th>
            </tr>
          </thead>
          <tbody>
            {matrixData.map((item) => (
              <tr 
                key={item.code}
                className="border-top-1 border-gray-100 hover:bg-violet-50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-gray-700">{item.code}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.description}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.dimension}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.fieldName}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
