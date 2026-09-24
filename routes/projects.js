const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const { isAuthenticated } = require('../middleware/authenticate');

// Public GET routes (Open to everyone)
router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);

// Protected routes (Require GitHub OAuth Authentication)
router.post('/', isAuthenticated, projectsController.createProject);
router.put('/:id', isAuthenticated, projectsController.updateProject);
router.delete('/:id', isAuthenticated, projectsController.deleteProject);

module.exports = router;