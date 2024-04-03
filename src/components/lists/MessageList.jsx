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
    <h2>User Messages</h2>
    <div className="message-column">
      {messageComponents}
      </div>
    </>
  );
};

export default MessageList;
