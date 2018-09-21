var express = require("express");
var router = express.Router();
var db = require("../db/db.js");
var path = require("path");
var nodemailer = require('nodemailer');
var fs  = require('fs');
//file uploading using multer
var multer = require('multer');

// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  // destination: '../public/protected/',
  destination: (req, file, cb) => {
        /*
          Files will be saved in the 'uploads' directory. Make
          sure this directory already exists!
        */
        cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// var upload = multer({ dest: '../public/protected/'});

var employee = require("../models/employee");
var EmployeeSchedule = require("../models/employeeSchedule");
var announcements = require("../models/announcements");
var misc = require("../models/misc");
var Leave = require("../models/leaverequests");
var LeaveDetails = require("../models/leavedetails");
var User = require("../models/user");

//NodeMailer configurations//
const creds = require('../mail_config/config');

//Getting Employees based on condition from the database
router.get("/getAllEmployeesFilter/:groupId", function (req, res) {
    var groupId = req.params.groupId;
    employee.find({"active": 1,"team":groupId}).exec(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//Getting All Employees from the database
router.get("/getAllEmployees", function (req, res) {
    employee.find().exec(function (err, doc) { //{"active": 1}
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//Getting All Employees leave details
router.get("/getAllLeaveDetails", function (req, res) {
    LeaveDetails.find().exec(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//Get employee schedules from database
router.get("/getEmpSchedules", function (req, res) {
    EmployeeSchedule.find({"active": 1}).exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send(docs);
        }
    });
});

//Posting Employee Schedule to the database
router.post("/addEmpSchedule", function (req, res) {
    EmployeeSchedule.create({
        emp_id: req.body.emp_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Employee Schedule Saved!");
        }
    });
});

//Updating existing employee schedule
router.put("/updateSchedule/:id", function (req, res) {
    var newSchedule = req.body.employeeSchedule;
    EmployeeSchedule.findOneAndUpdate({"_id": req.params.id}, {
        monday: newSchedule.monday,
        tuesday: newSchedule.tuesday,
        wednesday: newSchedule.wednesday,
        thursday: newSchedule.thursday,
        friday: newSchedule.friday,
        saturday: newSchedule.saturday,
        sunday: newSchedule.sunday
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Employee schedule updated");
        }
    });
});


//Update the leave request , set approve to true or false
router.put("/updateLeaveRequest/:id", function (req, res) {

    //check the leave type 
    if(req.body.leaveType == "CL") var LeaveType ={CL: -1};
    else if(req.body.leaveType == "SL") var LeaveType ={SL: -1};
    else if(req.body.leaveType == "AL") var LeaveType ={AL: -1};
    else if(req.body.leaveType == "LOP") var LeaveType ={LOP: +1};
     
    Leave.findOneAndUpdate({"_id": req.params.id}, {
        approved: true,
    }, function (err) {
        if (err) {
            console.log(err);
        } else {        
           //Update the leave details collection 
            LeaveDetails.findOneAndUpdate({"user_id": req.body.userId}, 
                { $inc:LeaveType}, function (err) {
                if (err) {
                    console.log(err);
                } else {  
                    //Send mail to the employee and HR that leave is approved
                    res.send("Leave Details Successfully updated");
                }
            });
        }
    });

});

//Posting new Employee to the database
router.post("/addEmployee", function (req, res) {
    employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        phone: req.body.phone,
        phoneType: req.body.phoneType,
        designation: req.body.designation,
        team: req.body.team
    }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
            res.send("Employee added successfully");
        }
    });
});

//Add new leave Request
router.post("/addLeave", function (req, res) {
    Leave.create({
        emp_id: req.body.userId,
        group_id: req.body.groupId,
        firstName: req.body.userName,
        leaveTitle: req.body.leaveTitle,
        leaveBody: req.body.leaveBody,
        leaveType: req.body.leaveType,
        leaveDay: req.body.leaveDay,
        approved: false,
    }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            //Send leave request mail to the manager and HR 
            res.send(doc);
        }
    });
});


//Getting All Leave Requests from the database
router.get("/getALLLeaveRequests", function (req, res) {
    Leave.find().exec(function (err, doc) { //{"approved": false}
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//Updating existing employee
router.put("/updateEmployee/:id", function (req, res) {
    employee.findOneAndUpdate({"_id": req.params.id}, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        phone: req.body.phone,
        phoneType: req.body.phoneType,
        designation: req.body.designation,
        team: req.body.team,
        doj: req.body.doj,
        active: req.body.active
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Employee updated");
        }
    });
});

// Update employee's name in employee schedule collection
router.put("/updateEmpName/:emp_id", function (req, res) {
    EmployeeSchedule.findOneAndUpdate({"emp_id": req.params.emp_id}, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Employee's name updated");
        }
    });
});

// Update employee's group id in users collection
router.put("/updateEmpTeam/:id", function (req, res) {
    User.findOneAndUpdate({"_id": req.params.id}, {
        groupId: req.body.groupId,
        designationId: req.body.designationId,
        active: req.body.active
    }, function (err,doc) {
        if (err) {
            console.log(err);
        } else {
            res.send("Employee's team is updated");
            console.log(doc);
        }
    });
});

// "Remove" existing employee
router.put("/removeEmployee/:id", function (req, res) {
    employee.findOneAndUpdate({"_id": req.params.id}, {"active": 0})
            .exec(function (err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(doc);
                }
            })
});

// "Remove" existing employee schedule
router.put("/removeEmpSchedule/:emp_id", function (req, res) {
    EmployeeSchedule.findOneAndUpdate({"emp_id": req.params.emp_id}, {"active": 0})
            .exec(function (err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(doc);
                }
            })
});

//Getting announcements from the database
router.get("/getAnnouncements", function (req, res) {
    announcements.find({"active": 1}).exec(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//Getting Misc data from the database
router.get("/getMiscs", function (req, res) {
    misc.find({"active": 1}).exec(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//Put announcements to database
router.post("/addAnnouncements", function (req, res) {
    announcements.create({
        title: req.body.title,
        content: req.body.content
    }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//Put Misc data to database
router.post("/addMiscs", function (req, res) {
    misc.create({
        title: req.body.title,
        content: req.body.content
    }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

// Send Email functionality
router.post("/sendEmail", function (req, res){
    var transport = {
        host: 'smtp.gmail.com',
        auth: {
          user: creds.USER,
          pass: creds.PASS
        }
    }
    
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var maillist = req.body.maillist
    var content = `name: ${name} \n email: ${email} \n message: ${message} `

    var transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take messages');
      }
    });

    var mail = {
        from: name,
        to: maillist,  //Change to email address that you want to receive messages on
        subject: 'Message From React LMS app',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
          res.json({
            msg: 'fail'
          })
        } else {
          res.json({
            msg: 'success'
          })
        }
    })
});

//File uploading 
router.post("/fileUpload",upload.single('selectedFile'), function (req, res){
     res.send('File uploaded Successfully');
});
  
module.exports = router;
