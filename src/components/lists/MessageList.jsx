import Message from "../Message";

const MessageList = ({ messages, deleteMessage }) => {
  const messageComponents = messages.map((message) => {
    return (
      <Message
        key={message.id}
        message={message}
        deleteMessage={deleteMessage}
      />
    );
  });

  return (
    <>
      <h3>User Messages</h3>
      {messageComponents}
    </>
  );
};

export default MessageList;
