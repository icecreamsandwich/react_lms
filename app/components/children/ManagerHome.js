var React = require("react");
var helpers = require("../utils/helpers");
var ScheduleView =  require("./ScheduleView");
var AnnouncementsBuild =  require("./AnnouncementsBuild");
var MiscsBuild =  require("./MiscsBuild");
var AnnouncementsView =  require("./AnnouncementsView");
var MiscView =  require("./MiscView");

var ManagerHome = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            content: "",
            allAnnouncements: [],
            allMiscs: [],
        };
    },

    componentDidMount: function() {
        this.getAnnouncements();
        this.getMiscs();
    },

    // componentDidUpdate: function(prevState) {
    //     if (prevState.title !== this.state.title || prevState.content !== this.state.content) {
    //         this.getAnnouncements();
    //     }
    // },

    getAnnouncements: function() {
        helpers.getAnnouncements().then(function(response) {
          this.setState({
            title: response.data[response.data.length -1].title,
            content: response.data[response.data.length -1].content,
            allAnnouncements: response.data,      
          });
        }.bind(this));
    },
    
    getMiscs: function() {
        helpers.getMiscs().then(function(response) {
          this.setState({
            allMiscs: response.data
          });
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                <ScheduleView />
                <div className="row">
                    <div className="col m6">
                        <MiscView miscs={this.state.allMiscs}/>
                    </div>
                    <div className="col m6">
                        <AnnouncementsView title={this.state.title} content={this.state.content} announcements={this.state.allAnnouncements}/>
                    </div>                   
                    <div className="col m6">
                        <MiscsBuild />
                    </div>
                    <div className="col m6">
                        <AnnouncementsBuild />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ManagerHome;