const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Beauty:25689Beauty@cluster0.xiuej.mongodb.net/todos");
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo =mongoose.model('todos',todoSchema);
module.exports={
    todo
}