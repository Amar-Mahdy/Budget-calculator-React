import React from "react";
import { MdSend } from "react-icons/md";

export const form = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g amount"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button className="btn" type="submit">
        {edit ? "edit" : "submit"}
        <MdSend />
      </button>
    </form>
  );
};
export default form;
