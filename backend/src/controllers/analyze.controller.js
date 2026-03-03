const { cloneRepo, deleteRepo } = require("../services/git.service");
const simpleGit = require("simple-git");

exports.analyzeRepo = async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({
      error: "Repository URL is required"
    });
  }

  let repoPath;

  try {
    // 1️⃣ Clone
    repoPath = await cloneRepo(repoUrl);

    // 2️⃣ Extract commit count
    const git = simpleGit(repoPath);
    const log = await git.log();

    const totalCommits = log.total;

    // 3️⃣ Delete temp folder
    deleteRepo(repoPath);

    // 4️⃣ Send response
    res.json({
      totalCommits
    });

  } catch (error) {

    if (repoPath) {
      deleteRepo(repoPath);
    }

    res.status(400).json({
      error: error.message
    });
  }
};