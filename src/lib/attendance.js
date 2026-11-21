export const STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late'
};

export function calculateAttendanceRate(records) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error('No records');
  }
  const attended = records.filter(
    r => r.status === STATUS.PRESENT || r.status === STATUS.LATE
  ).length;
  return Math.round((attended / records.length) * 100);
}

export function isEligibleForExam(records, threshold = 75) {
  if (typeof threshold !== 'number' || threshold < 0 || threshold > 100) {
    throw new Error('Threshold must be between 0 and 100');
  }
  return calculateAttendanceRate(records) >= threshold;
}

export function markAttendance(records, studentId, status) {
  if (!Object.values(STATUS).includes(status)) {
    throw new Error('Invalid status');
  }
  if (!records.some(r => r.studentId === studentId)) {
    throw new Error('Student not found');
  }
  return records.map(r =>
    r.studentId === studentId ? { ...r, status } : r
  );
}