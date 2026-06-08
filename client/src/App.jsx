import { useEffect, useState } from "react";
import API from "./services/api";
import SummaryCards from "./components/SummaryCards";
import Filters from "./components/Filters";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: "",
    note: ""
  });

  const [editingId, setEditingId] = useState(null);

  const [filter, setFilter] = useState("All");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await API.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await API.put(
          `/expenses/${editingId}`,
          formData
        );

        setEditingId(null);

      } else {

        await API.post(
          "/expenses",
          formData
        );

      }

      setFormData({
        amount: "",
        category: "Food",
        date: "",
        note: ""
      });

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/expenses/${id}`);

      fetchExpenses();

    } catch (error) {
      console.log(error);
    }
  };

  const filteredExpenses =
    expenses.filter((expense) => {

      const categoryMatch =
        filter === "All" ||
        expense.category === filter;

      const dateMatch =
        (!startDate ||
          expense.date >= startDate) &&
        (!endDate ||
          expense.date <= endDate);

      return (
        categoryMatch &&
        dateMatch
      );

    });

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        Expense Tracker
      </h1>

      <SummaryCards expenses={expenses} />

      <ExpenseChart expenses={expenses} />

      <Filters
        filter={filter}
        setFilter={setFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <h2 style={{ marginTop: "20px" }}>
        {editingId
        ? "Edit Expense"
        : "Add Expense"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <br /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
        />

        <br /><br />

        <button
  type="submit"
  style={{
    padding: "8px 15px",
    marginRight: "10px"
  }}
>
  {editingId
    ? "Update Expense"
    : "Add Expense"}
</button>

  {editingId && (
    <button
      type="button"
      onClick={() => {
      setEditingId(null);

      setFormData({
        amount: "",
        category: "Food",
        date: "",
        note: ""
      });
    }}
    style={{
      padding: "8px 15px"
    }}
    >
      Cancel Edit
    </button>
  )}
      </form>

      <hr />

      <h2>Expenses</h2>

      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        filteredExpenses.map((expense) => (
          <div
            key={expense.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}
          >
            <p>Amount: ₹{expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {expense.date}</p>
            <p>Note: {expense.note}</p>

            <button
              onClick={() =>
                deleteExpense(expense.id)
              }
              style={{
                marginRight: "10px",
                padding: "5px 10px"
              }}
            >
              Delete
            </button>

            <button
              onClick={() => {
                setFormData({
                  amount: expense.amount,
                  category: expense.category,
                  date: expense.date,
                  note: expense.note
                });

                setEditingId(expense.id);
              }}
              style={{
                padding: "5px 10px"
              }}
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;