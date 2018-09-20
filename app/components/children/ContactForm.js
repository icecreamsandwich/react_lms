var React = require("react");
var axios = require("axios");
var helpers = require("../utils/helpers");

class ContactForm extends React.Component{
  
    handleSubmit(e){
        e.preventDefault();
        var maillist  = [];
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const email1 = "muneebkt@gmail.com";
        const email2 = "icecreamcastlee8@gmail.com";
        const message = document.getElementById('message').value;
        maillist.push(email1,email2);

       helpers.sendMail(name,email,message,maillist).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }

    resetForm(){
        document.getElementById('contact-form').reset();
    }

    render(){
        return(
            <div className="col-sm-4 offset-sm-4">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
};

module.exports = ContactForm;