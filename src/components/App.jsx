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
        console.log('GOT DATA', data);
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
    var user = prompt("What is your username?") || "Anonymous";
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
    currentMessages.push({
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
      success: function(data) {
        console.log('SUCCESS', data);
      },
      error: function(error) {
        console.log('Error submitting message', error);
      }
    })
    .done(function(data) {
      $('#form').each(function() {
        console.log('reset')
        this.reset();
      });
    });
  }
  render() {
    return (
      <div>
        <Form onChange={this.handleChange.bind(this)} onSubmit={this.handleSubmit.bind(this)}/>
        <Messages messages={this.state.messages}/>
      </div>
    );
  }
}

module.exports = App;
