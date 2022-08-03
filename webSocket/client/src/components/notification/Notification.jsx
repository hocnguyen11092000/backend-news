import React, { useEffect } from "react";

function Notification({ socket }) {
  const user = localStorage.getItem("name");
  useEffect(() => {
    if (socket) {
      if (user) {
        socket.emit("user", user);
      }

      socket.on("send-noti", (data) => {
        console.log(data);
      });
    }
  }, [socket]);
  const handleSendNoti = () => {
    socket.emit("add-noti", { message: "hello word", user: "tường" });
  };

  return (
    <div>
      <button onClick={handleSendNoti}>Add notification</button>
    </div>
  );
}

export default Notification;
