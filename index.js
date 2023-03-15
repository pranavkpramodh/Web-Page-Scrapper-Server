const express = require('express');
const cors = require('cors');
const dataServices = require('./Services/dataservice');
const app = express();
app.use(express.json());

app.use(cors({
    origin:[ 'http://localhost:4200' ]
}))

app.listen(3000, () => {
    console.log('listening on port 3000');
})


app.post('/getinsights', (req, res) => {
    console.log(req.body);
    dataServices.getInsights(req.body.searchedUrl )
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})

app.get('/getalldata', (req, res) => {
    dataServices.getAllData()
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})

app.put('/addfav', (req, res) => {
    dataServices.addfav(req.body.id )
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})
app.put('/removefav', (req, res) => {
    dataServices.removefav(req.body.id )
    .then(result =>{
        res.status(result.statusCode).json(result)
    })
})


app.delete('/remove/:id', (req, res) => {
    dataServices.remove(req.params.id)
    .then(result => {
            res.status(result.statusCode).json(result)
        }
    )
})


// const puppetteer = require('puppeteer');
// const fs = require('fs/promises')


// async function start(){
//     const browser = await puppetteer.launch()
//     const page = await browser.newPage()
//     await page.goto("https://example-1.com/")
//     // await page.screenshot({path: "amazing1.png"})
//     // get fullpage screenshot
//     // await page.screenshot({path: "amazing.png", fullPage:true})

//     // const names = ['red', 'orange', 'yellow']
//     const names = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll("body")).map(x => x.textContent)
//     })

//     let pp = names.toString();
//     console.log(pp.split(" ").length);


//     await fs.writeFile("name.txt", names.join(" "))

//     const photos = await page .$$eval("img", images => {
//         return images.map(x => x.src)
//     })

//     console.log(photos);

//     for( const photo of photos){
//         const imagePage = await page.goto(photo)
//         await fs.writeFile(photo.split("/").pop(), await imagePage.buffer())
//     }

//     await browser.close()
// }

// start();

