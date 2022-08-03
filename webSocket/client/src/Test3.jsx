// import React, { useEffect, useMemo, useRef } from "react";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import { toast } from "react-toastify";
// // import io from "socket.io-client";
// import { createRef } from "react";
// import SingleComment from "./components/SingleComment";

// // Test2.propTypes = {};

// function Test3(props) {
//   const [value, setValue] = useState("");
//   const [comment, setCommet] = useState("");
//   const [valueReply, setValueReply] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [data, setData] = useState([]);
//   const [reply, setReply] = useState([]);
//   const [socket, setSocket] = useState();
//   const [show, setShow] = useState(false);

//   // let length = data?.length;
//   // const refs = useRef(
//   //   [...new Array(length ? length : 100)].map(() => React.createRef())
//   // );
//   // const refMores = useRef(
//   //   [...new Array(length ? length : 100)].map(() => React.createRef())
//   // );

//   useEffect(() => {
//     setSocket(io("http://localhost:4000"));
//   }, []);

//   useEffect(() => {
//     (async () => {
//       try {
//         const respone = await axios.get("http://127.0.0.1:8000/api/comment2");
//         setData(respone.data);
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
//   let result = ShowComment(data, 0, 0);

//   // const ShowComment = (data, parentId = 0, char) => {
//   //   let result = [];
//   //   data.map((item) => {
//   //     if (item.parentId === parentId) {
//   //       item["level"] = char;
//   //       result.push(item);

//   //       const child = ShowComment(data, item.id, char + 1);
//   //       result = [...result, ...child];
//   //     }
//   //   });
//   //   return result;
//   // };
//   // const result = ShowComment(data, 0, 0);

//   // const handleLoadMore = function (item) {
//   //   const listItem = refs.current;
//   //   if (listItem) {
//   //     let lastE = [];
//   //     listItem.forEach((x) => {
//   //       if (x.current.childNodes.length == 3) {
//   //         lastE.push(x.current.lastChild);
//   //       }
//   //       if (x.current.getAttribute("data-parent") == item.id) {
//   //         x.current.classList.toggle("hide");
//   //       }
//   //     });
//   //     lastE.forEach((y) => {
//   //       if (y.classList.contains(item.id)) {
//   //         y.innerText == "Xem thêm"
//   //           ? (y.innerText = "Thu gọn")
//   //           : (y.innerText = "Xem thêm");
//   //       }
//   //     });
//   //   }
//   // };

//   // const handleFormSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const { name } = JSON.parse(localStorage.getItem("user"));
//   //   try {
//   //     await axios.post("http://127.0.0.1:8000/api/comment2", {
//   //       name,
//   //       content: value,
//   //       parentId: 0,
//   //     });
//   //     socket.emit("send-comment", { value, name });
//   //     toast.success("Add comment thành công");
//   //     setValue("");
//   //   } catch (error) {
//   //     console.log(error);
//   //     setValue("");
//   //     toast.error("Add comment fail");
//   //   }
//   // };

//   // const handleFormReplySubmit = async (item) => {
//   //   const { name } = JSON.parse(localStorage.getItem("user"));
//   //   try {
//   //     await axios.post("http://127.0.0.1:8000/api/comment2", {
//   //       name,
//   //       content: valueReply,
//   //       parentId: item.id,
//   //     });
//   //     socket.emit("send-comment", { valueReply, name });
//   //     toast.success("Add comment thành công");
//   //     setValue("");
//   //   } catch (error) {
//   //     console.log(error);
//   //     setValue("");
//   //     toast.error("Add comment fail");
//   //   }
//   // };

//   // const handleReply = (item) => {
//   //   refs.current.forEach((x) => {
//   //     if (x.current?.id == item.id) {
//   //       x.current.childNodes[3].classList.toggle("show");
//   //     }
//   //   });
//   // };

//   //   const handleWatchMore = async (item) => {
//   //     setLoading(true);

//   //     try {
//   //       const respone = await axios.get(
//   //         `http://127.0.0.1:8000/api/comment2/child/${item.id}`
//   //       );
//   //       const datas = respone.data;
//   //       setLoading(false);

//   //       let check = false;
//   //       data.forEach((item) => {
//   //         if (item.id === datas[0].id) {
//   //           check = true;
//   //         }
//   //       });
//   //       !check && setData([...data].concat(datas));
//   //       check && setData(data.filter((item) => item.id !== datas[0].id));
//   //       setShow((pre) => [
//   //         ...pre,
//   //         {
//   //           id: item.id,
//   //         },
//   //       ]);
//   //     } catch (error) {
//   //       setLoading(false);
//   //       toast.error("fail to get child comment");
//   //     }
//   //   };
//   //console.log(reply);
//   //console.log(data);

//   const handleSubmit = async (item) => {
//     setLoading(true);
//     try {
//       const respone = await axios.get(
//         `http://127.0.0.1:8000/api/comment2/child/${item.id}`
//       );
//       const datas = respone.data;

//       setData([...data].concat(datas));
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       toast.error("fail to get child comment");
//     }
//   };
//   // const handleClose = (id) => {
//   //   result = result.filter((item) => item.parentId !== id);
//   //   setData(result);
//   // };

//   const handleThemComment = async (e) => {
//     e.preventDefault();
//     const { name } = JSON.parse(localStorage.getItem("user"));
//     try {
//       await axios.post("http://127.0.0.1:8000/api/comment2", {
//         name: name || "test",
//         content: value,
//         parentId: 0,
//         haveChild: 0,
//       });
//       socket.emit("send-comment", { value, name });
//       // toast.success("Add comment thành công");
//       setValue("");
//     } catch (error) {
//       console.log(error);
//       setValue("");
//       toast.error("Add comment fail");
//     }
//   };

//   const hanleReply = async (item, valueReply) => {
//     const { name } = JSON.parse(localStorage.getItem("user"));
//     try {
//       await axios.post("http://127.0.0.1:8000/api/comment2", {
//         name,
//         content: valueReply,
//         parentId: item.id,
//         haveChild: 0,
//       });
//       await axios.patch(`http://127.0.0.1:8000/api/comment2/${item.id}`);
//       socket.emit("send-comment", { valueReply, name });
//       toast.success("Add comment thành công");
//       const li = document.querySelectorAll(".item");
//       console.log(li);
//       li.forEach((x) => {
//         const att = x.getAttribute("data-parent");
//         if (att == item.id) {
//           console.log(x);
//           x.classList.remove("hide");
//         }
//       });
//       //   setValue("");
//     } catch (error) {
//       console.log(error);
//       //   setValue("");
//       toast.error("Add comment fail");
//     }
//   };
//   const handleWatchMore = async (e, item) => {
//     let text = e.target.innerText;

//     if (text === "Xem thêm") {
//       await handleSubmit(item);
//       e.target.innerText = "Thu gọn";
//     }
//     if (text === "Thu gọn") {
//       e.target.innerText = "Show";
//       const li = document.querySelectorAll(".item");
//       li.forEach((x) => {
//         const att = x.getAttribute("data-parent");
//         if (att == item.id) {
//           x.classList.toggle("hide");
//         }
//       });
//     }
//     if (text === "Show") {
//       e.target.innerText = "Thu gọn";
//       const li = document.querySelectorAll(".item");
//       li.forEach((x) => {
//         const att = x.getAttribute("data-parent");
//         if (att == item.id) {
//           x.classList.toggle("hide");
//         }
//       });
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleThemComment}>
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
//             <SingleComment
//               onSubmit={handleSubmit}
//               key={index}
//               item={item}
//               show={show}
//               // onClose={handleClose}
//               // loading={loading}
//               socket={socket}
//               onReply={hanleReply}
//               onWatchMore={handleWatchMore}
//             ></SingleComment>
//           ))}
//       </ul>
//     </div>
//   );
// }

// export default Test3;
