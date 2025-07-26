
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'finance' | 'progress' | 'learning' | 'community';
  unlocked: boolean;
  unlockedAt?: Date;
}

interface UserStats {
  totalPoints: number;
  level: number;
  streak: number;
  completedModules: number;
  totalExpenses: number;
  budgetGoalsMet: number;
}

export const useGamification = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    level: 1,
    streak: 0,
    completedModules: 0,
    totalExpenses: 0,
    budgetGoalsMet: 0
  });
  const { user } = useAuth();

  const defaultAchievements: Achievement[] = [
    {
      id: 'first-module',
      title: 'Getting Started',
      description: 'Complete your first module',
      icon: '🎯',
      points: 50,
      category: 'progress',
      unlocked: false
    },
    {
      id: 'budget-master',
      title: 'Budget Master',
      description: 'Stay within budget for 30 days',
      icon: '💰',
      points: 100,
      category: 'finance',
      unlocked: false
    },
    {
      id: 'streak-warrior',
      title: 'Streak Warrior',
      description: 'Log expenses for 7 days straight',
      icon: '🔥',
      points: 75,
      category: 'finance',
      unlocked: false
    },
    {
      id: 'french-learner',
      title: 'Bonjour!',
      description: 'Complete basic French lessons',
      icon: '🇫🇷',
      points: 60,
      category: 'learning',
      unlocked: false
    },
    {
      id: 'community-helper',
      title: 'Community Helper',
      description: 'Help 5 other students in the hub',
      icon: '🤝',
      points: 80,
      category: 'community',
      unlocked: false
    }
  ];

  useEffect(() => {
    if (user) {
      loadUserAchievements();
      calculateUserStats();
    }
  }, [user]);

  const loadUserAchievements = async () => {
    // Load achievements from localStorage for now (can be moved to Supabase later)
    const saved = localStorage.getItem(`achievements_${user?.id}`);
    if (saved) {
      setAchievements(JSON.parse(saved));
    } else {
      setAchievements(defaultAchievements);
    }
  };

  const calculateUserStats = async () => {
    if (!user) return;

    try {
      // Get user progress
      const { data: progress } = await supabase
        .from('user_progress')
        .select('completed_modules')
        .eq('user_id', user.id)
        .single();

      // Get expenses count
      const { count: expenseCount } = await supabase
        .from('expenses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const completedModules = progress?.completed_modules?.length || 0;
      const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
      
      setUserStats({
        totalPoints,
        level: Math.floor(totalPoints / 100) + 1,
        streak: calculateStreak(),
        completedModules,
        totalExpenses: expenseCount || 0,
        budgetGoalsMet: 0 // Calculate based on budget adherence
      });
    } catch (error) {
      console.error('Error calculating user stats:', error);
    }
  };

  const calculateStreak = () => {
    // Calculate consecutive days of activity (simplified)
    const lastActivity = localStorage.getItem(`last_activity_${user?.id}`);
    if (!lastActivity) return 0;
    
    const days = Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 7 - days); // Simple streak calculation
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => {
      const updated = prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      );
      localStorage.setItem(`achievements_${user?.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const checkAchievements = (trigger: string, data?: any) => {
    // Check for achievement unlocks based on user actions
    if (trigger === 'module_completed' && !achievements.find(a => a.id === 'first-module')?.unlocked) {
      unlockAchievement('first-module');
    }
    
    if (trigger === 'expense_logged') {
      localStorage.setItem(`last_activity_${user?.id}`, new Date().toISOString());
      calculateUserStats();
    }
  };

  return {
    achievements,
    userStats,
    unlockAchievement,
    checkAchievements
  };
};
