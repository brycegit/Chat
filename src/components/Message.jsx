var React = require('react');

const Message = ({message}) => {
  return (
    <div className="message">
      <p>{message.message}</p>
      <p>By: {message.user}</p>
    </div>
  );
};

module.exports = Message;
