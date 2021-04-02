const express = require('express');
const bodyParser = require("body-parser");
const argon2 = require("argon2")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/customer', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  path: String,
  firstName: String,
  lastName: String,
  gender: String,
  membership: String,
  part: String,
  age: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    path: req.body.path,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    membership: req.body.membership,
    part: req.body.part,
    age: req.body.age,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.firstName = req.body.firstName;
    item.lastName = req.body.lastName;
    item.gender = req.body.gender;
    item.membership = req.body.membership;
    item.part = req.body.part;
    item.age = req.body.age;
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a scheme for users
const profileSchema = new mongoose.Schema({
  username: String,
});

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
  });

userSchema.pre('save', async function(next) {
// only hash the password if it has been modified (or is new)
if (!this.isModified('password'))
    return next();

try {
    // generate a hash. argon2 does the salting and hashing for us
    const hash = await argon2.hash(this.password);
    // override the plaintext password with the hashed one
    this.password = hash;
    next();
} catch (error) {
    console.log(error);
    next(error);
}
});

userSchema.methods.comparePassword = async function(password) {
    try {
      const isMatch = await argon2.verify(this.password, password);
      return isMatch;
    } catch (error) {
      return false;
    }
  };

  userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  }

// Create a model for users
const Profile = mongoose.model('Profile', profileSchema);
const User = mongoose.model('User', userSchema);



app.post('/api/users', async (req, res) => {

    if (!req.body.username || !req.body.password)
      return res.status(400).send({
        message: "username and password are required"
      });
  
    try {
  
      const existingUser = await User.findOne({
        username: req.body.username
      });
      if (existingUser)
        return res.status(403).send({
          message: "username already exists"
        });
  
      // create a new user and save it to the database
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
      });
      await user.save();
      const profile = new Profile({
        username: req.body.username,
      });
      await profile.save()
      return res.send({
        user: user,
        profile: profile
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  app.post('/api/users/login', async (req, res) => {
    if (!req.body.username || !req.body.password)
      return res.sendStatus(400);
  
    try {
      const user = await User.findOne({
        username: req.body.username
      });
      const profile = await Profile.findOne({
        username: req.body.username
      })
      if (!user)
        return res.status(403).send({
          message: "username or password is wrong"
        });
  
      if (!await user.comparePassword(req.body.password))
        return res.status(403).send({
          message: "username or password is wrong"
        });
  
      return res.send({
        user: user,
        profile: profile
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });


// Get a list of all of the users
app.get('/api/users', async (req, res) => {
  try {
    let profiles = await Profile.find();
    res.send(profiles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/users/:username', async (req, res) => {
  try {
    await User.deleteOne({
      username: req.params.username
    });
    await Profile.deleteOne({
        username: req.params.username
    })
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/users/:username', async (req,res) => {
  try {
    user = await User.findOne({
      username: req.params.username
    });
    profile = await Profile.findOne({
        username: req.params.username
    });
    if (req.body.username) {
        user.username = req.body.username;
        profile.username = req.body.username;
    }
    if (req.body.password) {
        user.password = req.body.password
    }
    user.save()
    profile.save()
    res.send({
        user: user,
        profile: profile
      });
  } catch(error) {
    console.log(error);
    res.sendStatus(500)
  }
});





app.listen(3000, () => console.log('Server listening on port 3000!'));
