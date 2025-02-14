
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MatrixTable } from './MatrixTable';
import { ParameterSelector } from './ParameterSelector';
import { OperatorButton } from './OperatorButton';
import { Plus, Minus, Divide, X } from 'lucide-react';

export const Calculator = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 animate-fadeIn">
      <Card className="p-6 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculatrice de Prix</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input 
                type="number" 
                placeholder="Valeur" 
                className="text-lg"
              />
              <Button 
                variant="outline"
                className="hover:bg-violet-50 transition-colors"
                onClick={() => setShowParameters(true)}
              >
                Paramètre
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <OperatorButton icon={Plus} label="Addition" />
              <OperatorButton icon={Minus} label="Soustraction" />
              <OperatorButton icon={X} label="Multiplication" />
              <OperatorButton icon={Divide} label="Division" />
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button 
                variant="outline"
                className="w-full hover:bg-violet-50 transition-colors"
                onClick={() => setShowMatrix(true)}
              >
                Voir la Matrice
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Résultat</h3>
            <div className="text-3xl font-semibold text-violet-600">0.00</div>
          </div>
        </div>
      </Card>

      {showMatrix && (
        <MatrixTable onClose={() => setShowMatrix(false)} />
      )}

      {showParameters && (
        <ParameterSelector onClose={() => setShowParameters(false)} />
      )}
    </div>
  );
};
