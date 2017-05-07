var React = require('react');
var Message = require('./Message.jsx');

const Messages = ({messages}) => {
  return (
    <div>
      <h1>Messages</h1>
      {messages.map((message, index) => <Message key={index} message={message}/>)}
    </div>
  );
};

module.exports = Messages;
