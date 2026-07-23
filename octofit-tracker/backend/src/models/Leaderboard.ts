import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    weeklyStreak: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);