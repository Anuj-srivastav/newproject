const schema = require("../schema")
const jwt = require("jsonwebtoken")

exports.register = (req,res) => {
    if(!req.body.firstname) {
        return res.status(400).send({
            message: "firstname can't be empty"
        });
    }

    if(!req.body.lastname) {
        return res.status(400).send({
            message: "lastname can't be empty"
        });
    }

else {
    
    // Create a Note
    const user = new schema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        file:req.file.filename
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.json({message:data,info:"data added successfully"});
    }).catch(err => {
        res.status(500).json({message:"operation is failed"
            
        });
    });
}
}
    exports.findAll = (req, res) => {
        schema.find()
        .then(notes => {
            res.json({employeedata:notes});
        }).catch(err => {
            res.status(500).json({
                message:"Some error occurred while retrieving notes."
            });
        });
    };
    exports.findOne = (req, res) => {
        schema.findById(req.params.Id)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });            
            }
            res.json({message:note});
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
    };
    
    exports.update = (req, res) => {
        // Validate Request
       
        
    
        // Find note and update it with the request body
        schema.findByIdAndUpdate(req.params.Id, 
            req.body,function(err,post){
                if(err) return next(err);
                res.json({employeedata:post});
                res.json({message:"updated successfully"})
            })
        
            
        
    };
    exports.delete = (req,res) => {
        schema.findByIdAndRemove(req.params.id,req.body,function(err,data){
            if (err) return next(err);
            res.json({message:"data is successfuly deleteds"})
            
        })
    }

    exports.login = (req,res) => {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        schema.findOne({firstname:firstname,lastname:lastname},function(err,data){
            if (err) {
res.json({error:err})
            }
            if (!data) {
                res.status(400).json({message:"login failed"})
            }
            var token=jwt.sign({firstname:"anuj"},"supersecret",{expiresIn:"1h"});
            res.json({token:token,userdetails:data})
        })
    }
    exports.verify = (req,res) => {
        jwt.verify(req.token,"supersecret",(err,authdata)=> {
            if (err) {
              res.json({message:"login is failed",error:err});
            }
            else {
              res.json({message:"token verified successfully",
              Userinformation:authdata})
            }
          })
    }
