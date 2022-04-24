const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert New Member"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.surname = req.body.surname
    employee.dob = req.body.dob;
    employee.popularName = req.body.popularName;
    employee.homeTown = req.body.homeTown;
    employee.email = req.body.email;
    employee.residence = req.body.residence
    employee.gender = req.body.gender;
    employee.houseNumber = req.body.houseNumber;
    employee.residence = req.body.residence
    employee.occupation = req.body.occupation;
    employee.residence = req.body.residence
    employee.schoolClass = req.body.schoolClass;
    employee.residence = req.body.residence
    employee.mobNum = req.body.mobNum;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.tithe = req.body.tithe
    employee.titheNum = req.body.titheNum
    employee.spouseID = req.body.spouseID
    employee.spouseName = req.body.spouseName
    employee.spouseCont = req.body.spouseCont
    employee.baptised = req.body.baptised
    employee.baptBy = req.body.baptBy
    employee.dayBorn = req.body.dayBorn
    employee.church = req.body.church
    employee.location = req.body.location
    employee.certNo = req.body.certNo
    employee.dateBapt = req.body.dateBapt
    employee.memberYear = req.body.memberYear
    employee.spouseMember =req.body.spouseMember
    employee.spouseOccupation = req.body.spouseOccupation
    employee.region = req.body.region

    employee.mariStat = req.body.mariStat
    employee.auxiliary = req.body.auxiliary
    employee.curchPo = req.body.curchPo
    employee.departmentNamePrev = req.body.departmentNamePrev
    employee.yearElectPrev = req.body.yearElectPrev
    employee.positionPrev = req.body.positionPrev
    employee.departmentNameCur = req.body.departmentNameCur
    employee.yearElectCur = req.body.yearElectCur
    employee.positionCur = req.body.positionCur

    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
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
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Member',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
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
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Member",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;