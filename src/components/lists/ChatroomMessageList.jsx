import Message from "../Message";

const ChatroomMessageList = ({ chatroomMessages, deleteMessage }) => {
  const chatroomMessageComponents = chatroomMessages.map((message) => {
    return <Message key={message.id} message={message} deleteMessage={deleteMessage}/>;
  });
  return (
    <>
      <h3>Messages</h3>
      <div>{chatroomMessageComponents}</div>
    </>
  );
};

export default ChatroomMessageList;
