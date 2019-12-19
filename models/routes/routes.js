module.exports = (app) => {
const data = require("../controllers/export.js");
const checkauth = require("../../checkauth");
const Joi = require('joi');
const expressJoi = require('express-joi-validator');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      console.log(req.body)
        callback(null, 'uploads')
    },
    filename: function(req, file, callback) {
         callback(null, `imageupload_${file.originalname}`)
    }
  });
  var upload = multer({ storage : storage});
const schema = {
    query: {
        
    },
    body: {
        firstname: Joi.string().min(5).max(20).required(),
        lastname: Joi.string().min(5).max(20).required()

    },
    params: {
    }
}








app.post('/register',upload.single("file"),data.register,expressJoi(schema));
app.get('/getdata',data.findAll);
app.get('/userdata/:Id',data.findOne);
app.put('/update/:Id', data.update);
app.delete("/delete/:Id",data.delete)
app.post("/login",data.login)
app.get("/verify",checkauth,data.verify)
 }
