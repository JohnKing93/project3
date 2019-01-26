const router = require('express').Router();
const userRoutes = require('./users');
const projectRoutes = require('./projects');
const projectCommentRoutes = require('./projectComments');
const projectMemberRoutes = require('./projectMembers');
const projectMilestoneRoutes = require('./projectMilestones');
const ideaRoutes = require('./ideas');
const ideaVoteRoutes = require('./ideaVotes');
const ideaCommentRoutes = require('./ideaComments');
const incentiveRoutes = require('./incentives');
const incetiveRedeemedRoutes = require('./incentiveRedeemed');
const timesheetRoutes = require('./timesheets');
const permissionRoutes = require('./permissions');
const statusRoutes = require('./status');

// User Routes
router.use('/users', userRoutes);

// Project Routes
router.use('/projects', projectRoutes);

// Project Comment Routes
router.use('/projectcomments', projectCommentRoutes);

// Project Member Routes
router.use('/projectmembers', projectMemberRoutes);

// Project Milestone Routes
router.use('/projectmilestones', projectMilestoneRoutes);

// Idea Routes
router.use('/ideas', ideaRoutes);

// Idea Vote Routes
router.use('/ideavotes', ideaVoteRoutes);

// Idea Comment Routes
router.use('/ideacomments', ideaCommentRoutes);

// Incentive Routes
router.use('/incentives', incentiveRoutes);

// Incentive Redeemed Routes
router.use('/incentivesredeemed', incetiveRedeemedRoutes);

// Timesheet Routes
router.use('/timesheets', timesheetRoutes);

// Permission Routes
router.use('/permissions', permissionRoutes);

// Status Routes
router.use('/status', statusRoutes);

module.exports = router;
