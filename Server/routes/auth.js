const { Router } = require("express"); 
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr"); 
const User = require("../MongoModels/Users");
const router = new Router();
require("dotenv").config();
const cryptr = new Cryptr(process.env.JWT_KEY);


router.post("/register", async (req, res) => {
  const { FirstName, LastName, Phone, Password } = req.body;
  try {
    const exists = await User.findOne({ Phone });
    if (exists) {
      return res.status(400).send("User Exists");
    }
    const encryptedPassword = await cryptr.encrypt(Password) 
    const user = new User({ FirstName, LastName, Phone, Password: encryptedPassword });
    const resp = await user.save();
    const token = await jwt.sign(
      {
        phone: resp.Phone,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1H",
      }
    );

    return res.status(200).json({
      message: "You have successfully registered",
      token: token,
    });
  } catch (err) {
    res.send(err);
  }
});


router.post("/login", async (req, res) => {
  console.log("1");
  const { Phone, Password } = req.body;
  console.log(Phone,Password);
  if(!Password || !Phone) {
    return res.status(400).send("missing parameter");
  }
  try {
    const doc = await User.findOne({ Phone });
    const isEqual = await cryptr.decrypt(doc.Password) === Password;
    if (doc && isEqual) {
      const token = await jwt.sign(
        {
          phone: doc.Phone,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1H",
        }
      );
      return res.status(200).json({
        message: "Login successful",
        token: token,
        FirstName:doc.FirstName,
      });
    } else {
      throw new Error("User or Password not valid")
    }
  } catch (err) {
    return res.status(401).send(err);
  }
});

router.post("/verifyToken", async (req, res) => {
  const { authorization : token } = req.headers;

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_KEY);
      return res.status(200).send("OK");
    } else {
      throw new Error("token is not valid");
    }
  } catch (error) {
    return res.status(400).send("failed");
  }
});

router.put("/update", async (req, res) => {
  const { Phone, Password, NewPassword } = req.body;
  const { authorization : token } = req.headers;
  try {
    if (await jwt.verify(token, process.env.JWT_KEY)) {
      const body = jwt.decode(token);
      if(body)
      {
        const doc = await User.findOne({ Phone: Phone });
        const isEqual = await cryptr.decrypt(doc.Password) === Password; 
        if(doc && isEqual) {
          if(NewPassword.length >= 4)
          {
            const encryptedPassword = await cryptr.encrypt(NewPassword); 
            await doc.updateOne({ Password: encryptedPassword });
            return res.status(200).json({
              message: "Password changed successfully",
            });
          }
          else
          {
            return res.status(400).send("Short password");
          }
        }
        else
        {
          return res.status(400).send("password or user not exist");
        }
      }
    }
  } catch (error) {
    return res.status(400).send("password or user not exist");
  }
});

router.delete("/delete", async (req, res) => {
  const { Phone, Password } = req.body;
  let { authorization: token } = req.headers;

  if (Phone == null || Password == null) {
      return res.status(400).json({
      message: "One or more fields are empty! Try again",
    });
  }
  try {

    if (await jwt.verify(token, process.env.JWT_KEY)) {

      const body = jwt.decode(token);
  
      if (body.phone != Phone) {
      
        return res.status(400).json({
          message: "failed",
        });
      } else {
        const doc = await User.findOne({ Phone });
        const isEqual = await cryptr.decrypt(doc.Password) === Password; 

        if (doc && isEqual) {
          
          await doc.deleteOne();
          return res.status(200).json({
            message: "User deleted successfully",
          })
        }
          else
          {
            return res.status(400).json({
              message:"password or user not exist"
            })
          }
        }      
    } else {
      throw new Error("Bad token");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});



module.exports = router;
