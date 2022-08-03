// import React, { useEffect, useMemo, useRef } from "react";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { createRef } from "react";

// Test.propTypes = {};

// function Test(props) {
//   const [value, setValue] = useState("");
//   const [comment, setCommet] = useState("");
//   const [valueReply, setValueReply] = useState("");
//   const [data, setData] = useState([]);
//   const [show, seShow] = useState(false);
//   const [socket, setSocket] = useState();

//   let length = data?.length;
//   const refs = useRef(
//     [...new Array(length ? length : 100)].map(() => React.createRef())
//   );
//   const refMores = useRef(
//     [...new Array(length ? length : 100)].map(() => React.createRef())
//   );

//   useEffect(() => {
//     setSocket(io("http://localhost:4000"));
//   }, []);

//   useEffect(() => {
//     (async () => {
//       try {
//         const respone = await axios.get("http://127.0.0.1:8000/api/comment2");
//         setData(respone.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     })();

//     socket?.on("server-send-comment", (data) => {
//       const { value, name, valueReply } = data;
//       setCommet(value + name + valueReply);
//     });
//   }, [comment, socket]);

//   const ShowComment = (data, parentId = 0, char) => {
//     let result = [];
//     data.map((item) => {
//       if (item.parentId === parentId) {
//         item["level"] = char;
//         result.push(item);

//         const child = ShowComment(data, item.id, char + 1);
//         result = [...result, ...child];
//       }
//     });
//     return result;
//   };
//   const result = ShowComment(data, 0, 0);

//   const handleLoadMore = function (item) {
//     const listItem = refs.current;
//     if (listItem) {
//       let lastE = [];
//       listItem.forEach((x) => {
//         if (x.current.childNodes.length == 3) {
//           lastE.push(x.current.lastChild);
//         }
//         if (x.current.getAttribute("data-parent") == item.id) {
//           x.current.classList.toggle("hide");
//         }
//       });
//       lastE.forEach((y) => {
//         if (y.classList.contains(item.id)) {
//           y.innerText == "Xem thêm"
//             ? (y.innerText = "Thu gọn")
//             : (y.innerText = "Xem thêm");
//         }
//       });
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const { name } = JSON.parse(localStorage.getItem("user"));
//     try {
//       await axios.post("http://127.0.0.1:8000/api/comment2", {
//         name,
//         content: value,
//         parentId: 0,
//       });
//       socket.emit("send-comment", { value, name });
//       toast.success("Add comment thành công");
//       setValue("");
//     } catch (error) {
//       console.log(error);
//       setValue("");
//       toast.error("Add comment fail");
//     }
//   };

//   const handleFormReplySubmit = async (item) => {
//     const { name } = JSON.parse(localStorage.getItem("user"));
//     try {
//       await axios.post("http://127.0.0.1:8000/api/comment2", {
//         name,
//         content: valueReply,
//         parentId: item.id,
//       });
//       socket.emit("send-comment", { valueReply, name });
//       toast.success("Add comment thành công");
//       setValue("");
//     } catch (error) {
//       console.log(error);
//       setValue("");
//       toast.error("Add comment fail");
//     }
//   };

//   const handleReply = (item) => {
//     refs.current.forEach((x) => {
//       if (x.current?.id == item.id) {
//         x.current.childNodes[3].classList.toggle("show");
//       }
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           placeholder="Nhập comment..."
//           onChange={(e) => setValue(e.target.value)}
//         />
//         <button type="submit">Thêm</button>
//       </form>
//       <ul>
//         {result &&
//           result.map((item, index) => (
//             <li
//               ref={refs.current[index]}
//               key={item.id}
//               className={`item item-${item.level} ${
//                 item.parentId !== 0 ? "hide" : ""
//               }`}
//               style={{ marginLeft: `${item.level * 50}px` }}
//               data-parent={item.parentId}
//               id={item.id}
//             >
//               <div>{item.name}</div>
//               <div className="content">{item.content}</div>
//               <button className="reply" onClick={() => handleReply(item)}>
//                 Trả lời
//               </button>
//               <div className="form">
//                 <input
//                   className="input"
//                   type="text"
//                   placeholder="Nhập comment..."
//                   onChange={(e) => setValueReply(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="send"
//                   onClick={() => handleFormReplySubmit(item)}
//                 >
//                   Gởi
//                 </button>
//               </div>
//               {result.find((x) => x.parentId === item.id) && (
//                 <div
//                   className={`watch-more ${item.id}`}
//                   onClick={() => handleLoadMore(item)}
//                   ref={refMores.current[index]}
//                 >
//                   Xem thêm
//                 </div>
//               )}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default Test;
