import axios from "axios";
import React from "react";

const ChatItem = ({ item, onChange, onClose }) => {
  const [showChild, setShowChild] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [child, setChild] = React.useState([]);
  const ref = React.useRef(false);

  const handleLoadChild = async (id) => {
    if (!ref.current) {
      ref.current = true;
      setLoading(true);
      try {
        const data = await axios.get(
          `http://localhost:5000/api/v1/blog/child-comment?blogId=6240007851734b460c52cfcf&parentComment=${id}`
        );

        setLoading(false);

        if (onChange) {
          onChange(data);
          setChild(data.data.childComment);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      const child = document.querySelectorAll(`.child-${id}`);
      [...child].forEach((item) => {
        item.classList.remove("hide");
      });
      setShowChild(true);
    }
    setShowChild(false);
  };

  const handleRemoveChild = (id) => {
    const child = document.querySelectorAll(`.child-${id}`);
    [...child].forEach((item) => {
      item.classList.add("hide");
    });
    setShowChild(true);
  };
  return (
    <div
      className={`item ${
        item.level !== 0 ? "child " + "child-" + item.parentId : ""
      }`}
    >
      <span>{item.content}</span>
      {showChild && item.hasChild && (
        <div
          style={{
            fontSize: "16px",
            marginLeft: "20px",
            cursor: "pointer",
          }}
          onClick={() => handleLoadChild(item._id)}
        >
          {loading ? "Loading..." : "xem thêm"}
        </div>
      )}
      {!showChild && (
        <div
          style={{
            fontSize: "16px",
            marginLeft: "20px",
            cursor: "pointer",
          }}
          onClick={() => handleRemoveChild(item._id)}
        >
          Ẩn bình luận
        </div>
      )}
    </div>
  );
};

export default ChatItem;
