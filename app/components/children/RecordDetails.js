var React = require("react");
var helpers = require("../utils/helpers");

var RecordDetails = React.createClass({

    getInitialState: function() {
        return {
            UserRecords: [],
            allEmployees: []
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

        //get ALL employee  details 
        helpers.getAllUserRecords().then(function(response) {
            if (response !== this.state.UserRecords) {
                this.setState({ UserRecords: response.data });                
            }           
        }.bind(this));
    },

    componentDidUpdate() {
        
    },
    render: function() {
        {             
            //Get all leaved filtered by CL,SL and AL 
            var filterdUserRecords = this.state.UserRecords.filter((records) => (records.user_id == this.props.userId ));
        }   
        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h5>User Records</h5>
                        <table className="bordered highlight striped">
                            <thead>
                                <tr>
                                    <th data-field="name">Userid</th>
                                    <th data-field="name">Record</th>
                                    <th data-field="name">Record Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterdUserRecords.map(function(record, i) {
                                return (
                                    <tr key={i}>
                                        <td className="fullName">
                                            {record.user_id}
                                        </td>
                                        <td className="schedule">
                                            {record.user_record}
                                        </td>
                                        <td className="schedule">
                                            {record.record_type}
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

module.exports = RecordDetails;