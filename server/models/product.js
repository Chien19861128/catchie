'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Product Schema
 */
var ProductSchema = new Schema({	
    account: {
        type: Schema.ObjectId,
        ref: 'Account'
    },
    product_default: {
        type: Schema.ObjectId,
        ref: 'ProductDefault'
    },
    simple: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    currency: String,
    original_price: Number,
    special_price: Number,
    price: Number,
    description: {
        type: String,
        default: '',
        trim: true
    },
    is_show_price: {
        type: Boolean,
        default: false,
        trim: true
    },
    is_discoverable: {
        type: Boolean,
        default: false,
        trim: true
    },
    custom_fields: {
    	  name: String,
    	  value: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
ProductSchema.path('sku').validate(function(sku) {
    return sku.length;
}, 'Sku cannot be blank');

ProductSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

ProductDefaultSchema.path('category').validate(function(category) {
    return category.length;
}, 'Category cannot be blank');

/**
 * Statics
 */

mongoose.model('Product', ProductSchema);
