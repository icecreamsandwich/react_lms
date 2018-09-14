var React = require("react");

class LeavePoilicy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }


    render() {
      return (
        <div className="container">
           <div className="wiki wiki-page">
            <a name="Leaves-and-Off"></a>
          <h1>Leaves and Off<a href="#Leaves-and-Off" className="wiki-anchor">¶</a></h1>
            <p>The Company recognizes the following holidays</p>
            <p>1 New Years day <br/>2. Republic day<br/>3. Good Friday <br/>4. Vishu<br/>5. Labour's Day<br/>6. Ramzan <br/>7. Independence day<br/>8. Thiruvonam <br/>9. Gandhi Jayanti <br/>10.Christmas.</p>
            <p>Leaves are classified as :</p>
            <p><a className="wiki-page" href="https://support.sysally.net/projects/mysysally/wiki/General_Leave_Policies">General Leave Policies</a></p>
            <p><a className="wiki-page" href="https://support.sysally.net/projects/mysysally/wiki/Annual_Leave">Annual Leave</a></p>
            <p><a className="wiki-page" href="https://support.sysally.net/projects/mysysally/wiki/Additional_Earned_Leave">Additional Earned Leave</a></p>
            <p><a className="wiki-page" href="https://support.sysally.net/projects/mysysally/wiki/Casual_Leave">Casual Leave</a></p>
            <p><a className="wiki-page" href="https://support.sysally.net/projects/mysysally/wiki/Sick_Leave">Sick Leave</a></p>
            <p><a className="wiki-page" href="https://support.sysally.net/projects/mysysally/wiki/Leave_Without_Pay">Leave Without Pay</a></p>
            <p><a className="wiki-page" href="https://support.sysally.net/projects/mysysally/wiki/Maternity_Leave">Maternity Leave</a></p>
            <p><strong><a class="wiki-page" href="/projects/mysysally/wiki/_FAQs"> FAQs</a></strong></p>
          </div>
          </div>
      );
    }
};

module.exports = LeavePoilicy;