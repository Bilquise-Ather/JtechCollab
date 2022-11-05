'use strict';
let MongooseObj = require("mongoose").Mongoose,
    config = process.config.global_config.all_south_flooring;

let mongoose = new MongooseObj();

mongoose.connect(config.host + ":" + config.port + "/" + config.database_name, { useNewUrlParser: true, useUnifiedTopology: true },);

mongoose.Promise = global.Promise;

module.exports = mongoose;