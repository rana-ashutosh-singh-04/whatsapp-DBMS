const express = require("express");
const app = express();
const path = require("path");
const chat = require("./models/chat");
const mongoose = require('mongoose');
const ejs = require("ejs");
const methodOverride = require("method-override")
const ExpressError = require("./ExpressError")
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

//New route
app.get("/chat/new",(req,res)=>{
  // throw new ExpressError(404,"page not found");
  res.render("new.ejs")
})

// create Route
app.post("/chats",(req,res)=>{
  try{
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
  res.redirect("/chats")
  }catch (err){
    next(err);
  }
 }
)

function asyncWrap(fn){
  return function (req,res,next){
    fn(req,res,next).catch((err)=>next(err));
  };
}
// NEW - show Route
app.get("/chats/:id", asyncWrap (async(req,res,next)=>{
let {id} = req.params;

  // if(!mongoose.Types.ObjectId.isValid(id)){
  //   throw new ExpressError(500,"Invalid chat Id");
  // }
   let chats = await chat.findById(id);
  if(!chats){
    return next( new ExpressError(404,"chat not found"));
  }
  res.render("edit.ejs",{chats});
  }
  
))

// edit route
app.get("/chats/:id/edit", asyncWrap(async(req,res)=>{
  
     let {id} = req.params;
  let chats = await chat.findById(id);
  res.render("edit.ejs",{chats})
  }
 
))

// update route
app.put("/chats/:id",asyncWrap(async(req,res)=>{
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
  }
))

// Dstroy Route
app.delete("/chats/:id",async(req,res)=>{
  try{
  let {id} = req.params;
  let deletedChat = await chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
  }
  catch(err){
    next(err)
  }
  
})

const handleValidationErr = (err)=>{
  console.dir(err.message);
}

app.use((err,req,res,next)=>{
  console.log(err.name);
  if(err.name==="validationError"){
    console.log("This was a validation error, please follow rules")
    err = handleValidationErr(err);
  }
  next(err);
})

// Error Handelling Middleware
app.use((err,req,res,next)=>{
  console.error(err);
    const {status = 500, message = "some error occured"} = err
    res.status(status).send(message);
})


// Root directory
app.get("/",(req,res)=>{
  res.send("root is working")
})

app.listen(8080,()=>{
  console.log(" server is listening on port 8080")
})
