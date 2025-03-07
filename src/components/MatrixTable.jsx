
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const MatrixTable = ({ onClose }) => {
  const matrixData = [
    { code: 'MAT001', description: 'Prix standard', dimension: 1, fieldName: 'Prix prestation', unit: 'CHF' },
    { code: 'MAT002', description: 'Volume', dimension: 2, fieldName: 'Volume prestation', unit: 'm³' },
  ];

  return (
    <Card className="w-full shadow-1">
      <div className="flex justify-between items-center mb-6 bg-primary p-4 -mx-4 -mt-4">
        <h3 className="text-xl font-semibold text-white">Sélection Matrice</h3>
        <Button icon="pi pi-times" onClick={onClose} text severity="secondary" className="text-white" />
      </div>

      <div className="mb-4">
        <span className="p-input-icon-left w-full">
          <i className="pi pi-search" />
          <InputText placeholder="Rechercher..." className="w-full" />
        </span>
      </div>

      <DataTable value={matrixData} className="p-datatable-sm" responsiveLayout="scroll">
        <Column field="code" header="Code" sortable />
        <Column field="description" header="Description" sortable />
        <Column field="dimension" header="Dimension" sortable />
        <Column field="fieldName" header="Nom du champ" sortable />
        <Column field="unit" header="Unité" sortable />
      </DataTable>
    </Card>
  );
};
