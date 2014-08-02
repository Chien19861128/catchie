'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PurchasableProductSchema = new Schema({
    _simple: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    agreed_price: {
        type: Number,
        required: true
    },
});

var CartItemSchema = new Schema({
    _simple: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

/**
 * Purchasable Schema
 */
var PurchasableSchema = new Schema({	
    _account: {
        type: Schema.ObjectId,
        ref: 'Account',
        required: true
    },
    buyer: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    version: Number,
    status: String,
    start: {
        type: Date,
        default: Date.now
    },
    expire: Date,
    created: {
        type: Date,
        default: Date.now
    },
    rules: [{
        type: String
    }],
	purchasable_products: [PurchasableProductSchema],
	cart_items: [CartItemSchema],
});

/**
 * Validations
 */
PurchasableSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */

mongoose.model('Purchasable', PurchasableSchema);