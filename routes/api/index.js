const router = require('express').Router();
const db = require('../../models');

router.get('/all/:model', (req, res) => {
  let model;

  // Determine which model was passed from req.params
  switch (req.params.model) {
    case 'users':
      model = 'User';
      break;
    case 'projects':
      model = 'Project';
      break;
    case 'ideas':
      model = 'Idea';
      break;
    case 'timesheets':
      model = 'Timesheet';
      break;
    default:
      model = '404';
  }

  // If no models match then return 404 and stop processing
  if (model === '404') {
    return res.status(404).end();
  }

  // Query database for all records by model
  db[model].findAll({}).then((results) => {
    res.status(200).json(results);
  }).catch((err) => {
    console.error(`Error returned from query ===> ${err}.`);
  });
});

module.exports = router;
