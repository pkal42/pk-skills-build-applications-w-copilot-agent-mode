import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const router = Router();

router.get('/users/', async (_req, res, next) => {
  try {
    const data = await User.find().sort({ name: 1 });
    res.json({ resource: 'users', data });
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const data = await Team.find().populate('captain members').sort({ name: 1 });
    res.json({ resource: 'teams', data });
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const data = await Activity.find().populate('user').sort({ activityDate: -1 });
    res.json({ resource: 'activities', data });
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const data = await Leaderboard.find().populate('user team').sort({ rank: 1 });
    res.json({ resource: 'leaderboard', data });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const data = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json({ resource: 'workouts', data });
  } catch (error) {
    next(error);
  }
});

export default router;