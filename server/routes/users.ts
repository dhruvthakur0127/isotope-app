import { RequestHandler } from "express";
import { db } from "../database";
import { z } from "zod";

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const quizScoreSchema = z.object({
  quizId: z.string(),
  score: z.number(),
  totalQuestions: z.number(),
  timeSpent: z.number(),
  categoryScores: z.record(z.object({
    correct: z.number(),
    total: z.number()
  }))
});

const gameProgressSchema = z.object({
  gameId: z.string(),
  level: z.number(),
  score: z.number(),
  achievements: z.array(z.string()),
  timeSpent: z.number()
});

const learningProgressSchema = z.object({
  moduleId: z.string(),
  timeSpent: z.number()
});

// Register new user
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    
    const user = await db.createUser(email, password, name);
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    } else if (error instanceof Error && error.message === 'User already exists') {
      res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

// Login user
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await db.authenticateUser(email, password);
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    } else {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

// Get user profile
export const handleGetProfile: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
      return;
    }
    
    const user = await db.getUserById(userId);
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Save quiz score
export const handleSaveQuizScore: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const quizData = quizScoreSchema.parse(req.body);
    
    await db.saveQuizScore(userId, quizData);
    
    res.json({
      success: true,
      message: 'Quiz score saved successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    } else {
      console.error('Save quiz score error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

// Save game progress
export const handleSaveGameProgress: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameData = gameProgressSchema.parse(req.body);
    
    await db.saveGameProgress(userId, gameData);
    
    res.json({
      success: true,
      message: 'Game progress saved successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    } else {
      console.error('Save game progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

// Update learning progress
export const handleUpdateLearningProgress: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { moduleId, timeSpent } = learningProgressSchema.parse(req.body);
    
    await db.updateLearningProgress(userId, moduleId, timeSpent);
    
    res.json({
      success: true,
      message: 'Learning progress updated successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
    } else {
      console.error('Update learning progress error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

// Get user statistics
export const handleGetUserStats: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const stats = await db.getUserStats(userId);
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update user preferences
export const handleUpdatePreferences: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const preferences = req.body;
    
    await db.updateUserPreferences(userId, preferences);
    
    res.json({
      success: true,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
