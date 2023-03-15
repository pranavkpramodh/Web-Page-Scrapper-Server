const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WebpageScraper', {

    
})


const Details = mongoose.model('Details', {
    domain: String,
    wordcount: Number,
    favourite: Boolean,
    weblinks: String,
    medialinks: Array,

})

module.exports = {
    Details
}