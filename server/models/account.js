'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //crypto = require('crypto');

/**
 * Account Schema
 */
var AccountSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: String,
    website: String,
    status: Number,
    user_groups: [{ name: String, permissions: String, user_ids: String }],
    settings: String,
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
//var validatePresenceOf = function(value) {
//    return value && value.length;
//};

AccountSchema.path('name').validate(function(name) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) return true;
    return (typeof name === 'string' && name.length > 0);
}, 'Name cannot be blank');

AccountSchema.path('email').validate(function(email) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    if (!this.provider) return true;
    return (typeof email === 'string' && email.length > 0);
}, 'Email cannot be blank');


mongoose.model('Account', AccountSchema);
