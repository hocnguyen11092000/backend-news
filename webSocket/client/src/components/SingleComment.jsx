import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SingleComment({
  item,
  onSubmit,
  show,
  onClose,
  socket,
  onReply,
  onWatchMore,
}) {
  useEffect(() => {
    document.querySelector(".watch-more").innerHTML = "Xem thêm";
  }, [item.id]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueReply, setValueReply] = useState("");
  const [form, setForm] = useState(false);

  //   const handleHide = async (e, item) => {
  //     setIsOpen(false);
  //     if (onClose) {
  //       onClose(item.id);
  //     }
  //   };

  // const ref = useRef(false);
  // console.log(isOpen);

  const handleWatchMore = async (e, item) => {
    if (onWatchMore) {
      await onWatchMore(e, item);
    }

    // let check = false;
    // data.forEach((item) => {
    //   if (item.id === datas[0].id) {
    //     check = true;
    //   }
    // });
    // !check && setData([...data].concat(datas));
    // check && setData(data.filter((item) => item.id !== datas[0].id));
    // setShow((pre) => [
    //   ...pre,
    //   {
    //     id: item.id,
    //   },
    // ]);
    // setIsOpen(!isOpen);
  };
  const handleReply = () => {
    setForm(!form);
  };
  const handleFormReplySubmit = async (item) => {
    if (onReply) {
      await onReply(item, valueReply);
    }
  };
  return (
    <li
      // ref={refs.current[index]}
      key={item.id}
      className={`item item-${item.level} `}
      style={{ marginLeft: `${item.level * 50}px` }}
      data-parent={item.parentId}
      id={item.id}
    >
      <div>{item.name}</div>
      <div className="content">{item.content}</div>
      <button className="reply" onClick={() => handleReply(item)}>
        Trả lời
      </button>
      <div className={`${form ? "form show" : "form"}`}>
        <input
          className="input"
          type="text"
          placeholder="Nhập comment..."
          onChange={(e) => setValueReply(e.target.value)}
        />
        <button
          type="submit"
          className="send"
          onClick={() => handleFormReplySubmit(item)}
        >
          Gởi
        </button>
      </div>
      {!!item.haveChild && (
        <>
          {
            <div
              className="watch-more"
              onClick={(e) => handleWatchMore(e, item)}
            >
              {loading ? "Xem thêm (loading...)" : "Xem thêm"}
            </div>
          }
        </>
      )}
    </li>
  );
}
