import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Mona Patel',
        email: 'mona.patel@example.com',
        fitnessLevel: 'advanced',
        favoriteActivity: 'trail running',
        joinedAt: new Date('2026-01-12'),
      },
      {
        name: 'Diego Ramirez',
        email: 'diego.ramirez@example.com',
        fitnessLevel: 'intermediate',
        favoriteActivity: 'cycling',
        joinedAt: new Date('2026-02-03'),
      },
      {
        name: 'Priya Chen',
        email: 'priya.chen@example.com',
        fitnessLevel: 'beginner',
        favoriteActivity: 'yoga',
        joinedAt: new Date('2026-03-18'),
      },
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        fitnessLevel: 'intermediate',
        favoriteActivity: 'strength training',
        joinedAt: new Date('2026-04-07'),
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Velocity Vipers',
        motto: 'Fast miles, steady smiles',
        captain: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Crushers',
        motto: 'Build strength together',
        captain: users[3]._id,
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Trail run',
        durationMinutes: 52,
        caloriesBurned: 610,
        activityDate: new Date('2026-07-19'),
      },
      {
        user: users[1]._id,
        type: 'Cycling intervals',
        durationMinutes: 45,
        caloriesBurned: 520,
        activityDate: new Date('2026-07-20'),
      },
      {
        user: users[2]._id,
        type: 'Morning yoga',
        durationMinutes: 30,
        caloriesBurned: 160,
        activityDate: new Date('2026-07-21'),
      },
      {
        user: users[3]._id,
        type: 'Upper-body strength',
        durationMinutes: 40,
        caloriesBurned: 390,
        activityDate: new Date('2026-07-22'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        points: 1280,
        rank: 1,
        weeklyStreak: 6,
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        points: 1115,
        rank: 2,
        weeklyStreak: 5,
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        points: 980,
        rank: 3,
        weeklyStreak: 4,
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        points: 740,
        rank: 4,
        weeklyStreak: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Trail Tempo Builder',
        description: 'A mixed-pace run with hill surges for improving outdoor endurance.',
        difficulty: 'advanced',
        durationMinutes: 50,
        focusArea: 'cardio endurance',
      },
      {
        title: 'Desk Reset Mobility',
        description: 'Gentle hip, shoulder, and spine mobility for active recovery days.',
        difficulty: 'beginner',
        durationMinutes: 20,
        focusArea: 'mobility',
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'Compound lifts and bodyweight intervals for balanced strength.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        focusArea: 'strength',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
