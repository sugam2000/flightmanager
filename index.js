const {data_bridge}  = require('./server/data_bridge');
const {video_bridge} = require('./server/video_bridge');

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const dotenv     = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Define the folder containing the file you want to serve
const publicFolder        = path.join(__dirname, 'public');
const index_filepath      = path.join(publicFolder,'index.html');
const dashboard_filepath  = path.join(publicFolder,'dashboard.html');
const controller_filepath = path.join(publicFolder,'controller.html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

data_bridge (process.env.DATA_UDP_PORT,process.env.DATA_WEBSOCKET_PORT,process.env.ESP32_IP);
video_bridge(process.env.VIDEO_UDP_PORT,process.env.VIDEO_WEBSOCKET_PORT);

app.get('/',   (req, res) => {
  
      res.sendFile(index_filepath);
});

app.post('/login', (req, res) => {

  
  const username = req.body.username;
  const password = req.body.password;

  if (username == process.env.USERID && password == process.env.PASSWORD) {
    res.sendFile(dashboard_filepath);
    
  }

  else{
    res.send("invalid username or password");
  }
  
});

app.post('/controller',(req,res)=>{
  
  var authentication_code = req.body.Authentication;
  
  if(authentication_code == process.env.AUTHENTICATION_CODE){
    res.sendFile(controller_filepath);
  }

  else{
    res.sendFile(dashboard_filepath);
  }

});

app.get('/api_key',(req,res)=>{
    res.send(process.env.MAP_API_KEY);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
