import React from "react";
import $ from "jquery";

const ButtonCircle = () => {
  const handleToggleOpenChatBox = () => {
    $("#chat-circle").toggle("scale");
    $(".chat-box").toggle("scale");
  };
  return (
    <div
      id="chat-circle"
      onClick={handleToggleOpenChatBox}
      className="btn btn-raised"
    >
      <div id="chat-overlay"></div>
      <i className="material-icons">speaker_phone</i>
    </div>
  );
};

export default ButtonCircle;
