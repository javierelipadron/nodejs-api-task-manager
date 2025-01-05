const fs = require("fs-extra");

const DATAFILE = "./users.json";

const initFileUsers = () => {
  fs.ensureFileSync(DATAFILE);
  if (!fs.readJsonSync(DATAFILE, { throws: false })) {
    fs.writeJsonSync(DATAFILE, []);
  }
};

// Leer tareas
const readUsers = () => {
  try {
    return fs.readJsonSync(DATAFILE);
  } catch (err) {
    console.error("Error reading users:", err);
    return [];
  }
};

// Guardar tareas
const saveUsers = (tasks) => {
  try {
    fs.writeJsonSync(DATAFILE, tasks);
  } catch (err) {
    console.error("Error saving users:", err);
  }
};

module.exports = {
  initFileUsers,
  readUsers,
  saveUsers,
};
