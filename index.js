const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { initFileTasks } = require("./utils/taskUtils");
const { initFileUsers } = require("./utils/userUtils");
const { initFileCategories } = require("./utils/categoryUtils");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(taskRoutes);
app.use(userRoutes);
app.use(categoryRoutes);

initFileTasks();
initFileUsers();
initFileCategories();

//Endpoints

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json("Something went wrong");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
