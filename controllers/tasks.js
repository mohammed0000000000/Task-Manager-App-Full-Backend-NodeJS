const Task = require("../modules/TaskSchema");
const asyncWrapper = require("../middleware/async");
const {createCustomError, CustomAPIError} = require("../errors/custom-error");


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({status: "success", data: {tasks, nbHits: tasks.length}});
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
});

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const taskDetails = await Task.findOne({_id: taskID});
    if (!taskDetails) {
        return next(createCustomError(`No Task with Id :${taskID}`, 404));
    }
    return res.status(200).json({taskDetails});

});

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const {taskName, completed} = req.body;
    const flag = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true,
    });
    if (!flag)
        return next(createCustomError(`No task with ID : ${taskID}`, 404));
    return res.status(200).json({id: taskID, data: req.body});
});

const deleteTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params;
    const flag = await Task.findByIdAndDelete({_id: taskID}).exec();
    console.log(flag);
    if (!flag) {
        return res.status(404).json({msg: `No Task With ID : ${taskID}`});
    }
    return res.status(200).json({msg: "Task Deleted Succsessfully"});

});

module.exports = {getAllTasks, createTask, getTask, updateTask, deleteTask};
