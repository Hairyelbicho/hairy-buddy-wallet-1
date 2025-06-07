
import { SecurityAlert, TransactionSecurityData } from './types';
import { checkMaliciousAddress } from './blockedAddresses';

/**
 * 🛡️ Protección al Recibir Fondos
 * Valida transacciones entrantes y bloquea tokens maliciosos
 */

// Lista de tokens conocidos como scam o maliciosos
const KNOWN_SCAM_TOKENS = new Set([
  'scam', 'fake', 'phishing', 'virus', 'malware',
  'free', 'airdrop', 'winner', 'congratulations'
]);

// Configuración de protección
interface ReceiveProtectionConfig {
  enabled: boolean;
  blockUnknownTokens: boolean;
  blockZeroValueTransfers: boolean;
  blockSuspiciousAmounts: boolean;
  quarantineEnabled: boolean;
}

let protectionConfig: ReceiveProtectionConfig = {
  enabled: true,
  blockUnknownTokens: false,
  blockZeroValueTransfers: true,
  blockSuspiciousAmounts: true,
  quarantineEnabled: true
};

/**
 * Configurar protección de recepción
 */
export function setupReceiveProtection(config?: Partial<ReceiveProtectionConfig>): void {
  if (config) {
    protectionConfig = { ...protectionConfig, ...config };
  }
  
  console.log('🛡️ Protección de recepción configurada:', protectionConfig);
}

/**
 * Verificar transacción entrante
 */
export async function verifyIncomingTransaction(
  transaction: TransactionSecurityData
): Promise<SecurityAlert | null> {
  
  if (!protectionConfig.enabled) {
    return null;
  }

  console.log('🔍 Verificando transacción entrante:', transaction);

  // 1. Verificar si el remitente está en lista negra
  const senderAlert = await checkMaliciousSender(transaction.fromAddress);
  if (senderAlert) return senderAlert;

  // 2. Verificar transferencias de valor cero
  if (protectionConfig.blockZeroValueTransfers && transaction.amount === 0) {
    return createReceiveAlert(
      'suspicious',
      'medium',
      '⚠️ Transferencia de Valor Cero',
      'Se recibió una transferencia sin valor, posible spam o phishing',
      transaction
    );
  }

  // 3. Verificar tokens sospechosos
  const tokenAlert = checkSuspiciousToken(transaction.tokenSymbol);
  if (tokenAlert) return tokenAlert;

  // 4. Verificar patrones sospechosos en el monto
  const amountAlert = checkSuspiciousAmount(transaction.amount);
  if (amountAlert) return amountAlert;

  return null; // Transacción segura
}

/**
 * Validar remitente de fondos (función solicitada)
 */
export async function validateSender(address: string): Promise<"safe" | "blocked"> {
  const isMalicious = await checkMaliciousAddress(address);
  return isMalicious ? "blocked" : "safe";
}

/**
 * Verificar si el remitente está en lista negra
 */
async function checkMaliciousSender(senderAddress: string): Promise<SecurityAlert | null> {
  const isMalicious = await checkMaliciousAddress(senderAddress);
  
  if (isMalicious) {
    return createReceiveAlert(
      'blocked',
      'critical',
      '🚫 Remitente Bloqueado',
      'El remitente de esta transacción está en la lista de direcciones maliciosas',
      { fromAddress: senderAddress } as TransactionSecurityData
    );
  }
  
  return null;
}

/**
 * Verificar si el token es sospechoso
 */
function checkSuspiciousToken(tokenSymbol: string): SecurityAlert | null {
  const symbol = tokenSymbol.toLowerCase();
  
  // Verificar tokens conocidos como scam
  for (const scamTerm of KNOWN_SCAM_TOKENS) {
    if (symbol.includes(scamTerm)) {
      return createReceiveAlert(
        'scam',
        'high',
        '🎣 Token Sospechoso Detectado',
        `El token "${tokenSymbol}" contiene términos asociados con scams`,
        { tokenSymbol } as TransactionSecurityData
      );
    }
  }

  return null;
}

/**
 * Verificar montos sospechosos
 */
function checkSuspiciousAmount(amount: number): SecurityAlert | null {
  if (!protectionConfig.blockSuspiciousAmounts) {
    return null;
  }

  // Montos extremadamente grandes (posible overflow)
  if (amount > 1e15) {
    return createReceiveAlert(
      'suspicious',
      'high',
      '💰 Monto Extremadamente Grande',
      'Se detectó un monto sospechosamente alto, posible manipulación',
      { amount } as TransactionSecurityData
    );
  }

  return null;
}

/**
 * Crear alerta de seguridad para recepción
 */
function createReceiveAlert(
  type: SecurityAlert['type'],
  severity: SecurityAlert['severity'],
  title: string,
  message: string,
  transactionData: Partial<TransactionSecurityData>
): SecurityAlert {
  return {
    id: `receive_${type}_${Date.now()}`,
    type,
    severity,
    title,
    message,
    targetAddress: transactionData.fromAddress,
    timestamp: new Date(),
    blocked: severity === 'critical'
  };
}
