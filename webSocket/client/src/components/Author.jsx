import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

Author.propTypes = {};

function Author({ socket }) {
  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem("user"));
    socket?.emit("user-go", name);

    socket?.on("server-send-status", (data) => {
      toast.success(data);
    });
  }, [socket]);
  return <div>Author Page</div>;
}

export default Author;
