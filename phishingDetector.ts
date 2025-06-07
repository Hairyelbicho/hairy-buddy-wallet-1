
import { SecurityAlert } from './types';

/**
 * 🔍 Detector de Phishing y Direcciones Similares MEJORADO
 * Protege contra ataques de direcciones visualmente similares
 */

/**
 * Detectar si una dirección es sospechosamente parecida (función principal solicitada)
 */
export function isSimilarAddress(address1: string, address2: string): boolean {
  const similarity = calculateAddressSimilarity(address1, address2);
  return similarity >= 0.7 && address1.toLowerCase() !== address2.toLowerCase(); // Umbral más bajo
}

/**
 * Calcular similitud entre dos direcciones (0-1) MEJORADO
 */
export function calculateAddressSimilarity(userAddress: string, targetAddress: string): number {
  if (!userAddress || !targetAddress || userAddress === targetAddress) {
    return userAddress === targetAddress ? 1 : 0;
  }

  // Normalizar direcciones
  const addr1 = userAddress.toLowerCase();
  const addr2 = targetAddress.toLowerCase();

  // Verificar coincidencias en inicio y final (técnica común de phishing)
  const startMatch = getMatchingStart(addr1, addr2);
  const endMatch = getMatchingEnd(addr1, addr2);
  
  // Calcular similitud visual
  const visualSimilarity = calculateVisualSimilarity(addr1, addr2);
  
  // NUEVO: Detectar patrones de phishing más sofisticados
  const advancedSimilarity = calculateAdvancedSimilarity(addr1, addr2);
  
  // Peso mayor a coincidencias de inicio/final y patrones avanzados
  const similarity = (startMatch * 0.3) + (endMatch * 0.3) + (visualSimilarity * 0.2) + (advancedSimilarity * 0.2);
  
  return Math.min(similarity, 1);
}

/**
 * NUEVO: Calcular similitud avanzada para detectar phishing sofisticado
 */
function calculateAdvancedSimilarity(addr1: string, addr2: string): number {
  // Detectar sustituciones de caracteres similares
  const substitutions = [
    ['0', 'o'], ['1', 'l', 'i'], ['5', 's'], ['8', 'b'],
    ['a', 'e'], ['c', 'o'], ['u', 'v'], ['m', 'n']
  ];
  
  let normalizedAddr1 = addr1;
  let normalizedAddr2 = addr2;
  
  // Normalizar caracteres similares
  substitutions.forEach(group => {
    const target = group[0];
    group.slice(1).forEach(char => {
      normalizedAddr1 = normalizedAddr1.replace(new RegExp(char, 'g'), target);
      normalizedAddr2 = normalizedAddr2.replace(new RegExp(char, 'g'), target);
    });
  });
  
  // Calcular similitud después de normalización
  if (normalizedAddr1.length !== normalizedAddr2.length) {
    return 0;
  }
  
  let matches = 0;
  for (let i = 0; i < normalizedAddr1.length; i++) {
    if (normalizedAddr1[i] === normalizedAddr2[i]) {
      matches++;
    }
  }
  
  return matches / normalizedAddr1.length;
}

/**
 * Verificar coincidencias al inicio de las direcciones
 */
function getMatchingStart(addr1: string, addr2: string): number {
  let matches = 0;
  const minLength = Math.min(addr1.length, addr2.length);
  const checkLength = Math.min(minLength, 8); // Verificar solo primeros 8 caracteres
  
  for (let i = 0; i < checkLength; i++) {
    if (addr1[i] === addr2[i]) {
      matches++;
    } else {
      break;
    }
  }
  
  return matches / 8; // Normalizar a los primeros 8 caracteres
}

/**
 * Verificar coincidencias al final de las direcciones
 */
function getMatchingEnd(addr1: string, addr2: string): number {
  let matches = 0;
  const len1 = addr1.length;
  const len2 = addr2.length;
  const checkLength = Math.min(len1, len2, 8); // Verificar solo últimos 8 caracteres
  
  for (let i = 1; i <= checkLength; i++) {
    if (addr1[len1 - i] === addr2[len2 - i]) {
      matches++;
    } else {
      break;
    }
  }
  
  return matches / 8; // Normalizar a los últimos 8 caracteres
}

/**
 * Calcular similitud visual general
 */
function calculateVisualSimilarity(addr1: string, addr2: string): number {
  if (Math.abs(addr1.length - addr2.length) > 5) {
    return 0; // Muy diferentes en longitud
  }

  const maxLength = Math.max(addr1.length, addr2.length);
  const minLength = Math.min(addr1.length, addr2.length);
  
  let matches = 0;
  for (let i = 0; i < minLength; i++) {
    if (addr1[i] === addr2[i]) {
      matches++;
    }
  }
  
  return matches / maxLength;
}

/**
 * Detectar si una dirección es potencialmente phishing MEJORADO
 */
export function detectPhishingAddress(
  userAddress: string, 
  targetAddress: string,
  threshold: number = 0.7 // Umbral más bajo
): SecurityAlert | null {
  
  const similarity = calculateAddressSimilarity(userAddress, targetAddress);
  
  if (similarity >= threshold && userAddress !== targetAddress) {
    return {
      id: `phishing_${Date.now()}`,
      type: 'phishing',
      severity: similarity >= 0.85 ? 'critical' : 'high',
      title: '🎣 ¡Posible Ataque de Phishing!',
      message: `La dirección de destino es sospechosamente similar a la tuya (${Math.round(similarity * 100)}% similar)`,
      targetAddress,
      timestamp: new Date(),
      blocked: similarity >= 0.85 // Bloquear en 85% en lugar de 90%
    };
  }
  
  return null;
}

/**
 * Verificar patrones comunes de direcciones maliciosas MEJORADO
 */
export function detectSuspiciousPatterns(address: string): SecurityAlert | null {
  const suspiciousPatterns = [
    {
      pattern: /^0+[1-9a-f]/, 
      message: 'Dirección con patrón sospechoso de ceros al inicio'
    },
    {
      pattern: /[1-9a-f]+0+$/, 
      message: 'Dirección con patrón sospechoso de ceros al final'
    },
    {
      pattern: /(.)\1{5,}/, // Reducido de 8 a 5
      message: 'Dirección con caracteres excesivamente repetitivos'
    },
    {
      pattern: /^[0-9]+$/, 
      message: 'Dirección compuesta solo por números'
    },
    {
      pattern: /test|fake|demo|sample|example|qwerty|asdf/i, // NUEVO
      message: 'Dirección parece ser de prueba o contiene patrones de teclado'
    },
    {
      pattern: /\d{6,}/, // NUEVO: secuencias largas de números
      message: 'Contiene secuencias numéricas largas sospechosas'
    }
  ];

  for (const { pattern, message } of suspiciousPatterns) {
    if (pattern.test(address.toLowerCase())) {
      return {
        id: `suspicious_${Date.now()}`,
        type: 'suspicious',
        severity: 'medium',
        title: '⚠️ Patrón Sospechoso Detectado',
        message,
        targetAddress: address,
        timestamp: new Date(),
        blocked: false
      };
    }
  }

  return null;
}

/**
 * Verificación completa anti-phishing
 */
export function performPhishingCheck(
  userAddress: string,
  targetAddress: string
): SecurityAlert | null {
  
  // 1. Verificar similitud de direcciones
  const phishingAlert = detectPhishingAddress(userAddress, targetAddress);
  if (phishingAlert) {
    return phishingAlert;
  }
  
  // 2. Verificar patrones sospechosos
  const patternAlert = detectSuspiciousPatterns(targetAddress);
  if (patternAlert) {
    return patternAlert;
  }
  
  return null;
}

/**
 * Formatear dirección para comparación visual más fácil
 */
export function formatAddressForComparison(address: string): string {
  if (address.length <= 20) return address;
  
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

/**
 * Generar reporte de similitud detallado
 */
export function generateSimilarityReport(userAddress: string, targetAddress: string) {
  const similarity = calculateAddressSimilarity(userAddress, targetAddress);
  const startMatch = getMatchingStart(userAddress.toLowerCase(), targetAddress.toLowerCase());
  const endMatch = getMatchingEnd(userAddress.toLowerCase(), targetAddress.toLowerCase());
  
  return {
    overallSimilarity: similarity,
    startSimilarity: startMatch,
    endSimilarity: endMatch,
    riskLevel: similarity >= 0.9 ? 'critical' : similarity >= 0.7 ? 'high' : 'low',
    recommendation: similarity >= 0.8 ? 
      'NO envíes fondos - Dirección altamente sospechosa' : 
      similarity >= 0.5 ?
      'Verifica cuidadosamente antes de enviar' :
      'Dirección aparentemente segura'
  };
}
