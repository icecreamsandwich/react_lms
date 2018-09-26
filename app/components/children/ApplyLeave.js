var React = require("react");
var helpers = require("../utils/helpers");

var ApplyLeave = React.createClass({
    getInitialState: function() {
        return {
            firstName: "",
            emp_id: "",
            group_id: "",
            leaveTitle: "",
            leaveBody: "",
            datetime: "",
            allLeaves : [],
            username: "",
            picture: "",
            user_id:"",
            leavetype:"",
       /*     leaveday:"",*/
        };
    },

    componentDidMount: function() {
        helpers.getCurrentUser().then(function(response) {
          if (response !== this.state.username) {
            this.setState({ picture: response.data.picture, 
                username: response.data.username,
                user_id: response.data._id,
                group_id: response.data.groupId,
                design_id: response.data.designationId
            });
            this.activeButtons();
          }
        }.bind(this));
        $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 ,// Creates a dropdown of 15 years to control year
          format: 'yyyy-mm-dd',
        });
    },

    handleUserChange(event) {      
       this.setState({ [event.target.name]: event.target.value});
    },
    
    handleAddForm: function(event) {
        event.preventDefault();
        var pickedDate = $(".datepicker").val();
        helpers.addLeave(this.state.user_id, this.state.group_id, this.state.username ,
            this.state.leaveTitle, 
            this.state.leaveBody, this.state.leavetype,
            pickedDate).then(function(response) {
        }.bind(this));
        Materialize.toast('Leave Requested Successfully', 3000,'blue rounded');
        this.clearForm();
    },

    clearForm: function() {
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
            if ((elements[i].type == "text") || (elements[i].type == "number") || (elements[i].type == "email")) {
                elements[i].value = "";
                elements[i].classList.remove("valid");
            }
        };
    },

    activeButtons: function() {
        document.getElementById("addEmployee").className = "btn btn-large waves-effect waves-light green accent-3";         
    },

    render: function() {
        return (
            <div className="row">
            <h5>Apply for Leave </h5>
                <div className="col m9">
                    <div className="row">
                        <form className="col m12" onSubmit={this.handleAddForm} id="applyLeaveForm">
                        <div className="row">
                                <div className="input-field col m3 s6">
                                    <select className="browser-default" name="leavetype" value={this.state.leavetype} onChange={this.handleUserChange} required>
                                        <option value="" disabled>Leave Type</option>
                                        <option value="CL">Casual Leave</option>
                                        <option value="SL">Sick Leave</option>
                                        <option value="AL">Annual Leave</option>
                                    </select>
                                </div>
                                <div className="row">
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="Day"
                                        name="leaveday"
                                        type="text"
                                        className="validate datepicker"
                                        value={this.state.leaveday}
                                        onChange={this.handleUserChange}                                    
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="Leave Subject"
                                        name="leaveTitle"
                                        type="text"
                                        className="validate"
                                        value={this.state.leaveTitle}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m12 s12">
                                    <input
                                        placeholder="Leave Body"
                                        name="leaveBody"
                                        type="text"
                                        className="validate"
                                        value={this.state.leaveBody}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                                                
                            <div className="row">
                                <div className="col s4">
                                    <button id="addEmployee" className="btn btn-large waves-effect waves-light green accent-3" type="submit" value="Submit">Submit
                                        <i className="material-icons right">person_add</i>
                                    </button>
                                </div>                          
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ApplyLeave;