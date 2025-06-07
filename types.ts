
// Tipos y estructuras para el módulo de seguridad Hairy Shield

export type TransactionRisk = "safe" | "suspicious" | "blocked";

export interface SecurityAlert {
  id: string;
  type: 'phishing' | 'scam' | 'malware' | 'suspicious' | 'blocked' | 'emergency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  targetAddress?: string;
  transactionHash?: string;
  timestamp: Date;
  blocked: boolean;
  userAction?: 'continue' | 'cancel' | 'report';
}

export interface MaliciousAddress {
  address: string;
  blockchain: string;
  reportReason: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  verified: boolean;
  reportedBy?: string;
  createdAt: Date;
}

export interface SecurityCheck {
  targetAddress: string;
  checkType: 'send' | 'receive' | 'similarity' | 'ai_analysis';
  riskScore: number; // 0-100
  blocked: boolean;
  aiAnalysis?: AIAnalysisResult;
  timestamp: Date;
}

export interface AIAnalysisResult {
  riskScore: number;
  threats: string[];
  recommendations: string[];
  confidence: number;
  patterns: {
    addressSimilarity?: number;
    zeroTransfer?: boolean;
    newAddress?: boolean;
    highValueTransfer?: boolean;
    suspiciousPattern?: boolean;
    invalidFormat?: boolean;
  };
}

export interface TransactionSecurityData {
  toAddress: string;
  fromAddress: string;
  amount: number;
  tokenSymbol: string;
  estimatedValue?: number;
}

export interface EmergencyBackup {
  encryptedSeed: string;
  recoveryMethod: 'qr' | 'bluetooth' | 'wifi' | 'manual';
  timestamp: Date;
  deviceFingerprint: string;
}

export interface WalletValidation {
  seedPhrase: string[];
  questionsAsked: number[];
  answersCorrect: number;
  validated: boolean;
  attempts: number;
}
