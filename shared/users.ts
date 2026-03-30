// Shared types for user data between client and server

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastLogin: string;
  profile: UserProfile;
}

export interface UserProfile {
  completedModules: string[];
  quizScores: QuizScore[];
  gameProgress: GameProgress[];
  learningProgress: LearningProgress;
  preferences: UserPreferences;
}

export interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number; // in seconds
  categoryScores: { [category: string]: { correct: number; total: number } };
}

export interface GameProgress {
  gameId: string;
  level: number;
  score: number;
  achievements: string[];
  lastPlayed: string;
  timeSpent: number;
}

export interface LearningProgress {
  modulesCompleted: string[];
  totalTimeSpent: number; // in minutes
  certificatesEarned: string[];
  currentStreak: number; // days
  lastActivity: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  notifications: boolean;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserStats {
  totalQuizzes: number;
  averageQuizScore: number;
  modulesCompleted: number;
  totalTimeSpent: number;
  totalGames: number;
  totalAchievements: number;
  currentStreak: number;
  certificatesEarned: number;
}

// API Response Types
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  errors?: any[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface QuizSubmission {
  quizId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  categoryScores: { [category: string]: { correct: number; total: number } };
}

export interface GameSubmission {
  gameId: string;
  level: number;
  score: number;
  achievements: string[];
  timeSpent: number;
}

export interface LearningUpdate {
  moduleId: string;
  timeSpent: number;
}
