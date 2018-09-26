var axios = require("axios");

var helper = {

  getAllEmployeesFilter: function(groupId) {
    return axios.get("/getAllEmployeesFilter/"+ groupId);
  },

  getAllEmployees: function(groupId) {
    return axios.get("/getAllEmployees");
  },

  getCurrentUser: function() {
    return axios.get("/user");
  },

  getEmployee: function(id) {
    return axios.get("/getEmployee/" + id);
  },

  getEmpSchedules:function() {
    return axios.get('/getEmpSchedules')
    .then(function(response){
        return response;
    })
  },

  addEmpSchedule:function(emp_id, firstName, lastName) {
    return axios.post('/addEmpSchedule', {
      emp_id: emp_id,
      firstName: firstName,
      lastName: lastName
    });
  },

  updateEmpSchedule: function(empSchedule) {
    return axios.put('/updateSchedule/' + empSchedule._id, {
      employeeSchedule: empSchedule
    });
  },

  //Update the leave request (update approve to true/false)
  approveLeave: function(id,userId,leaveType) {
    return axios.put('/updateLeaveRequest/'+ id, {
      userId: userId,
      leaveType: leaveType,
    });
  },

  addEmployee: function(firstName, lastName, addressOne, addressTwo, 
    city, state, zip, email, phone, phoneType, designation, team, user_id) {
    return axios.post("/addEmployee", {
        firstName: firstName,
        lastName: lastName,
        addressOne: addressOne,
        addressTwo: addressTwo,
        city: city,
        state: state,
        zip: zip,
        email: email,
        phone: phone,
        phoneType: phoneType,
        designation: designation,
        team: team,
        user_id: user_id 
      });
  },

  //Add leave request
  addLeave: function(userId,groupId,userName,leaveTitle,leaveBody,leaveType,leaveDay) {
    return axios.post("/addLeave", {
        userId: userId,
        groupId: groupId,
        userName: userName,
        leaveTitle: leaveTitle,
        leaveBody: leaveBody,       
        leaveType: leaveType,       
        leaveDay: leaveDay,       
      });
  },

//List all leave requests
  getleaveRequests: function() {
    return axios.get('/getALLLeaveRequests')
    .then(function(response){
        return response;
    })
  },

  //Get all leave details of the user
  getAllleaveDetails: function() {
    return axios.get('/getAllLeaveDetails')
    .then(function(response){
        return response;
    })
  },


  updateEmployee: function(id, firstName, lastName, addressOne, addressTwo, city, state, zip, email, phone, phoneType, designation, team, doj) {
       return axios.put("/updateEmployee/" + id, {
           firstName: firstName,
           lastName: lastName,
           addressOne: addressOne,
           addressTwo: addressTwo,
           city: city,
           state: state,
           zip: zip,
           email: email,
           phone: phone,
           phoneType: phoneType,
           designation: designation,
           team: team,
           doj: doj,
           active: 1
       });
  },

  updateEmpName: function(emp_id, firstName, lastName)  {
    return axios.put("/updateEmpName/" + emp_id, {
        firstName: firstName,
        lastName: lastName
       });
  },

  //Update employee's group id to user schema
  updateEmpTeam: function(user_id, team_id, design_id)  {
    return axios.put("/updateEmpTeam/" + user_id, {
        groupId: team_id,
        designationId: design_id,
        active: 1
       });
  },

  removeEmployee: function(id) {
    return axios.put("/removeEmployee/" + id);
  },

  removeEmpSchedule: function(emp_id) {
    return axios.put("/removeEmpSchedule/" + emp_id);
  },

  getAnnouncements: function() {
    return axios.get("/getAnnouncements");
  },
  
  getMiscs: function() {
    return axios.get("/getMiscs");
  },

  addAnnouncements: function(title, content) {
    return axios.post("/addAnnouncements", {
        title: title,
        content: content });
  },
  addMiscs: function(title, content) {
    return axios.post("/addMiscs", {
        title: title,
        content: content });
  },
  
    //Send email functionality
    sendMail:function(name,email,message,maillist) {
      return axios.post('/sendEmail', {
        name: name,
        email: email,
        message: message,
        maillist: maillist
      });
    },

    //Upload image
   /* fileUpload:function(formData,config) {
      return axios.post('/fileUpload', {
        fd: formData,
      },config);
    },*/
};

module.exports = helper;
