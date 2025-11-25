export default function NoteEditor({ value, onChange }) {
  const handleTextChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <section className="card">
      <h2>Заметка на день</h2>
      <textarea
        className="note-textarea"
        placeholder="Напишите планы, мысли или важные дела на этот день..."
        value={value}
        onChange={handleTextChange}
        rows={8}
      />
      <p className="hint">
        Заметки автоматически сохраняются в браузере (localStorage).
      </p>
    </section>
  );
}
