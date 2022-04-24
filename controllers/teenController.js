const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Teen = mongoose.model('Teen');


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Teen();
    employee.idNum = req.body.idNum;
    employee.formNum = req.body.formNum
    employee.surname = req.body.surname;
    employee.otherName = req.body.otherName;
    employee.dob = req.body.dob;
    employee.age = req.body.age;
    employee.gender = req.body.gender
    employee.hometown = req.body.hometown;
    employee.region = req.body.region;
    employee.residence = req.body.residence
    employee.houseNo = req.body.houseNo;
    employee.school = req.body.school
    employee.sundaySchool = req.body.sundaySchool;
    employee.mobile = req.body.mobile
    employee.email = req.body.email;
    employee.fatherName = req.body.fatherName;
    employee.fatherChurch = req.body.fatherChurch;
    employee.fatherOccupation = req.body.fatherOccupation
    employee.fatherNo = req.body.fatherNo
    employee.motherName = req.body.motherName
    employee.motherChurch = req.body.motherChurch
    employee.motherOccupation = req.body.motherOccupation
    employee.motherNo = req.body.motherNo
    employee.baptised = req.body.baptised
    employee.baptisedBy = req.body.baptisedBy
    employee.churchBap = req.body.churchBap
    employee.certNo = req.body.certNo
    employee.baptisedDate = req.body.baptisedDate
    employee.memberYear = req.body.memberYear
    employee.departmentPosition =req.body.departmentPosition
    employee.departmentNamePrev = req.body.departmentNamePrev
    employee.yearElectPrev = req.body.yearElectPrev
    employee.positionPrev = req.body.positionPrev
    employee.departmentNameCur = req.body.departmentNameCur
    employee.yearElectCur = req.body.yearElectCur
    employee.positionCur = req.body.positionCur


    employee.save((err, doc) => {
        if (!err)
            res.redirect('teens/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/teens", {
                    viewTitle: "Insert Member",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    Teen.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('teens/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/teens", {
                    viewTitle: 'Update Member',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'surname':
                body['surnameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Teen.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/teens", {
                viewTitle: "Update Member",
                employee: doc
            });
        }
    });
});

router.get('/delete/teens/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/teens/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;