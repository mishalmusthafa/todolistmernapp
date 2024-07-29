const mongoose = require('mongoose');
const express = require('express');

const categoryModel = mongoose.Schema({
    name: { type: String, required: [true, 'Please add a name'], unique: true },
});

module.exports = mongoose.model('Category',categoryModel)