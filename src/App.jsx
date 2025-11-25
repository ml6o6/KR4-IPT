import { useEffect, useState } from "react";
import DateHeader from "./components/DateHeader.jsx";
import NoteEditor from "./components/NoteEditor.jsx";
import NoteList from "./components/NoteList.jsx";

const STORAGE_KEY = "day-notes";

function getTodayISO() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function loadNotesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveNotesToStorage(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(getTodayISO());
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");

  // Загружаем все заметки при первом рендере
  useEffect(() => {
    const storedNotes = loadNotesFromStorage();
    setNotes(storedNotes);
  }, []);

  // Обновляем текст заметки при смене даты
  useEffect(() => {
    setCurrentNote(notes[selectedDate] || "");
  }, [selectedDate, notes]);

  // Сохраняем заметки при изменении текущей заметки
  useEffect(() => {
    setNotes((prev) => {
      const updated = { ...prev, [selectedDate]: currentNote };
      if (!currentNote.trim()) {
        delete updated[selectedDate];
      }

      saveNotesToStorage(updated);
      return updated;
    });
  }, [currentNote, selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleNoteChange = (text) => {
    setCurrentNote(text);
  };

  return (
    <div className="app">
      <h1 className="app-title">Календарь дня</h1>

      <div className="app-layout">
        <div className="left-panel">
          <DateHeader
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <NoteEditor value={currentNote} onChange={handleNoteChange} />
        </div>

        <div className="right-panel">
          <NoteList notes={notes} onSelectDate={setSelectedDate} />
        </div>
      </div>
    </div>
  );
}
