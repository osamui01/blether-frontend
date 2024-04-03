import Chatroom from "../Chatroom";
import "../../styles/lists/ChatroomList.css";

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
      <div className="chatroom">
        <h3>Chatroom List</h3>
        <div className="chatroom-grid">{chatroomComponents}</div>
      </div>
    </>
  );
};

export default ChatroomList;
