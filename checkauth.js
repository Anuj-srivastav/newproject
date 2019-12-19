const  checkauth = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header!== 'undefined') {
        const bearer = header.split(' ');
        const code = bearer[1];

        req.token = code;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.status(500).json({message:"not working"});
    }
} 
module.exports = checkauth;