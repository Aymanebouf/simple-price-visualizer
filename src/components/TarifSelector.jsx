
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const TarifSelector = ({ onClose }) => {
  const tarifs = [
    { code: 'Tarif7884', prestation: 'Vente: déballage des meubles uniquement', etat: 'Returned to Store', formuleCondition: '{P:PoidsPrestation} > {V:100}' },
    { code: 'Tarif8849', prestation: 'Vente: Ausfall Lieferung LCD', etat: 'ANNULEAVANTLIVRAISON', formuleCondition: 'N/A' },
    { code: 'TestTa', prestation: 'Vente: Autre', etat: 'Reporte', formuleCondition: 'N/A' },
  ];

  const header = (
    <div className="flex justify-content-between align-items-center bg-violet-600 -mx-4 -mt-4 p-4 text-white">
      <h3 className="text-xl font-semibold">Sélection Tarif</h3>
      <Button icon="pi pi-times" onClick={onClose} text className="text-white hover:bg-violet-700" />
    </div>
  );

  return (
    <Card className="p-4 bg-white/95 backdrop-blur-sm animate-slideIn" header={header}>
      <div className="flex gap-4 mb-6">
        <InputText type="text" placeholder="Recherche..." className="flex-1" />
        <Button label="Clear" outlined />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Code</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Prestation</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">État</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Formule condition</th>
            </tr>
          </thead>
          <tbody>
            {tarifs.map((tarif) => (
              <tr 
                key={tarif.code}
                className="border-top-1 border-gray-100 hover:bg-violet-50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-gray-700">{tarif.code}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{tarif.prestation}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{tarif.etat}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{tarif.formuleCondition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
