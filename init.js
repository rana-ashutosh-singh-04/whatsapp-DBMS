const mongoose = require('mongoose');
const chat = require("./models/chat.js");
const Chat = require('./models/chat.js');
main()
.then(()=>{
 console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = ([
    {
        from:"neha",
        to:"priya",
        msg:"send me your exam sheets",
        created_at: new Date(),
    },
     {
        from:"priya",
        to:"supriya",
        msg:"send me your exam sheets",
        created_at: new Date(),
    },
     {
        from:"neha",
        to:"niranjan",
        msg:"send me your exam sheets",
        created_at: new Date(),
    },
])

Chat.insertMany(allchats)