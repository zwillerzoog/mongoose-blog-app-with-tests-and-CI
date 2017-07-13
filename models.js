'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const blogPostSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String
  },
  title: {type: String, required: true},
  content: {type: String},
  created: {type: Date, default: Date.now}
});

const UserSchema = mongoose.Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String
  }
);

blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created
  };
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};
