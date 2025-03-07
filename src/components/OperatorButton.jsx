
import { Button } from 'primereact/button';

export const OperatorButton = ({ icon, label, onClick }) => {
  return (
    <Button
      className="p-button-outlined w-full h-12 p-button-secondary"
      onClick={onClick}
      label={label}
    />
  );
};
