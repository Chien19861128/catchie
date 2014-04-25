'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Product Default Schema
 */
var ProductDefaultSchema = new Schema({	
    account: {
        type: Schema.ObjectId,
        ref: 'Account'
    },
    sku: {
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
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
ProductDefaultSchema.path('sku').validate(function(sku) {
    return sku.length;
}, 'Sku cannot be blank');

ProductDefaultSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

ProductDefaultSchema.path('category').validate(function(category) {
    return category.length;
}, 'Category cannot be blank');

/**
 * Statics
 */

mongoose.model('ProductDefault', ProductDefaultSchema);
