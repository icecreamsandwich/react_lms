var React = require("react");
var ReactDOM = require('react-dom');
var helpers = require("../utils/helpers");
var SimpleReactFileUpload =  require("./SimpleReactFileUpload");

var ManagerEmployeeAll = React.createClass({
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
            selectedEmployee: "",
            emp_id: "" ,  
            group_id: "" ,  
            design_id: "" ,
            doj: "",
            showEmployeeForm : false,
            employeeForm :""
        };
    },

    componentDidMount: function() {
        helpers.getCurrentUser().then(function(response) {
          if (response !== this.state.username) {
            this.setState({ user_id: response.data._id, 
                group_id: response.data.groupId,
                design_id: response.data.designationId,
                user_type: response.data.userType
            });
          }
        }.bind(this)); 
        this.getEmployees();  
    },

    componentDidUpdate: function(){
         //Apply date picker to the Leave day field
        $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });   
        
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
        helpers.updateEmployee(this.state.selectedEmployee, this.state.firstName, this.state.lastName, this.state.addressOne, this.state.addressTwo, this.state.city, this.state.state, this.state.zip, this.state.email, this.state.phone, this.state.phoneType,
             this.state.designation,this.state.team,this.state.doj).then(function(response) {
        }.bind(this));

        helpers.updateEmpTeam(this.state.emp_user_id, this.state.team, this.state.designation).then(function(response) {
        }.bind(this));

        Materialize.toast("Employee updated", 3000);
        this.clearForm();
        this.getEmployees();       
   },


    clickEmployee: function(event) {
        this.setState({selectedEmployee: event.target.id}, function() {
            for (var i = 0; i < this.state.allEmployees.length; i++) {
                if (this.state.allEmployees[i]._id == this.state.selectedEmployee) {
                    this.setState({
                        firstName: this.state.allEmployees[i].firstName,
                        lastName: this.state.allEmployees[i].lastName,
                        addressOne: this.state.allEmployees[i].addressOne,
                        addressTwo: this.state.allEmployees[i].addressTwo,
                        city: this.state.allEmployees[i].city,
                        state: this.state.allEmployees[i].state,
                        zip: this.state.allEmployees[i].zip,
                        email: this.state.allEmployees[i].email,
                        phone: this.state.allEmployees[i].phone,
                        phoneType: this.state.allEmployees[i].phoneType,
                        designation: this.state.allEmployees[i].designation,
                        team: this.state.allEmployees[i].team,
                        doj: this.state.allEmployees[i].doj,
                        emp_user_id: this.state.allEmployees[i].user_id,
                        emp_id: this.state.selectedEmployee
                    });
                    this.activeButtons();
                }
            }
        });
        this.setState({ showEmployeeForm: true });
    },

    newEmployee: function() {
        this.clearForm();
        this.clearStates();
        this.activeButtons();
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
        // don't allow updating or removing on empty form
        /*if (this.state.selectedEmployee == "") {
            document.getElementById("addEmployee").className = "btn btn-large waves-effect waves-light green accent-3";
            document.getElementById("updateEmployee").className += " disabled";
            document.getElementById("removeEmployee").className += " disabled";
        } else {
            document.getElementById("addEmployee").className += " disabled";
            document.getElementById("updateEmployee").className = "btn btn-large waves-effect waves-light blue accent-3";
            document.getElementById("removeEmployee").className = "btn btn-large waves-effect waves-light red accent-3";
        }*/
    },

    render: function() {
        let employeeForm= "";
        {
            if(this.state.user_type=="su"){
                var filterd_employees = this.state.allEmployees;
            }
            else if(this.state.group_id == 6 && 
                (this.state.design_id == 5 || this.state.design_id == 6 || this.state.design_id == 7)){
                var filterd_employees = this.state.allEmployees;
            }else{
                var filterd_employees = this.state.allEmployees.filter((employees) => (employees.team == this.state.group_id &&
                  employees.user_id != this.state.user_id ) );
            }         
            if (this.state.showEmployeeForm){
                employeeForm = <form className="col m12" onSubmit={this.handleAddForm} id="employeeForm">
                            <div className="row">
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        type="text"
                                        className="validate"
                                        value={this.state.firstName}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        type="text"
                                        className="validate"
                                        value={this.state.lastName}
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
                                        value={this.state.addressOne}
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
                                        value={this.state.addressTwo}
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
                                        value={this.state.city}
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
                                        value={this.state.zip}
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
                                        value={this.state.email}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m6 s6">
                                    <input
                                        placeholder="Date of Join"
                                        name="doj"
                                        type="text"
                                        className="validate datepicker"
                                        value={this.state.doj}
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
                                        value={this.state.phone}
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
                                <select className="browser-default" name="designation" value={this.state.designation} onChange={this.handleUserChange} required>
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
                                <select className="browser-default" name="team" value={this.state.team} onChange={this.handleUserChange} required>
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
                            <div className="input-field col m4 s4">
                                <SimpleReactFileUpload firstName={this.state.firstName} />
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
                        </form>;
            }
            else{
                employeeForm = "";
            }
        }           
        return (            
            <div className="row">
                <div className="col m3">
                    <table className="highlight" id="allEmployees">
                        <thead>
                            <tr>
                                <th data-field="name">Employees</th>
                            </tr>
                        </thead>
                        <tbody>                        
                            {filterd_employees.map(function(ManagerEmployeeAll, i) {
                                return (
                                    <tr key={i}>
                                        <td className="employeeList" onClick={this.clickEmployee} id={ManagerEmployeeAll._id}>
                                            {ManagerEmployeeAll.firstName} {ManagerEmployeeAll.lastName}
                                        </td>
                                    </tr>
                                );
                            }, this)}
                        </tbody>
                    </table>
                </div>
                <div className="col m9">
                    <div className="row">
                        {employeeForm}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ManagerEmployeeAll;