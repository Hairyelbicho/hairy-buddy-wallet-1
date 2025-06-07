
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComposedChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, Line, Area, AreaChart, LineChart } from "recharts";
import { TrendingUp, TrendingDown, BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logoUrl: string;
}

interface CandlestickChartProps {
  asset: CryptoAsset;
}

type ChartType = "candlestick" | "heikin-ashi" | "line" | "area";
type TimeFrame = "1h" | "4h" | "1d" | "1w" | "1m";

// Función para calcular velas Heikin Ashi
const calculateHeikinAshi = (data: any[]) => {
  const heikinData = [];
  let prevHA = { open: 0, close: 0 };
  
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    
    if (i === 0) {
      // Primera vela: usar datos normales
      const haOpen = (current.open + current.close) / 2;
      const haClose = (current.open + current.high + current.low + current.close) / 4;
      const haHigh = Math.max(current.high, haOpen, haClose);
      const haLow = Math.min(current.low, haOpen, haClose);
      
      heikinData.push({
        ...current,
        open: haOpen,
        close: haClose,
        high: haHigh,
        low: haLow,
        candleBody: haClose - haOpen
      });
      
      prevHA = { open: haOpen, close: haClose };
    } else {
      // Velas siguientes: usar fórmula Heikin Ashi
      const haOpen = (prevHA.open + prevHA.close) / 2;
      const haClose = (current.open + current.high + current.low + current.close) / 4;
      const haHigh = Math.max(current.high, haOpen, haClose);
      const haLow = Math.min(current.low, haOpen, haClose);
      
      heikinData.push({
        ...current,
        open: haOpen,
        close: haClose,
        high: haHigh,
        low: haLow,
        candleBody: haClose - haOpen
      });
      
      prevHA = { open: haOpen, close: haClose };
    }
  }
  
  return heikinData;
};

// Generar datos simulados de velas para demostración
const generateCandlestickData = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const open = currentPrice;
    const close = open * (1 + variation);
    const high = Math.max(open, close) * (1 + Math.random() * 0.03);
    const low = Math.min(open, close) * (1 - Math.random() * 0.03);
    const volume = Math.random() * 1000000;
    
    data.push({
      time: `${String(i).padStart(2, '0')}:00`,
      open,
      high,
      low,
      close,
      volume,
      // Para el gráfico de barras, usamos la diferencia entre close y open
      candleBody: close - open,
      candleColor: close >= open ? 'green' : 'red'
    });
    
    currentPrice = close;
  }
  
  return data;
};

// Generar datos adicionales para métricas
const generateMarketData = (basePrice: number) => {
  const marketCap = basePrice * (Math.random() * 1000000000 + 100000000);
  const volume24h = Math.random() * 10000000 + 1000000;
  const circulatingSupply = Math.random() * 1000000000 + 100000000;
  const totalSupply = circulatingSupply * (1 + Math.random() * 0.5);
  const fdv = basePrice * totalSupply;
  
  return {
    marketCap,
    volume24h,
    circulatingSupply,
    totalSupply,
    fdv,
    dominance: Math.random() * 10,
    rank: Math.floor(Math.random() * 100) + 1
  };
};

const CustomCandlestick = (props: any) => {
  const { payload, x, y, width, height } = props;
  
  if (!payload) return null;
  
  const { open, high, low, close } = payload;
  const isGreen = close >= open;
  const color = isGreen ? '#10B981' : '#EF4444';
  
  // Calcular posiciones
  const bodyHeight = Math.abs(close - open) / (high - low) * height;
  const bodyY = y + ((high - Math.max(open, close)) / (high - low)) * height;
  
  // Línea de la mecha
  const wickX = x + width / 2;
  
  return (
    <g>
      {/* Mecha superior */}
      <line
        x1={wickX}
        y1={y}
        x2={wickX}
        y2={bodyY}
        stroke={color}
        strokeWidth={1}
      />
      {/* Cuerpo de la vela */}
      <rect
        x={x + width * 0.2}
        y={bodyY}
        width={width * 0.6}
        height={bodyHeight || 1}
        fill={isGreen ? color : 'transparent'}
        stroke={color}
        strokeWidth={isGreen ? 0 : 1}
      />
      {/* Mecha inferior */}
      <line
        x1={wickX}
        y1={bodyY + bodyHeight}
        x2={wickX}
        y2={y + height}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
};

const CandlestickChart = ({ asset }: CandlestickChartProps) => {
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1d");
  const [showVolume, setShowVolume] = useState(false);
  
  const rawData = generateCandlestickData(asset.price);
  const heikinData = calculateHeikinAshi(rawData);
  const data = chartType === "heikin-ashi" ? heikinData : rawData;
  const marketData = generateMarketData(asset.price);
  const isPositive = asset.change24h >= 0;
  
  const chartConfig = {
    candleBody: {
      label: "Precio",
      color: isPositive ? "#10B981" : "#EF4444",
    },
    volume: {
      label: "Volumen",
      color: "#6B7280",
    },
    close: {
      label: "Precio",
      color: isPositive ? "#10B981" : "#EF4444",
    },
  };

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 0.02 * dataMin', 'dataMax + 0.02 * dataMax']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickFormatter={formatPrice}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  className="bg-slate-800/95 backdrop-blur-sm border-slate-600"
                />
              }
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        );
      
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 0.02 * dataMin', 'dataMax + 0.02 * dataMax']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickFormatter={formatPrice}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  className="bg-slate-800/95 backdrop-blur-sm border-slate-600"
                />
              }
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              fill={`url(#colorGradient-${asset.id})`}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id={`colorGradient-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        );
      
      default: // candlestick or heikin-ashi
        return (
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 0.02 * dataMin', 'dataMax + 0.02 * dataMax']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9CA3AF' }}
              tickFormatter={formatPrice}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  className="bg-slate-800/95 backdrop-blur-sm border-slate-600"
                  formatter={(value, name, props) => {
                    if (name === 'candleBody') {
                      const { open, high, low, close } = props.payload;
                      return (
                        <div className="space-y-1">
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">Apertura:</span>
                            <span>{formatPrice(open)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">Máximo:</span>
                            <span className="text-green-400">{formatPrice(high)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">Mínimo:</span>
                            <span className="text-red-400">{formatPrice(low)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">Cierre:</span>
                            <span>{formatPrice(close)}</span>
                          </div>
                          {chartType === "heikin-ashi" && (
                            <div className="mt-2 pt-2 border-t border-gray-600">
                              <span className="text-xs text-gray-500">Heikin Ashi</span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              }
            />
            <Bar dataKey="candleBody" shape={CustomCandlestick} fill="transparent" />
            <Line
              type="monotone"
              dataKey="close"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth={1}
              dot={false}
              strokeOpacity={0.7}
            />
          </ComposedChart>
        );
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-wallet-blue/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <img 
              src={asset.logoUrl} 
              alt={asset.symbol} 
              className="w-4 h-4 mr-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20';
              }}
            />
            {asset.symbol}/USD
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-slate-700 rounded">
              #{marketData.rank}
            </span>
          </CardTitle>
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
          </div>
        </div>
        <div className="text-lg font-bold">
          {formatPrice(asset.price)}
        </div>
        
        {/* Controles del gráfico */}
        <div className="flex items-center justify-between mt-2 space-x-2">
          <ToggleGroup 
            type="single" 
            value={chartType} 
            onValueChange={(value) => value && setChartType(value as ChartType)}
            className="bg-slate-800/50 p-1 rounded-lg"
          >
            <ToggleGroupItem value="candlestick" size="sm">
              <BarChart3 size={14} className="mr-1" />
              <span className="hidden sm:inline">Velas</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="heikin-ashi" size="sm">
              <Activity size={14} className="mr-1" />
              <span className="hidden sm:inline">H-A</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="line" size="sm">
              <LineChartIcon size={14} className="mr-1" />
              <span className="hidden sm:inline">Línea</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="area" size="sm">
              <AreaChartIcon size={14} className="mr-1" />
              <span className="hidden sm:inline">Área</span>
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
            <SelectTrigger className="w-20 h-8 bg-slate-800/50 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1H</SelectItem>
              <SelectItem value="4h">4H</SelectItem>
              <SelectItem value="1d">1D</SelectItem>
              <SelectItem value="1w">1W</SelectItem>
              <SelectItem value="1m">1M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Métricas del mercado */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-700">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Market Cap</span>
              <span className="font-medium">{formatLargeNumber(marketData.marketCap)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Volumen 24h</span>
              <span className="font-medium">{formatLargeNumber(marketData.volume24h)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">FDV</span>
              <span className="font-medium">{formatLargeNumber(marketData.fdv)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Suministro Circ.</span>
              <span className="font-medium">{(marketData.circulatingSupply / 1e6).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Suministro Total</span>
              <span className="font-medium">{(marketData.totalSupply / 1e6).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Dominancia</span>
              <span className="font-medium">{marketData.dominance.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandlestickChart;
