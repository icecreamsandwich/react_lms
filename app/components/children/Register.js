var React = require("react");
var helpers = require("../utils/helpers");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      passwordConfirmation: "",
      error: "",
      emp_id: ""
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleUserChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegister(e) {
    helpers
      .addEmployee(
        this.state.username,
        this.state.username,
        this.state.username,
        this.state.username,
        this.state.username,
        this.state.email,
        this.state.email,
        this.state.email,
        this.state.password,
        this.state.password,
        this.state.username,
        this.state.username
      )
      .then(
        function(response) {
          this.state.emp_id = response.data._id;
          helpers
            .addEmpSchedule(
              this.state.emp_id,
              this.state.username,
              this.state.username
            )
            .then(function(response) {}.bind(this));
        }.bind(this)
      );
    Materialize.toast("Registered Successfully", 5000);
  }
  render() {
    return (
      <div className="container">
        <div className="row" id="loginForm">
          <div className="col m6 offset-m3">
            <div className="card-panel">
              <div className="row grey lighten-5">
                <div className="col s12 center">
                  <h4 className="blue-text text-darken-1">User Registration</h4>
                  <h4> {this.state.error}</h4>
                </div>
              </div>
              {/* action="/register" method="POST" method="POST"*/}
              <form method="POST" onSubmit={this.handleRegister}>
                <div className="row">
                  <div className="col s12">
                    <input
                      placeholder="Username"
                      type="text"
                      className="validate"
                      value={this.state.username}
                      name="username"
                      onChange={this.handleUserChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <input
                      placeholder="Email"
                      type="email"
                      className="validate"
                      value={this.state.email}
                      name="email"
                      onChange={this.handleUserChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <input
                      placeholder="Password"
                      type="password"
                      className="validate"
                      value={this.state.password}
                      name="password"
                      onChange={this.handleUserChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <input
                      placeholder="Confirm Password"
                      type="password"
                      className="validate"
                      value={this.state.passwordConfirmation}
                      name="passwordConfirmation"
                      onChange={this.handleUserChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <select name="userType">
                      <option defaultValue="" disabled selected>
                        Select User Type
                      </option>
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <button
                      className="btn waves-effect waves-light btn-large blue accent-3 loginButtons"
                      type="Submit"
                      value="Submit"
                      name="action"
                    >
                      Register
                      <i className="material-icons right">person_add</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Register;
