
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PatternLockProps {
  isSetup: boolean;
  onSuccess: () => void;
}

interface Point {
  row: number;
  col: number;
  id: number;
}

const PatternLock = ({ isSetup, onSuccess }: PatternLockProps) => {
  const [pattern, setPattern] = useState<Point[]>([]);
  const [confirmPattern, setConfirmPattern] = useState<Point[]>([]);
  const [step, setStep] = useState(isSetup ? "create" : "verify");
  const [isDrawing, setIsDrawing] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [savedPattern, setSavedPattern] = useState<string | null>(null);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Generate 3x3 grid of points
  const points: Point[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      points.push({ row, col, id: row * 3 + col });
    }
  }
  
  useEffect(() => {
    const storedPattern = localStorage.getItem("hairy-wallet-pattern");
    setSavedPattern(storedPattern);
  }, []);
  
  const getPointPosition = (point: Point) => {
    const gridSize = gridRef.current?.getBoundingClientRect();
    if (!gridSize) return { x: 0, y: 0 };
    
    const cellSize = gridSize.width / 3;
    const x = point.col * cellSize + cellSize / 2;
    const y = point.row * cellSize + cellSize / 2;
    
    return { x, y };
  };
  
  const findPointByPosition = (x: number, y: number): Point | undefined => {
    const gridSize = gridRef.current?.getBoundingClientRect();
    if (!gridSize) return undefined;
    
    const cellSize = gridSize.width / 3;
    const col = Math.floor((x - gridSize.left) / cellSize);
    const row = Math.floor((y - gridSize.top) / cellSize);
    
    if (row < 0 || row > 2 || col < 0 || col > 2) return undefined;
    
    const pointId = row * 3 + col;
    return points.find(p => p.id === pointId);
  };
  
  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setPattern([]);
    
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
    
    const point = findPointByPosition(clientX, clientY);
    if (point) {
      setPattern([point]);
    }
  };
  
  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
    
    const point = findPointByPosition(clientX, clientY);
    if (point && !pattern.some(p => p.id === point.id)) {
      setPattern(prev => [...prev, point]);
    }
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
    
    // Validate pattern has at least 4 points
    if (pattern.length < 4) {
      if (step === "create" || step === "confirm") {
        toast.error("El patrón debe conectar al menos 4 puntos");
        setPattern([]);
        return;
      }
    }
    
    if (step === "create" && isSetup) {
      setStep("confirm");
      return;
    }
    
    if (step === "confirm" && isSetup) {
      const currentPattern = JSON.stringify(pattern.map(p => p.id));
      const previousPattern = JSON.stringify(confirmPattern.map(p => p.id));
      
      if (currentPattern !== previousPattern) {
        toast.error("Los patrones no coinciden. Inténtalo de nuevo.");
        setPattern([]);
        setConfirmPattern([]);
        setStep("create");
        return;
      }
      
      localStorage.setItem("hairy-wallet-pattern", currentPattern);
      toast.success("Patrón configurado correctamente");
      onSuccess();
      return;
    }
    
    // Verify existing pattern
    if (!isSetup) {
      const currentPattern = JSON.stringify(pattern.map(p => p.id));
      
      if (currentPattern === savedPattern) {
        toast.success("Patrón correcto");
        onSuccess();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          toast.error("Demasiados intentos fallidos. Prueba otra forma de acceso.");
        } else {
          toast.error(`Patrón incorrecto. Intentos restantes: ${3 - newAttempts}`);
        }
        
        setPattern([]);
      }
    }
  };
  
  const handleResetPattern = () => {
    localStorage.removeItem("hairy-wallet-pattern");
    window.location.reload();
  };
  
  // Create SVG path for the pattern
  const createSvgPath = () => {
    if (pattern.length < 1) return "";
    
    return pattern.map((point, index) => {
      const { x, y } = getPointPosition(point);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };
  
  useEffect(() => {
    if (step === "confirm" && pattern.length > 0) {
      setConfirmPattern(pattern);
    }
  }, [step, pattern]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="bg-wallet-blue/10 rounded-full p-3 mb-4">
        <svg className="h-6 w-6 text-wallet-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-medium mb-1">
        {isSetup 
          ? (step === "create" ? "Crea tu patrón" : "Confirma tu patrón") 
          : "Introduce tu patrón"}
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        {isSetup 
          ? "Conecta al menos 4 puntos para crear un patrón seguro"
          : "Dibuja tu patrón de desbloqueo"}
      </p>
      
      <div 
        ref={gridRef}
        className="relative w-64 h-64 mb-6 touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {/* SVG for lines */}
        <svg 
          ref={svgRef}
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
        >
          <path 
            d={createSvgPath()} 
            fill="none" 
            stroke="hsl(var(--wallet-blue))" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Grid points */}
        <div className="grid grid-cols-3 h-full w-full">
          {points.map((point) => (
            <div 
              key={point.id} 
              className="flex items-center justify-center"
            >
              <div 
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  pattern.some(p => p.id === point.id)
                    ? "bg-wallet-blue border-wallet-blue scale-125"
                    : "bg-transparent border-gray-400"
                )}
              />
            </div>
          ))}
        </div>
      </div>
      
      {!isSetup && (
        <button 
          onClick={handleResetPattern}
          className="mt-2 text-sm text-muted-foreground underline"
        >
          He olvidado mi patrón
        </button>
      )}
    </div>
  );
};

export default PatternLock;
