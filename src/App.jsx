import { useState } from "react";
import { STATUS, markAttendance } from "./lib/attendance";
import "./App.css";

const INITIAL = [
  { studentId: "s1", name: "Alice", status: STATUS.DEFAULT },
  { studentId: "s2", name: "Bob", status: STATUS.DEFAULT },
  { studentId: "s3", name: "Charlie", status: STATUS.DEFAULT },
  { studentId: "s4", name: "Dana", status: STATUS.DEFAULT },
  { studentId: "s5", name: "Ethan", status: STATUS.DEFAULT },
  { studentId: "s6", name: "Fiona", status: STATUS.DEFAULT },
  { studentId: "s7", name: "Gavin", status: STATUS.DEFAULT },
  { studentId: "s8", name: "Hannah", status: STATUS.DEFAULT },
  { studentId: "s9", name: "Isaac", status: STATUS.DEFAULT },
  { studentId: "s10", name: "Jasmine", status: STATUS.DEFAULT },
];

const STATUS_SEQUENCE = [
  STATUS.DEFAULT,
  STATUS.PRESENT,
  STATUS.ABSENT,
  STATUS.LATE,
];

const STATUS_ICONS = {
  default: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#969696" />
      <path
        d="M16.8 7.2L7.2 16.8M19.2 12A7.2 7.2 0 1 1 4.8 12a7.2 7.2 0 0 1 14.4 0Z"
        fill="none"
        stroke="#e8e8e8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  present: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#73AB57" />
      <path
        d="M16.8 7.2L13.2 12l-3.6 4.8-2.4-2.4"
        fill="none"
        stroke="#e8e8e8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  absent: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#B55C5C" />
      <path
        d="M7.2 7.2L12 12m0 0l4.8 4.8M12 12l4.8-4.8M12 12l-4.8 4.8"
        fill="none"
        stroke="#e8e8e8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  late: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#D9874C" />
      <path
        d="M18.7882 12.2828H12V5.49462"
        fill="none"
        stroke="#e8e8e8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const AWARD_STAR = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M11.1033 3.81699C11.4701 3.07374 12.5299 3.07374 12.8967 3.81699L14.7063 7.48347C14.8519 7.77862 15.1335 7.98319 15.4592 8.03051L19.5054 8.61846C20.3256 8.73765 20.6531 9.74562 20.0596 10.3242L17.1318 13.1781C16.8961 13.4079 16.7885 13.7389 16.8442 14.0632L17.5353 18.0931C17.6754 18.91 16.818 19.533 16.0844 19.1473L12.4653 17.2446C12.174 17.0915 11.826 17.0915 11.5347 17.2446L7.91562 19.1473C7.18199 19.533 6.32456 18.91 6.46467 18.0931L7.15585 14.0632C7.21148 13.7389 7.10393 13.4079 6.86825 13.1781L3.94038 10.3242C3.34687 9.74562 3.67438 8.73765 4.4946 8.61846L8.54081 8.03051C8.86652 7.98319 9.14808 7.77862 9.29374 7.48347L11.1033 3.81699Z"
      fill="#F5CA47"
    />
  </svg>
);

export default function App() {
  const [records, setRecords] = useState(INITIAL);

  const counts = records.reduce(
    (totals, record) => ({
      ...totals,
      [record.status]: totals[record.status] + 1,
    }),
    { default: 0, present: 0, absent: 0, late: 0 },
  );
  const today = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const setStatus = (id, status) =>
    setRecords(markAttendance(records, id, status));

  const cycleStatus = (id, status) => {
    const nextStatus =
      STATUS_SEQUENCE[
        (STATUS_SEQUENCE.indexOf(status) + 1) % STATUS_SEQUENCE.length
      ];
    setStatus(id, nextStatus);
  };

  return (
    <main className="app">
      <div className="top-shell">
        <header className="page-header">
          <div>
            <h1>Student Attendance</h1>
            <p className="section-label">Section Number</p>
          </div>
          <time
            className="date-badge"
            dateTime={new Date().toISOString().slice(0, 10)}
          >
            {today}
          </time>
        </header>

        <section className="summary-cards" aria-label="Attendance summary">
          <article className="stat-card">
            <span className="summary-icon award-icon" aria-hidden="true">
              {AWARD_STAR}
            </span>
            <div className="stat-copy">
              <strong>{counts.present} Students</strong>
              <p>Perfect Attendance</p>
            </div>
          </article>
          <article className="stat-card">
            <span className="summary-icon present-icon" aria-hidden="true">
              {STATUS_ICONS.present}
            </span>
            <div className="stat-copy">
              <strong>{counts.present}</strong>
              <p>Present</p>
            </div>
          </article>
          <article className="stat-card">
            <span className="summary-icon absent-icon" aria-hidden="true">
              {STATUS_ICONS.absent}
            </span>
            <div className="stat-copy">
              <strong>{counts.absent}</strong>
              <p>Absent</p>
            </div>
          </article>
          <article className="stat-card">
            <span className="summary-icon late-icon" aria-hidden="true">
              {STATUS_ICONS.late}
            </span>
            <div className="stat-copy">
              <strong>{counts.late}</strong>
              <p>Late</p>
            </div>
          </article>
        </section>
      </div>

      <section className="roster-card">
        <div className="roster-header">
          <div>
            <h2>Class roster</h2>
          </div>
          <span className="student-count">{records.length} students</span>
        </div>

        <table>
          <tbody>
            {records.map((r) => (
              <tr key={r.studentId}>
                <td>
                  <div className="student">
                    <strong>{r.name}</strong>
                    {r.status === STATUS.PRESENT && (
                      <span
                        className="attendance-star"
                        role="img"
                        aria-label="Eligible for perfect attendance award"
                      >
                        {AWARD_STAR}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <button
                    className={`cycle-status cycle-status-${r.status}`}
                    onClick={() => cycleStatus(r.studentId, r.status)}
                    aria-label={`Update ${r.name}'s attendance. Current status: ${r.status}`}
                    title={`Current status: ${r.status}`}
                  >
                    {STATUS_ICONS[r.status]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
