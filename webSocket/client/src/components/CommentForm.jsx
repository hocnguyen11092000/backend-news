import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
export const CommentForm = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue("");
    if (onSubmit) {
      await onSubmit(value);
    }
  };
  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit} className="_form">
        <TextField
          variant="outlined"
          label="thêm comment"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          style={{ marginRight: 5 }}
        ></TextField>
        <Button variant="contained" size="small">
          Thêm
        </Button>
      </form>
    </div>
  );
};
