const fs = require("fs-extra");

const DATAFILE = "./tasks.json";

const initFileTasks = () => {
  fs.ensureFileSync(DATAFILE);
  if (!fs.readJsonSync(DATAFILE, { throws: false })) {
    fs.writeJsonSync(DATAFILE, []);
  }
};

// Leer tareas
const readTasks = () => {
  try {
    return fs.readJsonSync(DATAFILE);
  } catch (err) {
    console.error("Error reading tasks:", err);
    return [];
  }
};

// Guardar tareas
const saveTasks = (tasks) => {
  try {
    fs.writeJsonSync(DATAFILE, tasks);
  } catch (err) {
    console.error("Error saving tasks:", err);
  }
};

module.exports = {
  initFileTasks,
  readTasks,
  saveTasks,
};
