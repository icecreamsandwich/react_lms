var React = require("react");
var helpers = require("../utils/helpers");

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
            design_id: ""   
        };
    },

    componentDidMount: function() {
        helpers.getCurrentUser().then(function(response) {
          if (response !== this.state.username) {
            this.setState({ user_id: response.data._id, 
                group_id: response.data.groupId,
                design_id: response.data.designationId
            });
          }
        }.bind(this)); 
        this.getEmployees();
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

    handleAddForm: function(event) {
        event.preventDefault();
        helpers.addEmployee(this.state.firstName, this.state.lastName, 
            this.state.addressOne, this.state.addressTwo, this.state.city, 
            this.state.state, this.state.zip, this.state.email, 
            this.state.phone, this.state.phoneType,
            this.state.designation,this.state.team,this.state.user_id).then(function(response) {
            this.state.emp_user_id = response.data.user_id;

            helpers.addEmpSchedule(this.state.emp_id, this.state.firstName, this.state.lastName).then(function(response) {
                this.clearStates();
            }.bind(this));

        }.bind(this));
        Materialize.toast('Employee added', 3000);
        this.clearForm();
        this.getEmployees();
    },

    handleUpdateForm: function(event) {
        event.preventDefault();
        helpers.updateEmployee(this.state.selectedEmployee, this.state.firstName, this.state.lastName, this.state.addressOne, this.state.addressTwo, this.state.city, this.state.state, this.state.zip, this.state.email, this.state.phone, this.state.phoneType,
             this.state.designation,this.state.team).then(function(response) {
        }.bind(this));

       /* helpers.updateEmpName(this.state.emp_id, this.state.firstName, this.state.lastName).then(function(response) {
            this.clearStates();
        }.bind(this));*/

        helpers.updateEmpTeam(this.state.emp_user_id, this.state.team, this.state.designation).then(function(response) {
        }.bind(this));

        Materialize.toast("Employee updated", 3000);
        this.clearForm();
        this.getEmployees();
   },

    handleRemoveForm: function(event) {
        event.preventDefault();
        helpers.removeEmployee(this.state.selectedEmployee).then(function(response) {
        }.bind(this));
        helpers.removeEmpSchedule(this.state.emp_id).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast("Employee removed", 3000);
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
                        emp_user_id: this.state.allEmployees[i].user_id,
                        emp_id: this.state.selectedEmployee
                    });
                    this.activeButtons();
                }
            }
        });
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
        if (this.state.selectedEmployee == "") {
            document.getElementById("addEmployee").className = "btn btn-large waves-effect waves-light green accent-3";
            document.getElementById("updateEmployee").className += " disabled";
            document.getElementById("removeEmployee").className += " disabled";
        } else {
            document.getElementById("addEmployee").className += " disabled";
            document.getElementById("updateEmployee").className = "btn btn-large waves-effect waves-light blue accent-3";
            document.getElementById("removeEmployee").className = "btn btn-large waves-effect waves-light red accent-3";
        }
    },

    render: function() {
        {
            if(this.state.group_id == 6 && this.state.design_id == 6){
                var filterd_employees = this.state.allEmployees;
            }else{
                var filterd_employees = this.state.allEmployees.filter((employees) => employees.team == this.state.group_id );
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
                            <tr>
                                <td id="newEmployee" onClick={this.newEmployee}>
                                    <strong>New Employee<i className="material-icons right">add</i></strong>
                                </td>
                            </tr>                           
                            {filterd_employees.map(function(ManagerEmployeeAll, i) {
                                return (
                                    <tr key={i}>
                                        <td onClick={this.clickEmployee} id={this.state.allEmployees[i]._id}>
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
                        <form className="col m12" onSubmit={this.handleAddForm}>
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
                                        <option value="CA">CA</option>
                                        <option value="CO">CO</option>
                                        <option value="CT">CT</option>
                                        <option value="DE">DE</option>
                                        <option value="FL">FL</option>
                                        <option value="GA">GA</option>
                                        <option value="HI">HI</option>
                                        <option value="ID">ID</option>
                                        <option value="IL">IL</option>
                                        <option value="IN">IN</option>
                                        <option value="IA">IA</option>
                                        <option value="KS">KS</option>
                                        <option value="KY">KY</option>
                                        <option value="LA">LA</option>
                                        <option value="ME">ME</option>
                                        <option value="MD">MD</option>
                                        <option value="MA">MA</option>
                                        <option value="MI">MI</option>
                                        <option value="MN">MN</option>
                                        <option value="MS">MS</option>
                                        <option value="MO">MO</option>
                                        <option value="MT">MT</option>
                                        <option value="NE">NE</option>
                                        <option value="NV">NV</option>
                                        <option value="NH">NH</option>
                                        <option value="NJ">NJ</option>
                                        <option value="NM">NM</option>
                                        <option value="NY">NY</option>
                                        <option value="NC">NC</option>
                                        <option value="ND">ND</option>
                                        <option value="OH">OH</option>
                                        <option value="OK">OK</option>
                                        <option value="OR">OR</option>
                                        <option value="PA">PA</option>
                                        <option value="RI">RI</option>
                                        <option value="SC">SC</option>
                                        <option value="SD">SD</option>
                                        <option value="TN">TN</option>
                                        <option value="TX">TX</option>
                                        <option value="UT">UT</option>
                                        <option value="VT">VT</option>
                                        <option value="VA">VA</option>
                                        <option value="WA">WA</option>
                                        <option value="WV">WV</option>
                                        <option value="WI">WI</option>
                                        <option value="WY">WY</option>
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
                                <div className="input-field col m12 s12">
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        type="email"
                                        className="validate"
                                        value={this.state.email}
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
                                <div className="col s4">
                                    <button id="addEmployee" className="btn btn-large waves-effect waves-light green accent-3" type="submit" value="Submit">Add
                                        <i className="material-icons right">person_add</i>
                                    </button>
                                </div>
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
            </div>
        );
    }
});

module.exports = ManagerEmployeeAll;