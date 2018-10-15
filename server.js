const express = require("express");
const hsb = require("hbs");
const fs = require("fs");
var app = express();

hsb.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hsb.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});
hsb.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.use((req, res, next)=>{
    var now= new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    //fs.appendFileSync('server.log', log +'\n');
    
    fs.appendFile('server.log', log +'\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }       
    });
   next();
});
// app.use((req,res,next)=> {
//     res.render('maintance.hbs',{
//         pageTitle: 'Home Page',
//         currentYear: new Date().getFullYear(),
//         welcomeMessage: 'Will be right back.'
//     });
// });
app.use(express.static(__dirname+'/public'));
app.get('/', (req, res) => {
    // res.send({
    //     name: 'Andrew',
    //     Likes: [
    //         'Biking',
    //         'Hiking'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my website'
    });
});
app.get('/')

app.get('/about/', (req, res) => {
    res.render ('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.listen(3333, () => {
    console.log('Server is up on port 3333.');
}); 