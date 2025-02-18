
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MatrixTable } from './MatrixTable';
import { ParameterSelector } from './ParameterSelector';
import { TarifSelector } from './TarifSelector';
import { OperatorButton } from './OperatorButton';
import { Plus, Minus, Divide, X, ChevronRight, ChevronLeft, Undo, Redo, Save } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type CompositionMode = 'logique' | 'formule';
type SelectorType = 'none' | 'parameter' | 'matrix' | 'tarif';

export const Calculator = () => {
  const [activeSelector, setActiveSelector] = useState<SelectorType>('none');
  const [formula, setFormula] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [mode, setMode] = useState<CompositionMode>('logique');
  const { toast } = useToast();

  const toggleSelector = (selector: SelectorType) => {
    setActiveSelector(current => current === selector ? 'none' : selector);
  };

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

  const handleSave = () => {
    if (formula.trim()) {
      // Ici vous pouvez ajouter la logique pour sauvegarder la formule
      toast({
        title: "Formule enregistrée",
        description: "La formule a été sauvegardée avec succès.",
      });
    } else {
      toast({
        title: "Erreur",
        description: "La formule est vide",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex items-start gap-6 p-6">
      {/* Calculatrice (côté gauche) */}
      <div className="w-[500px] space-y-6 animate-fadeIn">
        {/* Mode selector */}
        <div className="flex gap-2">
          <Button 
            variant={mode === 'logique' ? 'default' : 'outline'}
            onClick={() => setMode('logique')}
            className="flex-1"
          >
            Composition condition logique
          </Button>
          <Button 
            variant={mode === 'formule' ? 'default' : 'outline'}
            onClick={() => setMode('formule')}
            className="flex-1"
          >
            Composition formule
          </Button>
        </div>

        {/* Formule */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
          <div className="bg-gray-50 p-4 rounded-lg min-h-[80px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-700">
                {mode === 'logique' ? 'Condition logique' : 'Formule'}
              </h3>
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
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="ml-2"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Enregistrer
                </Button>
              </div>
            </div>
            <div className="text-2xl font-mono break-all text-violet-600 min-h-[40px]">
              {formula || 'Utilisez les opérateurs pour construire votre formule'}
            </div>
          </div>
        </Card>

        {/* Calculatrice */}
        <Card className="p-4 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <div className="grid grid-flow-col gap-4">
                {/* Opérateurs arithmétiques */}
                <div className="grid grid-rows-4 gap-2">
                  <OperatorButton icon={Plus} label="+" onClick={() => updateFormula(formula + '+')} />
                  <OperatorButton icon={Minus} label="-" onClick={() => updateFormula(formula + '-')} />
                  <OperatorButton icon={X} label="×" onClick={() => updateFormula(formula + '×')} />
                  <OperatorButton icon={Divide} label="÷" onClick={() => updateFormula(formula + '÷')} />
                </div>

                {/* Opérateurs de comparaison et logiques (uniquement en mode logique) */}
                {mode === 'logique' && (
                  <div className="grid grid-rows-4 gap-2">
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
                      onClick={() => updateFormula(formula + '=')}
                    >
                      {"="}
                    </Button>
                  </div>
                )}

                {/* Opérateurs de comparaison supplémentaires pour le mode logique */}
                {mode === 'logique' && (
                  <div className="grid grid-rows-4 gap-2">
                    <OperatorButton icon={ChevronLeft} label="<" onClick={() => updateFormula(formula + '<')} />
                    <OperatorButton icon={ChevronRight} label=">" onClick={() => updateFormula(formula + '>')} />
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
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={activeSelector === 'parameter' ? 'default' : 'outline'}
                  className="hover:bg-violet-50 transition-colors"
                  onClick={() => toggleSelector('parameter')}
                >
                  Paramètre
                </Button>
                <Button 
                  variant={activeSelector === 'matrix' ? 'default' : 'outline'}
                  className="hover:bg-violet-50 transition-colors"
                  onClick={() => toggleSelector('matrix')}
                >
                  Matrice
                </Button>
                <Button 
                  variant={activeSelector === 'tarif' ? 'default' : 'outline'}
                  className="hover:bg-violet-50 transition-colors"
                  onClick={() => toggleSelector('tarif')}
                >
                  Tarif
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Zone de sélection (à droite) */}
      <div className="flex-1">
        {activeSelector === 'parameter' && (
          <ParameterSelector onClose={() => setActiveSelector('none')} />
        )}
        {activeSelector === 'matrix' && (
          <MatrixTable onClose={() => setActiveSelector('none')} />
        )}
        {activeSelector === 'tarif' && (
          <TarifSelector onClose={() => setActiveSelector('none')} />
        )}
      </div>
    </div>
  );
};
