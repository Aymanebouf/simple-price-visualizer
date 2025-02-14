
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatrixTable } from './MatrixTable';
import { ParameterSelector } from './ParameterSelector';
import { TarifSelector } from './TarifSelector';
import { OperatorButton } from './OperatorButton';
import { Plus, Minus, Divide, X, ChevronRight, ChevronLeft, Undo, Redo } from 'lucide-react';

export const Calculator = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [showTarif, setShowTarif] = useState(false);
  const [formula, setFormula] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const updateFormula = (newFormula: string) => {
    setHistory(prev => [...prev.slice(0, currentIndex + 1), newFormula]);
    setCurrentIndex(prev => prev + 1);
    setFormula(newFormula);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setFormula(history[currentIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFormula(history[currentIndex + 1]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6 animate-fadeIn">
      {/* Formule */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
        <div className="bg-gray-50 p-4 rounded-lg min-h-[80px]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-700">Formule</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleUndo}
                disabled={currentIndex <= 0}
                className="h-8 w-8 hover:bg-violet-50"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRedo}
                disabled={currentIndex >= history.length - 1}
                className="h-8 w-8 hover:bg-violet-50"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-lg font-mono break-all text-violet-600">
            {formula || 'Utilisez les opérateurs pour construire votre formule'}
          </div>
        </div>
      </Card>

      {/* Calculatrice */}
      <Card className="p-4 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <OperatorButton icon={Plus} label="+" onClick={() => updateFormula(formula + '+')} />
            <OperatorButton icon={Minus} label="-" onClick={() => updateFormula(formula + '-')} />
            <OperatorButton icon={X} label="×" onClick={() => updateFormula(formula + '×')} />
            <OperatorButton icon={Divide} label="÷" onClick={() => updateFormula(formula + '÷')} />
            <OperatorButton icon={ChevronLeft} label="<" onClick={() => updateFormula(formula + '<')} />
            <OperatorButton icon={ChevronRight} label=">" onClick={() => updateFormula(formula + '>')} />
            <Button 
              variant="ghost" 
              className="h-10 bg-white hover:bg-violet-50 border border-gray-200"
              onClick={() => updateFormula(formula + '<=')}
            >
              {"<="}
            </Button>
            <Button 
              variant="ghost" 
              className="h-10 bg-white hover:bg-violet-50 border border-gray-200"
              onClick={() => updateFormula(formula + '>=')}
            >
              {">="}
            </Button>
            <Button 
              variant="ghost" 
              className="h-10 bg-white hover:bg-violet-50 border border-gray-200"
              onClick={() => updateFormula(formula + '<>')}
            >
              {"<>"}
            </Button>
            <Button 
              variant="ghost" 
              className="h-10 bg-white hover:bg-violet-50 border border-gray-200"
              onClick={() => updateFormula(formula + ' AND ')}
            >
              AND
            </Button>
            <Button 
              variant="ghost" 
              className="h-10 bg-white hover:bg-violet-50 border border-gray-200"
              onClick={() => updateFormula(formula + ' OR ')}
            >
              OR
            </Button>
            <Button 
              variant="ghost" 
              className="h-10 bg-white hover:bg-violet-50 border border-gray-200"
              onClick={() => updateFormula(formula + '=')}
            >
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
