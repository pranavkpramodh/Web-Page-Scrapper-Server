const db = require('./db');
// importing puppetteer
const puppetteer = require('puppeteer');
// const fs = require('fs/promises')



const getInsights = (searchedUrl) => {

    return db.Details.find().then(data => {
        if(data){
            // asynchrounous function
            async function start(){
                const browser = await puppetteer.launch()
                // once completes create new tab in browser
                const page = await browser.newPage()
                await page.goto(searchedUrl)
                const names = await page.evaluate(() => {
                    // returns a node list of elements
                    return Array.from(document.querySelectorAll("body")).map(x => x.textContent)
                })
            
                // stringify array using toString array method
                let str = names.toString();
                // split all words separated by white space using split method and find the length
                let wordcount =  str.split(" ").length;
                console.log(wordcount);
        
                // media links
                // eval is designed for selecting multiple elements
                const photos = await page.$$eval("img", images => {
                    return images.map(x => x.src)
                })
            
                console.log(photos);
                await browser.close()

                // creatig new object and save in mongo db
                const newData = new db.Details({
                    domain : searchedUrl,
                    wordcount : wordcount,
                    favourite:false,
                    weblinks : searchedUrl,
                    medialinks : photos
                })
                newData.save();
            }
            // function call
            start();
            // returns a true status
            return{
                status:true,
                statusCode:200,
                message:"success"
            }

        }else{
            return{
                status:false,
                statusCode:400,
                message:"error occured"
            }
        }
    })

}


// function for get all data from database
const getAllData = () => {
    return db.Details.find().then(data => {
        if(data){
            console.log(data);
            return{
                status:true,
                statusCode:200,
                allData:data//returns data in key allData
            }
        }else{
            return{
                status:false,
                statusCode:400,
                message:"error occured"
            }
        }
    })
        

}

// function for add favourite using updateOne method

const addfav = (id) =>{
    return db.Details.updateOne({_id:id}, {$set:{favourite:true}}).then(data => {
        if(data){
            return{
                status:true,
                statusCode:200,
                message:"success"
            }
        }else{
            return{
                status:false,
                statusCode:400,
                message:"error occured"
            }
        }
    })
}

// function for changing the value of favourite key as false using updateOne method
const removefav = (id) =>{
    return db.Details.updateOne({_id:id}, {$set:{favourite:false}}).then(data => {
        if(data){
            return{
                status:true,
                statusCode:200,
                message:"success"
            }
        }else{
            return{
                status:false,
                statusCode:400,
                message:"error occured"
            }
        }
    })
}

// function for deleting object from db using deleteOne method
const remove = (id) => {
    return db.Details.deleteOne({_id:id}).then(
        (data) => {
            if(data){
                return{
                    status:true,
                    statusCode:200,
                    message:"Removed Successfully",
                }
            }else{
                return{
                    status:false,
                    statusCode:402,
                    message:'Not found' 
                }
            }
        }
    )
}


// exporting
module.exports = {
    getInsights,
    getAllData,
    addfav,
    removefav,
    remove,

}