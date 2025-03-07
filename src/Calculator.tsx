import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { MatrixTable } from './MatrixTable';
import { ParameterSelector } from './ParameterSelector';
import { TarifSelector } from './TarifSelector';
import { OperatorButton } from './OperatorButton';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

type CompositionMode = 'logique' | 'formule';
type SelectorType = 'none' | 'parameter' | 'matrix' | 'tarif';

const EXAMPLE_FORMULAS = [
  { description: "si le volume est supérieur à 100", formula: "{P:VolumePrestation} > 100" },
  { description: "si le poids est inférieur à 50kg", formula: "{P:PoidsPrestation} < 50" },
  { description: "si le prix est entre 100 et 200", formula: "{P:PrixPrestation} >= 100 AND {P:PrixPrestation} <= 200" },
  { description: "volume multiplié par 2", formula: "{P:VolumePrestation} × 2" },
  { description: "poids divisé par 100", formula: "{P:PoidsPrestation} ÷ 100" },
];

export const Calculator = () => {
  const [activeSelector, setActiveSelector] = useState<SelectorType>('none');
  const [formula, setFormula] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [mode, setMode] = useState<CompositionMode>('logique');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const toast = useRef<Toast>(null);

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
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Formule enregistrée', life: 3000 });
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'La formule est vide', life: 3000 });
    }
  };

  const handleFormulaSearch = () => {
    // Placeholder for formula search logic
  };

  return (
    <div className="h-screen flex items-start gap-6 p-6">
      <div className="w-[500px] space-y-6">
        {/* Mode selector */}
        <div className="flex gap-2">
          <Button 
            severity={mode === 'logique' ? 'primary' : 'secondary'}
            onClick={() => setMode('logique')}
            className="flex-1"
            label="Composition condition logique"
          />
          <Button 
            severity={mode === 'formule' ? 'primary' : 'secondary'}
            onClick={() => setMode('formule')}
            className="flex-1"
            label="Composition formule"
          />
        </div>

        {/* Recherche de formule par IA */}
        <Card className="shadow-1">
          <div className="flex gap-2">
            <InputTextarea
              placeholder="Décrivez votre formule en mots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-h-[100px]"
              autoResize
            />
            <Button 
              onClick={handleFormulaSearch}
              disabled={isSearching}
              severity="info"
              icon="pi pi-search"
              label={isSearching ? "Recherche..." : "Suggérer"}
            />
          </div>
        </Card>

        {/* Formule */}
        <Card className="shadow-1">
          <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                {mode === 'logique' ? 'Condition logique' : 'Formule'}
              </h3>
              <div className="flex gap-2">
                <Button 
                  icon="pi pi-undo"
                  onClick={handleUndo}
                  disabled={currentIndex <= 0}
                  severity="secondary"
                  text
                />
                <Button 
                  icon="pi pi-redo"
                  onClick={handleRedo}
                  disabled={currentIndex >= history.length - 1}
                  severity="secondary"
                  text
                />
                <Button 
                  icon="pi pi-save"
                  onClick={handleSave}
                  severity="secondary"
                  label="Enregistrer"
                />
              </div>
            </div>
            <div className="text-2xl font-mono break-all text-primary min-h-[60px] p-2">
              {formula || 'Utilisez les opérateurs pour construire votre formule'}
            </div>
          </div>
        </Card>

        {/* Calculatrice */}
        <Card className="shadow-1">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <div className="grid grid-flow-col gap-4">
                {/* Opérateurs arithmétiques */}
                <div className="grid grid-rows-4 gap-2">
                  <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '+')} label="+" />
                  <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '-')} label="-" />
                  <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '×')} label="×" />
                  <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '÷')} label="÷" />
                </div>

                {/* Opérateurs de comparaison et logiques */}
                {mode === 'logique' && (
                  <div className="grid grid-rows-4 gap-2">
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '<=')} label="<=" />
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '>=')} label=">=" />
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '<>')} label="<>" />
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '=')} label="=" />
                  </div>
                )}

                {mode === 'logique' && (
                  <div className="grid grid-rows-4 gap-2">
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '<')} label="<" />
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + '>')} label=">" />
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + ' AND ')} label="AND" />
                    <Button severity="secondary" className="p-button-outlined" onClick={() => updateFormula(formula + ' OR ')} label="OR" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button 
                  severity={activeSelector === 'parameter' ? 'primary' : 'secondary'}
                  className="p-button-outlined"
                  onClick={() => toggleSelector('parameter')}
                  label="Paramètre"
                />
                <Button 
                  severity={activeSelector === 'matrix' ? 'primary' : 'secondary'}
                  className="p-button-outlined"
                  onClick={() => toggleSelector('matrix')}
                  label="Matrice"
                />
                <Button 
                  severity={activeSelector === 'tarif' ? 'primary' : 'secondary'}
                  className="p-button-outlined"
                  onClick={() => toggleSelector('tarif')}
                  label="Tarif"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Zone de sélection (à droite) */}
      <div className="flex-1 flex items-end">
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

      <Toast ref={toast} />
    </div>
  );
};
