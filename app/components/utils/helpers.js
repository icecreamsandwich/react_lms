var axios = require("axios");

var helper = {

  getAllEmployees: function() {
    return axios.get("/getAllEmployees");
  },

  getCurrentUser: function() {
    return axios.get("/user");
  },

  // errorMessage: function() {
  //   return axios.get("/register");
  // },

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
  approveLeave: function(leaveId) {
    return axios.put('/updateLeaveRequest/' + leaveId, {
      leaveId: leaveId
    });
  },

  addEmployee: function(firstName, lastName, addressOne, addressTwo, city, state, zip, email, phone, phoneType, designation, team) {
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
        team: team 
      });
  },

  //Add leave request
  addLeave: function(userId,groupName,userName,leaveTitle,leaveBody) {
    return axios.post("/addLeave", {
        userId: userId,
        groupName: groupName,
        userName: userName,
        leaveTitle: leaveTitle,
        leaveBody: leaveBody,       
      });
  },

//List all leave requests
  getleaveRequests: function() {
    return axios.get('/getALLLeaveRequests')
    .then(function(response){
        return response;
    })
  },


  updateEmployee: function(id, firstName, lastName, addressOne, addressTwo, city, state, zip, email, phone, phoneType, designation, team) {
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
           team: team
       });
  },

  updateEmpName: function(emp_id, firstName, lastName)  {
    return axios.put("/updateEmpName/" + emp_id, {
        firstName: firstName,
        lastName: lastName
       });
  },

  //Update employee's group id to user schema
  updateEmpTeam: function(emp_id, teamId)  {
    return axios.put("/updateEmpTeam/" + emp_id, {
        emp_id: emp_id,
        team_id: teamId
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
  }
};

module.exports = helper;
