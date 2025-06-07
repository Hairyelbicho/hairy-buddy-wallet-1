
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

const ActionButton = ({ icon: Icon, label, onClick, className }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "wallet-button flex flex-col items-center justify-center min-w-[100px] py-4",
        className
      )}
    >
      <Icon className="mb-2" size={24} />
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
