var React = require('react');
var Form = require('./Form.jsx');
var Messages = require('./Messages.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: 'Anonymous'
    };
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  getData() {
    var that = this;
    $.get({
      url: '/messages',
      success: function(data) {
      },
      error: function(error) {
        console.log('Error getting cat data', error);
      }
    })
    .done(function(data) {
      that.setState({
        messages: data
      });
    });
  }
  componentWillMount() {
    var user = localStorage.name || prompt("What is your username?");
    if(!user || user === "null"){
      user = prompt("Please enter a name!") || "Anonymous";
    }
    if(user !== "Anonymous"){
      localStorage.name = user;
    }
    console.log('user', user)
    this.setState({user: user});
    this.getData();
  }
  handleSubmit(event) {
    event.preventDefault();
    var that = this;
    var data = {
      message: this.state.message,
      user: this.state.user
    };
    var currentMessages = this.state.messages;
    currentMessages.unshift({
      message: this.state.message,
      user: this.state.user
    });
    that.setState({
      messages: currentMessages
    });
    $.post({
      url: '/message',
      data: JSON.stringify(data),
      contentType: 'application/json',
      error: function(error) {
        console.log('Error submitting message', error);
      }
    })
    .done(function(data) {
      $('#form').each(function() {
        this.reset();
      });
    });
  }
  signOut(){
    localStorage.name = null;
    if(!user || user === "null"){
      user = prompt("Please enter a name!") || "Anonymous";
    }
    if(user !== "Anonymous"){
      localStorage.name = user;
    }
  }
  render() {
    return (
      <div>
        <a onClick={this.signOut}>Sign out</a>
        <Form onChange={this.handleChange.bind(this)} onSubmit={this.handleSubmit.bind(this)}/>
        <Messages messages={this.state.messages}/>
      </div>
    );
  }
}

module.exports = App;
