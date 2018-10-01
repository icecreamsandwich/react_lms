var React = require("react");
var ReactDOM = require('react-dom');
var helpers = require("../utils/helpers");

var UpdateProfile = React.createClass({
    getInitialState: function() {
        return {
            firstName: "",
            lastName: "",
            addressOne: "",
            addressTwo: "",
            city: "",
            state: "",
            zip: "",
            email: "",
            phone: "",
            phoneType: "",
            designation: "",
            team: "",
            emp_user_id : "",
            allEmployees: [],
        };
    },

    componentDidMount: function() {       
        this.getEmployees();  
    },

    componentDidUpdate: function(){   
    },
    
    getEmployees: function() {   
        helpers.getAllEmployees(this.state.group_id).then(function(response) {
            if (response !== this.state.allEmployees) {
                this.setState({ allEmployees: response.data });
                this.activeButtons();
            }
        }.bind(this));
    },

    handleUserChange(event) {
       this.setState({ [event.target.name]: event.target.value});
    },

    handleUpdateForm: function(event) {
        event.preventDefault();
        
        helpers.updateEmployee(this.state.selectedEmployee, this.state.firstName, 
            this.state.lastName, this.state.addressOne, this.state.addressTwo, 
            this.state.city, this.state.state, this.state.zip, this.state.email, 
            this.state.phone, this.state.phoneType,
             this.state.designation,this.state.team, "", "").then(function(response) {
        }.bind(this));
        Materialize.toast("Employee updated", 3000);
        this.clearForm();
        this.getEmployees();       
   },
    clearForm: function() {
        var elements = document.getElementsByTagName("input");       
        for (var i=0; i < elements.length; i++) {
            if ((elements[i].type == "text") || (elements[i].type == "number") || (elements[i].type == "email")) {
                elements[i].value = "";
                elements[i].classList.remove("valid");
            }
        };
        this.getEmployees();
    },

    clearStates: function() {
        this.setState({ firstName: "", lastName: "", addressOne: "", addressTwo: "", city: "", state: "", zip: "", email: "", phone: "", phoneType: "",designation: "",team: "", selectedEmployee: ""});
    },

    activeButtons: function() {
    },

    render: function() {
                var filterd_employees = this.state.allEmployees.filter((employees) => 
                    (employees.user_id != this.state.user_id ));      	                   
        return (  
            {filterd_employees.map(function(employee, i) {
        return (
            <div className="row">
                <div className="col s12">
                    <form className="col m12" onSubmit={this.handleAddForm} id="employeeForm">
                            <div className="row">
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        type="text"
                                        className="validate"
                                        value={employee.firstName}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        type="text"
                                        className="validate"
                                        value={employee.lastName}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m12 s12">
                                    <input
                                        placeholder="Address One"
                                        name="addressOne"
                                        type="text"
                                        className="validate"
                                        value={employee.addressOne}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m12 s12">
                                    <input
                                        placeholder="Address Two"
                                        name="addressTwo"
                                        type="text"
                                        className="validate"
                                        value={employee.addressTwo}
                                        onChange={this.handleUserChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="City"
                                        name="city"
                                        type="text"
                                        className="validate"
                                        value={employee.city}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m3 s6">
                                    <select className="browser-default" name="state" value={this.state.state} onChange={this.handleUserChange} required>
                                        <option value="" disabled>State</option>
                                        <option value="AL">AL</option>
                                        <option value="AK">AK</option>
                                        <option value="AZ">AZ</option>
                                        <option value="AR">AR</option>
                                    </select>
                                </div>
                                <div className="input-field col m3 s6">
                                    <input
                                        placeholder="Zip"
                                        name="zip"
                                        type="number"
                                        className="validate"
                                        value={employee.zip}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m6 s6">
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        type="email"
                                        className="validate"
                                        value={this.employee.email}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m6 s6">
                                    <input
                                        placeholder="Date of Join"
                                        name="doj"
                                        type="text"
                                        className="validate datepicker"
                                        value={this.employee.doj}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m8 s8">
                                    <input
                                        placeholder="Phone"
                                        name="phone"
                                        type="number"
                                        className="validate"
                                        value={this.employee.phone}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m4 s4">
                                    <select className="browser-default" name="phoneType" value={this.state.phoneType} onChange={this.handleUserChange} required>
                                        <option value="" disabled>Phone Type</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="work">Work</option>
                                        <option value="home">Home</option>
                                    </select>
                                </div>                                
                            </div>
                         <div className="row">
                              <div className="input-field col m8 s8">
                                <select className="browser-default" name="designation" value={this.employee.designation} onChange={this.handleUserChange} required>
                                  <option value="" disabled>Designation</option>
                                  <option value="1">Manager</option>
                                  <option value="2">Team Leader</option>
                                  <option value="3">Developer</option>
                                  <option value="4">Support Engineer</option>
                                  <option value="8">Designer</option>
                                  <option value="9">SEO Specialist</option>
                                  <option value="5">HR</option>
                                  <option value="6">CEO</option>
                                  <option value="7">CTO</option>
                                </select>
                              </div>
                              <div className="input-field col m4 s4">
                                <select className="browser-default" name="team" value={this.employee.team} onChange={this.handleUserChange} required>
                                  <option value="" disabled>Team</option>
                                  <option value="1">QHO</option>
                                  <option value="2">ADNET</option>
                                  <option value="3">HN</option>
                                  <option value="4">Vodafone</option>
                                  <option value="5">365andUP</option>
                                  <option value="6">Piserve</option>
                                </select>
                              </div>
                          </div>

                            <div className="row">
                                <div className="col s4">
                                    <a id="updateEmployee" className="btn btn-large waves-effect waves-light blue accent-3" onClick={this.handleUpdateForm}>Update
                                        <i className="material-icons right">edit</i>
                                    </a>
                                </div>
                                <div className="col s4">
                                    <a id="removeEmployee" className="btn btn-large waves-effect waves-light red accent-3" onClick={this.handleRemoveForm}>Remove
                                        <i className="material-icons right">person_outline</i>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }, this)}        
    );
  }
});

module.exports = UpdateProfile;