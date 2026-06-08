const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const filePath = path.join(
  __dirname,
  "data",
  "expenses.json"
);

// Home Route
app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

// GET ALL EXPENSES
app.get("/api/expenses", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    const expenses = data ? JSON.parse(data) : [];

    res.json(expenses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load expenses"
    });
  }
});

// ADD EXPENSE
app.post("/api/expenses", (req, res) => {
  try {

    const data = fs.readFileSync(
      filePath,
      "utf8"
    );

    const expenses = data
      ? JSON.parse(data)
      : [];

    const newExpense = {
      id: uuidv4(),
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
      note: req.body.note
    };

    expenses.push(newExpense);

    fs.writeFileSync(
      filePath,
      JSON.stringify(expenses, null, 2)
    );

    res.status(201).json(newExpense);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

app.put("/api/expenses/:id", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const expenses = JSON.parse(data);


    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === req.params.id) {
        return {
          ...expense,
          amount: req.body.amount,
          category: req.body.category,
          date: req.body.date,
          note: req.body.note
        };
      }
      return expense;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify(updatedExpenses, null, 2)
    );

    res.json({
      message: "Expense updated"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.delete("/api/expenses/:id", (req, res) => {
  try {

    const data = fs.readFileSync(
      filePath,
      "utf8"
    );

    const expenses = JSON.parse(data);

    const updatedExpenses = expenses.filter(
      expense => expense.id !== req.params.id
    );

    fs.writeFileSync(
      filePath,
      JSON.stringify(updatedExpenses, null, 2)
    );

    res.json({
      message: "Expense deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});