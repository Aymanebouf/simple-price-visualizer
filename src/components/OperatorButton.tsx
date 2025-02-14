
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface OperatorButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export const OperatorButton = ({ icon: Icon, label, onClick }: OperatorButtonProps) => {
  return (
    <Button
      variant="ghost"
      className="w-full h-12 bg-white hover:bg-violet-50 border border-gray-200 transition-all duration-200 ease-in-out"
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </Button>
  );
};
