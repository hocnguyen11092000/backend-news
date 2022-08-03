import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";

Admin.propTypes = {};

function Admin({ socket }) {
  const [noti, setNoti] = useState();
  const [temp, setTemp] = useState(1);
  const { name } = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // console.log("123");
    socket?.emit("user-go", name);

    socket?.on("server-send-status", (data) => {
      setNoti(data);

      // toast.success("Save student successfully!");
    });

    socket?.on("list", (data) => {});
  }, [socket]);

  useEffect(() => {
    setTemp(temp + 1);
  }, [noti]);

  const handleClick = () => {
    socket.emit("send-status", {
      sender: name,
      reciver: "bich nga",
      status: "đã duyệt",
    });
  };

  return (
    <div>
      {/* <Header noti={temp}></Header> */}
      <div style={{ marginTop: 20 }}>
        <Button color="primary" variant="contained" onClick={handleClick}>
          Click
        </Button>
      </div>
    </div>
  );
}

export default Admin;
