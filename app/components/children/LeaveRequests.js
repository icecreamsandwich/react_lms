var React = require("react");
var helpers = require("../utils/helpers");

var LeaveRequests = React.createClass({

    getInitialState: function() {
        return {
            showForm : false,
            firstName: "",
            emp_id: "",
            group_id: "",
            leaveTitle: "",
            leaveBody: "",
            datetime: "",
            LeaveRequests: [],
            selectedLeaveRequest: [],
            leaveDetails: [],
            userEmail: "",
        };
    // this.leaveFormSubmitHandler = this.leaveFormSubmitHandler.bind(this);
    },

     componentDidMount: function() {
        helpers.getleaveRequests().then(function(response) {
            console.log(response); 
            if (response !== this.state.LeaveRequests) {
                this.setState({ LeaveRequests: response.data });
            }
        }.bind(this));
         //Get current user details 
         helpers.getCurrentUser().then(function(response) {
          if (response !== this.state.username) {
            this.setState({ user_id: response.data._id, 
                group_id: response.data.groupId,
                design_id: response.data.designationId
            });
          }
        }.bind(this));       

        helpers.getAllleaveDetails().then(function(response) {
                this.setState({ leaveDetails: response.data });
        }.bind(this));  

        helpers.getAllEmployees().then(function(response) {
            if (response !== this.state.allEmployees) {
                this.setState({ allEmployees: response.data });
            }
        }.bind(this));
    },

    leaveClickHandler: function(event) {
        this.setState({ showForm: true });
        //iterate through the leave requests to find the selected leave request
        for (var i = 0; i < this.state.LeaveRequests.length; i++) {
            if (this.state.LeaveRequests[i]._id == event.target.id) {
                    this.setState({
                        firstName: this.state.LeaveRequests[i].firstName,
                        leaveType: this.state.LeaveRequests[i].leaveType,
                        leaveTitle: this.state.LeaveRequests[i].leaveTitle,
                        leaveBody: this.state.LeaveRequests[i].leaveBody,
                        group_id: this.state.LeaveRequests[i].group_id,
                        datetime: this.state.LeaveRequests[i].datetime,
                        selectedLeaveRequest: this.state.LeaveRequests[i]
                    });
            }        
        }       
    },

    leaveFormSubmitHandler: function(event) {
            event.preventDefault();            
            var leaveTypeStr = "";  
            var filterd_leave_details = this.state.leaveDetails.filter((leaves) => 
                (leaves.user_id == this.state.selectedLeaveRequest.emp_id));
                filterd_leave_details.map(function(leave_details, i){
                     var CL = leave_details.CL;
                     var SL = leave_details.SL;
                     var AL = leave_details.AL;
                     if (CL == 0 && SL != 0 && AL != 0 )leaveTypeStr = "SL";
                     else if(CL == 0 && SL == 0 && AL != 0 )leaveTypeStr = "AL";
                     else if(CL == 0 && SL == 0 && AL == 0 )leaveTypeStr = "LOP";
                });
                if(!leaveTypeStr)leaveTypeStr = this.state.selectedLeaveRequest.leaveType;

            helpers.approveLeave(this.state.selectedLeaveRequest._id,this.state.selectedLeaveRequest.emp_id,
                leaveTypeStr).then(function(response) {
            }.bind(this));
            Materialize.toast('Leave Approved Successfully', 3000,'green rounded');
            this.setState({ showForm: false });
            
            //Send mail back to the employee that leave has been approved
            var maillist  = [];
            maillist.push(this.state.userEmail);
            helpers.sendMail("",message,maillist).then((response)=>{
                if (response.data.msg === 'success'){
                    Materialize.toast('Email Sent Successfully', 3000,'green rounded');
                }else if(response.data.msg === 'fail'){
                    Materialize.toast('Message failed to send', 3000,'red rounded');
                }
            })
            //location.reload()
        },

    render: function() {
        //Get the user's email from the employees collection 
        var filterd_employees = this.state.allEmployees.filter((employee) => 
                (employee.emp_id == this.state.selectedLeaveRequest.emp_id));
            filterd_employees.map(function(employeee,i){
                 this.setState({userEmail:employeee.email})
            }); 
         var filterd_leave_requests = this.state.LeaveRequests.filter((leaves) => 
                (leaves.approved == false));
        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h5>Leave Requests</h5>
                        <table className="bordered highlight striped">
                            <thead>
                                <tr>
                                    <th data-field="name">Requester</th>
                                    <th data-field="name">Leave Type</th>
                                    <th data-field="name">Title</th>
                                    <th data-field="name">Body</th>
                                    <th data-field="name">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterd_leave_requests.map(function(leaveRequests, i) {
                                return (
                                    <tr key={i}>
                                        <td className="fullName">
                                            {leaveRequests.firstName}
                                        </td>
                                        <td className="fullName">
                                            {leaveRequests.leaveType}
                                        </td>
                                        <td className="schedule">
                                            {leaveRequests.leaveTitle}
                                        </td>
                                        <td className="employeeList" onClick={this.leaveClickHandler} id={leaveRequests._id}>
                                            {leaveRequests.leaveBody}
                                        </td>
                                        <td>
                                            {leaveRequests.datetime}
                                        </td>                     
                                    </tr>
                                );
                            }, this)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*Render the approval form here */}
                { this.state.showForm ? <LeaveForm leaveData={this.state.selectedLeaveRequest} 
                    leaveDetails={this.state.leaveDetails} leaveFormSubmitHandler={this.leaveFormSubmitHandler} /> : null }
            </div>
        );
    }
});

var LeaveForm = React.createClass({

    getInitialState: function() {
        return {
            leaveTypeStr : this.props.leaveData.leaveType,
        };
    },
                    render: function() {
                        return (
                             <div className="col m9">
                             <br/><br/><br/>
                             <h5>Leave Application</h5>
                                <div className="row">
                                    <form className="col m12" onSubmit={this.props.leaveFormSubmitHandler} id="leaveForm">
                                        <div className="row">
                                            <div className="input-field col m6 s12">
                                                <input
                                                    placeholder="Leave Title"
                                                    name="leaveTitle"
                                                    type="text"
                                                    className="validate"
                                                    value={this.props.leaveData.leaveTitle}                                                   
                                                    required readOnly/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col m6 s12">
                                                <input
                                                    placeholder="Leave Type"
                                                    name="leavetype"
                                                    type="text"
                                                    className="validate"
                                                    value={this.props.leaveData.leaveType}                                                   
                                                    required readOnly/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col m12 s12">
                                                <input
                                                    placeholder="Leave Body"
                                                    name="leaveBody"
                                                    type="text"
                                                    className="validate"
                                                    value={this.props.leaveData.leaveBody}                                                  
                                                    required readOnly/>
                                            </div>
                                        </div>
                                                            
                                        <div className="row">
                                            <div className="col s4">
                                                <button id="approveLeave" className="btn btn-large waves-effect waves-light green accent-3" type="submit" value="Submit">Approve
                                                    <i className="material-icons right">person_add</i>
                                                </button>
                                            </div>  
                                            <div className="col s4">
                                                <a id="declineLeave" className="btn btn-large waves-effect waves-light red accent-3" onClick={this.declineLeaveHandler}>Decline
                                                    <i className="material-icons right">person_outline</i>
                                                </a>
                                            </div>                        
                                        </div>
                                    </form>
                                </div>
                            </div>
                        );
                    }
                });

module.exports = LeaveRequests;

                