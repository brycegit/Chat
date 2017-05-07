var React = require('react');

const Form = ({onSubmit, onChange}) => {
  return (
    <div>
      <h1>Add message</h1>
      <form id="form">
        <div>
          <textarea onChange={onChange} name="message" rows="10" type="text" placeholder="Enter message..."></textarea>
        </div>
        <button onClick={onSubmit} type="button">Add message</button>
      </form>
    </div>
  );
};

module.exports = Form;
