const Project = require('../models/project');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('zoneId');
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('zoneId');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: 'Invalid ID format or server error' });
    }
};

const createProject = async (req, res) => {
    const project = new Project({
        projectName: req.body.projectName,
        projectType: req.body.projectType,
        budgetQuetzales: req.body.budgetQuetzales,
        status: req.body.status,
        startDate: req.body.startDate,
        estimatedEndDate: req.body.estimatedEndDate,
        beneficiaryFamiliesCount: req.body.beneficiaryFamiliesCount,
        zoneId: req.body.zoneId
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: 'Validation failed: Please check required fields.', error: err.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.projectName = req.body.projectName;
        project.projectType = req.body.projectType;
        project.budgetQuetzales = req.body.budgetQuetzales;
        project.status = req.body.status;
        project.startDate = req.body.startDate;
        project.estimatedEndDate = req.body.estimatedEndDate;
        project.beneficiaryFamiliesCount = req.body.beneficiaryFamiliesCount;
        project.zoneId = req.body.zoneId;

        const updatedProject = await project.save();
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: 'Update failed validation', error: err.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };