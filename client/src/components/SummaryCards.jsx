function SummaryCards({ expenses }) {

  const total = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const highest =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            expense =>
              Number(expense.amount)
          )
        )
      : 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "20px"
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "10px"
        }}
      >
        <h3>Total Spent</h3>
        <h2>₹{total}</h2>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "10px"
        }}
      >
        <h3>Highest Expense</h3>
        <h2>₹{highest}</h2>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "10px"
        }}
      >
        <h3>Total Expenses</h3>
        <h2>{expenses.length}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;