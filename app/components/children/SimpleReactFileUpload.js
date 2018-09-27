var React = require("react");
var helpers = require("../utils/helpers");
var axios = require("axios");

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:"",
      // selectedFile : "",
      description : "",
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    // this.fileUpload = this.fileUpload.bind(this)
  }

  componentDidMount() {
    helpers.getCurrentUser().then(function(response) {
            if (response !== this.state.username) {
              this.setState({ user_id: response.data._id, 
                  group_id: response.data.groupId,
                  design_id: response.data.designationId,
                  user_type: response.data.userType,
                  profile_pic: response.data.picture
              });
            }
          }.bind(this)); 
  }

  onFormSubmit(e){
      e.preventDefault();
      const { description, selectedFile, firstName } = this.state;
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
        })      
    }

    onChange (e) {
       this.setState({ selectedFile: e.target.files[0] });
    }
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
        <h5>Upload Profile Image</h5>
        <input type="file" id="fileInput" name="selectedFile" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

module.exports = SimpleReactFileUpload;