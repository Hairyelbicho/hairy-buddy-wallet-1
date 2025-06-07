
import { EmergencyBackup, SecurityAlert } from './types';

/**
 * 🆘 Módulo Hairy Emergency
 * Sistema de recuperación offline y firma de transacciones de emergencia
 */

/**
 * Preparar transacción offline (función principal solicitada)
 */
export function prepareOfflineTx(data: any): string {
  return generateOfflineTransaction(data.toAddress, data.amount, data.seedPhrase || '');
}

/**
 * Recibir y procesar transacción offline (función principal solicitada)
 */
export function receiveOfflineTx(data: string): any {
  try {
    const transaction = JSON.parse(data);
    
    // Verificar estructura básica
    if (!transaction.to || !transaction.amount || !transaction.signature) {
      throw new Error('Estructura de transacción inválida');
    }
    
    // Verificar que sea una transacción offline
    if (!transaction.offline) {
      throw new Error('No es una transacción offline válida');
    }
    
    console.log('📱 Transacción offline recibida y validada:', transaction);
    return transaction;
    
  } catch (error) {
    console.error('Error al procesar transacción offline:', error);
    return null;
  }
}

/**
 * Crear respaldo de emergencia
 */
export function createEmergencyBackup(
  seedPhrase: string,
  userPin: string
): EmergencyBackup {
  
  const deviceFingerprint = generateDeviceFingerprint();
  const encryptedSeed = encryptSeedPhrase(seedPhrase, userPin + deviceFingerprint);
  
  const backup: EmergencyBackup = {
    encryptedSeed,
    recoveryMethod: 'qr',
    timestamp: new Date(),
    deviceFingerprint
  };

  // Guardar respaldo localmente
  try {
    localStorage.setItem('emergency_backup', JSON.stringify(backup));
    console.log('🆘 Respaldo de emergencia creado');
  } catch (error) {
    console.error('Error al crear respaldo de emergencia:', error);
  }

  return backup;
}

/**
 * Generar huella digital del dispositivo
 */
function generateDeviceFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Hairy Wallet Security', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  return btoa(fingerprint).slice(0, 32);
}

/**
 * Encriptar frase semilla con AES-256 simulado
 */
function encryptSeedPhrase(seedPhrase: string, key: string): string {
  // Implementación simplificada - en producción usar crypto.subtle
  const encrypted = btoa(seedPhrase + '::' + key);
  return encrypted;
}

/**
 * Desencriptar frase semilla
 */
function decryptSeedPhrase(encryptedSeed: string, key: string): string | null {
  try {
    const decrypted = atob(encryptedSeed);
    const [seed, originalKey] = decrypted.split('::');
    
    if (originalKey === key) {
      return seed;
    }
    
    return null;
  } catch (error) {
    console.error('Error al desencriptar semilla:', error);
    return null;
  }
}

/**
 * Generar transacción offline
 */
export function generateOfflineTransaction(
  toAddress: string,
  amount: number,
  seedPhrase: string
): string {
  
  // Generar transacción sin conexión
  const transaction = {
    to: toAddress,
    amount,
    timestamp: Date.now(),
    nonce: Math.random().toString(36).substring(7),
    offline: true
  };

  // Simular firma de transacción
  const signature = signTransaction(transaction, seedPhrase);
  
  const offlineTransaction = {
    ...transaction,
    signature,
    version: '1.0'
  };

  console.log('📱 Transacción offline generada:', offlineTransaction);
  
  return JSON.stringify(offlineTransaction);
}

/**
 * Simular firma de transacción
 */
function signTransaction(transaction: any, seedPhrase: string): string {
  // En implementación real, usar bibliotecas criptográficas apropiadas
  const dataToSign = JSON.stringify(transaction);
  const signature = btoa(dataToSign + seedPhrase).slice(0, 64);
  return signature;
}

/**
 * Generar código QR para recuperación
 */
export function generateRecoveryQR(emergencyData: EmergencyBackup): string {
  const qrData = {
    type: 'hairy_emergency',
    version: '1.0',
    data: emergencyData.encryptedSeed,
    timestamp: emergencyData.timestamp.toISOString(),
    method: emergencyData.recoveryMethod
  };

  return JSON.stringify(qrData);
}

/**
 * Leer código QR de recuperación
 */
export function readRecoveryQR(qrData: string, userPin: string): string | null {
  try {
    const data = JSON.parse(qrData);
    
    if (data.type !== 'hairy_emergency') {
      throw new Error('Código QR no válido');
    }

    const deviceFingerprint = generateDeviceFingerprint();
    const key = userPin + deviceFingerprint;
    
    return decryptSeedPhrase(data.data, key);
    
  } catch (error) {
    console.error('Error al leer QR de recuperación:', error);
    return null;
  }
}

/**
 * Transmitir transacción por Bluetooth (simulado)
 */
export async function transmitViaBluetooth(transactionData: string): Promise<boolean> {
  try {
    // En implementación real, usar Web Bluetooth API
    console.log('📡 Transmitiendo vía Bluetooth...');
    
    // Simular transmisión
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Transacción transmitida vía Bluetooth');
    return true;
    
  } catch (error) {
    console.error('Error en transmisión Bluetooth:', error);
    return false;
  }
}

/**
 * Transmitir transacción por WiFi Direct (simulado)
 */
export async function transmitViaWiFiDirect(transactionData: string): Promise<boolean> {
  try {
    console.log('📶 Transmitiendo vía WiFi Direct...');
    
    // Simular transmisión
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('✅ Transacción transmitida vía WiFi Direct');
    return true;
    
  } catch (error) {
    console.error('Error en transmisión WiFi Direct:', error);
    return false;
  }
}

/**
 * Detectar modo de emergencia
 */
export function detectEmergencyMode(): SecurityAlert | null {
  // Verificar conectividad
  if (!navigator.onLine) {
    return {
      id: `emergency_offline_${Date.now()}`,
      type: 'emergency',
      severity: 'medium',
      title: '🆘 Modo Emergencia Activado',
      message: 'Conexión perdida. Funciones offline disponibles',
      timestamp: new Date(),
      blocked: false
    };
  }

  // Verificar si hay respaldos de emergencia
  const hasBackup = localStorage.getItem('emergency_backup');
  if (!hasBackup) {
    return {
      id: `emergency_no_backup_${Date.now()}`,
      type: 'emergency',
      severity: 'low',
      title: '💾 Sin Respaldo de Emergencia',
      message: 'Recomendamos crear un respaldo offline',
      timestamp: new Date(),
      blocked: false
    };
  }

  return null;
}

/**
 * Recuperar wallet desde respaldo de emergencia
 */
export function recoverFromEmergencyBackup(userPin: string): string | null {
  try {
    const backup = localStorage.getItem('emergency_backup');
    if (!backup) {
      throw new Error('No hay respaldo de emergencia disponible');
    }

    const emergencyData: EmergencyBackup = JSON.parse(backup);
    const deviceFingerprint = generateDeviceFingerprint();
    const key = userPin + deviceFingerprint;
    
    const recoveredSeed = decryptSeedPhrase(emergencyData.encryptedSeed, key);
    
    if (recoveredSeed) {
      console.log('🔓 Wallet recuperada desde respaldo de emergencia');
      return recoveredSeed;
    } else {
      throw new Error('PIN incorrecto o respaldo corrupto');
    }
    
  } catch (error) {
    console.error('Error al recuperar desde respaldo:', error);
    return null;
  }
}

/**
 * Limpiar datos de emergencia
 */
export function clearEmergencyData(): void {
  try {
    localStorage.removeItem('emergency_backup');
    console.log('🧹 Datos de emergencia limpiados');
  } catch (error) {
    console.error('Error al limpiar datos de emergencia:', error);
  }
}

/**
 * Verificar integridad del respaldo
 */
export function verifyBackupIntegrity(): boolean {
  try {
    const backup = localStorage.getItem('emergency_backup');
    if (!backup) return false;

    const data: EmergencyBackup = JSON.parse(backup);
    
    // Verificar campos requeridos
    const hasRequiredFields = data.encryptedSeed && 
                             data.timestamp && 
                             data.deviceFingerprint;
    
    // Verificar que no sea muy antiguo (30 días)
    const backupAge = Date.now() - new Date(data.timestamp).getTime();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    return hasRequiredFields && backupAge < thirtyDays;
    
  } catch (error) {
    console.error('Error al verificar integridad del respaldo:', error);
    return false;
  }
}

/**
 * Obtener información del respaldo de emergencia
 */
export function getEmergencyBackupInfo(): {
  exists: boolean;
  createdAt?: Date;
  isValid?: boolean;
  recoveryMethods?: string[];
} {
  try {
    const backup = localStorage.getItem('emergency_backup');
    if (!backup) {
      return { exists: false };
    }

    const data: EmergencyBackup = JSON.parse(backup);
    const isValid = verifyBackupIntegrity();
    
    return {
      exists: true,
      createdAt: new Date(data.timestamp),
      isValid,
      recoveryMethods: ['qr', 'bluetooth', 'wifi', 'manual']
    };
    
  } catch (error) {
    console.error('Error al obtener info del respaldo:', error);
    return { exists: false };
  }
}
