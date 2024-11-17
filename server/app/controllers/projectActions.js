const table = require('../../database/tables');
const upload = require('../services/fileUpload');

const add = async (req, res, next) => {
  try {
    // Vérifiez si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Ajoutez le chemin du fichier téléchargé à la requête pour le stocker en base de données
    const createProject = {
      ...req.body,
      image: `/uploads/${req.file.filename}`, // Chemin de l'image sauvegardée
    };

    const result = await table.Project.add(createProject);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { add };

