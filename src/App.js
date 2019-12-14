import React from "react";
import ButtonCircle from "./components/ButtonCircle";
import ChatDialog from "./components/ChatDialog";

const App = props => {
  return (
    <div>
      <div id="center-text">
        <h2>ChatBox UI</h2>
        <p>Message send and scroll to bottom enabled </p>
      </div>
      <>
        <ButtonCircle />
        <ChatDialog {...props} />
      </>
    </div>
  );
};

export default App;
