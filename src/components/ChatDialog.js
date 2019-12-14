import React, { useState, useEffect } from "react";
import "../index.css";
import getIp from "../libraries/getIp";
import * as R from "ramda";
import $ from "jquery";
import MessageRepository from "../repository/message.repository";
import Message from "../components/Message";

const ChatDialog = props => {
  const [db, setDb] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clinetId, setClinetId] = useState({
    ip: null,
    country_name: null
  });

  const fetchData = async () => {
    setLoading(true);
    const respClinetId = await getIp();
    const initDB = new MessageRepository(props.firebase.database().ref("chat"));
    const messages = await initDB.all();
    setMessages(messages);
    setClinetId(respClinetId);
    setDb(initDB);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [chatInput, setChatInput] = useState("");
  const handleToggleCloseChatBox = () => {
    $("#chat-circle").toggle("scale");
    $(".chat-box").toggle("scale");
  };

  const handleChangeSetInput = e => {
    setChatInput(e.target.value);
  };

  const saveMessage = e => {
    e.preventDefault();
    db.save({ message: chatInput, ...clinetId });
    db.onSubscribe(res => {
      if (R.type(res) !== "Array") return;
      const messageUniq = R.uniqBy(val => val._id, [...messages, ...res]);
      setMessages(messageUniq);
      $(".chat-logs")
        .stop()
        .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    });
    setChatInput("");
  };

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        ChatBot
        <span className="chat-box-toggle" onClick={handleToggleCloseChatBox}>
          <i className="material-icons">close</i>
        </span>
      </div>
      <div className="chat-box-body">
        <div className="chat-box-overlay"></div>
        <div className="chat-logs">
          {loading ? (
            <p>loading...</p>
          ) : (
            messages.map(val => {
              return (
                <Message
                  key={val._id}
                  id={val._id}
                  message={val.message}
                  type={clinetId.ip === val.ip ? "self" : "user"}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="chat-input">
        <form onSubmit={saveMessage}>
          <input
            type="text"
            id="chat-input"
            value={chatInput}
            onChange={handleChangeSetInput}
            name="chat_input"
            placeholder="Send a message..."
          />
          <button type="submit" className="chat-submit" id="chat-submit">
            <i className="material-icons">send</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDialog;
