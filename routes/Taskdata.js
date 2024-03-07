
const express = require('express');
const router = express.Router();
const taskdata = require('../models/TasksDataSchema');
router.post("/taskdata", async (req, res) => {
    try {
        console.log(req.body)
        await taskdata.create({
            task: req.body.task,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            user: req.body.userId,
            status:req.body.status
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = router;