var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true,
        unique: true
    },

    author: {
        type: String,
        default: 'No Author Available'
    },

    summary: {
        type: String,
        default: 'No summary provided'
    },

    saved: {
        type: Boolean,
        default: false
    },

    comment: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;