const Zone = require('../models/zone');

const getAllZones = async (req, res) => {
    try {
        const zones = await Zone.find();
        res.status(200).json(zones);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getZoneById = async (req, res) => {
    try {
        const zone = await Zone.findById(req.params.id);
        if (!zone) return res.status(404).json({ message: 'Zone not found' });
        res.status(200).json(zone);
    } catch (err) {
        res.status(500).json({ message: 'Invalid ID format or server error' });
    }
};

const createZone = async (req, res) => {
    const zone = new Zone({
        zoneName: req.body.zoneName,
        municipality: req.body.municipality,
        department: req.body.department,
        totalPopulation: req.body.totalPopulation,
        communityLeaderName: req.body.communityLeaderName
    });
    try {
        const newZone = await zone.save();
        res.status(201).json(newZone);
    } catch (err) {
        res.status(400).json({ message: 'Validation failed: Please check required fields.', error: err.message });
    }
};

const updateZone = async (req, res) => {
    try {
        const updatedZone = await Zone.findByIdAndUpdate(
            req.params.id,
            {
                zoneName: req.body.zoneName,
                municipality: req.body.municipality,
                department: req.body.department,
                totalPopulation: req.body.totalPopulation,
                communityLeaderName: req.body.communityLeaderName
            },
            { new: true, runValidators: true } // runValidators ensures Mongoose schema rules are enforced on update
        );
        if (!updatedZone) return res.status(404).json({ message: 'Zone not found' });
        res.status(200).json(updatedZone);
    } catch (err) {
        res.status(400).json({ message: 'Update failed validation', error: err.message });
    }
};

const deleteZone = async (req, res) => {
    try {
        const zone = await Zone.findByIdAndDelete(req.params.id);
        if (!zone) return res.status(404).json({ message: 'Zone not found' });
        res.status(200).json({ message: 'Zone deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllZones, getZoneById, createZone, updateZone, deleteZone };