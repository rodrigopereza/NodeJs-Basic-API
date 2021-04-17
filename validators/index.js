exports.createPostValidator = (req, res, next) =>{
    //Title
    req.check("title","Write a Title").notEmpty();
    req.check("title","Title must be between 4 to 150 characters").isLength({
        min: 4, max: 150
    });
    //Body
    req.check("body","Write a Body").notEmpty;
    req.check("body","Body must be between 4 to 200 characters").isLength({
        min: 4, max: 200
    });
    //Check  for erros
    const errors  = req.validationErrors()
    //If error show the first one as they hapen
    if(errors){
        const firstError = errors.map((error)=>error.msg)[0];
        return res.status(400).json(({error: firstError}));
    }

    //Proceed to the next middleware
    next();

};