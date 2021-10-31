const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: 'Please post something!',
            minlength: 1,
            maxlength: 280
        },
            createdAt: {
            type: Date,
            default: Date.now
        },
            username: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;