require("dotenv").config();
require('./models/db');

const express = require("express");
const mongoose = require("mongoose");
const Handlebars = require('handlebars')
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const hbsS = require("hbs")
var hbs = require('express-handlebars')
const path = require("path")
const bodyparser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express();
const Teen = mongoose.model('Teen');


const PORT = process.env.PORT || 5000;

const employeeController = require('./controllers/employeeController');
const teensController = require('./controllers/teenController');

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());



const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middlewares/auth");





const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (email) => {
    const userFound = await User.findOne({ email });
    return userFound;
  },
  async (id) => {
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);

//hbs template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  extname: 'hbs', 
  defaultLayout: false, 
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: __dirname + '/views/layouts/',
  // partialsDir: __dirname + '/views/partials'
}))

app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: "hugoboss",
    resave: false,
    saveUninitialized: false,
  })

);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use('/employee',checkAuthenticated, employeeController);
app.use('/teen',teensController);


app.get("/", (req, res) => {
  res.render("index");  
});
app.get("/history",(req,res)=>{
  res.render("history")
})
app.get("/teens",(req,res)=>{
  //res.render("employee/teens")

  Teen.find((err, docs) => {
    if (!err) {
        res.render("employee/teens", {
            list: docs
        });
    }
    else {
        console.log('Error in retrieving employee list :' + err);
    }
});

})
app.get("/teens/list",(req,res)=>{
  res.render("employee/teenslist")
})
app.get("/contact",(req,res)=>{
  res.render("contact")
})

app.get("/ogidi", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/employee",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/ogidi", checkNotAuthenticated, async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  } else {

      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});




//keep this at the bottom of all routes
app.get("*",(req,res)=>{
  res.status(404).render("notfound")
})



mongoose
  .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vrp2h.mongodb.net/EmployeeDB`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server start on http://localhost:${PORT}`);
    });
  });
