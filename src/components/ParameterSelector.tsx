
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ParameterSelectorProps {
  onClose: () => void;
}

export const ParameterSelector = ({ onClose }: ParameterSelectorProps) => {
  const parameters = [
    { name: 'VolumePrestation', unit: 'm³', description: 'Volume des packages liés au prestation' },
    { name: 'PoidsPrestation', unit: 'kg', description: 'Poids des packages liés au prestation' },
    { name: 'PrixPrestation', unit: 'CHF', description: 'Prix de la prestation' },
  ];

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm animate-slideIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Sélection Paramètre</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {parameters.map((param) => (
          <div
            key={param.name}
            className="p-4 border border-gray-100 rounded-lg hover:bg-violet-50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start">
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
