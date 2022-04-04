const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://bgnti:Aladdin200@cluster0.vrp2h.mongodb.net/EmployeeDB', {useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');

//mongodb://127.0.0.1:27017/EmployeeDB'