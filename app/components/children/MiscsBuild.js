var React = require("react");
var helpers = require("../utils/helpers");

var MiscsBuild = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            content: ""
        };
    },

    handleMiscBuild(event) {
       this.setState({ [event.target.id]: event.target.value});
    },

    addMiscs: function(event) {
        event.preventDefault(event);
        helpers.addMiscs(this.state.title, this.state.content).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast('Misc added', 3000);
        this.clearForm();
    },

    clearForm: function() {
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
            elements[i].value = "";
            elements[i].classList.remove("valid");
        };
    },

    clearStates: function() {
        this.setState({ title: "", content: "" });
    },

    render: function() {
        return (
            <div className="card-panel">
                <div className="row">
                    <div className="col s12">
                        <h5>Create a misc data</h5>
                    </div>
                </div>
                <form onSubmit={this.addMiscs}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Title"
                                id="title"
                                type="text"
                                className="validate"
                                value={this.state.title}
                                onChange={this.handleMiscBuild}
                                required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                placeholder="Content"
                                id="content"
                                type="text"
                                className="materialize-textarea"
                                value={this.state.content}
                                onChange={this.handleMiscBuild}
                                required>
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className="btn waves-effect waves-light btn-large green accent-3 loginButtons" type="submit" value="Submit" name="action">Submit<i className="material-icons right">add</i></button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = MiscsBuild;