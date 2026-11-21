import { useState } from 'react';
import {
  STATUS, calculateAttendanceRate, isEligibleForExam, markAttendance
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
  const eligible = isEligibleForExam(records, 75);

  const setStatus = (id, status) =>
    setRecords(markAttendance(records, id, status));

  return (
    <main className="app">
      <h1>Student Attendance</h1>

      <table>
        <thead>
          <tr>
            <th>Student</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.studentId}>
              <td>{r.name}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => setStatus(r.studentId, STATUS.PRESENT)}>
                  Present
                </button>
                <button onClick={() => setStatus(r.studentId, STATUS.ABSENT)}>
                  Absent
                </button>
                <button onClick={() => setStatus(r.studentId, STATUS.LATE)}>
                  Late
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="summary">
        <p><strong>Attendance rate:</strong> {rate}%</p>
        <p>
          <strong>Exam eligibility:</strong>{' '}
          {eligible ? 'Eligible' : 'Not eligible'} (threshold 75%)
        </p>
      </section>
    </main>
  );
}