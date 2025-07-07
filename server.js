const express = require('express'); //Server Pazzesco più bello da vedere
const helmet = require('helmet'); //CSP - Content Security Policy
const fs = require('fs');
const https = require('https');   //HTTPS
const session = require('express-session'); //express Session
const cookieParser = require("cookie-parser"); 
const bcrypt = require('bcrypt');      const saltRounds = 10; //hasing
require('dotenv').config();     //.ENV file per mettere i dati interessanti 
const cors = require('cors');   //da dove possono venire i file
const path = require("path");
const app = express();

const port = process.env.PORT || 443;


app.use(cookieParser(process.env.COOKIE_SECRET));  
 


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,    
  saveUninitialized: false,
  cookie: {
    secure: true,        // solo HTTPS
    httpOnly: true,      // non accessible dal JS
    sameSite: 'Strict',  //  CSRF - Cross-Site Request Forgery     non può mandarli da altre parti
    maxAge: 1000 * 60 * 60 // 1 hour
 
  }
}));

const privateKey = fs.readFileSync(path.join(__dirname, process.env.SSL_KEY_PATH), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, process.env.SSL_CERT_PATH), 'utf8');

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);


const allowedOrigins = process.env.CORS_ORIGINS.split(',');
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
// vedi più avanti perchè tipo ti fa esplodere (in pratica non permette l'esecuzione di file js o altri tipi da fonti non autorizzate)
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",       // solo lo script del server
      ],
      styleSrc: [
        "'self'",       // solo il css del server
      ],
      imgSrc: ["'self'", "data:"], // Allow images and icons
      fontSrc: ["'self'", "data:"], // Allow embedded fonts
      connectSrc: ["'self'", "https://localhost:3000"],
      objectSrc: ["'none'"],      // Block Flash and plugins
      baseUri: ["'none'"],        // Prevent <base> tag manipulation
      formAction: ["'self'"],     // Prevent external form posts
      frameAncestors: ["'none'"], // Disallow embedding in iframes
      upgradeInsecureRequests: [],

    },
  })
);

app.use(express.json());// Middleware to parse JSON bodies

app.use(express.urlencoded({ extended: true }));// Middleware to parse URL-encoded bodies (for form submissions)



//rende disponibile ai client i file all'interno delle cartelle
app.use(express.static("loginpages")); //piglia dalla cartella pages e manda al client l'index.html
app.use('/loginpages', express.static(path.join(__dirname, 'loginpages')));
app.use('/leaderboardpages', express.static(path.join(__dirname, 'leaderboardpages')));
app.use('/slot1', express.static(path.join(__dirname, 'slot1')));
app.use('/slot2', express.static(path.join(__dirname, 'slot2')));
app.use('/coinflip3', express.static(path.join(__dirname, 'coinflip3')));



var mysql = require('mysql2');

//Pool in pratica tiene a disposizione 10 (in questo caso) connessioni al DB e non le chiude quando finisce
var con = mysql.createPool({
    connectionLimit: 10,           
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

app.get("/leaderboardmoney",(req,res) => {
     let updateSql = "SELECT username, money FROM utenti ORDER BY money DESC LIMIT 5";
        con.query(updateSql, function (err, result) {
            if (err) {
                console.error("Query error:", err);
                return;
            }

            res.json({ tabella: result }); // JSON bello
        });



});

app.post("/coinflip", (req, res) => {
    const userId = req.signedCookies.userid || 0;
    const userbetsizee = Number(req.body.userbetsize);
    const slottype = req.body.slottype;
    
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }




    let sql = "SELECT * FROM utenti WHERE ID = ?";
    con.query(sql, [userId], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
        else if (result[0].money < userbetsizee){
            console.error("No soldi coin flip");
            return;
        }

        console.log("Coin Flip");
        console.log("User ID: "+ userId);
        console.log("User Betsize: "+ userbetsizee);

        let num1coinflip = Math.floor(Math.random() * 2) + 1;
        usermoneywin = 0;
        if(num1coinflip == 1){
            usermoneywin = userbetsizee * 2 ;
            
        }
    
        var userDBmoney = result[0].money;
        if(usermoneywin > 0){
            userDBmoneyupdate = userDBmoney + userbetsizee;
      
        }
        else{
            userDBmoneyupdate = userDBmoney - userbetsizee;
            usermoneywin = -(userbetsizee)
        }

        // UPDATE query
        let updateSql = "UPDATE utenti SET money = ? WHERE ID = ?";
        con.query(updateSql, [userDBmoneyupdate, userId], function (err, result) {
            if (err) {
                console.error("Query error:", err);
                return;
            }

                           let spinlog = num1coinflip;
                            let updateSql = "INSERT logspin (gametype, logspin, userbetsize, userbalance, userwin,usernewbalance, id_user) VALUES (?,?,?,?,?,?,?)";
                            con.query(updateSql, [slottype, spinlog, userbetsizee,userDBmoney,usermoneywin,userDBmoneyupdate,userId], function (err) {
                                if (err) {
                                    console.error("Query error:", err);
                                    return;
                                }
                                console.log("Log Spin Added");
                                
                            
                            });
            
            console.log("New Bal: ", userDBmoneyupdate);

            res.json({ first:num1coinflip, moneywin: userDBmoneyupdate }); 
        });
    });


});




app.post("/spin", (req, res) => {
    const userId =   req.signedCookies.userid || 0;
    const userbetsizee = Number(req.body.userbetsize);
    const slottype = req.body.slottype;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    
    let sql = "SELECT * FROM utenti WHERE ID = ?";
    con.query(sql, [userId], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
        else if (result[0].money < userbetsizee){
            return;
        }

     
        console.log("Slot");
        console.log("User ID: "+ userId);
        console.log("User Betsize: "+ userbetsizee);


      
        num1 = Math.floor(Math.random() * 16) + 1;
        num2 = Math.floor(Math.random() * 16) + 1;
        num3 = Math.floor(Math.random() * 16) + 1;




        if(num1 == num2 || num2 == num3 || num1 == num3){
            num1 = Math.floor(Math.random() * 16) + 1;
            num2 = Math.floor(Math.random() * 16) + 1;
            num3 = Math.floor(Math.random() * 16) + 1;
        }

        numJ = Math.floor(Math.random() * 100) + 1;
        if(numJ == 55){
            num1 = 55;

        }
        numJ = Math.floor(Math.random() * 100) + 1;
        if(numJ == 55){
            num2 = 55;

        }
        numJ = Math.floor(Math.random() * 100) + 1;
        if(numJ == 55){
            num3 = 55;

        }


        
    
    var usermoneywin = 0;
    if(num1 == num2 && num2 == num3){
        if(num1 == 55){
              usermoneywin = userbetsizee * 100000;
        }
        else{    
            usermoneywin = userbetsizee * 1000;
        }
        
    }
    else if(num1 == num2 || num1 == num3 || num2 == num3){
        if(num1 == 55 && num2 == 55 || num1 == 55 && num3 == 55 || num2 == 55 && num3 == 55){
            usermoneywin = userbetsizee * 5000;
        }
        else{
            usermoneywin = userbetsizee * 25;
        }
    }
    
        var userDBmoney = result[0].money;
        if(usermoneywin > 0){
            userDBmoneyupdate = userDBmoney + usermoneywin;
        }
        else{
            userDBmoneyupdate = userDBmoney - userbetsizee;
            usermoneywin = -(userbetsizee)
        }

        // UPDATE query
        let updateSql = "UPDATE utenti SET money = ? WHERE ID = ?";
        con.query(updateSql, [userDBmoneyupdate, userId], function (err, result) {
            if (err) {
                console.error("Query error:", err);
                return;
            }

                           let spinlog = num1+":"+num2+":"+num3;  
                            let updateSql = "INSERT logspin (gametype, logspin, userbetsize, userbalance, userwin,usernewbalance, id_user) VALUES (?,?,?,?,?,?,?)";
                            con.query(updateSql, [slottype, spinlog, userbetsizee,userDBmoney,usermoneywin,userDBmoneyupdate,userId], function (err) {
                                if (err) {
                                    console.error("Query error:", err);
                                    return;
                                }
                                console.log("Log Spin Added");
                                
                            
                            });
            
            console.log("New Bal: ", userDBmoneyupdate);

            res.json({ first:num1, second:num2, third:num3, moneywin: userDBmoneyupdate });
        });
    });
    

   
});


app.post("/regist", (req, res) =>{
    usernome = "";
    usercognome = "";
    userrnick = "";
    userrpass = "";

    usernome    = req.body.username;
    usercognome = req.body.usercognome;  
    userrnick   = req.body.usernick;
    userrpass   = req.body.userpass;


    let sql = "SELECT * FROM utenti WHERE username = ?";
    con.query(sql, [userrnick], async function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
    
        if(result.length > 0){
            res.json({respond:"ID:"+0+ ":User Already Used"})
            return;

        }

        
            const hashedPassword = await bcrypt.hash(userrpass, saltRounds);

            let updateSql = "INSERT utenti (nome, cognome, username, userpassword, money) VALUES (?,?,?,?,?)";
            con.query(updateSql, [usernome, usercognome, userrnick, hashedPassword, 100], function (err, result) {
                if (err) {
                    console.error("Query error:", err);
                    res.status(500).json({ respond: "Error" });
                    return;
                }

                let last_id = result.insertId;
                res.cookie('userid', last_id, {
                        httpOnly: true,
                        secure: true,  
                        maxAge: 60 * 60 * 1000, // 1 hour
                        sameSite: 'strict',
                        signed: true
                    });
                console.log("User added.");
                res.json({respond:"ID:"+last_id});
            
            });
      
        
    });


});


//login POST
app.post("/login", (req, res) =>{
    userrnick = "";
    userrpass = "";

    userrnick = req.body.usernick;
    userrpass = req.body.userpass;


    let sql = "SELECT * FROM utenti WHERE username = ?";
    con.query(sql, [userrnick], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            res.status(500).json({ respond: "Error" });
            return;
        }

        if (result.length === 0) {
            res.json({ respond: "ID:0" });
            return;
        }

        const hashedPassword = result[0].userpassword;

        bcrypt.compare(userrpass, hashedPassword, (err, match) => {


            if (err) {
                console.error("Bcrypt error:", err);
                res.status(500).json({ respond: "Error" });
                return;
            }

            if (match) {
                res.cookie('userid', result[0].ID, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'lax',
                    signed: true
                });
                res.json({ respond: "ID:" + result[0].ID + ":money:" + result[0].money });
            } else {
                res.json({ respond: "ID:0" });
            }
        });
    });


});





//slot data POST
app.post("/slotdata", (req, res) =>{


    const userId = req.signedCookies.userid;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let sql = "SELECT * FROM utenti WHERE ID = ?";
    con.query(sql, [userId], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
    
        if(result.length > 0){
              res.cookie('userid', result[0].ID, {
                    httpOnly: true,
                    secure: true,  
                    maxAge: 60 * 60 * 1000, // 1 hour
                    sameSite: 'strict',
                    signed: true
                });

            console.log(result[0].money)
            res.json({usermoney:result[0].money});
            return;

        }else{
            res.json({usermoney:"error"});
            return;  
        }

        
        
    });


});


app.post("/disconect", (req, res)=>{
            res.clearCookie('userid', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                });

            res.sendStatus(200);

});


//slot redirect POST
app.post("/slotredirect", (req, res) =>{
    const page = req.body.pagesel;
    const useridserver = req.signedCookies.userid || 0;

    if(useridserver != 0){
        res.json({ redirect: page });
    }
    else{
        res.json({redirect: "nologin"});
    }
});



httpsServer.listen(port, () => {
  console.log(`HTTPS Real: ${port}`);
});
