export default function DateHeader({ selectedDate, onDateChange }) {
  const dateObj = new Date(selectedDate);

  const formatter = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readableDate = formatter.format(dateObj);

  const handleInputChange = (e) => {
    onDateChange(e.target.value);
  };

  return (
    <section className="card">
      <h2>Выбор даты</h2>
      <p className="date-text">{readableDate}</p>
      <label className="date-label">
        Дата:
        <input type="date" value={selectedDate} onChange={handleInputChange} />
      </label>
    </section>
  );
}
