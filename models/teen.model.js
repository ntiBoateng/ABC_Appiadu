const mongoose = require("mongoose")

let teensSchema = new mongoose.Schema({
    idNum:{
        type: String,
        
    },
    formNo:{
        type: String,
        
    },
    surname:{
        type: String,
        
    },
    otherName:{
        type: String,
        
    },
    dob:{
        type: String,
        
    },
    age:{
        type: Number,
        
    },
    gender:{
        type: String,
        
    },
    hometown:{
        type: String,
        
    },
    region:{
        type: String,
        
    },
    residence:{
        type: String,
        
    },
    houseNo:{
        type: String,
        
    },
    school:{
        type: String,
        
    },
    sundaySchool:{
        type: String,
        
    },
    mobile:{
        type: String,
        
    },
    email:{
        type: String,
        
    },
    fatherName:{
        type: String,
        
    },
    fatherChurch:{
        type: String,
        
    },
    fatherOccupation:{
        type: String,
        
    },
    fatherNo:{
        type: String,
        
    },
    motherName:{
        type: String,
        
    },
    motherChurch:{
        type: String,
        
    },
    motherOccupation:{
        type: String,
        
    },
    motherNo:{
        type: String,
        
    },
    baptised:{
        type: String,
        
    },
    baptisedBy:{
        type: String,
        
    },
    churchBap:{
        type: String,
        
    },
    certNo:{
        type: String,
        
    },
    baptisedDate:{
        type: String,
        
    },
    memberYear:{
        type: Number,
        
    },
    departmentPosition:{
        type: String,
        
    },
    departmentNamePrev:{
        type: String,
        
    },
    yearElectPrev:{
        type: Number,
        
    },
    positionPrev:{
        type: String,
        
    },
    
    departmentNameCur:{
        type: String,
        
    },
    yearElectCur:{
        type: Number,
        
    },
    positionCur:{
        type: String,
        
    },
})

// Custom validation for email
teensSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


mongoose.model("Teen",teensSchema)