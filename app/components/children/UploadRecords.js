var React = require("react");
var helpers = require("../utils/helpers");
var axios = require("axios");

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
      
      formData.append('recordFile', recordFile);
      formData.append('firstName', this.props.firstName);

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
   )
  }
}

module.exports = UploadRecords;