import "./App.css";
import React, { useState } from "react";
import List from "./components/list.js";
import Form from "./components/form.js";
import Alert from "./components/alert.js";
import { v4 as uuidv4 } from "uuid";

// const initialExpenses = localStorage.getItem("expenses")? JSON.parse(localStorage.getItem("expenses"))
// : [];

function App() {
  //************* state values **********************
  const [expenses, setExpenses] = useState([]);
  // single charge
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);

  //edit item
  const [id, setId] = useState(0);

  //*************** useEffect ***********************
  // useEffect(()=>{
  //    console.log('we called use effect');
  //    localStorage.setItem("expenses", JSON.stringify(expenses))
  // },[expenses])
  //*************** functionality *******************
  // handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      // handle alert
      handleAlert({
        type: "danger",
        text: "No item added to charge and amount",
      });
    }
  };
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // handle clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  //handle delete
  const handleDelete = (id) => {
    const restIdies = expenses.filter((item) => item.id !== id);
    setExpenses(restIdies);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  //handle edit
  const handleEdit = (id) => {
    const singleExpense = expenses.find((item) => item.id === id);
    const { charge, amount } = singleExpense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show === true && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget Calculator</h1>

      <main className="App">
        <Form
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        Total spending:
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
