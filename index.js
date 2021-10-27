
//Add Dependencies
const express= require('express'); //Express to run server
const bodyParser = require('body-parser'); //Dependency
const cors=require('cors');
const {google} = require('googleapis'); //To use google APIs
const app=express();; //App instance

//Configure express to use bodyparser as middle-ware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors()); //Cors is used for cross origin allowance

app.use(express.static('www')); //Set folder
app.get('/', (req,res) => {
    res.json("API is running");
})
const PORT = process.env.PORT || 8000


//Set up server
const listening = () => {
    console.log('server is running');
    console.log(`running on localhost 8000`);
}
const server = app.listen(PORT, listening);
