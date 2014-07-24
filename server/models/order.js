'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Order Schema
 */
var OrderSchema = new Schema({	
    _purchasable: {
        type: Schema.ObjectId,
        ref: 'Account'
    },
    name: {
        type: String,
        required: true
    },
    version: Number,
    status: String,
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
OrderSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */

mongoose.model('Order', OrderSchema);