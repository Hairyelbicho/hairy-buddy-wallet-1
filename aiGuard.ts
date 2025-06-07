
import { SecurityAlert, TransactionSecurityData, AIAnalysisResult } from './types';
import { checkMaliciousAddress } from './blockedAddresses';
import { calculateAddressSimilarity } from './phishingDetector';

/**
 * 🤖 Hairy Shield AI - Sistema de IA para protección de transacciones
 * Analiza transacciones en tiempo real y detecta patrones sospechosos
 */

class HairyShieldAI {
  private riskThreshold = 40; // Umbral de riesgo más bajo para ser más sensible
  private userWalletAddress: string = '';

  setUserWallet(address: string) {
    this.userWalletAddress = address;
  }

  /**
   * Análisis principal de seguridad para transacciones salientes
   */
  async analyzeTransaction(transactionData: TransactionSecurityData): Promise<SecurityAlert | null> {
    console.log('🛡️ Hairy Shield AI: Analizando transacción...', transactionData);

    const analysis = await this.performAIAnalysis(transactionData);
    
    if (analysis.riskScore >= this.riskThreshold) {
      return this.generateSecurityAlert(transactionData, analysis);
    }

    // Registrar verificación exitosa
    this.logSecurityCheck(transactionData, analysis);
    return null;
  }

  /**
   * Realizar análisis completo con IA local mejorado
   */
  private async performAIAnalysis(data: TransactionSecurityData): Promise<AIAnalysisResult> {
    const threats: string[] = [];
    let riskScore = 0;
    const patterns: AIAnalysisResult['patterns'] = {};

    // 1. Verificar direcciones maliciosas conocidas
    const isMalicious = await checkMaliciousAddress(data.toAddress);
    if (isMalicious) {
      threats.push('Dirección reportada como maliciosa');
      riskScore += 80;
    }

    // 2. Detectar similitud de direcciones (phishing)
    const similarity = calculateAddressSimilarity(this.userWalletAddress, data.toAddress);
    if (similarity > 0.8) {
      threats.push('Dirección sospechosamente similar a la tuya');
      riskScore += 70;
      patterns.addressSimilarity = similarity;
    }

    // 3. Detectar transferencias de valor 0 (posible scam)
    if (data.amount === 0) {
      threats.push('Transferencia de valor cero detectada');
      riskScore += 40;
      patterns.zeroTransfer = true;
    }

    // 4. Detectar transferencias de alto valor
    if (data.estimatedValue && data.estimatedValue > 10000) {
      threats.push('Transferencia de alto valor detectada');
      riskScore += 20;
      patterns.highValueTransfer = true;
    }

    // 5. NUEVO: Detectar patrones de direcciones fake/testing
    const addressSuspicion = this.analyzeAddressPattern(data.toAddress);
    if (addressSuspicion.isSuspicious) {
      threats.push(...addressSuspicion.reasons);
      riskScore += addressSuspicion.riskScore;
      patterns.suspiciousPattern = true;
    }

    // 6. NUEVO: Detectar direcciones con formato inválido para Solana
    const formatCheck = this.validateSolanaAddressFormat(data.toAddress);
    if (!formatCheck.isValid) {
      threats.push('Formato de dirección inválido para Solana');
      riskScore += 60;
      patterns.invalidFormat = true;
    }

    return {
      riskScore: Math.min(riskScore, 100),
      threats,
      recommendations: this.generateRecommendations(threats),
      confidence: threats.length > 0 ? 0.85 : 0.95,
      patterns
    };
  }

  /**
   * NUEVO: Analizar patrones sospechosos en direcciones
   */
  private analyzeAddressPattern(address: string): { isSuspicious: boolean; reasons: string[]; riskScore: number } {
    const reasons: string[] = [];
    let riskScore = 0;

    // Detectar secuencias numéricas obvias
    if (/\d{4,}/.test(address)) {
      reasons.push('Contiene secuencias numéricas largas sospechosas');
      riskScore += 30;
    }

    // Detectar patrones de teclado
    if (/qwerty|asdf|zxcv|1234|abcd/i.test(address)) {
      reasons.push('Contiene patrones de teclado típicos de direcciones fake');
      riskScore += 40;
    }

    // Detectar repeticiones excesivas
    if (/(.)\1{4,}/.test(address)) {
      reasons.push('Contiene caracteres repetitivos excesivos');
      riskScore += 25;
    }

    // Detectar direcciones de prueba/testing
    if (/test|fake|demo|sample|example/i.test(address)) {
      reasons.push('Parece ser una dirección de prueba o demo');
      riskScore += 50;
    }

    // Detectar mezclas extrañas de letras y números
    const letterCount = (address.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (address.match(/\d/g) || []).length;
    const ratio = numberCount / (letterCount + numberCount);
    
    if (ratio > 0.7) {
      reasons.push('Proporción sospechosa de números vs letras');
      riskScore += 20;
    }

    return {
      isSuspicious: riskScore > 0,
      reasons,
      riskScore
    };
  }

  /**
   * NUEVO: Validar formato de dirección Solana
   */
  private validateSolanaAddressFormat(address: string): { isValid: boolean; reason?: string } {
    // Direcciones de Solana deben tener entre 32-44 caracteres
    if (address.length < 32 || address.length > 44) {
      return { isValid: false, reason: 'Longitud incorrecta para dirección Solana' };
    }

    // Direcciones de Solana usan Base58, no pueden contener 0, O, I, l
    if (/[0OIl]/.test(address)) {
      return { isValid: false, reason: 'Contiene caracteres no válidos para Base58' };
    }

    // Patrón básico de Base58
    if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(address)) {
      return { isValid: false, reason: 'No cumple con el formato Base58' };
    }

    return { isValid: true };
  }

  /**
   * Generar alerta de seguridad mejorada
   */
  private generateSecurityAlert(data: TransactionSecurityData, analysis: AIAnalysisResult): SecurityAlert {
    const severity = this.calculateSeverity(analysis.riskScore);
    
    return {
      id: `alert_${Date.now()}`,
      type: analysis.riskScore >= 80 ? 'scam' : 'suspicious',
      severity,
      title: '🚨 ¡Transacción Peligrosa Detectada!',
      message: `Hairy Shield AI detectó ${analysis.threats.length} amenaza(s). Puntuación de riesgo: ${analysis.riskScore}/100`,
      targetAddress: data.toAddress,
      timestamp: new Date(),
      blocked: analysis.riskScore >= 70 // Bloquear en 70+ en lugar de 90+
    };
  }

  /**
   * Calcular severidad basada en el puntaje de riesgo
   */
  private calculateSeverity(riskScore: number): SecurityAlert['severity'] {
    if (riskScore >= 80) return 'critical';
    if (riskScore >= 60) return 'high';
    if (riskScore >= 40) return 'medium';
    return 'low';
  }

  /**
   * Generar recomendaciones basadas en amenazas detectadas
   */
  private generateRecommendations(threats: string[]): string[] {
    const recommendations: string[] = [];

    if (threats.some(t => t.includes('maliciosa'))) {
      recommendations.push('❌ NO envíes fondos a esta dirección');
      recommendations.push('📢 Reporta esta dirección como maliciosa');
    }

    if (threats.some(t => t.includes('similar'))) {
      recommendations.push('👀 Verifica cuidadosamente la dirección de destino');
      recommendations.push('📋 Copia y pega direcciones en lugar de escribirlas');
    }

    if (threats.some(t => t.includes('valor cero'))) {
      recommendations.push('🤔 Las transferencias de valor 0 pueden ser spam o phishing');
      recommendations.push('🛑 Considera cancelar esta transacción');
    }

    if (threats.some(t => t.includes('fake') || t.includes('demo') || t.includes('prueba'))) {
      recommendations.push('⚠️ Esta dirección parece ser de prueba o falsa');
      recommendations.push('🔍 Verifica que sea una dirección real antes de enviar');
    }

    if (threats.some(t => t.includes('inválido') || t.includes('formato'))) {
      recommendations.push('❌ El formato de dirección no es válido para Solana');
      recommendations.push('🔧 Verifica que la dirección esté correctamente copiada');
    }

    return recommendations;
  }

  /**
   * Registrar verificación de seguridad
   */
  private logSecurityCheck(data: TransactionSecurityData, analysis: AIAnalysisResult) {
    const checkLog = {
      targetAddress: data.toAddress,
      checkType: 'ai_analysis' as const,
      riskScore: analysis.riskScore,
      blocked: false,
      aiAnalysis: analysis,
      timestamp: new Date()
    };

    console.log('✅ Verificación de seguridad registrada:', checkLog);
  }
}

// Instancia singleton del Hairy Shield AI
export const hairyShieldAI = new HairyShieldAI();

/**
 * Función principal para verificar transacciones
 */
export async function verifyTransactionSecurity(
  transactionData: TransactionSecurityData
): Promise<SecurityAlert | null> {
  return await hairyShieldAI.analyzeTransaction(transactionData);
}

/**
 * Configurar la dirección del usuario para comparaciones
 */
export function setUserWalletAddress(address: string) {
  hairyShieldAI.setUserWallet(address);
}
