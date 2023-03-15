const db = require('./db');
const puppetteer = require('puppeteer');
const fs = require('fs/promises')



const getInsights = (searchedUrl) => {

    return db.Details.find().then(data => {
        if(data){
            async function start(){
                const browser = await puppetteer.launch()
                const page = await browser.newPage()
                await page.goto(searchedUrl)
                // await page.screenshot({path: "amazing1.png"})
                // get fullpage screenshot
                // await page.screenshot({path: "amazing.png", fullPage:true})
            
                // const names = ['red', 'orange', 'yellow']
                const names = await page.evaluate(() => {
                    return Array.from(document.querySelectorAll("body")).map(x => x.textContent)
                })
            
                let str = names.toString();
                let wordcount =  str.split(" ").length;
                console.log(wordcount);
        
            
                const photos = await page .$$eval("img", images => {
                    return images.map(x => x.src)
                })
            
                console.log(photos);

            
                await browser.close()

                const newData = new db.Details({
                    domain : searchedUrl,
                    wordcount : wordcount,
                    favourite:false,
                    weblinks : searchedUrl,
                    medialinks : photos
                })
                newData.save();
            }
            start();


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

const getAllData = () => {
    return db.Details.find().then(data => {
        if(data){
            console.log(data);
            return{
                status:true,
                statusCode:200,
                allData:data
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



module.exports = {
    getInsights,
    getAllData,
    addfav,
    removefav,
    remove,

}