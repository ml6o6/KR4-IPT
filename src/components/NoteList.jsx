function formatShort(dateStr) {
  const dateObj = new Date(dateStr);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(dateObj);
}

export default function NoteList({ notes, onSelectDate }) {
  const datesWithNotes = Object.keys(notes).sort();

  if (datesWithNotes.length === 0) {
    return (
      <section className="card">
        <h2>Дни с заметками</h2>
        <p>Пока нет сохранённых заметок. Начните с сегодняшнего дня.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Дни с заметками</h2>
      <ul className="note-list">
        {datesWithNotes.map((date) => (
          <li
            key={date}
            className="note-list-item"
            onClick={() => onSelectDate(date)}
          >
            <span className="note-list-date">{formatShort(date)}</span>
            <span className="note-list-preview">
              {notes[date].split("\n")[0].slice(0, 40) || "(без текста)"}
              {notes[date].length > 40 ? "..." : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
