var React = require("react");
var helpers = require("../utils/helpers");

var LeaveDetails = React.createClass({

    getInitialState: function() {
        return {
            leaveDetails: [],
            LeaveRequests: [],
            allEmployees: [],
            showCLLeaves: false,
            showSLLeaves: false,
            showALLeaves: false,
            // empDoj:"",
            currentYear:"",
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

        //Get all leave Requests
        helpers.getleaveRequests().then(function(response) {
            console.log(response); 
            if (response !== this.state.LeaveRequests) {
                this.setState({ LeaveRequests: response.data });
            }
        }.bind(this));

        //get ALL employee  details 
        helpers.getAllEmployees().then(function(response) {
            if (response !== this.state.allEmployees) {
                this.setState({ allEmployees: response.data });                
            }           
        }.bind(this));
         
        var filterd_employees = this.state.allEmployees.filter((employee) => (employee.user_id == this.state.user_id));
        filterd_employees.map(function(employee, i) {
           this.setState({empDoj:empDoj});
        });
        // get formatted date 
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();

        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = yyyy+'-'+mm+'-'+dd;
        this.setState({currentYear:yyyy,nextYear:yyyy+1,today:today});

    },

    componentDidUpdate() {
       //fetch details of the leaves of the current user from here 
       var leaveTypeStr = "";
       var empDoj =  "";  
       var filterdleaves = this.state.leaveDetails.filter((leaves) => (leaves.user_id == this.state.user_id));
        filterdleaves.map(function(leave_details, i){
             var CL = leave_details.CL;
             var SL = leave_details.SL;
             var AL = leave_details.AL;
             if (CL == 0)leaveTypeStr = "Casual Leaves";
             else if(SL == 0)leaveTypeStr = "Sick Leaves";
             else if(AL == 0)leaveTypeStr = "Annual Leaves";
        });
         /*if(leaveTypeStr !== "") Materialize.toast('Your '+leaveTypeStr+' have been exhausted. Please take care while taking leaves',
          10000,'red rounded');*/
        
    },

   showCLLeavesClickHandler : function (){
      this.setState({ showCLLeaves: true , showSLLeaves: false,showALLeaves: false});
   },
   showSLLeavesClickHandler : function (){
      this.setState({ showSLLeaves: true , showCLLeaves: false,showALLeaves: false});
   },
   showALLeavesClickHandler : function (){
      this.setState({ showALLeaves: true, showCLLeaves: false,showSLLeaves: false });
   },

    render: function() {
        //Annual leaves calculations will happen on 31st march
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var formattedDay =  yyyy+'-'+mm+'-'+dd;           
        if(formattedDay.indexOf("3-31") != -1){ 
            // alert("Financial Year");
            var doj = new Date(this.state.empDoj);    
            var timeDiff = Math.abs(today.getTime() - doj.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            var diffYears = Math.round(diffDays / 365) ;

            if(diffYears >= 2){
                //function call to add the annual leaves to 12
                // and CL and SL will be resetted to 5 and 12
            if(AL != 0){
                var updatedAL = AL+12;
                var leave_upto_sept = AL;
                var leave_sept_march = updatedAL-AL;
            } 
            else {
                var AL =12;
                var CL =5 ; 
                var SL = 12;
            }
            helpers.updateEmpLeaveDetails(this.state.user_id, CL, 
                SL, updatedAL ,leave_upto_sept , leave_sept_march).then(function(response) {
            }.bind(this));

            Materialize.toast("Employees leave details updated+2", 3000,"rounded green");

            }
            else{
               // CL and SL will be resetted to 5 and 7
               var CL =5 ; 
               var SL = 7; 
               var AL = 0;
            helpers.updateEmpLeaveDetails(this.state.user_id, CL, 
                SL, AL ,0 , 0).then(function(response) {
            }.bind(this));

            Materialize.toast("Employees leave details updated", 3000,"rounded green");
            }
        }         
        let LForm= "";
        let filterAr = [];
        {             
            //Get all leaved filtered by CL,SL and AL 
            var filterdleaves = this.state.leaveDetails.filter((leaves) => (leaves.user_id == this.state.user_id ));
            var filterdleaveRequestsCL = this.state.LeaveRequests.filter((leaveRequests) => 
                (leaveRequests.emp_id == this.state.user_id && leaveRequests.leaveType == "CL"));
            var filterdleaveRequestsCLCount = filterdleaveRequestsCL.length;
            var filterdleaveRequestsSL = this.state.LeaveRequests.filter((leaveRequests) => 
                (leaveRequests.emp_id == this.state.user_id && leaveRequests.leaveType == "SL"));
            var filterdleaveRequestsSLCount = filterdleaveRequestsSL.length;
            var filterdleaveRequestsAL = this.state.LeaveRequests.filter((leaveRequests) => 
                (leaveRequests.emp_id == this.state.user_id && leaveRequests.leaveType == "AL"));
            var filterdleaveRequestsALCount = filterdleaveRequestsAL.length;

            //Decides which type of leave need to iterate
             if (this.state.showCLLeaves) filterAr = filterdleaveRequestsCL;
             else if (this.state.showSLLeaves) filterAr = filterdleaveRequestsSL;
             else if (this.state.showALLeaves) filterAr = filterdleaveRequestsAL;

            if (this.state.showCLLeaves || this.state.showSLLeaves || this.state.showALLeaves){
                LForm = <table className="bordered highlight striped">
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
                                {filterAr.map(function(leaveRequests, i) {
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
                                        <td className="employeeList" id={leaveRequests._id}>
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
                    } 
                    else {
                        LForm ="";
                    }

        }   
        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h5>Leave Remaining ({this.state.currentYear}-{this.state.nextYear})</h5>
                        <table className="bordered highlight striped">
                            <thead>
                                <tr>
                                    <th data-field="name">CL</th>
                                    <th data-field="name">SL</th>
                                    <th data-field="name">Total AL</th>
                                    <th data-field="name">AL upto September</th>
                                    <th data-field="name">AL Sept-march</th>
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
                                            {leavedetail.Al_upto_sept}
                                        </td>
                                        <td>
                                            {leavedetail.Al_sept_to_march}
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
                <div className="col s12">
                    <div className="section">
                        <h5>Leave Taken So far ({this.state.currentYear}-{this.state.nextYear})</h5>
                        <table className="bordered highlight striped responsive-table" width="30%">
                        <tr>
                            <td className="fullName">
                                Casual Leaves
                            </td>
                            <td className="employeeList" onClick={this.showCLLeavesClickHandler}>
                                <a>{filterdleaveRequestsCLCount}</a>
                            </td>
                        </tr> 
                        <tr>   
                            <td className="fullName">
                                Sick Leaves
                            </td>
                            <td className="employeeList" onClick={this.showSLLeavesClickHandler}>
                                <a>{filterdleaveRequestsSLCount}</a>
                            </td>
                        </tr> 
                        <tr>  
                            <td className="fullName">
                                Annual Leaves
                            </td>
                            <td className="employeeList" onClick={this.showALLeavesClickHandler}>
                                <a>{filterdleaveRequestsALCount}</a>
                            </td>
                        </tr>
                          </table>              
                          {LForm}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LeaveDetails;