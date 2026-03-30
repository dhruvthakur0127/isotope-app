import fs from 'fs';
import path from 'path';

// Simple JSON-based database for demo purposes
// In production, you would use a proper database like PostgreSQL, MongoDB, etc.

interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  name: string;
  createdAt: string;
  lastLogin: string;
  profile: {
    completedModules: string[];
    quizScores: QuizScore[];
    gameProgress: GameProgress[];
    learningProgress: LearningProgress;
    preferences: UserPreferences;
  };
}

interface QuizScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number; // in seconds
  categoryScores: { [category: string]: { correct: number; total: number } };
}

interface GameProgress {
  gameId: string;
  level: number;
  score: number;
  achievements: string[];
  lastPlayed: string;
  timeSpent: number;
}

interface LearningProgress {
  modulesCompleted: string[];
  totalTimeSpent: number; // in minutes
  certificatesEarned: string[];
  currentStreak: number; // days
  lastActivity: string;
}

interface UserPreferences {
  theme: 'dark' | 'light';
  notifications: boolean;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

class Database {
  private dbPath: string;
  private users: User[] = [];

  constructor() {
    this.dbPath = path.join(process.cwd(), 'data', 'users.json');
    this.ensureDataDirectory();
    this.loadUsers();
  }

  private ensureDataDirectory() {
    const dataDir = path.dirname(this.dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  private loadUsers() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const data = fs.readFileSync(this.dbPath, 'utf8');
        this.users = JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      this.users = [];
    }
  }

  private saveUsers() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.users, null, 2));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  // User Management
  async createUser(email: string, password: string, name: string): Promise<User> {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user: User = {
      id: this.generateId(),
      email,
      password, // In production, hash this!
      name,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      profile: {
        completedModules: [],
        quizScores: [],
        gameProgress: [],
        learningProgress: {
          modulesCompleted: [],
          totalTimeSpent: 0,
          certificatesEarned: [],
          currentStreak: 0,
          lastActivity: new Date().toISOString()
        },
        preferences: {
          theme: 'dark',
          notifications: true,
          language: 'en',
          difficulty: 'beginner'
        }
      }
    };

    this.users.push(user);
    this.saveUsers();
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      user.lastLogin = new Date().toISOString();
      this.saveUsers();
    }
    return user || null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  // Quiz Progress Tracking
  async saveQuizScore(userId: string, quizScore: Omit<QuizScore, 'completedAt'>): Promise<void> {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    const fullQuizScore: QuizScore = {
      ...quizScore,
      completedAt: new Date().toISOString()
    };

    user.profile.quizScores.push(fullQuizScore);
    user.profile.learningProgress.lastActivity = new Date().toISOString();
    
    this.saveUsers();
  }

  // Game Progress Tracking
  async saveGameProgress(userId: string, gameProgress: Omit<GameProgress, 'lastPlayed'>): Promise<void> {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    const existingGameIndex = user.profile.gameProgress.findIndex(g => g.gameId === gameProgress.gameId);
    
    const fullGameProgress: GameProgress = {
      ...gameProgress,
      lastPlayed: new Date().toISOString()
    };

    if (existingGameIndex >= 0) {
      user.profile.gameProgress[existingGameIndex] = fullGameProgress;
    } else {
      user.profile.gameProgress.push(fullGameProgress);
    }

    user.profile.learningProgress.lastActivity = new Date().toISOString();
    this.saveUsers();
  }

  // Learning Progress
  async updateLearningProgress(userId: string, moduleId: string, timeSpent: number): Promise<void> {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    if (!user.profile.completedModules.includes(moduleId)) {
      user.profile.completedModules.push(moduleId);
    }

    if (!user.profile.learningProgress.modulesCompleted.includes(moduleId)) {
      user.profile.learningProgress.modulesCompleted.push(moduleId);
    }

    user.profile.learningProgress.totalTimeSpent += timeSpent;
    user.profile.learningProgress.lastActivity = new Date().toISOString();
    
    this.saveUsers();
  }

  // User Preferences
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<void> {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    user.profile.preferences = { ...user.profile.preferences, ...preferences };
    this.saveUsers();
  }

  // Analytics
  async getUserStats(userId: string): Promise<any> {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    const totalQuizzes = user.profile.quizScores.length;
    const averageQuizScore = totalQuizzes > 0 
      ? user.profile.quizScores.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions), 0) / totalQuizzes * 100
      : 0;

    const totalGames = user.profile.gameProgress.length;
    const totalAchievements = user.profile.gameProgress.reduce((sum, game) => sum + game.achievements.length, 0);

    return {
      totalQuizzes,
      averageQuizScore: Math.round(averageQuizScore),
      modulesCompleted: user.profile.learningProgress.modulesCompleted.length,
      totalTimeSpent: user.profile.learningProgress.totalTimeSpent,
      totalGames,
      totalAchievements,
      currentStreak: user.profile.learningProgress.currentStreak,
      certificatesEarned: user.profile.learningProgress.certificatesEarned.length
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get all users (admin function)
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.users.map(({ password, ...user }) => user);
  }
}

// Export singleton instance
export const db = new Database();
export type { User, QuizScore, GameProgress, LearningProgress, UserPreferences };
