var React = require("react");
var helpers = require("../utils/helpers");

class ResetPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
      usertype: "",
    }
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
   
componentDidMount() {
    helpers.getCurrentUser().then(function(response) {
      if (response !== this.state.username) {
        this.setState({ 
            usertype: response.data.userType,
            userid: response.data._id,
        });
      }
    }.bind(this));
}

  handleUserChange(event) {
     this.setState({ [event.target.name]: event.target.value});
  }

  handleLogin(event) {
      // just in case we need it
       if(this.state.newpassword !== this.state.confirmpassword){
            Materialize.toast('Passwords do not match', 5000,'red rounded');
            event.preventDefault();
            return false ;
        }
       Materialize.toast('Passwod Successfully Reset', 5000,'green rounded');
  }


    render() {
      return (
        <div className="container">
            <div className="row" id="loginForm">
                <div className="col m6 offset-m3 s12">
                    <div className="card-panel">
                        <div className="row grey lighten-5">
                            <div className="col s12 center">
                                <h4 className="blue-text text-darken-1"><img id="logo" src="/assets/images/logo.png"/><span className="hide-on-med-and-down">Reset Password</span></h4>
                            </div>
                        </div>
                        <form action="/manager/reset-password" method="POST" onSubmit={this.handleLogin}>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Old Password"
                                        type="password"
                                        className="validate"
                                        value={this.state.oldpassword}
                                        name="oldpassword"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="New Password"
                                        type="password"
                                        className="validate"
                                        value={this.state.newpassword}
                                        name="newpassword"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Confirm New Password"
                                        type="password"
                                        className="validate"
                                        value={this.state.confirmnewpassword}
                                        name="confirmpassword"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>

                             <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="userId"
                                        type="hidden"
                                        className="validate"
                                        value={this.state.userid}
                                        name="userid"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="userType"
                                        type="hidden"
                                        className="validate"
                                        value={this.state.usertype}
                                        name="usertype"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <button className="btn waves-effect waves-light btn-large blue accent-3 loginButtons" type="submit" value="Submit" name="action">Submit<i className="material-icons right">send</i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      );
    }
};

module.exports = ResetPassword;