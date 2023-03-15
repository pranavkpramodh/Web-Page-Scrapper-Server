// importing mongoose
const mongoose = require('mongoose');
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/WebpageScraper', {

    
})

// creating model
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