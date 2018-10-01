var React = require("react");
var helpers = require("../utils/helpers");
var axios = require("axios");
var RecordDetails =  require("./RecordDetails");

class UploadRecords extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
       recordtype : "" 
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }

 
  onFormSubmit(e){
      e.preventDefault();
      const {recordFile, firstName, recordtype} = this.state;
      let formData = new FormData();
      
      if(document.getElementById("recordFile").value != "") {
          // you have a file
          var recordFileName = document.getElementById("recordFile").files[0].name;
        }else {
          alert("Please select a file");
          return false;
        }

      formData.append('recordFileName', recordFileName);
      formData.append('recordFile', recordFile);
      formData.append('firstName', this.props.firstName);
      formData.append('userId', this.props.userId);
      formData.append('recordType', this.state.recordtype);

      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }
      axios.post('/recordFileUpload', formData,config).then((response)=>{
            alert(response.data);
        })      
    }

    onChange (e) {
       this.setState({ recordFile: e.target.files[0] });
    }

    handleUserChange(event) {
       this.setState({ recordtype: event.target.value });
    }
  
  render() {
    return (
      <div>
      <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
        <h5>Upload Records</h5>
        <div className="row"> 
          <div className="input-field col m12 s12">
            <select className="browser-default" name="recordtype" value={this.state.recordtype} onChange={this.handleUserChange} required>
              <option value="" disabled>Record Type</option>
              <option value="Certificate">Certificate</option>
              <option value="Income tax documents">Income tax documents</option>
              <option value="Rental Agreements">Rental Agreements</option>
            </select>
          </div>
        </div>  
        <input type="file" id="recordFile" name="recordFile" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
      <RecordDetails userId={this.props.userId}/>
    </div>  
   )
  }
}

module.exports = UploadRecords;