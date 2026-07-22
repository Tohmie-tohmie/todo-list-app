
export function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}