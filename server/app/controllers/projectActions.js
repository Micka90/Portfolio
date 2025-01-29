const tables = require('../../database/tables');

const add = async (req, res, next) => {
  try {
    console.log('📌 Données reçues dans la requête :', req.body);
    console.log('📌 Fichier reçu :', req.file);

    const projectData = {
      name: req.body.title,
      description: req.body.description,
      project_image: req.file
        ? `${process.env.APP_HOST}/uploads/${req.file.filename}`
        : 'default.jpg', 
      userId: req.auth ? req.auth.id : 1,
      repoGitHub: req.body.repo_github || 'Non spécifié',
      projectLink: req.body.project_link || 'Non spécifié',
    };

    console.log('📌 Données du projet avant insertion :', projectData);

    const result = await tables.project.add(projectData);
    
    if (!result || !result.insertId) {
      throw new Error('L’ID du projet inséré est invalide ou non récupéré.');
    }

    const projectId = result.insertId;
    console.log(`✅ Projet inséré avec succès, ID: ${projectId}`);

    if (!tables.database) {
      console.error('❌ ERREUR: tables.database est undefined !');
      throw new Error('tables.database is not defined.');
    }

    if (req.body.stackIds) {
      const stackIds = Array.isArray(req.body.stackIds) ? req.body.stackIds : [req.body.stackIds];
      console.log('📌 Stacks reçues pour insertion :', stackIds);

      for (const idStack of stackIds) {
        console.log(`📌 Ajout de la stack ${idStack} au projet ${projectId}`);
        await tables.database.query(
          'INSERT INTO Project_Stack (idProject, idStack) VALUES (?, ?)',
          [projectId, idStack]
        );
        console.log(`✅ Stack ${idStack} associée au projet ${projectId}`);
      }
    }

    res.status(201).json({ message: 'Project added successfully!', projectId });
  } catch (err) {
    console.error('❌ Erreur lors de l’ajout du projet:', err);
    next(err);
  }
};



const addStacksToProject = async (req, res, next) => {
  try {
    const { idProject, stackIds } = req.body; 
    for (const idStack of stackIds) {
      await tables.database.query(
        'INSERT INTO Project_Stack (idProject, idStack) VALUES (?, ?)',
        [idProject, idStack]
      );
    }
    res.status(200).json({ message: 'Stacks ajoutées au projet' });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const project = await tables.project.getOne(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    
    const [stacks] = await tables.database.query(
      `SELECT s.idStack, s.name, s.icon FROM Project_Stack ps
       JOIN Stack s ON ps.idStack = s.idStack
       WHERE ps.idProject = ?`,
      [req.params.id]
  );

    project.stacks = stacks;

    res.status(200).json(project);
  } catch (err) {
    console.error('Erreur lors de la récupération du projet:', err);
    res.status(500).json({ error: 'Erreur Interne Serveur' });
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await tables.project.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error('Erreur lors de la récupération :', err);
    res.status(500).json({ error: 'Erreur Interne Serveur' });
  }
};

module.exports = { add, getAll, getOne, addStacksToProject };
