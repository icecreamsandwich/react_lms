var React = require("react");
var helpers = require("../utils/helpers");

var LeaveRequests = React.createClass({

    getInitialState: function() {
        return {
            LeaveRequests: [],
        };
    },

    componentDidMount: function() {
        helpers.getleaveRequests().then(function(response) {
            if (response !== this.state.LeaveRequests) {
                this.setState({ LeaveRequests: response.data });
            }
        }.bind(this));
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
                                        <td>
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
            </div>
        );
    }
});

module.exports = LeaveRequests;