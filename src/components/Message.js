import React from "react";

const Message = ({ id, message, type }) => {
  return (
    <div id={`cm-msg-${id}`} className={`chat-msg ${type}`}>
      <span className="msg-avatar">
        <img
          alt={id}
          src="https://images-eu.ssl-images-amazon.com/images/I/61NnbaTmgGL.png"
        />
      </span>
      <div className="cm-msg-text">{message}</div>
    </div>
  );
};

export default Message;
