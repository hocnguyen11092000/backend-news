import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./chat.css";
import ChatItem from "./components/ChatItem";

const ShowComment = (data, parentId = "0", char) => {
  let result = [];

  data &&
    data.forEach((item) => {
      if (item.parentId === parentId) {
        item["level"] = char;
        result.push(item);

        const child = data.filter((x) => x.parentId === item._id);
        result = [...result, ...child];
      }
    });
  return result;
};

const Chat = ({ socket }) => {
  const [value, setValue] = useState("");
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    socket?.on("get-message", (comment) => {
      setData((pre) => [...new Set([...pre, comment])]);
    });
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            blog: { comment },
          },
        } = await axios.get(
          `http://localhost:5000/api/v1/blog/6240007851734b460c52cfcf`
        );

        setData(comment);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { comment },
      } = await axios.post(
        "http://localhost:5000/api/v1/blog/comment/new",
        {
          content: value,
          blogId: "6240007851734b460c52cfcf",
        },
        {
          headers: {
            authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjc0ZGE4ZDk0NzQwNDIzMDAwZTNiMiIsImlhdCI6MTY0OTgzNTYxNSwiZXhwIjoxNjUwMjY3NjE1fQ.DP7Oojz8YM8ZP3UebBMXyvGjyz3h7QKjUd7tUtPIO54",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setNewComment(comment);
      await socket.emit("send-message", comment);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const result = useCallback(ShowComment(data, "0", 0), [data.length]);

  const handleChange = (data) => {
    setData((pre) => [...new Set([...pre, ...data.data.childComment])]);
  };

  const handleClose = (value) => {};

  return (
    <div className="chat">
      <h2>Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          style={{ padding: "10px 12px" }}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" style={{ padding: "10px 12px" }}>
          {loading ? (
            <CircularProgress size={18}></CircularProgress>
          ) : (
            "Add comment"
          )}
        </button>
      </form>

      <div className="list-comment">
        {result &&
          result.map((item, index) => {
            return (
              <ChatItem
                onClose={handleClose}
                onChange={handleChange}
                item={item}
                key={index}
              ></ChatItem>
            );
          })}
      </div>
    </div>
  );
};

export default Chat;
