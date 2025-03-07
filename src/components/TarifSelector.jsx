
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const TarifSelector = ({ onClose }) => {
  const tarifs = [
    { code: 'Tarif7884', prestation: 'Vente: déballage des meubles uniquement', etat: 'Returned to Store', formuleCondition: '{P:PoidsPrestation} > {V:100}' },
    { code: 'Tarif8849', prestation: 'Vente: Ausfall Lieferung LCD', etat: 'ANNULEAVANTLIVRAISON', formuleCondition: 'N/A' },
    { code: 'TestTa', prestation: 'Vente: Autre', etat: 'Reporte', formuleCondition: 'N/A' },
  ];

  return (
    <Card className="w-full shadow-1">
      <div className="flex justify-between items-center mb-6 bg-primary p-4 -mx-4 -mt-4">
        <h3 className="text-xl font-semibold text-white">Sélection Tarif</h3>
        <Button icon="pi pi-times" onClick={onClose} text severity="secondary" className="text-white" />
      </div>

      <div className="flex gap-4 mb-4">
        <span className="p-input-icon-left flex-1">
          <i className="pi pi-search" />
          <InputText placeholder="Recherche..." className="w-full" />
        </span>
        <Button label="Clear" severity="secondary" outlined />
      </div>

      <DataTable value={tarifs} className="p-datatable-sm" responsiveLayout="scroll">
        <Column field="code" header="Code" sortable />
        <Column field="prestation" header="Prestation" sortable />
        <Column field="etat" header="État" sortable />
        <Column field="formuleCondition" header="Formule condition" sortable />
      </DataTable>
    </Card>
  );
};
