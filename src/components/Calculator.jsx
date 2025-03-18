
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { MatrixTable } from './MatrixTable';
import { ParameterSelector } from './ParameterSelector';
import { TarifSelector } from './TarifSelector';
import { OperatorButton } from './OperatorButton';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const EXAMPLE_FORMULAS = [
  { description: "si le volume est supérieur à 100", formula: "{P:VolumePrestation} > 100" },
  { description: "si le poids est inférieur à 50kg", formula: "{P:PoidsPrestation} < 50" },
  { description: "si le prix est entre 100 et 200", formula: "{P:PrixPrestation} >= 100 AND {P:PrixPrestation} <= 200" },
  { description: "volume multiplié par 2", formula: "{P:VolumePrestation} × 2" },
  { description: "poids divisé par 100", formula: "{P:PoidsPrestation} ÷ 100" },
];

export const Calculator = () => {
  const [activeSelector, setActiveSelector] = useState('none');
  const [formula, setFormula] = useState('');
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [mode, setMode] = useState('logique');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const toast = useRef(null);

  const toggleSelector = (selector) => {
    setActiveSelector(current => current === selector ? 'none' : selector);
  };

  const updateFormula = (newFormula) => {
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
      toast.current.show({
        severity: 'success',
        summary: 'Formule enregistrée',
        detail: 'La formule a été sauvegardée avec succès.',
        life: 3000
      });
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'La formule est vide',
        life: 3000
      });
    }
  };

  const handleFormulaSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Simulate API call for now
      setTimeout(() => {
        const suggestedFormula = EXAMPLE_FORMULAS.find(
          ef => ef.description.toLowerCase().includes(searchQuery.toLowerCase())
        )?.formula || '';
        
        if (suggestedFormula) {
          updateFormula(suggestedFormula);
          toast.current.show({
            severity: 'info',
            summary: 'Formule suggérée',
            detail: 'La formule a été mise à jour selon votre description.',
            life: 3000
          });
        } else {
          toast.current.show({
            severity: 'warn',
            summary: 'Aucune suggestion',
            detail: 'Aucune formule ne correspond à votre description.',
            life: 3000
          });
        }
        setIsSearching(false);
      }, 1000);
    } catch (error) {
      console.error('Error searching formula:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de générer une suggestion pour le moment.',
        life: 3000
      });
      setIsSearching(false);
    }
  };

  return (
    <div className="h-screen flex items-start gap-6 p-6">
      <Toast ref={toast} />
      <div className="w-[500px] space-y-6 animate-fadeIn">
        {/* Mode selector */}
        <div className="flex gap-2">
          <Button 
            label="Composition condition logique"
            severity={mode === 'logique' ? 'secondary' : 'info'}
            onClick={() => setMode('logique')}
            className="flex-1"
            outlined={mode !== 'logique'}
          />
          <Button 
            label="Composition formule"
            severity={mode === 'formule' ? 'secondary' : 'info'}
            onClick={() => setMode('formule')}
            className="flex-1"
            outlined={mode !== 'formule'}
          />
        </div>

        {/* Recherche de formule par IA */}
        <Card className="p-4 bg-white/90 border-1 border-gray-100 shadow-1">
          <div className="flex gap-2">
            <InputTextarea
              placeholder="Décrivez votre formule en mots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-h-[100px]"
              rows={5}
              autoResize
            />
            <Button 
              onClick={handleFormulaSearch}
              disabled={isSearching}
              severity="info"
              className="h-fit align-self-start"
              icon="pi pi-search"
              label={isSearching ? "Recherche..." : "Suggérer"}
            />
          </div>
        </Card>

        {/* Formule */}
        <Card className="bg-white/90 border-1 border-gray-100 shadow-1">
          <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                {mode === 'logique' ? 'Condition logique' : 'Formule'}
              </h3>
              <div className="flex gap-2">
                <Button 
                  icon="pi pi-undo"
                  severity="secondary" 
                  text
                  onClick={handleUndo}
                  disabled={currentIndex <= 0}
                  className="p-button-rounded"
                />
                <Button 
                  icon="pi pi-redo"
                  severity="secondary" 
                  text
                  onClick={handleRedo}
                  disabled={currentIndex >= history.length - 1}
                  className="p-button-rounded"
                />
                <Button 
                  icon="pi pi-save"
                  label="Enregistrer"
                  severity="info"
                  onClick={handleSave}
                  outlined
                />
              </div>
            </div>
            <div className="text-2xl font-mono break-all text-violet-600 min-h-[60px] p-2">
              {formula || 'Utilisez les opérateurs pour construire votre formule'}
            </div>
          </div>
        </Card>

        {/* Calculatrice */}
        <Card className="p-4 bg-white/90 border-1 border-gray-100 shadow-1">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <div className="grid grid-flow-col gap-4">
                {/* Opérateurs arithmétiques */}
                <div className="grid grid-rows-4 gap-2">
                  <OperatorButton icon="pi pi-plus" label="+" onClick={() => updateFormula(formula + '+')} />
                  <OperatorButton icon="pi pi-minus" label="-" onClick={() => updateFormula(formula + '-')} />
                  <OperatorButton icon="pi pi-times" label="×" onClick={() => updateFormula(formula + '×')} />
                  <OperatorButton icon="pi pi-percentage" label="÷" onClick={() => updateFormula(formula + '÷')} />
                </div>

                {/* Opérateurs de comparaison et logiques (uniquement en mode logique) */}
                {mode === 'logique' && (
                  <div className="grid grid-rows-4 gap-2">
                    <OperatorButton label="<=" onClick={() => updateFormula(formula + '<=')} />
                    <OperatorButton label=">=" onClick={() => updateFormula(formula + '>=')} />
                    <OperatorButton label="<>" onClick={() => updateFormula(formula + '<>')} />
                    <OperatorButton label="=" onClick={() => updateFormula(formula + '=')} />
                  </div>
                )}

                {/* Opérateurs de comparaison supplémentaires pour le mode logique */}
                {mode === 'logique' && (
                  <div className="grid grid-rows-4 gap-2">
                    <OperatorButton label="<" onClick={() => updateFormula(formula + '<')} />
                    <OperatorButton label=">" onClick={() => updateFormula(formula + '>')} />
                    <OperatorButton label="AND" onClick={() => updateFormula(formula + ' AND ')} />
                    <OperatorButton label="OR" onClick={() => updateFormula(formula + ' OR ')} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button 
                  label="Paramètre"
                  severity="info"
                  onClick={() => toggleSelector('parameter')}
                  outlined={activeSelector !== 'parameter'}
                  className="hover:bg-violet-50 transition-colors"
                />
                <Button 
                  label="Matrice"
                  severity="info"
                  onClick={() => toggleSelector('matrix')}
                  outlined={activeSelector !== 'matrix'}
                  className="hover:bg-violet-50 transition-colors"
                />
                <Button 
                  label="Tarif"
                  severity="info"
                  onClick={() => toggleSelector('tarif')}
                  outlined={activeSelector !== 'tarif'}
                  className="hover:bg-violet-50 transition-colors"
                />
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
