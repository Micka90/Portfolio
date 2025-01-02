const tables = require('../../database/tables');

const add = async (req, res, next) => {
  try {
    const projectData = {
      name: req.body.title,
      description: req.body.description,
      project_image: req.file
        ? `${process.env.APP_HOST}/uploads/${req.file.filename}`
        : null,
      userId: req.auth ? req.auth.id : 1,
      repoGitHub: req.body.repo_github || null,
      projectLink: req.body.project_link || null,
    };

    const result = await tables.Project.add(projectData);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = await tables.Project.getOne(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    console.error('Erreur lors de la récupération :', err);
    res.status(500).json({ error: 'Erreur Interne Serveur' });
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await tables.Project.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error('Erreur lors de la récupération :', err);
    res.status(500).json({ error: 'Erreur Interne Serveur' });
  }
};

module.exports = { add, getAll, getOne };
