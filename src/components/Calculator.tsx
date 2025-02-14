
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatrixTable } from './MatrixTable';
import { ParameterSelector } from './ParameterSelector';
import { OperatorButton } from './OperatorButton';
import { Plus, Minus, Divide, X, Equal, GreaterThan, LessThan } from 'lucide-react';

export const Calculator = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [formula, setFormula] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 animate-fadeIn">
      <Card className="p-6 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Calculatrice de Prix</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <OperatorButton icon={Plus} label="+" />
              <OperatorButton icon={Minus} label="-" />
              <OperatorButton icon={X} label="×" />
              <OperatorButton icon={Divide} label="÷" />
              <OperatorButton icon={LessThan} label="<" />
              <OperatorButton icon={GreaterThan} label=">" />
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                {"<="}
              </Button>
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                {">="}
              </Button>
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                {"<>"}
              </Button>
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                AND
              </Button>
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                OR
              </Button>
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                {"="}
              </Button>
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                (
              </Button>
              <Button variant="ghost" className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200">
                )
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline"
                className="w-full hover:bg-violet-50 transition-colors"
                onClick={() => setShowParameters(true)}
              >
                Paramètre
              </Button>
              <Button 
                variant="outline"
                className="w-full hover:bg-violet-50 transition-colors"
                onClick={() => setShowMatrix(true)}
              >
                Matrice
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg min-h-[100px]">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Formule</h3>
              <div className="text-lg font-mono break-all text-violet-600">
                {formula || 'Utilisez les opérateurs pour construire votre formule'}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Résultat</h3>
              <div className="text-3xl font-semibold text-violet-600">0.00</div>
            </div>
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
