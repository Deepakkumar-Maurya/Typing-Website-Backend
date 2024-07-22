import express from 'express';
import { getTestHistory, saveHistory, getLeaderboard, getStats } from '../controllers/test.controller';
import isAuth from '../middlewares/auth.middleware';

const router = express.Router();

// ** routes
router.get('/getHistory', isAuth, getTestHistory);
router.post('/saveHistory', isAuth, saveHistory);
router.get('/getLeaderboard', getLeaderboard);
router.get('/getStats', isAuth, getStats);

export default router;