const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vrp2h.mongodb.net/EmployeeDB`, {useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');
require('./teen.model');
//mongodb://127.0.0.1:27017/EmployeeDB'