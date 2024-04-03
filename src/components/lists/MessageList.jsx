import Message from "../Message";
import "../../styles/lists/MessageList.css"

const MessageList = ({ messages, deleteMessage }) => {
  const messageComponents = messages.map((message) => {
    return (
      <Message className = "message"
        key={message.id}
        message={message}
        deleteMessage={deleteMessage}
      />
    );
  });

  return (
    <>
    <div className="message-grid">
      <h3>User Messages</h3>
      {messageComponents}
      </div>
    </>
  );
};

export default MessageList;
