
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const MetricsPage = () => {
  const navigate = useNavigate();
  
  const priceData = [
    { date: "1D", price: 0.000003216 },
    { date: "7D", price: 0.000003145 },
    { date: "14D", price: 0.000003089 },
    { date: "30D", price: 0.000002987 },
    { date: "90D", price: 0.000002756 },
    { date: "Now", price: 0.000003316 },
  ];

  const volumeData = [
    { date: "Lun", volume: 125000 },
    { date: "Mar", volume: 189000 },
    { date: "Mié", volume: 234000 },
    { date: "Jue", volume: 167000 },
    { date: "Vie", volume: 298000 },
    { date: "Sáb", volume: 156000 },
    { date: "Dom", volume: 187000 },
  ];

  const metrics = {
    marketCap: "$12.5M",
    totalSupply: "1B HAIRY",
    circulatingSupply: "750M HAIRY",
    holders: "15,247",
    volume24h: "$298K",
    tvl: "$4.2M"
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 pb-20">
      <div className="flex items-center pt-4 pb-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <div className="flex items-center">
          <BarChart3 size={24} className="mr-2 text-blue-500" />
          <h1 className="text-xl font-bold">Métricas del Protocolo</h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Métricas Principales */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign size={20} className="text-green-500 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-lg font-bold">{metrics.marketCap}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp size={20} className="text-blue-500 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Volumen 24h</p>
                  <p className="text-lg font-bold">{metrics.volume24h}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users size={20} className="text-purple-500 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Holders</p>
                  <p className="text-lg font-bold">{metrics.holders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Precio */}
        <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
          <CardHeader>
            <CardTitle>Precio HAIRY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Precio']}
                    labelFormatter={(label) => `Fecha: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Volumen */}
        <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
          <CardHeader>
            <CardTitle>Volumen Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Volumen']}
                    labelFormatter={(label) => `Día: ${label}`}
                  />
                  <Bar dataKey="volume" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Información Tokenomics */}
        <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
          <CardHeader>
            <CardTitle>Tokenomics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Supply</p>
                <p className="text-lg font-bold">{metrics.totalSupply}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Circulating Supply</p>
                <p className="text-lg font-bold">{metrics.circulatingSupply}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value Locked</p>
                <p className="text-lg font-bold">{metrics.tvl}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Burn Rate</p>
                <p className="text-lg font-bold">2.5% anual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsPage;
