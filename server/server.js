const express = require('express');
const bodyParser = require('body-parser');

// create instanc of express web server 
const app = express ();
// set up public folders to send files to client
app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static( 'server/public' ) );

// tell server to listen on port 5000
const PORT = 5000;
app.listen( PORT, () => {
    console.log(`listening on port ${PORT}...`);
})






