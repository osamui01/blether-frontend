import Chatroom from "../Chatroom";
import "../../styles/lists/ChatroomList.css";

const ChatroomList = ({ chatrooms, deleteChatroom }) => {
  const chatroomComponents = chatrooms.map((chatroom) => {
    return (
      <Chatroom
        className="chatroom"
        key={chatroom.id}
        chatroom={chatroom}
        deleteChatroom={deleteChatroom}
      />
    );
  });
  return (
    <>
      <div className="chatroom-grid">
        <h3>Chatroom List</h3>
        {chatroomComponents}
      </div>
    </>
  );
};

export default ChatroomList;
