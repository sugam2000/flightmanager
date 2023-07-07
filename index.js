const {data_bridge}  = require('./server/data_bridge');
const {video_bridge} = require('./server/video_bridge');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Define the folder containing the file you want to serve
const publicFolder        = path.join(__dirname, 'public');
const index_filepath      = path.join(publicFolder,'index.html');
const dashboard_filepath  = path.join(publicFolder,'dashboard.html');
const controller_filepath = path.join(publicFolder,'controller.html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

data_bridge (5000,8081);
video_bridge(6000,8080);

app.get('/', (req, res) => {
  
  res.sendFile(index_filepath);
});

app.post('/login', (req, res) => {

  
  const username = req.body.username;
  const password = req.body.password;
 
  if (username == 'admin' && password == '123') {
    res.sendFile(dashboard_filepath);
    
  }

  else{
    res.send("invalid username or password");
  }
  
});

app.post('/controller',(req,res)=>{
  
  var authentication_code = req.body.Authentication;
  
  if(authentication_code == 'sugampatel'){
    res.sendFile(controller_filepath);
  }

  else{
    res.sendFile(dashboard_filepath);
  }

});;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
