import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ExpenseChart({ expenses }) {

  const categoryData = {};

  expenses.forEach((expense) => {

    categoryData[expense.category] =
      (categoryData[expense.category] || 0) +
      Number(expense.amount);

  });

  const chartData = Object.keys(categoryData).map(
    (category) => ({
      category,
      amount: categoryData[category]
    })
  );

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px"
      }}
    >
      <h2>Expense Chart</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="amount"
            fill="#4F46E5"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;