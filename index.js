const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./database.js');

mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept"
    );
    next();
})

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
