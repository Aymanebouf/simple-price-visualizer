
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export const ParameterSelector = ({ onClose }) => {
  const parameters = [
    { name: 'VolumePrestation', unit: 'm³', description: 'Volume des packages liés au prestation' },
    { name: 'PoidsPrestation', unit: 'kg', description: 'Poids des packages liés au prestation' },
    { name: 'PrixPrestation', unit: 'CHF', description: 'Prix de la prestation' },
  ];

  return (
    <Card className="w-full shadow-1">
      <div className="flex justify-between items-center mb-6 bg-primary p-4 -mx-4 -mt-4">
        <h3 className="text-xl font-semibold text-white">Sélection Paramètre</h3>
        <Button icon="pi pi-times" onClick={onClose} text severity="secondary" className="text-white" />
      </div>

      <div className="grid gap-4">
        {parameters.map((param) => (
          <div
            key={param.name}
            className="p-4 border-1 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{param.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
              </div>
              <span className="text-sm font-medium text-primary">{param.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
