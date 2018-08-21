const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Device = require('./models/devices'); 

//Connect to mongoDB
mongoose.connect(process.env.MONGO_URL);



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(`${__dirname}/public`));

// it gets the documents that the apidoc completed
app.get('/docs', (req, res) => {
 res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});
   

// a small test to see if it works
app.get('/api/test', (req, res) => {res.send('The API is working!');});

// gets the devices format info
app.get('/api/devices', (req, res) => {Device.find({}, (err, devices) => {
    if (err == true) {
       return res.send(err);
    } else {
      return res.send(devices);
    }
    });
});

// this posts the devices info
app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
    name,
    user,
    sensorData
    });
    newDevice.save(err => {
    return err
    ? res.send(err)
    : res.send('successfully added device and data');
    });
   });

   app.post('/api/send-command', (req,res) => {

     console.log(req.body);
 })
   
app.listen(port, () => {console.log(`listening on port ${port}`);});

