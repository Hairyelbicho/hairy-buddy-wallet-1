
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Vote, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const GovernancePage = () => {
  const navigate = useNavigate();
  const [proposals] = useState([
    {
      id: 1,
      title: "Aumentar recompensas de staking",
      description: "Propuesta para aumentar las recompensas de staking del 5% al 7% anual",
      status: "active",
      votesFor: 15420,
      votesAgainst: 3280,
      endDate: "2024-12-15",
      hasVoted: false
    },
    {
      id: 2,
      title: "Nueva pool de liquidez HAIRY/USDC",
      description: "Crear una nueva pool de liquidez para el par HAIRY/USDC con incentivos",
      status: "passed",
      votesFor: 22100,
      votesAgainst: 1850,
      endDate: "2024-11-30",
      hasVoted: true
    },
    {
      id: 3,
      title: "Reducir comisiones de transacción",
      description: "Propuesta para reducir las comisiones de transacción del 0.3% al 0.25%",
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      endDate: "2024-12-20",
      hasVoted: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-500";
      case "passed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getVotePercentage = (votesFor: number, votesAgainst: number) => {
    const total = votesFor + votesAgainst;
    return total > 0 ? (votesFor / total) * 100 : 0;
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
        <h1 className="text-xl font-bold">Governance</h1>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="bg-card/50 backdrop-blur-sm border-wallet-blue/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {proposal.description}
                  </p>
                </div>
                <Badge className={getStatusColor(proposal.status)}>
                  {proposal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposal.status !== "pending" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>A favor: {proposal.votesFor.toLocaleString()}</span>
                      <span>En contra: {proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={getVotePercentage(proposal.votesFor, proposal.votesAgainst)} 
                      className="h-2"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={16} className="mr-1" />
                    <span>Termina: {proposal.endDate}</span>
                  </div>
                  
                  {proposal.status === "active" && !proposal.hasVoted && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-500 border-green-500">
                        <Vote size={16} className="mr-1" />
                        A favor
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 border-red-500">
                        <Vote size={16} className="mr-1" />
                        En contra
                      </Button>
                    </div>
                  )}

                  {proposal.hasVoted && (
                    <div className="flex items-center text-sm text-green-500">
                      <CheckCircle size={16} className="mr-1" />
                      <span>Votado</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GovernancePage;
