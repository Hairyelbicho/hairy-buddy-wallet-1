
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const SolarflarePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stakingInfo, setStakingInfo] = useState({
    totalStaked: "1,250 HAIRY",
    rewards: "42.5 HAIRY",
    apy: "18.5%",
    lockPeriod: "30 días"
  });

  const [campaigns] = useState([
    {
      id: 1,
      name: "Campaña Genesis",
      description: "Stake HAIRY tokens y gana recompensas diarias",
      progress: 75,
      timeLeft: "15 días",
      rewards: "25.5 HAIRY",
      participants: 1250
    },
    {
      id: 2,
      name: "Boost de Liquidez",
      description: "Proporciona liquidez y multiplica tus recompensas x2",
      progress: 45,
      timeLeft: "22 días",
      rewards: "18.2 HAIRY",
      participants: 890
    }
  ]);

  const handleClaimRewards = () => {
    const rewardsAmount = stakingInfo.rewards;
    
    // Reset rewards to 0 after claiming
    setStakingInfo(prev => ({
      ...prev,
      rewards: "0 HAIRY"
    }));

    toast({
      title: "Recompensas Reclamadas",
      description: `Has reclamado ${rewardsAmount} exitosamente`,
    });
  };

  const handleUnstake = () => {
    const stakedAmount = stakingInfo.totalStaked;
    
    // Reset staking info after unstaking
    setStakingInfo(prev => ({
      ...prev,
      totalStaked: "0 HAIRY",
      rewards: "0 HAIRY"
    }));

    toast({
      title: "Unstake Completado",
      description: `Has retirado ${stakedAmount} de staking exitosamente`,
    });
  };

  const handleJoinCampaign = (campaignName: string) => {
    toast({
      title: "Te has unido a la campaña",
      description: `Ahora participas en: ${campaignName}`,
    });
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 pb-20">
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
          <img
            src="/lovable-uploads/8b3a744c-2ea5-48ad-b4b7-93b9eb8d808e.png"
            alt="Hairy Logo"
            className="w-6 h-6 mr-2"
          />
          <h1 className="text-xl font-bold">Hairyflare</h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Resumen de Staking */}
        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap size={20} className="mr-2 text-yellow-500" />
              Mi Staking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Staked</p>
                <p className="text-xl font-bold">{stakingInfo.totalStaked}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recompensas</p>
                <p className="text-xl font-bold text-yellow-500">{stakingInfo.rewards}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">APY</p>
                <p className="text-lg font-semibold text-green-500">{stakingInfo.apy}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Período</p>
                <p className="text-lg font-semibold">{stakingInfo.lockPeriod}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleClaimRewards}
                disabled={stakingInfo.rewards === "0 HAIRY"}
              >
                Claim Rewards
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleUnstake}
                disabled={stakingInfo.totalStaked === "0 HAIRY"}
              >
                Unstake
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Campañas Activas */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Campañas Activas</h2>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {campaign.description}
                      </p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-500">
                      Activa
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progreso</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Tiempo restante</p>
                        <p className="font-medium flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {campaign.timeLeft}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mis recompensas</p>
                        <p className="font-medium text-yellow-500">{campaign.rewards}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Participantes</p>
                        <p className="font-medium">{campaign.participants}</p>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-wallet-blue hover:bg-wallet-blue/90"
                      onClick={() => handleJoinCampaign(campaign.name)}
                    >
                      Participar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Métricas Generales */}
        <Card className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp size={20} className="mr-2 text-green-500" />
              Estadísticas de la Red
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Staked</p>
                <p className="text-lg font-bold">2.5M HAIRY</p>
              </div>
              <div>
                <p className="text-muted-foreground">APY Promedio</p>
                <p className="text-lg font-bold text-green-500">22.3%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Stakers</p>
                <p className="text-lg font-bold">3,250</p>
              </div>
              <div>
                <p className="text-muted-foreground">Recompensas 24h</p>
                <p className="text-lg font-bold">1,250 HAIRY</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SolarflarePage;
