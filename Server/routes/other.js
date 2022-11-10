const fs = require ('fs')
const { Router } = require("express"); 
const router = new Router();

router.post("/writeToFile", async (req, res) => {
const obj = req.body;
const myJson = JSON.stringify(obj) + "\n";

try{
    if(myJson)
    {
        fs.writeFile('CameraData.txt',myJson,{ flag: 'a+' },err => {
            if(err)
            {
                console.log(err);
            }
        })
        return res.status(200).send("successful")
    }
    else
    {
        return res.status(400).send("failed")
    }
}
catch(error)
{
    return res.status(400)
}
})
    module.exports = router;


