const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      {/* <label htmlFor="filter">Filter:</label> */}
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Filter coins by name and symbol"
      />
    </div>
  );
};

export default FilterInput;