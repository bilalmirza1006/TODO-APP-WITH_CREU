import React from "react";
import {
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonWraper from "./ButtonWraper";

function TodoListItem(props) {
  const { itemKey, item, deleteCallback, handleCallback } = props;
  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: 1.5,
    height: "2rem",
  };

  return (
    <ListItem disablePadding key={itemKey}>
      <ListItemButton sx={{ ...commonStyles, borderRadius: "12px" }}>
        {/* <ListItemText primary={item._id} /> */}
        <ListItemText primary={item.productname} />
        <ListItemText primary={item.category} />
        <ListItemText primary={item.price} />
      </ListItemButton>
      {/* <CircularProgress /> */}

      <ButtonWraper
        sx={{ borderRadius: "10px", margin: "0", padding: "0" }}
        onClick={() => handleCallback(item)}
      >
        <EditIcon
          sx={{
            ...commonStyles,
            borderRadius: "10px",
            width: "2.5rem",
          }}
        />
      </ButtonWraper>
      <ButtonWraper
        sx={{ borderRadius: "10px", margin: "0", padding: "0", color: "red" }}
        onClick={() => deleteCallback(item)}
      >
        <DeleteIcon
          sx={{
            ...commonStyles,
            borderRadius: "10px",
            width: "2.5rem",
          }}
        />
      </ButtonWraper>
    </ListItem>
  );
}

export default TodoListItem;
