import { describe, it, expect } from 'vitest';
import {
  calculateAttendanceRate,
  isEligibleForExam,
  markAttendance
} from './attendance';

const present = id => ({ studentId: id, status: 'present' });
const absent  = id => ({ studentId: id, status: 'absent'  });
const late    = id => ({ studentId: id, status: 'late'    });

describe('calculateAttendanceRate', () => {
  it('returns 100 when everyone is present', () => {
    expect(calculateAttendanceRate([present('s1'), present('s2')])).toBe(100);
  });

  it('counts late as attended (alternative outcome)', () => {
    const r = [present('s1'), late('s2'), absent('s3'), absent('s4')];
    expect(calculateAttendanceRate(r)).toBe(50);
  });

  it('returns 75 for three of four attended (boundary)', () => {
    const r = [present('s1'), present('s2'), late('s3'), absent('s4')];
    expect(calculateAttendanceRate(r)).toBe(75);
  });

  it('throws when there are no records (invalid input)', () => {
    expect(() => calculateAttendanceRate([])).toThrow('No records');
  });
});

describe('isEligibleForExam', () => {
  it('is eligible at exactly the 75% boundary', () => {
    const r = [present('s1'), present('s2'), late('s3'), absent('s4')];
    expect(isEligibleForExam(r, 75)).toBe(true);
  });

  it('is not eligible below the threshold', () => {
    const r = [present('s1'), present('s2'), absent('s3'), absent('s4')];
    expect(isEligibleForExam(r, 75)).toBe(false);
  });

  it('throws for an out-of-range threshold', () => {
    expect(() => isEligibleForExam([present('s1')], 120))
      .toThrow('Threshold must be between 0 and 100');
  });
});

describe('markAttendance', () => {
  it('updates an existing student status', () => {
    const r = [present('s1')];
    expect(markAttendance(r, 's1', 'absent')[0].status).toBe('absent');
  });

  it('throws for an unknown student', () => {
    expect(() => markAttendance([present('s1')], 's9', 'absent'))
      .toThrow('Student not found');
  });

  it('throws for an invalid status', () => {
    expect(() => markAttendance([present('s1')], 's1', 'sleeping'))
      .toThrow('Invalid status');
  });
});