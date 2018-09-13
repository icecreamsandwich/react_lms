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
        };
    },

     componentDidMount: function() {
        helpers.getleaveRequests().then(function(response) {
            console.log(response); 
            if (response !== this.state.LeaveRequests) {
                this.setState({ LeaveRequests: response.data });
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
                        leaveTitle: this.state.LeaveRequests[i].leaveTitle,
                        leaveBody: this.state.LeaveRequests[i].leaveBody,
                        group_id: this.state.LeaveRequests[i].group_id,
                        datetime: this.state.LeaveRequests[i].datetime,
                        selectedLeaveRequest: this.state.LeaveRequests[i]
                    });
            }        
        } 
    },

    render: function() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h5>Leave Requests</h5>
                        <table className="bordered highlight">
                            <thead>
                                <tr>
                                    <th data-field="name">Requester</th>
                                    <th data-field="name">Title</th>
                                    <th data-field="name">Body</th>
                                    <th data-field="name">Date</th>
                                    <th data-field="name">Team</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.LeaveRequests.map(function(leaveRequests, i) {
                                return (
                                    <tr key={i}>
                                        <td className="fullName">
                                            {leaveRequests.firstName}
                                        </td>
                                        <td className="schedule">
                                            {leaveRequests.leaveTitle}
                                        </td>
                                        <td onClick={this.leaveClickHandler} id={leaveRequests._id}>
                                            {leaveRequests.leaveBody}
                                        </td>
                                        <td>
                                            {leaveRequests.datetime}
                                        </td>  
                                        <td>
                                            {leaveRequests.group_id}
                                        </td>                              
                                    </tr>
                                );
                            }, this)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*Render the approval form here */}
                { this.state.showForm ? <LeaveForm leaveData={this.state.selectedLeaveRequest} /> : null }
            </div>
        );
    }
});

var LeaveForm = React.createClass({

    leaveFormSubmitHandler: function(event) {
        event.preventDefault();
        helpers.approveLeave(this.props.leaveData._id).then(function(response) {
        }.bind(this));
        Materialize.toast('Leave Approved Successfully', 3000);
    },

                    render: function() {
                        return (
                             <div className="col m9">
                             <br/><br/><br/>
                             <h5>Leave Application</h5>
                                <div className="row">
                                    <form className="col m12" onSubmit={this.leaveFormSubmitHandler}>
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
                                                <button id="addEmployee" className="btn btn-large waves-effect waves-light green accent-3" type="submit" value="Submit">Approve
                                                    <i className="material-icons right">person_add</i>
                                                </button>
                                                <button id="addEmployee" className="btn btn-large waves-effect waves-light red accent-3" type="submit" value="Submit">Decline
                                                    <i className="material-icons right">person_add</i>
                                                </button>
                                            </div>                          
                                        </div>
                                    </form>
                                </div>
                            </div>
                        );
                    }
                });

module.exports = LeaveRequests;

                