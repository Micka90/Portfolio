const tables = require('../../database/tables');

const add = async (req, res, next) => {
  try {
    console.log("req.file:", req.file); // Log pour vérifier le fichier

    const uploadDest = `${process.env.APP_HOST}/uploads/`;
    const projectData = {
      name: req.body.title, // Titre du frontend mappé à "name"
      description: req.body.description,
      project_image: req.file ? `${uploadDest}${req.file.filename}` : null, // Chemin complet de l'image
      userId: req.auth ? req.auth.id : 1, // Utilisateur par défaut
    };

    console.log("Mapped projectData:", projectData);

    const result = await tables.Project.add(projectData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
};



module.exports = { add };

