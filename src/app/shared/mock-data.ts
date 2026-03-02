import { Employee, ApprovalRequest, Alert, AuditLog } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alice Durand', email: 'alice@shiftmaster.com', role: 'EMPLOYEE', firstName: 'Alice', lastName: 'Durand', department: 'Emergency', jobTitle: 'Nurse', skills: ['ICU', 'Triage'], seniority: 'Senior', contractType: 'CDI', status: 'Active', equityScore: 85, leaveBalance: 12.5 },
  { id: '2', name: 'Bob Lefebvre', email: 'bob@shiftmaster.com', role: 'EMPLOYEE', firstName: 'Bob', lastName: 'Lefebvre', department: 'Emergency', jobTitle: 'Nurse', skills: ['Pediatrics'], seniority: 'Mid', contractType: 'CDI', status: 'Active', equityScore: 78, leaveBalance: 8 },
  { id: '3', name: 'Charlie Moreau', email: 'charlie@shiftmaster.com', role: 'EMPLOYEE', firstName: 'Charlie', lastName: 'Moreau', department: 'Radiology', jobTitle: 'Technician', skills: ['X-Ray', 'MRI'], seniority: 'Junior', contractType: 'CDD', status: 'Active', equityScore: 92, leaveBalance: 15 },
  { id: '4', name: 'Diana Rossi', email: 'diana@shiftmaster.com', role: 'EMPLOYEE', firstName: 'Diana', lastName: 'Rossi', department: 'Emergency', jobTitle: 'Doctor', skills: ['Surgery'], seniority: 'Senior', contractType: 'CDI', status: 'On Leave', equityScore: 88, leaveBalance: 5 },
  { id: '5', name: 'Eve Petit', email: 'eve@shiftmaster.com', role: 'EMPLOYEE', firstName: 'Eve', lastName: 'Petit', department: 'Emergency', jobTitle: 'Nurse', skills: ['Triage'], seniority: 'Mid', contractType: 'CDI', status: 'Active', equityScore: 82, leaveBalance: 10 },
];

export const MOCK_APPROVALS: ApprovalRequest[] = [
  { id: '1', type: 'Leave', requester: 'Alice Durand', details: 'Annual Leave (5 days)', date: '2026-03-15', priority: 'Medium', status: 'Pending' },
  { id: '2', type: 'Shift Swap', requester: 'Bob Lefebvre', details: 'Swap Morning with Night (Wed)', date: '2026-03-04', priority: 'High', status: 'Pending' },
  { id: '3', type: 'Planning', requester: 'System', details: 'Week 11 Generation Ready', date: '2026-03-01', priority: 'High', status: 'Pending' },
];

export const MOCK_ALERTS: Alert[] = [
  { id: '1', type: 'Coverage', message: 'Coverage < 90% in Radiology', priority: 'P1', time: '10 min ago', team: 'Radiology' },
  { id: '2', type: 'Compliance', message: 'Rule 10% violation risk', priority: 'P2', time: '1h ago', team: 'Emergency' },
  { id: '3', type: 'Equity', message: 'Equity score drop detected', priority: 'P3', time: '3h ago', team: 'Pediatrics' },
];

export const MOCK_AUDIT: AuditLog[] = [
  { id: '1', user: 'Jean Manager', action: 'Approved Leave', target: 'Alice Durand', timestamp: '2026-03-01 14:20', isSensitive: false },
  { id: '2', user: 'System', action: 'Generated Planning', target: 'Week 10', timestamp: '2026-03-01 12:00', isSensitive: true },
  { id: '3', user: 'Admin', action: 'Modified Business Rule', target: 'Max Break %', timestamp: '2026-02-28 16:45', isSensitive: true },
];

export const MOCK_KPIS = {
  coverage: 94,
  equityScore: 88,
  assignedEmployees: 42,
  uncoveredSlots: 3,
  isCompliant: true,
};
