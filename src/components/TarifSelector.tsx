
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TarifSelectorProps {
  onClose: () => void;
}

export const TarifSelector = ({ onClose }: TarifSelectorProps) => {
  const tarifs = [
    { code: 'Tarif7884', prestation: 'Vente: déballage des meubles uniquement', etat: 'Returned to Store', formuleCondition: '{P:PoidsPrestation} > {V:100}' },
    { code: 'Tarif8849', prestation: 'Vente: Ausfall Lieferung LCD', etat: 'ANNULEAVANTLIVRAISON', formuleCondition: 'N/A' },
    { code: 'TestTa', prestation: 'Vente: Autre', etat: 'Reporte', formuleCondition: 'N/A' },
  ];

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm animate-slideIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Sélection Tarif</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input type="text" placeholder="Recherche..." className="flex-1" />
        <Button variant="outline">Clear</Button>
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
                className="border-t border-gray-100 hover:bg-violet-50 transition-colors cursor-pointer"
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
