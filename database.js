const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://mani_45:manigsn123@cluster0.qfqabv2.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected successfully");

        const data= await mongoose.connection.db.collection("users");
        const ans=await data.find({}).toArray();
        const tasksdata=await mongoose.connection.db.collection("taskdatas");
        const ans2=await tasksdata.find({}).toArray();


        global.usersdata = ans;
        global.taskData=ans2;
        
        

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);

    }
};

module.exports = mongoDB;
