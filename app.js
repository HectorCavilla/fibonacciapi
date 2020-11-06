'use strict';

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

const app = express();

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
});
app.use(bodyParser.json());

app.get("/fibonacci", (req, res) => {
    let fibonacci = [0,1];

    while(fibonacci.length<20){
      fibonacci.push(parseInt(fibonacci.slice(fibonacci.length-2,fibonacci.length-1)) + parseInt(fibonacci.slice(fibonacci.length-1,fibonacci.length)))
    }

    res.status(200).send(fibonacci);
});

app.get("/fibonacci/:num", (req, res) => {
    let fibonacci = [0,1];

    let number = parseInt(req.params.num);
    let resp = false;

    if(number == 0){

        resp = true;

    }else{

        while(fibonacci.slice(fibonacci.length-1,fibonacci.length) <= number){
            fibonacci.push(parseInt(fibonacci.slice(fibonacci.length-2,fibonacci.length-1)) + parseInt(fibonacci.slice(fibonacci.length-1,fibonacci.length)))
            
            if(fibonacci.slice(fibonacci.length-1,fibonacci.length) == number)
                resp = true
                    
        }    

    }

    res.status(200).send({
        "number": number,
        "isFib": resp
    });
});

app.use(function(req, res){
    res.status(400).send("URL does not exist!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})