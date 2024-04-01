import Chatroom from "../Chatroom";

const ChatroomList = ({ chatrooms, deleteChatroom }) => {
  const chatroomComponents = chatrooms.map((chatroom) => {
    return (
      <Chatroom
        key={chatroom.id}
        chatroom={chatroom}
        deleteChatroom={deleteChatroom}
      />
    );
  });
  return (
    <>
      <h3>Chatroom List</h3>
      {chatroomComponents}
    </>
  );
};

export default ChatroomList;
