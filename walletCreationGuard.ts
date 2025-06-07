
import { WalletValidation } from './types';

/**
 * 🧩 Guardián de Creación de Wallet
 * Verificación de que el usuario ha copiado correctamente su frase semilla
 */

/**
 * Generar quiz de verificación de semilla (función principal solicitada)
 */
export function generateSeedQuiz(seed: string[]): { question: string, correctAnswer: string }[] {
  return generateSeedQuestions(seed);
}

/**
 * Generar preguntas aleatorias para verificar la frase semilla
 */
export function generateSeedQuestions(seedPhrase: string[]): Array<{
  question: string;
  correctAnswer: string;
  position: number;
}> {
  if (!seedPhrase || seedPhrase.length === 0) {
    throw new Error('Frase semilla no válida');
  }

  // Seleccionar 3 posiciones aleatorias
  const positions = [];
  while (positions.length < Math.min(3, seedPhrase.length)) {
    const randomPos = Math.floor(Math.random() * seedPhrase.length);
    if (!positions.includes(randomPos)) {
      positions.push(randomPos);
    }
  }

  return positions.map(pos => ({
    question: `¿Cuál es la palabra #${pos + 1} de tu frase semilla?`,
    correctAnswer: seedPhrase[pos],
    position: pos
  }));
}

/**
 * Verificar respuestas del usuario
 */
export function verifySeedAnswers(
  seedPhrase: string[],
  questions: Array<{ position: number; correctAnswer: string }>,
  userAnswers: string[]
): boolean {
  
  if (questions.length !== userAnswers.length) {
    return false;
  }

  return questions.every((question, index) => {
    const userAnswer = userAnswers[index]?.toLowerCase().trim();
    const correctAnswer = question.correctAnswer.toLowerCase().trim();
    return userAnswer === correctAnswer;
  });
}

/**
 * Validar proceso completo de creación de wallet
 */
export function validateWalletCreation(
  seedPhrase: string[],
  userAnswers: string[]
): WalletValidation {
  
  const questions = generateSeedQuestions(seedPhrase);
  const answersCorrect = questions.filter((question, index) => {
    const userAnswer = userAnswers[index]?.toLowerCase().trim();
    const correctAnswer = question.correctAnswer.toLowerCase().trim();
    return userAnswer === correctAnswer;
  }).length;

  const validated = answersCorrect === questions.length;

  const validation: WalletValidation = {
    seedPhrase,
    questionsAsked: questions.map(q => q.position),
    answersCorrect,
    validated,
    attempts: 1
  };

  // Guardar intento en localStorage para tracking
  try {
    const attempts = JSON.parse(localStorage.getItem('wallet_creation_attempts') || '0');
    validation.attempts = attempts + 1;
    localStorage.setItem('wallet_creation_attempts', JSON.stringify(validation.attempts));
    
    if (validated) {
      localStorage.setItem('wallet_validated', 'true');
      localStorage.removeItem('wallet_creation_attempts');
    }
  } catch (error) {
    console.error('Error al guardar intentos de validación:', error);
  }

  return validation;
}

/**
 * Verificar si una wallet ya ha sido validada
 */
export function isWalletValidated(): boolean {
  try {
    return localStorage.getItem('wallet_validated') === 'true';
  } catch (error) {
    console.error('Error al verificar validación de wallet:', error);
    return false;
  }
}

/**
 * Obtener número de intentos de validación
 */
export function getValidationAttempts(): number {
  try {
    return JSON.parse(localStorage.getItem('wallet_creation_attempts') || '0');
  } catch (error) {
    console.error('Error al obtener intentos de validación:', error);
    return 0;
  }
}

/**
 * Resetear estado de validación (para testing o re-validación)
 */
export function resetValidationState(): void {
  try {
    localStorage.removeItem('wallet_validated');
    localStorage.removeItem('wallet_creation_attempts');
    console.log('🔄 Estado de validación reseteado');
  } catch (error) {
    console.error('Error al resetear estado de validación:', error);
  }
}

/**
 * Generar preguntas de verificación más sofisticadas
 */
export function generateAdvancedSeedQuestions(seedPhrase: string[]): Array<{
  question: string;
  correctAnswer: string;
  type: 'position' | 'word_before' | 'word_after' | 'length';
  difficulty: 'easy' | 'medium' | 'hard';
}> {
  const questions = [];
  const usedPositions = new Set();

  // Pregunta tipo 1: Posición específica (fácil)
  const pos1 = Math.floor(Math.random() * seedPhrase.length);
  usedPositions.add(pos1);
  questions.push({
    question: `¿Cuál es la palabra #${pos1 + 1}?`,
    correctAnswer: seedPhrase[pos1],
    type: 'position' as const,
    difficulty: 'easy' as const
  });

  // Pregunta tipo 2: Palabra anterior/posterior (medio)
  if (seedPhrase.length > 2) {
    let pos2 = Math.floor(Math.random() * (seedPhrase.length - 1)) + 1;
    while (usedPositions.has(pos2) || usedPositions.has(pos2 - 1)) {
      pos2 = Math.floor(Math.random() * (seedPhrase.length - 1)) + 1;
    }
    
    questions.push({
      question: `¿Qué palabra viene ANTES de "${seedPhrase[pos2]}"?`,
      correctAnswer: seedPhrase[pos2 - 1],
      type: 'word_before' as const,
      difficulty: 'medium' as const
    });
  }

  // Pregunta tipo 3: Longitud de palabra (difícil)
  if (seedPhrase.length > 5) {
    const pos3 = Math.floor(Math.random() * seedPhrase.length);
    questions.push({
      question: `¿Cuántas letras tiene la palabra #${pos3 + 1}?`,
      correctAnswer: seedPhrase[pos3].length.toString(),
      type: 'length' as const,
      difficulty: 'hard' as const
    });
  }

  return questions;
}

/**
 * Validar respuestas avanzadas
 */
export function verifyAdvancedAnswers(
  seedPhrase: string[],
  questions: Array<{ correctAnswer: string; type: string }>,
  userAnswers: string[]
): { correct: boolean; score: number; feedback: string[] } {
  
  let correctCount = 0;
  const feedback: string[] = [];

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index]?.toLowerCase().trim();
    const correctAnswer = question.correctAnswer.toLowerCase().trim();
    
    if (userAnswer === correctAnswer) {
      correctCount++;
      feedback.push('✅ Correcto');
    } else {
      feedback.push(`❌ Incorrecto. La respuesta era: ${question.correctAnswer}`);
    }
  });

  const score = Math.round((correctCount / questions.length) * 100);
  const correct = score >= 70; // 70% mínimo para aprobar

  return {
    correct,
    score,
    feedback
  };
}
