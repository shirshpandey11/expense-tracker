function Filters({
  filter,
  setFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) {
  return (
    <div style={{ marginBottom: "20px" }}>

      <label>Category:</label>

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        style={{
          marginLeft: "10px",
          padding: "5px"
        }}
      >
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">
          Entertainment
        </option>
        <option value="Other">Other</option>
      </select>

      <br /><br />

      <label>From:</label>

      <input
        type="date"
        value={startDate}
        onChange={(e) =>
          setStartDate(e.target.value)
        }
        style={{
          marginLeft: "10px"
        }}
      />

      <br /><br />

      <label>To:</label>

      <input
        type="date"
        value={endDate}
        onChange={(e) =>
          setEndDate(e.target.value)
        }
        style={{
          marginLeft: "10px"
        }}
      />

    </div>
  );
}

export default Filters;