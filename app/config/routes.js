var React = require("react");
var router = require("react-router");
var Route = router.Route;
var Router = router.Router;

var browserHistory = router.browserHistory;
var IndexRoute = router.IndexRoute;

// landing components
var Main = require("../components/Main");
var Login = require("../components/children/Login");
var Register = require("../components/children/Register");
// manager components
var Manager = require("../components/Manager");
var ManagerHome = require("../components/children/ManagerHome");
var ManagerEmployeeAll = require("../components/children/ManagerEmployeeAll");
var ManagerSchedulesCreate = require("../components/children/ManagerSchedulesCreate");
var ApplyLeave = require("../components/children/ApplyLeave");
var LeaveRequests = require("../components/children/LeaveRequests");
var LeavePolicy = require("../components/children/LeavePolicy");
var LeaveDetails = require("../components/children/LeaveDetails");

// employee components
var Employee = require("../components/Employee");
var EmployeeHome = require("../components/children/EmployeeHome");
var Lorem = require("../components/children/Lorem");

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />        
        <IndexRoute component={Login} />
        <Route path="manager" component={Manager}>
            <Route path="employeeAll" component={ManagerEmployeeAll} />
            <Route path="schedulesCreate" component={ManagerSchedulesCreate} />
            <Route path="lorem" component={Lorem} />
            <Route path="applyleave" component={ApplyLeave} />
            <Route path="leaveManager" component={LeaveRequests} />
            <Route path="leavePolicy" component={LeavePolicy} />
            <Route path="leaveDetails" component={LeaveDetails} />
            <IndexRoute component={ManagerHome} />
        </Route>        
        <Route path="employee" component={Employee}>
            <Route path="lorem" component={Lorem} />
            <Route path="applyleave" component={ApplyLeave} />
            <Route path="leavePolicy" component={LeavePolicy} />
            <Route path="leaveDetails" component={LeaveDetails} />
            <IndexRoute component={EmployeeHome} />
        </Route>
    </Route>
  </Router>
);