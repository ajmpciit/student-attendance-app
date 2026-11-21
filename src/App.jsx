import { useState } from 'react';
import {
  STATUS, calculateAttendanceRate, markAttendance
} from './lib/attendance';
import './App.css';

const INITIAL = [
  { studentId: 's1', name: 'Alice',   status: STATUS.PRESENT },
  { studentId: 's2', name: 'Bob',     status: STATUS.PRESENT },
  { studentId: 's3', name: 'Charlie', status: STATUS.ABSENT  },
  { studentId: 's4', name: 'Dana',    status: STATUS.LATE    }
];

export default function App() {
  const [records, setRecords] = useState(INITIAL);

  const rate = calculateAttendanceRate(records);
  const eligibleCount = records.filter(record => record.status === STATUS.PRESENT).length;
  const counts = records.reduce(
    (totals, record) => ({ ...totals, [record.status]: totals[record.status] + 1 }),
    { present: 0, absent: 0, late: 0 }
  );
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  const setStatus = (id, status) =>
    setRecords(markAttendance(records, id, status));

  return (
    <main className="app">
      <header className="page-header">
        <div>
          <p className="eyebrow">Class overview</p>
          <h1>Student Attendance</h1>
        </div>
        <div className="date-badge" aria-label="Today's date">
          <span className="calendar-icon" aria-hidden="true">▦</span>
          {today}
        </div>
      </header>

      <section className="summary-cards" aria-label="Attendance summary">
        <div className="stats-primary">
          <article className="stat-card attendance-rate">
            <div className="stat-icon" aria-hidden="true">↗</div>
            <div>
              <p>Attendance rate</p>
              <strong>{rate}%</strong>
            </div>
          </article>
          <article
            className={`stat-card award-eligibility ${eligibleCount > 0 ? 'eligible' : 'not-eligible'}`}
            aria-label={`${eligibleCount} of ${records.length} students eligible for the perfect attendance award`}
          >
            <div className="stat-icon" aria-hidden="true">{eligibleCount > 0 ? '✓' : '×'}</div>
            <div>
              <p>Perfect attendance award</p>
              <strong>{eligibleCount}</strong>
              <span className="stat-caption">students eligible</span>
            </div>
          </article>
        </div>
        <div className="stats-counts" aria-label="Attendance counts">
          <article className="stat-card">
            <span className="stat-dot present-dot" aria-hidden="true"></span>
            <div>
              <p>Present</p>
              <strong>{counts.present}</strong>
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-dot absent-dot" aria-hidden="true"></span>
            <div>
              <p>Absent</p>
              <strong>{counts.absent}</strong>
            </div>
          </article>
          <article className="stat-card">
            <span className="stat-dot late-dot" aria-hidden="true"></span>
            <div>
              <p>Late</p>
              <strong>{counts.late}</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="roster-card">
        <div className="roster-header">
          <div>
            <p className="eyebrow">Today</p>
            <h2>Class roster</h2>
          </div>
          <span className="student-count">{records.length} students</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Status</th>
              <th>Update attendance</th>
              <th>Award eligibility</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.studentId}>
                <td>
                  <div className="student">
                    <span className={`avatar avatar-${r.status}`} aria-hidden="true">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <strong>{r.name}</strong>
                      <span>Student ID · {r.studentId.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status status-${r.status}`}>
                    <span aria-hidden="true"></span>
                    {r.status}
                  </span>
                </td>
                <td>
                  <div className="actions" aria-label={`Update ${r.name}'s attendance`}>
                    <button
                      className={`action action-present ${r.status === STATUS.PRESENT ? 'active' : ''}`}
                      onClick={() => setStatus(r.studentId, STATUS.PRESENT)}
                      aria-pressed={r.status === STATUS.PRESENT}
                    >
                      Present
                    </button>
                    <button
                      className={`action action-absent ${r.status === STATUS.ABSENT ? 'active' : ''}`}
                      onClick={() => setStatus(r.studentId, STATUS.ABSENT)}
                      aria-pressed={r.status === STATUS.ABSENT}
                    >
                      Absent
                    </button>
                    <button
                      className={`action action-late ${r.status === STATUS.LATE ? 'active' : ''}`}
                      onClick={() => setStatus(r.studentId, STATUS.LATE)}
                      aria-pressed={r.status === STATUS.LATE}
                    >
                      Late
                    </button>
                  </div>
                </td>
                <td>
                  <span
                    className={`attendance-check ${r.status === STATUS.PRESENT ? 'eligible' : 'not-eligible'}`}
                    aria-label={r.status === STATUS.PRESENT ? 'Eligible for perfect attendance award' : 'Not eligible for perfect attendance award'}
                  >
                    {r.status === STATUS.PRESENT ? '✓' : '×'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}