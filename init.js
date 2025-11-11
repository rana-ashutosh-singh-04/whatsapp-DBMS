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
        from:"Ashutosh",
        to:"Aman",
        msg:"school ja school",
        created_at: new Date(),
    },
     {
        from:"sahil",
        to:"Aman ",
        msg:"randwa kahi ka ! ",
        created_at: new Date(),
    },
     {
        from:"Aman",
        to:"Aryan",
        msg:"bhabhi se kab milaoge ? ",
        created_at: new Date(),
    },
])

Chat.insertMany(allchats)