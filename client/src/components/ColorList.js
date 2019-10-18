import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = props => {
  const { colors, updateColors } = props;
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log("form inputs", colorToEdit);
    let updatedColors = colors.map(updatedColor => {
      //delcaring a variable that stores
      return updatedColor.id === colorToEdit.id ? colorToEdit : updatedColor;
    });
    console.log(updatedColors);
    console.log(`sending this to /api/colors/${colorToEdit.id}`, colorToEdit);
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(updatedColors);
      })
      .catch(err => console.log("what error is this", err));
  };

  const deleteColor = deletedColor => {
    // declaring a variable to delete color locally, only called if request is successful
    let updatedColors = colors.filter(color => color.id !== deletedColor.id);
    console.log(updatedColors);
    axiosWithAuth()
      .delete(`/api/colors/${deletedColor.id}`)
      .then(res => {
        updateColors(updatedColors);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
