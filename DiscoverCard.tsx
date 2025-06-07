
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface DiscoverCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  navigateTo?: string;
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  onClick,
  navigateTo,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <Card
      className={cn("cursor-pointer hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm border-wallet-blue/30 hover:border-wallet-blue/60", className)}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default DiscoverCard;
