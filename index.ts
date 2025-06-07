
// 🛡️ Hairy Shield Security Module - Punto de entrada principal
// Exporta todas las funciones de seguridad disponibles

export * from "./types";
export * from "./aiGuard";
export * from "./phishingDetector";
export * from "./blockedAddresses";
export * from "./emergencyModule";
export * from "./walletCreationGuard";
export * from "./receiveProtection";

// Importar funciones específicas para el módulo principal
import { 
  verifyTransactionSecurity as aiVerifyTransaction, 
  setUserWalletAddress,
  hairyShieldAI 
} from "./aiGuard";

import { 
  performPhishingCheck,
  calculateAddressSimilarity,
  detectPhishingAddress,
  isSimilarAddress
} from "./phishingDetector";

import { 
  checkMaliciousAddress,
  reportMaliciousAddress,
  performAddressBlockCheck,
  initializeBlockedAddresses,
  isBlocked,
  reportAddress
} from "./blockedAddresses";

import { 
  validateWalletCreation,
  generateSeedQuestions,
  verifySeedAnswers,
  generateSeedQuiz
} from "./walletCreationGuard";

import { 
  verifyIncomingTransaction,
  setupReceiveProtection,
  validateSender
} from "./receiveProtection";

import { 
  createEmergencyBackup,
  generateOfflineTransaction,
  generateRecoveryQR,
  prepareOfflineTx,
  receiveOfflineTx
} from "./emergencyModule";

// Re-exportar funciones principales con nombres consistentes
export { 
  aiVerifyTransaction as verifyTransactionSecurity, 
  setUserWalletAddress,
  hairyShieldAI 
};

export { 
  performPhishingCheck,
  calculateAddressSimilarity,
  detectPhishingAddress,
  isSimilarAddress
};

export { 
  checkMaliciousAddress,
  reportMaliciousAddress,
  performAddressBlockCheck,
  initializeBlockedAddresses,
  isBlocked,
  reportAddress
};

export { 
  validateWalletCreation,
  generateSeedQuestions,
  verifySeedAnswers,
  generateSeedQuiz
};

export { 
  verifyIncomingTransaction,
  setupReceiveProtection,
  validateSender
};

export { 
  createEmergencyBackup,
  generateOfflineTransaction,
  generateRecoveryQR,
  prepareOfflineTx,
  receiveOfflineTx
};

/**
 * 🛡️ Inicializar todo el módulo de seguridad Hairy Shield
 */
export async function initializeHairyShield(userWalletAddress?: string): Promise<void> {
  console.log('🛡️ Inicializando Hairy Shield Security Module...');
  
  try {
    // Inicializar sistema de direcciones bloqueadas
    await initializeBlockedAddresses();
    
    // Configurar dirección del usuario si se proporciona
    if (userWalletAddress) {
      setUserWalletAddress(userWalletAddress);
    }
    
    // Configurar protección de recepción
    setupReceiveProtection();
    
    console.log('✅ Hairy Shield inicializado correctamente');
    
  } catch (error) {
    console.error('❌ Error al inicializar Hairy Shield:', error);
    throw new Error('Failed to initialize Hairy Shield security module');
  }
}

/**
 * 🔍 Verificación completa de seguridad para transacciones
 */
export async function performCompleteSecurityCheck(
  userAddress: string,
  targetAddress: string,
  amount: number,
  tokenSymbol: string = 'SOL'
) {
  const transactionData = {
    toAddress: targetAddress,
    fromAddress: userAddress,
    amount,
    tokenSymbol
  };

  // 1. Verificar con IA
  const aiAlert = await aiVerifyTransaction(transactionData);
  if (aiAlert) return aiAlert;

  // 2. Verificar phishing
  const phishingAlert = performPhishingCheck(userAddress, targetAddress);
  if (phishingAlert) return phishingAlert;

  // 3. Verificar direcciones bloqueadas
  const blockAlert = await performAddressBlockCheck(targetAddress);
  if (blockAlert) return blockAlert;

  return null; // Todo seguro
}
