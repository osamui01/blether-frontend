import Message from "../Message";

const ChatroomMessageList = ({ chatroomMessages }) => {
  const chatroomMessageComponents = chatroomMessages.map((message) => {
    return <Message key={message.id} chatroomMessages={chatroomMessages} />;
  });
  return (
    <>
      <h3>Messages</h3>
      <div>{chatroomMessageComponents}</div>
    </>
  );
};

export default ChatroomMessageList;
