const fs = require("fs-extra");

const DATAFILE = "./categories.json";

const initFileCategories = () => {
  fs.ensureFileSync(DATAFILE);
  if (!fs.readJsonSync(DATAFILE, { throws: false })) {
    fs.writeJsonSync(DATAFILE, []);
  }
};

// Leer categorias
const readCategories = () => {
  try {
    return fs.readJsonSync(DATAFILE);
  } catch (err) {
    console.error("Error reading categories:", err);
    return [];
  }
};

// Guardar categorias
const saveCategories = (tasks) => {
  try {
    fs.writeJsonSync(DATAFILE, tasks);
  } catch (err) {
    console.error("Error saving categories:", err);
  }
};

const categoryExists = (id) => {
  const categories = readCategories();
  return categories.find((category) => category.id === id);
};

module.exports = {
  initFileCategories,
  readCategories,
  saveCategories,
  categoryExists,
};
