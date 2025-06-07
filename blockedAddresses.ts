
import { MaliciousAddress, SecurityAlert } from './types';

/**
 * 📛 Gestión de Direcciones Maliciosas
 * Maneja la base de datos local y remota de direcciones bloqueadas
 */

// Cache local de direcciones maliciosas para acceso rápido
let localMaliciousCache: Set<string> = new Set();
let cacheLastUpdated: Date | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Verificar si una dirección está en la lista de maliciosas
 */
export async function checkMaliciousAddress(address: string): Promise<boolean> {
  // Verificar cache local primero
  if (localMaliciousCache.has(address.toLowerCase())) {
    return true;
  }

  // Actualizar cache si es necesario
  await updateMaliciousCache();
  
  return localMaliciousCache.has(address.toLowerCase());
}

/**
 * Verificar si una dirección está bloqueada (alias para compatibilidad)
 */
export async function isBlocked(address: string): Promise<boolean> {
  return await checkMaliciousAddress(address);
}

/**
 * Reportar una dirección como maliciosa
 */
export async function reportMaliciousAddress(
  address: string,
  reason: string,
  riskLevel: 1 | 2 | 3 | 4 | 5 = 3,
  evidence?: string
): Promise<boolean> {
  try {
    // Intentar guardar en Supabase (puede fallar si las tablas no existen aún)
    try {
      // Simulamos la llamada a Supabase por ahora
      console.log('📡 Reportando dirección:', address, 'Razón:', reason);
      
      // También crear reporte de usuario (simulado)
      console.log('📝 Creando reporte de usuario');

      // Actualizar cache local
      localMaliciousCache.add(address.toLowerCase());
      
      console.log('✅ Dirección reportada exitosamente:', address);
      return true;
      
    } catch (supabaseError) {
      console.warn('Supabase no disponible, guardando localmente:', supabaseError);
    }

    // Fallback: guardar localmente
    saveMaliciousAddressLocally(address, reason, riskLevel);
    return true;
    
  } catch (error) {
    console.error('Error al reportar dirección:', error);
    saveMaliciousAddressLocally(address, reason, riskLevel);
    return false;
  }
}

/**
 * Alias para reportar dirección (compatibilidad)
 */
export async function reportAddress(address: string, reason: string = 'Dirección sospechosa'): Promise<void> {
  await reportMaliciousAddress(address, reason);
}

/**
 * Obtener lista de direcciones maliciosas desde Supabase
 */
export async function fetchMaliciousAddresses(): Promise<MaliciousAddress[]> {
  try {
    // Por ahora, devolver direcciones locales hasta que Supabase esté configurado
    return getLocalMaliciousAddresses();
    
  } catch (error) {
    console.error('Error al conectar con Supabase:', error);
    return getLocalMaliciousAddresses();
  }
}

/**
 * Actualizar cache local de direcciones maliciosas
 */
async function updateMaliciousCache(): Promise<void> {
  const now = new Date();
  
  if (cacheLastUpdated && (now.getTime() - cacheLastUpdated.getTime()) < CACHE_DURATION) {
    return; // Cache aún válido
  }

  try {
    const maliciousAddresses = await fetchMaliciousAddresses();
    
    // Actualizar cache
    localMaliciousCache.clear();
    maliciousAddresses.forEach(addr => {
      localMaliciousCache.add(addr.address.toLowerCase());
    });
    
    cacheLastUpdated = now;
    console.log(`🔄 Cache actualizado con ${maliciousAddresses.length} direcciones maliciosas`);
    
  } catch (error) {
    console.error('Error al actualizar cache de direcciones maliciosas:', error);
  }
}

/**
 * Guardar dirección maliciosa localmente (fallback)
 */
function saveMaliciousAddressLocally(
  address: string, 
  reason: string, 
  riskLevel: number
): void {
  try {
    const localStorage = window.localStorage;
    const existing = JSON.parse(localStorage.getItem('malicious_addresses') || '[]');
    
    const newEntry = {
      address: address.toLowerCase(),
      reason,
      riskLevel,
      timestamp: new Date().toISOString(),
      local: true
    };
    
    existing.push(newEntry);
    localStorage.setItem('malicious_addresses', JSON.stringify(existing));
    
    // Actualizar cache
    localMaliciousCache.add(address.toLowerCase());
    
    console.log('📱 Dirección guardada localmente:', address);
    
  } catch (error) {
    console.error('Error al guardar dirección localmente:', error);
  }
}

/**
 * Obtener direcciones maliciosas del almacenamiento local
 */
function getLocalMaliciousAddresses(): MaliciousAddress[] {
  try {
    const localData = JSON.parse(localStorage.getItem('malicious_addresses') || '[]');
    
    return localData.map((item: any) => ({
      address: item.address,
      blockchain: 'solana',
      reportReason: item.reason,
      riskLevel: item.riskLevel,
      verified: false,
      createdAt: new Date(item.timestamp)
    }));
    
  } catch (error) {
    console.error('Error al leer direcciones locales:', error);
    return [];
  }
}

/**
 * Verificar y bloquear direcciones conocidas
 */
export async function performAddressBlockCheck(address: string): Promise<SecurityAlert | null> {
  const isMalicious = await checkMaliciousAddress(address);
  
  if (isMalicious) {
    return {
      id: `blocked_${Date.now()}`,
      type: 'blocked',
      severity: 'critical',
      title: '🚫 ¡Dirección Bloqueada!',
      message: 'Esta dirección ha sido reportada como maliciosa por la comunidad',
      targetAddress: address,
      timestamp: new Date(),
      blocked: true
    };
  }
  
  return null;
}

/**
 * Obtener estadísticas de direcciones reportadas
 */
export async function getSecurityStats(): Promise<{
  totalReported: number;
  reportsToday: number;
  topThreats: string[];
}> {
  try {
    const addresses = await fetchMaliciousAddresses();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const reportsToday = addresses.filter(addr => 
      addr.createdAt >= today
    ).length;
    
    // Obtener amenazas más comunes
    const threatCounts: Record<string, number> = {};
    addresses.forEach(addr => {
      const threat = addr.reportReason.toLowerCase();
      threatCounts[threat] = (threatCounts[threat] || 0) + 1;
    });
    
    const topThreats = Object.entries(threatCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([threat]) => threat);
    
    return {
      totalReported: addresses.length,
      reportsToday,
      topThreats
    };
    
  } catch (error) {
    console.error('Error al obtener estadísticas de seguridad:', error);
    return {
      totalReported: 0,
      reportsToday: 0,
      topThreats: []
    };
  }
}

/**
 * Limpiar cache de direcciones maliciosas
 */
export function clearMaliciousCache(): void {
  localMaliciousCache.clear();
  cacheLastUpdated = null;
  console.log('🧹 Cache de direcciones maliciosas limpiado');
}

/**
 * Inicializar el sistema de direcciones bloqueadas
 */
export async function initializeBlockedAddresses(): Promise<void> {
  console.log('🛡️ Inicializando sistema de direcciones bloqueadas...');
  await updateMaliciousCache();
}
