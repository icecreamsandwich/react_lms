var React = require("react");
var helpers = require("../utils/helpers");
var axios = require("axios");

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:""
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    // this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
      e.preventDefault();
      const { description, selectedFile } = this.state;
      let formData = new FormData();

      formData.append('description', description);
      formData.append('selectedFile', selectedFile);
      formData.append('firstName', this.props.firstName);

      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }
      axios.post('/fileUpload', formData,config).then((response)=>{
            alert(response.data);
     /*       if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }*/
        })      
      // alert(response)
    }

    onChange (e) {
      switch (e.target.name) {
        case 'selectedFile':
          this.setState({ selectedFile: e.target.files[0] });
          break;
        default:
          this.setState({ [e.target.name]: e.target.value });
      }
    }
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
        <h5>Upload Profile Image</h5>
        <input type="file" name="selectedFile" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

module.exports = SimpleReactFileUpload;