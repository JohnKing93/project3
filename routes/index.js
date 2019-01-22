const path = require('path');
const router = require('express').Router();
const selectAllRoutes = require('./selectAll');
const addRoutes = require('./AddRecord');

// Get Routes
router.use('/api/all', selectAllRoutes);
router.use('/api/add', addRoutes);

// If no API routes are hit, send the React app
// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = router;
