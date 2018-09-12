var React = require("react");

var AnnouncementsView = React.createClass({
    render: function() {
        return (
            <div className="card-panel">
                <div className="row">
                    <div className="col s12">
                        <h5>Latest announcements</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {this.props.announcements.map(announce => {
                            return ( <div key={announce.title}>
                                <p>{announce.title}</p>
                                <p>{announce.content}</p>  
                                </div>
                             )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AnnouncementsView;