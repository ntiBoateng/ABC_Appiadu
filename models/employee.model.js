const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    surname:{
        type: String,
        
    },
    
    gender:{
        type : String
    },
    dob:{
        type: String
    },
    homeTown:{
        type: String
    },
    dayBorn:{
        type: String
    },
    tithe:{
        type: String
    },
    residence:{
        type: String
    },
    houseNumber:{
        type: String
    },
    occupation:{
        type: String
    },
    schoolClass:{
        type:String
    },
    mobNum:{
        type:String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
    titheNum:{
        type: String
    },
    spouseID:{
        type :String,
        default : "ABC/0000"
    },
    spouseName:{
        type: String,
        default : "NA"
    },
    spouseCont:{
        type: String,
        default : "NA"
    },
    baptised:{
        type: String
    },
    baptBy:{
        type: String,
        default:"NA"
    },
    church:{
        type: String,
        default:"NA"
    },
    location:{
        type:String,
        default: "NA"
    },
    certNo:{
        type: String,
        default:"NA"
    },
    dateBapt:{
        type: String,
        default:"NA"
    },
    memberYear:{
        type: Number
    },
    spouseMember:{
        type: String
    },
    spouseOccupation:{
        type : String
    },
    region:{
        type: String
    },
    formNum:{
        type: String
    },
    idNum:{
        type: String
    },

    mariStat:{
        type: String
    },
    
    auxiliary:{
        type: String
    },
    
    curchPo:{
        type: String
    },
    
    departmentNamePrev:{
        type: String
    },
    
    yearElectPrev:{
        type: String
    },
    
    positionPrev:{
        type: String
    },
    
    departmentNameCur:{
        type: String
    },
    
    yearElectCur:{
        type: String
    },
    
    positionCur:{
        type: String
    },
    

});

// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Employee', employeeSchema);