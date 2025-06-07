import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, Send, RefreshCw, Cog, TrendingUp, ChartBar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const CryptoAIPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<{message: string, type: "user" | "ai", timestamp: Date}[]>([
    {
      message: "¡Hola! Soy tu asistente de trading de criptomonedas. Puedo ayudarte con análisis de mercado, estrategias de trading y responder tus preguntas sobre criptomonedas.",
      type: "ai",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [tradingBotActive, setTradingBotActive] = useState(false);
  const [botStrategy, setBotStrategy] = useState<"conservative" | "moderate" | "aggressive">("moderate");

  // Featured token - HBT (Hairy el Bicho Token)
  const haaryToken = {
    name: "Hairy el Bicho Token",
    symbol: "HBT",
    price: 0.0000621,
    change24h: 14.63,
    marketCap: 621000,
    volume24h: 72450,
    url: "https://birdeye.so/token/7XsGzgDScz4Tge9SJYUKWeet4KFUumfGb7cXT8Zzpump?chain=solana",
    logoUrl: "/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png"
  };

  // Simulated market insights that would normally come from an API
  const marketInsights = [
    {
      title: "Bitcoin (BTC)",
      symbol: "BTC",
      analysis: "Tendencia alcista con soporte fuerte en $60,000. Volumen de compra incrementando en las últimas 24h.",
      recommendation: "Considerar comprar en retrocesos.",
      url: "https://www.coingecko.com/es/monedas/bitcoin",
      chartUrl: "https://www.tradingview.com/chart/?symbol=BINANCE%3ABTCUSDT"
    },
    {
      title: "Ethereum (ETH)",
      symbol: "ETH",
      analysis: "Consolidación después de la actualización de la red. Indicadores técnicos muestran posible ruptura.",
      recommendation: "Mantener posiciones actuales.",
      url: "https://www.coingecko.com/es/monedas/ethereum",
      chartUrl: "https://www.tradingview.com/chart/?symbol=BINANCE%3AETHUSDT"
    },
    {
      title: "Solana (SOL)", 
      symbol: "SOL",
      analysis: "Volatilidad aumentando con mayor adopción institucional. Rompiendo resistencias clave.",
      recommendation: "Oportunidad de entrada en soportes.",
      url: "https://www.coingecko.com/es/monedas/solana",
      chartUrl: "https://www.tradingview.com/chart/?symbol=BINANCE%3ASOLUSDT"
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    // Add user message to chat
    const userMessage = {
      message: query,
      type: "user" as const,
      timestamp: new Date()
    };
    
    setResponses(prev => [...prev, userMessage]);
    setIsLoading(true);

    // In a real implementation, this would call an AI API
    // Simulating API call with timeout
    setTimeout(() => {
      let aiResponse;
      
      // Simple keyword matching for demo purposes
      if (query.toLowerCase().includes("bitcoin") || query.toLowerCase().includes("btc")) {
        aiResponse = "Bitcoin está mostrando señales técnicas positivas con un RSI de 58. El soporte a corto plazo está en $60,000 y la resistencia inmediata en $68,500. El volumen ha aumentado un 15% en las últimas 24 horas, lo que podría indicar un movimiento alcista.";
      } else if (query.toLowerCase().includes("ethereum") || query.toLowerCase().includes("eth")) {
        aiResponse = "Ethereum se está consolidando después de su actualización reciente. Los datos on-chain muestran un aumento en las direcciones activas, lo que históricamente ha precedido a subidas de precio. Considera posiciones de compra si baja a la zona de $3,200.";
      } else if (query.toLowerCase().includes("recomienda") || query.toLowerCase().includes("comprar")) {
        aiResponse = "Basado en el análisis técnico actual, los activos con mejor perfil riesgo/beneficio son Bitcoin y Solana. Considera diversificar tu portfolio con 60% en BTC, 30% en ETH y 10% en altcoins prometedoras como SOL o MATIC.";
      } else if (query.toLowerCase().includes("tendencia") || query.toLowerCase().includes("mercado")) {
        aiResponse = "El mercado está en una fase de acumulación con predominio alcista. Los indicadores de sentimiento muestran optimismo moderado. El índice de miedo y codicia está en 72 (codicia), lo que sugiere precaución a corto plazo pero oportunidades a medio plazo.";
      } else {
        aiResponse = "Gracias por tu pregunta. Para darte un análisis más preciso, necesitaría más información específica sobre qué criptomoneda te interesa o qué aspecto del mercado te gustaría analizar.";
      }

      setResponses(prev => [...prev, { 
        message: aiResponse,
        type: "ai",
        timestamp: new Date()
      }]);
      
      setIsLoading(false);
      setQuery("");
    }, 1500);
  };

  const handleRefreshInsights = () => {
    toast({
      title: "Actualizando datos",
      description: "Obteniendo los últimos análisis de mercado",
    });
    
    // In a real implementation, this would refresh data from an API
    setTimeout(() => {
      toast({
        title: "Análisis actualizado",
        description: "Datos de mercado actualizados correctamente",
      });
    }, 1500);
  };

  const handleOpenExchange = (insight: any, type: "info" | "chart") => {
    const url = type === "chart" ? insight.chartUrl : insight.url;
    window.open(url, "_blank");
    toast({
      title: `Abriendo ${type === "chart" ? "gráfico" : "información"} de ${insight.title}`,
      description: `Redirigiendo a ${type === "chart" ? "TradingView" : "CoinGecko"}...`
    });
  };

  const handleOpenToken = () => {
    window.open(haaryToken.url, "_blank");
    toast({
      title: `Abriendo detalles de ${haaryToken.name}`,
      description: "Redirigiendo a BirdEye...",
    });
  };

  const toggleTradingBot = () => {
    if (!tradingBotActive) {
      toast({
        title: "Trading Bot Activado",
        description: `Bot iniciado con estrategia ${botStrategy}`,
      });
    } else {
      toast({
        title: "Trading Bot Desactivado",
        description: "El bot ha detenido las operaciones automáticas",
      });
    }
    setTradingBotActive(!tradingBotActive);
  };

  const handleBotStrategyChange = (strategy: "conservative" | "moderate" | "aggressive") => {
    setBotStrategy(strategy);
    if (tradingBotActive) {
      toast({
        title: "Estrategia Actualizada",
        description: `Bot ahora operando con estrategia ${strategy}`,
      });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 pb-20 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold">Asistente IA de Trading</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefreshInsights}
          className="flex items-center gap-1"
        >
          <RefreshCw size={14} />
          <span>Actualizar</span>
        </Button>
      </div>
      
      {/* HBT Featured Token */}
      <div className="mb-6">
        <Card 
          className="bg-gradient-to-r from-wallet-navy via-[#9b87f5]/40 to-wallet-navy border-wallet-blue/30 hover:border-wallet-blue/60 cursor-pointer transition-all duration-300"
          onClick={handleOpenToken}
        >
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-4 bg-white/10 rounded-full flex items-center justify-center">
                <img 
                  src={haaryToken.logoUrl}
                  alt={haaryToken.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-lg">{haaryToken.name}</h3>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${haaryToken.change24h > 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                    {haaryToken.change24h > 0 ? "+" : ""}{haaryToken.change24h}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="text-lg font-medium">${haaryToken.price.toFixed(7)}</div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>MCap: ${haaryToken.marketCap.toLocaleString()}</span>
                    <span>Vol 24h: ${haaryToken.volume24h.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs opacity-70">Click para ver detalles en BirdEye</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Trading Bot Status Indicator */}
      <div className="mb-6 flex items-center justify-between p-3 bg-wallet-navy/50 rounded-lg border border-wallet-blue/20">
        <div className="flex items-center gap-2">
          <Bot size={20} className={tradingBotActive ? "text-green-500" : "text-muted-foreground"} />
          <span className="text-sm font-medium">Trading Bot</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${tradingBotActive ? "bg-green-500/20 text-green-500" : "bg-muted-foreground/20 text-muted-foreground"}`}>
            {tradingBotActive ? "Activo" : "Inactivo"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Estrategia: {botStrategy}</span>
          <Switch 
            checked={tradingBotActive} 
            onCheckedChange={toggleTradingBot} 
          />
        </div>
      </div>
      
      {/* Market Insights Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Análisis de Mercado - Hoy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketInsights.map((insight, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-wallet-blue/20 hover:border-wallet-blue/50 transition-colors cursor-pointer group">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between items-center">
                  <span>{insight.title}</span>
                  <div className="space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleOpenExchange(insight, "info")}
                    >
                      <TrendingUp size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleOpenExchange(insight, "chart")}
                    >
                      <ChartBar size={14} />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent 
                className="space-y-2"
                onClick={() => handleOpenExchange(insight, "info")}
              >
                <p className="text-sm text-muted-foreground">{insight.analysis}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Recomendación:</span>
                  <span className="text-xs text-emerald-500">{insight.recommendation}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Tabs for Chat and Trading Bot */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-2 mb-2">
          <TabsTrigger value="chat">Asistente IA</TabsTrigger>
          <TabsTrigger value="bot">Bot de Trading</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="pt-2">
          {/* AI Chat Section */}
          <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Bot size={20} className="mr-2" />
                <span>Consulta a la IA de Trading</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 mb-4 max-h-[400px] overflow-y-auto p-1">
                {responses.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex ${item.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`px-4 py-2 rounded-lg max-w-[80%] ${
                        item.type === "user" 
                          ? "bg-wallet-blue text-white" 
                          : "bg-wallet-navy/70 border border-wallet-blue/20"
                      }`}
                    >
                      <p className="text-sm">{item.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {item.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 rounded-lg bg-wallet-navy/70 border border-wallet-blue/20">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-wallet-blue/60 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-wallet-blue/60 animate-pulse delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-wallet-blue/60 animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input 
                  placeholder="Pregunta sobre el mercado cripto..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-wallet-navy/50 border-wallet-blue/30"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="bg-wallet-blue hover:bg-wallet-blue/90 px-4"
                  disabled={isLoading || !query.trim()}
                >
                  <Send size={16} />
                </Button>
              </form>
              
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">Sugerencias de preguntas:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto"
                    onClick={() => setQuery("¿Cuál es la tendencia actual de Bitcoin?")}
                  >
                    ¿Tendencia de Bitcoin?
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto"
                    onClick={() => setQuery("¿Qué altcoins recomiendas comprar ahora?")}
                  >
                    ¿Qué altcoins comprar?
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-1 h-auto"
                    onClick={() => setQuery("¿Cuáles son los indicadores técnicos de Ethereum?")}
                  >
                    Análisis de Ethereum
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bot" className="pt-2">
          {/* Trading Bot Configuration */}
          <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Cog size={20} className="mr-2" />
                <span>Configuración del Bot de Trading</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bot Status */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Estado del Bot</h3>
                  <p className="text-sm text-muted-foreground">Activar/Desactivar operaciones automáticas</p>
                </div>
                <Switch 
                  checked={tradingBotActive} 
                  onCheckedChange={toggleTradingBot}
                />
              </div>
              
              {/* Strategy Selection */}
              <div>
                <h3 className="font-medium mb-2">Estrategia de Trading</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={botStrategy === "conservative" ? "default" : "outline"}
                    className={botStrategy === "conservative" ? "bg-wallet-blue" : ""}
                    onClick={() => handleBotStrategyChange("conservative")}
                  >
                    Conservadora
                  </Button>
                  <Button 
                    variant={botStrategy === "moderate" ? "default" : "outline"}
                    className={botStrategy === "moderate" ? "bg-wallet-blue" : ""}
                    onClick={() => handleBotStrategyChange("moderate")}
                  >
                    Moderada
                  </Button>
                  <Button 
                    variant={botStrategy === "aggressive" ? "default" : "outline"}
                    className={botStrategy === "aggressive" ? "bg-wallet-blue" : ""}
                    onClick={() => handleBotStrategyChange("aggressive")}
                  >
                    Agresiva
                  </Button>
                </div>
              </div>
              
              {/* Strategy Explanation */}
              <div className="bg-wallet-navy/50 p-4 rounded-lg border border-wallet-blue/20">
                <h4 className="font-medium mb-2">Estrategia {botStrategy} - Descripción</h4>
                {botStrategy === "conservative" && (
                  <p className="text-sm text-muted-foreground">Enfocada en preservación de capital. Principalmente en BTC y ETH con stop-loss cercanos. Objetivos de ganancia del 2-5%. Operaciones a largo plazo.</p>
                )}
                {botStrategy === "moderate" && (
                  <p className="text-sm text-muted-foreground">Equilibrio entre riesgo y recompensa. Diversificación entre top 10 criptomonedas. Objetivos de ganancia del 5-15%. Operaciones a medio plazo.</p>
                )}
                {botStrategy === "aggressive" && (
                  <p className="text-sm text-muted-foreground">Maximización de ganancias. Incluye altcoins de alto potencial. Objetivos de ganancia superiores al 15%. Operaciones a corto plazo con mayor riesgo.</p>
                )}
              </div>
              
              {/* Bot Trading Activity - This would show real trading activity in a production app */}
              <div>
                <h3 className="font-medium mb-2">Actividad Reciente</h3>
                <div className="bg-wallet-navy/50 p-4 rounded-lg border border-wallet-blue/20 max-h-[200px] overflow-y-auto">
                  {tradingBotActive ? (
                    <ul className="space-y-2">
                      <li className="text-sm border-b border-wallet-blue/10 pb-1">
                        <span className="text-green-500">COMPRA</span> - BTC a €62,450 - <span className="text-xs text-muted-foreground">hace 5 min</span>
                      </li>
                      <li className="text-sm border-b border-wallet-blue/10 pb-1">
                        <span className="text-red-500">VENTA</span> - SOL a €145,20 - <span className="text-xs text-muted-foreground">hace 27 min</span>
                      </li>
                      <li className="text-sm border-b border-wallet-blue/10 pb-1">
                        <span className="text-green-500">COMPRA</span> - ETH a €3,120 - <span className="text-xs text-muted-foreground">hace 1 hora</span>
                      </li>
                      <li className="text-sm border-b border-wallet-blue/10 pb-1">
                        <span className="text-green-500">COMPRA</span> - HBT a €0.0000621 - <span className="text-xs text-muted-foreground">hace 2 horas</span>
                      </li>
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">Bot inactivo. Activa el bot para ver la actividad de trading.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CryptoAIPage;
