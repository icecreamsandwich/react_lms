var React = require("react");

const pStyle = {
  fontSize: '15px',
  textAlign: 'left',
  color:'black',
  margin:'0 0 0 0',
};

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  render() {
    return (
      <p style={pStyle}>
        {this.state.time}.
      </p>
    );
  }
}

module.exports = Clock;