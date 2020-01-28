const express = require('express');
const path = require('path');
// const {getListing} = require('../database/db.js');
const {getAllListings} = require('../database/db.js');

const app = express();
const port = 3003;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../client/dist')));

// handler for get requests for all listings
app.get('/listings', (req, res) => {
    getAllListings((error, listingsArr) => {
        if (error) {
            res.status(500).end();
            console.log("error");
        } else {
            res.status(200).send(listingsArr);
            console.log("listingsArr", listingsArr)
        }
    })
})

// handler for get requests for specific id
// app.get('/listings/:listingId', (req, res) => {
//     console.log("req.params", req.params);
//     const id = req.params;
//     getListing(id, (error, listingObject) => {
//         if (error) {
//             res.status(500).end();
//             console.log("error")
//         } else {
//             res.status(200).send(listingObject);
//             console.log("recommendations", listingObject.recommendations)
//         }
//     }) 
// })

app.listen(port, () => console.log(`App listening on port ${port}`));