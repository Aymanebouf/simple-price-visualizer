
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatrixTable } from './MatrixTable';
import { ParameterSelector } from './ParameterSelector';
import { TarifSelector } from './TarifSelector';
import { OperatorButton } from './OperatorButton';
import { Plus, Minus, Divide, X, ChevronRight, ChevronLeft } from 'lucide-react';

export const Calculator = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [showTarif, setShowTarif] = useState(false);
  const [formula, setFormula] = useState('');

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6 animate-fadeIn">
      {/* Formule */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
        <div className="bg-gray-50 p-4 rounded-lg min-h-[80px]">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Formule</h3>
          <div className="text-lg font-mono break-all text-violet-600">
            {formula || 'Utilisez les opérateurs pour construire votre formule'}
          </div>
        </div>
      </Card>

      {/* Calculatrice */}
      <Card className="p-4 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <OperatorButton icon={Plus} label="+" />
            <OperatorButton icon={Minus} label="-" />
            <OperatorButton icon={X} label="×" />
            <OperatorButton icon={Divide} label="÷" />
            <OperatorButton icon={ChevronLeft} label="<" />
            <OperatorButton icon={ChevronRight} label=">" />
            <Button variant="ghost" className="h-10 bg-white hover:bg-violet-50 border border-gray-200">
              {"<="}
            </Button>
            <Button variant="ghost" className="h-10 bg-white hover:bg-violet-50 border border-gray-200">
              {">="}
            </Button>
            <Button variant="ghost" className="h-10 bg-white hover:bg-violet-50 border border-gray-200">
              {"<>"}
            </Button>
            <Button variant="ghost" className="h-10 bg-white hover:bg-violet-50 border border-gray-200">
              AND
            </Button>
            <Button variant="ghost" className="h-10 bg-white hover:bg-violet-50 border border-gray-200">
              OR
            </Button>
            <Button variant="ghost" className="h-10 bg-white hover:bg-violet-50 border border-gray-200">
              {"="}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline"
              className="hover:bg-violet-50 transition-colors"
              onClick={() => setShowParameters(true)}
            >
              Paramètre
            </Button>
            <Button 
              variant="outline"
              className="hover:bg-violet-50 transition-colors"
              onClick={() => setShowMatrix(true)}
            >
              Matrice
            </Button>
            <Button 
              variant="outline"
              className="hover:bg-violet-50 transition-colors"
              onClick={() => setShowTarif(true)}
            >
              Tarif
            </Button>
          </div>
        </div>
      </Card>

      {showMatrix && (
        <MatrixTable onClose={() => setShowMatrix(false)} />
      )}

      {showParameters && (
        <ParameterSelector onClose={() => setShowParameters(false)} />
      )}

      {showTarif && (
        <TarifSelector onClose={() => setShowTarif(false)} />
      )}
    </div>
  );
};
