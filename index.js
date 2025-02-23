const express=require("express");
const { createTodo,updateTodo } = require("./validate");
const { todo } = require("./mongodb");

const app=express();
app.use(express.json());

app.post("/todo",async function(req,res){
    const createPayload=req.body;
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"You sent wrong message",
        });
        return;
    }
    
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    });

    res.json({
        msg:"Todo created"
    });
});

app.get("/todos",async function(req,res){
      const todos=await todo.find({});

      res.json({
        todos
      });
});

app.put("/completed",async function(req,res){
      const updatePayload=req.body;
      const parsePayload=updateTodo.safeParse(updatePayload);
      if(!parsePayload.success){
        res.status(411).json({
            msg:" you update wrong"
        });
              return;
      }
      await todo.updateOne({
        _id: req.body.id 
      },{
           completed: true 
      });
      res.json({
        msg: "Todo marked as completed"
      });
});

app.listen(3001,()=>{
    console.log("server is running")
});