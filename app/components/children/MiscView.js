var React = require("react");

var MiscView = React.createClass({
    render: function() {
        return (
            <div className="card-panel">
                <div className="row">
                    <div className="col s12">
                        <h5>Miscellanious data</h5>
                         {this.props.miscs.map(misc => {
                            return ( <div key={misc.title}>
                                <p>{misc.title}</p>
                                <p>{misc.content}</p>  
                                </div>
                             )
                        })
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col s12"> 
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MiscView;

// {this.props.miscs.map(misc => {
//                            return ( <div>
//                                <p>{misc.title}</p>
//                                <p>{misc.content}</p>  
//                                </div>
//                             )
//                        })
//                        }    