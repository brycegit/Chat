var React = require('react');

const Message = ({message}) => {
  return (
    <div>
      <p>{message.message}</p>
      <p>By: {message.user}</p>
    </div>
  );
};

module.exports = Message;
