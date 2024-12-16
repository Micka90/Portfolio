const tables = require('../../database/tables');

const add = async (req, res, next) => {
  try {
    console.log("req.file:", req.file); 

    const uploadDest = `${process.env.APP_HOST}/uploads/`;
    const projectData = {
      name: req.body.title, 
      description: req.body.description,
      project_image: req.file ? `${process.env.APP_HOST}/uploads/${req.file.filename}` : null,
      userId: req.auth ? req.auth.id : 1, 
    };

    const result = await tables.Project.add(projectData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
};


const getAll = async (req, res, next) => {
  try {
    const result = await tables.Project.getAll();
    console.log("Données renvoyées à l'API :", result); 
    res.status(200).json(result); 
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    res.status(500).json({ error: "Erreur Interne Serveur" });
  }
};



module.exports = { add, getAll };

