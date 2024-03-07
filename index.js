const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./database.js');
const cors = require('cors');


mongoDB();

app.use(cors({
  origin: 'https://frontend-xyh9.onrender.com'
}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());

app.use('/api', require("./routes/createUser.js"));
app.use('/api', require("./routes/LoadUsers.js"));
app.use('/api', require("./routes/Taskdata.js"));
app.use('/api', require("./routes/updateTask.js"));



app.use('/api', require("./routes/displayTasks.js"));


app.use('/api', require("./routes/OrderData.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
