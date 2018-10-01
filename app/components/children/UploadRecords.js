var React = require("react");
var helpers = require("../utils/helpers");
var axios = require("axios");
var RecordDetails =  require("./RecordDetails");

class UploadRecords extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      recordFile : "",
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

 
  onFormSubmit(e){
      e.preventDefault();
      const {recordFile, firstName } = this.state;
      let formData = new FormData();
      
      if(document.getElementById("fileInput").value != "") {
          // you have a file
          var recordFile1 = document.getElementById("recordFile").files[0].name;
        }else recordFile1 = "";

      formData.append('recordFile', recordFile1);
      formData.append('firstName', this.props.firstName);
      formData.append('userId', this.props.userId);

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
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
        <h5>Upload Records</h5>
        <input type="file" id="recordFile" name="recordFile" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
      <RecordDetails />
   )
  }
}

module.exports = UploadRecords;