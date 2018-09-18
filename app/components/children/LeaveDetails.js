var React = require("react");
var helpers = require("../utils/helpers");

var LeaveDetails = React.createClass({

    getInitialState: function() {
        return {
            leaveDetails: [],
        };
    },

    componentDidMount: function() {    
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
            if (response !== this.state.leaveDetails) {
                this.setState({ leaveDetails: response.data });
            }
        }.bind(this));

    },

    componentDidUpdate() {
       //fetch details of the leaves of the current user from here 
       var user_id = this.state.user_id;
    },


    render: function() {
        {
            var filterdleaves = this.state.leaveDetails.filter((leaves) => (leaves.user_id == this.state.user_id ));
        }   
        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h5>Leave Details (2017-2018)</h5>
                        <table className="bordered highlight">
                            <thead>
                                <tr>
                                    <th data-field="name">CL</th>
                                    <th data-field="name">SL</th>
                                    <th data-field="name">AL</th>
                                    <th data-field="name">LOP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterdleaves.map(function(leavedetail, i) {
                                return (
                                    <tr key={i}>
                                        <td className="fullName">
                                            {leavedetail.CL}
                                        </td>
                                        <td className="schedule">
                                            {leavedetail.SL}
                                        </td>
                                        <td>
                                            {leavedetail.AL}
                                        </td>
                                        <td>
                                            {leavedetail.LOP}
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

module.exports = LeaveDetails;