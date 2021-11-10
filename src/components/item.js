import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export const item = ({ expense, handleDelete, handleEdit }) => {
  const { id, charge, amount } = expense;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">$ {amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit btn"
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete btn"
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};
export default item;
