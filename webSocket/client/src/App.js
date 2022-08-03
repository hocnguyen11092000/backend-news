import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import "./App.css";
import Admin from "./components/Admin";
import Author from "./components/Author";
import Chat from "./components/chat/Chat";
import { CommentForm } from "./components/CommentForm";
import Header from "./components/Header";
import Notification from "./components/notification/Notification";
import Test from "./Test";
import Test2 from "./Test2";
import Test3 from "./Test3";

function App() {
  const [comment, setComment] = useState("");
  const [socket, setSocket] = useState();
  const [data, setData] = useState([]);
  const ulRef = useRef();

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
    const name = localStorage.getItem("name");
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const respone = await axios.get("http://127.0.0.1:8000/api/comment2");
  //       setData(respone.data.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   })();

  //   socket?.on("server-send-comment", (data) => {
  //     const { value, name } = data;
  //     setComment(value + name);
  //   });
  //   console.log("running");

  //   // socket?.on("data", (user) => {
  //   //   console.log(user);
  //   // });

  //   // return () => {

  //   // }
  // }, [comment, socket]);

  // const ShowComment = (data, parentId = 0, char) => {
  //   let html = "";
  //   data.map((item, index) => {
  //     if (item.parentId === parentId) {
  //       html += `
  //           <li class='item ${char}' style="margin-left: ${
  //         char * 50
  //       }px", border-left: "1px solid red">${item?.name} <div class="content">${
  //         item?.content
  //       }</div>
  //       <div class="reply">Trả lời</div>
  //        <div class="form-group">
  //         <input class="input" type="text">
  //         <button class="send" data-id="${item.id}">send</button>
  //       </div>

  //       </li>
  //       <div class="watch-more" style="margin-left: ${
  //         char * 52
  //       }px">Xem thêm bình luận</div>
  //         `;
  //       // data.splice(item[index], 1);
  //       html += ShowComment(data, item.id, char + 1);
  //     }
  //   });
  //   return html;
  // };

  // let value = "";

  // value = ShowComment(data, 0, 1);

  // if (ulRef.current !== undefined) {
  //   ulRef.current.innerHTML = value;
  // }
  // const reply = document.querySelectorAll(".reply");
  // const mores = document.querySelectorAll(".watch-more");
  // if (mores) {
  //   mores.forEach((item, index) => {
  //     item.onclick = () => {
  //       alert();
  //     };
  //   });
  // }
  // if (reply) {
  //   reply.forEach((item, index) => {
  //     item.onclick = () => {
  //       const form = document.querySelectorAll(".form-group");
  //       form && form[index].classList.toggle("active");
  //     };
  //     const send = document.querySelectorAll(".send");
  //     if (send) {
  //       send.forEach((item, idx) => {
  //         item.onclick = async () => {
  //           const input = document.querySelectorAll(".input");
  //           const value = input[idx].value;
  //           const id = item.getAttribute("data-id");
  //           const { name } = JSON.parse(localStorage.getItem("user"));
  //           try {
  //             await axios.post("http://127.0.0.1:8000/api/comment2", {
  //               name,
  //               content: value,
  //               parentId: id,
  //             });
  //             socket.emit("send-comment", { value, name });
  //             socket.emit("send-noti", name);
  //             toast.success("Add comment thành công");
  //           } catch (error) {
  //             console.log(error);
  //             toast.error("Add comment fail");
  //           }
  //           const form = document.querySelectorAll(".form-group");
  //           form && form[index].classList.toggle("active");
  //         };
  //       });
  //     }
  //   });
  // }

  // const handleSubmit = async (value) => {
  //   const { name } = JSON.parse(localStorage.getItem("user"));
  //   try {
  //     await axios.post("http://127.0.0.1:8000/api/comment2", {
  //       name,
  //       content: value,
  //       parentId: 0,
  //     });
  //     socket.emit("send-comment", { value, name });
  //     toast.success("Add comment thành công");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Add comment fail");
  //   }
  // };
  return (
    <Box>
      <Header></Header>
      <Routes>
        {/* <Route path="/admin" element={<Admin socket={socket} />}></Route> */}
        {/* <Route path="/author" element={<Author socket={socket} />}></Route> */}
        {/* <Route path="/test" element={<Test socket={socket} />}></Route> */}
        {/* <Route path="/test2" element={<Test2 socket={socket} />}></Route> */}
        {/* <Route path="/test3" element={<Test3 socket={socket} />}></Route> */}
        <Route path="/chat" element={<Chat socket={socket} />}></Route>
        <Route path="/" element={<Notification socket={socket} />}></Route>
      </Routes>
      {/* <CommentForm onSubmit={handleSubmit}></CommentForm>
      <ul ref={ulRef}></ul> */}
    </Box>
  );
}

export default App;
