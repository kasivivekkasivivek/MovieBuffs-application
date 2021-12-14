const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
// for content-type application/json
app.use(express.json());

const dbPath = path.join(__dirname, "users.db");

// for password encryption
const bcrypt = require("bcrypt");

// import json web token
const jwt = require("jsonwebtoken");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server Running at http://localhost:3001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

//

/*
const authenticationToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }

  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "admin", async (error, user) => {
      if (error) {
        response.send("Invalid Access token");
        response.status(401);
      } else {
        next();
      }
    });
  }
};

*/
//  get the users list from the database


app.get("/getUsers/",async (request, response) => {
  const getUsersQuery = `select * from users`;
  const getUsersQueryArray = await db.all(getUsersQuery);
  console.log("Get the users list from the data base get method")
  response.send(getUsersQueryArray);
});


// ----------------- user registration API ---------------
// post user
app.post("/addusers/", async (request, response) => {
  // get the data from the body
  const {FirstName,LastName,UserName,EmailAddress,SecurityQuestion,UserPassword,SecurityAnswer} = request.body;
  // Suscess message text and failure message text variables
  // these are used because data need to bee sent in  jason format
  let success_message, error_message;
  // hashed password i.e password is converted into encrypted format
  const hashedPassword = await bcrypt.hash(UserPassword, 10);
    //console.log(hashedPassword)
    
  const checkUserQuery = `select * from users where EmailAddress='${EmailAddress}';`;
  const checkUserQueryResponse = await db.get(checkUserQuery);

  if (checkUserQueryResponse === undefined) {
    const createUserQuery = `insert into users(FirstName,LastName,UserName,EmailAddress,SecurityQuestion,
        SecurityAnswer,userPassword) values
     ('${FirstName}','${LastName}','${UserName}','${EmailAddress}','${SecurityQuestion}',
     '${SecurityAnswer}','${hashedPassword}');`;
    await db.run(createUserQuery);
    response.status(200);
    success_message="User Created SuccessFully";
    response.send({success_message});
  } else {
    response.status(400);
    error_message = "User Already Exists";
    response.send({error_message});
    console.log("user existed")
  }

  console.log("Post User")
});



// --------------- Login User Api ----------------


app.post("/loginUser/", async (request, response) => {
  const { UserName, UserPassword } = request.body;
  let error_message;
  // check if user exists
  const checkUser = `select * from users where UserName='${UserName}';`;
  const checkUserResponse = await db.get(checkUser);
  // to print user details in console if user existed
  //console.log(checkUserResponse)

  if (checkUserResponse !== undefined) {
    const isPasswordMatched = await bcrypt.compare(
      UserPassword,
      checkUserResponse.UserPassword
    );
    console.log(isPasswordMatched)
    if (isPasswordMatched === true) {
      // payload
      
      const payload = { UserName: UserName };
      const jwtToken = jwt.sign(payload, "admin");
      response.send({ jwtToken });
    } else {
      error_message = "User Name and password don't match";
      response.status(401);
      response.send({error_message});
    }
  } else {
    // user doesn't exist
    error_message = `User with ${UserName} Doesn't Exist`;
    response.status(400);
    response.send({error_message});
  }
});

/*
app.post("/addusers/",async (request,response)=>{
  // get the data from the body
  const { username, email, password } = request.body;
  console.log(request.body);
  let success_message, error_message;

  // hashed password i.e password is converted into encrypted format
  const hashedPassword = await bcrypt.hash(password, 10);

  const checkUserQuery = `select * from users where username='${username}';`;
  const checkUserQueryResponse = await db.get(checkUserQuery);

  if (checkUserQueryResponse === undefined) {
    const createUserQuery = `insert into users(username,email,password) values
     ('${username}','${email}','${hashedPassword}');`;
    await db.run(createUserQuery);
    response.status(200);
    success_message = "User Created Successfully";
    response.send({success_message});
  } else {
    error_message="User name already exists"
    response.status(400);
    response.send({error_message});
  }
})

*/