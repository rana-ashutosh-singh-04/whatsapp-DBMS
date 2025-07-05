const express = require("express");
const app = express();
const path = require("path");
const chat = require("./models/chat.js");
const mongoose = require('mongoose');
const ejs = require("ejs");
const methodOverride = require("method-override")

app.set("views",path.join(__dirname,"views"));
app.set("view engine",ejs);
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

main()
.then(()=>{
 console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index Route
app.get("/chats",async(req,res)=>{
  let chats = await chat.find()
  // console.log(chats);
  res.render("index.ejs",{chats});
})

// Root directory
app.get("/",(req,res)=>{
  res.send("root is working")
})

//New route
app.get("/chat/new",(req,res)=>{
  res.render("new.ejs")
})

// create Route
app.post("/chats",(req,res)=>{
  let {from,msg,to} = req.body;
  let newChat = new chat({
    from: from,
    to:to,
    msg:msg,
    created_at:new Date(),
  });
  newChat
  .save()
  .then((res)=>{
    console.log("chat was saved")
  })
  .catch((err)=>{
    console.log(err);
  })
  console.log(newChat)
  res.redirect("/chats")}
)

// edit route
app.get("/chats/:id/edit",async(req,res)=>{
  let {id} = req.params;
  let chats = await chat.findById(id);
  res.render("edit.ejs",{chats})
})

// update route
app.put("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let {msg: newMsg} = req.body;
  console.log(newMsg)
  let updatedChat = await chat.findByIdAndUpdate(
  id,
  {msg:newMsg},
  {runValidators: true, new:true}
  )
  console.log(updatedChat)
  res.redirect("/chats")
  
})

// Dstroy Route
app.delete("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let deletedChat = await chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
  
})
app.listen(8080,()=>{
  console.log(" server is listening on port 8080")
})
