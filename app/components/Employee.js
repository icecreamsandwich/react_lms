var React = require("react");
var helpers = require("./utils/helpers");
var Clock =  require("./children/Clock");

var Employee = React.createClass({

    getInitialState: function() {
        return {
            username: "",
            // picture: ""
        };
    },

    componentDidMount: function() {
       helpers.getCurrentUser().then(function(response) {
          if (response !== this.state.username) {
            this.setState({ picture: response.data.picture, 
                username: response.data.username,
                user_id: response.data._id,
                active: response.data.active 
            });
          }
        }.bind(this));
    },

    render: function() {
        var path = this.props.location.pathname;
        var imagePath = ".././protected/profile_pics/";
    { 
        if (this.state.active==1) {
          var applyleave = <li><a className="black-text" href="/employee/applyleave">Apply for Leave</a></li>;
        } else if (!this.state.active) {
          var applyleave = "";
        }
    }
        return (
            <div>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a className="black-text" href="/employee/update-profile">Update Profile</a></li>
                    <li><a className="black-text" href="/logout">Logout<i className="material-icons right">exit_to_app</i></a></li>
                </ul>
                <ul id="dropdown2" className="dropdown-content">
                    {applyleave}
                    <li><a className="black-text" href="/employee/leavePolicy">Leave Policy</a></li>
                    <li><a className="black-text" href="/employee/leaveDetails">Leave Details</a></li>
                </ul>
                <nav>
                    <div className="nav-wrapper grey lighten-5">
                        <a href="/employee" className="brand-logo blue-text text-darken-1"><img id="logo" src="/assets/images/logo.png"/><span className="hide-on-med-and-down">LMS</span></a>
                        <a href="/" data-activates="slide-out" className="button-collapse blue-text text-darken-1"><i className="material-icons">menu</i></a>
                          <ul className="right hide-on-med-and-down">
                             <li><a><Clock ></Clock></a></li>
                            <li><a className="dropdown-button black-text" href="#" data-activates="dropdown2" data-beloworigin="true" data-hover="true">Leave Management</a></li>
                            <li><a className="dropdown-button black-text" href="#" data-activates="dropdown1" data-beloworigin="true" data-hover="true">{this.state.username}<img className="circle circle-small" src={imagePath+this.state.picture}/></a></li>                            
                        </ul>
                        <ul id="slide-out" className="side-nav">
                            <li>
                                <div className="userView">
                                    <div className="background">
                                        <img src="http://materializecss.com/images/office.jpg"/>
                                    </div>
                                    <a><img className="circle" src={this.state.picture}/></a>
                                    <a><span className="white-text">Company Name</span></a>
                                    <a><span className="white-text name">{this.state.username}</span></a>
                                </div>
                            </li>
                            <li><a href="/logout" className="black-text"><i className="material-icons">exit_to_app</i>Logout</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Employee;