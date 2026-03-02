export type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'AUDITOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Employee extends User {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  skills: string[];
  seniority: 'Junior' | 'Mid' | 'Senior';
  contractType: 'CDI' | 'CDD' | 'Freelance';
  status: 'Active' | 'On Leave' | 'Inactive';
  equityScore: number;
  leaveBalance: number;
}

export interface ApprovalRequest {
  id: string;
  type: 'Leave' | 'Shift Swap' | 'Planning';
  requester: string;
  details: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Alert {
  id: string;
  type: 'Coverage' | 'Compliance' | 'Overload' | 'Equity';
  message: string;
  priority: 'P1' | 'P2' | 'P3';
  time: string;
  team: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  isSensitive: boolean;
}

export interface Shift {
  id: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  type: 'Morning' | 'Afternoon' | 'Night';
  status: 'Draft' | 'Published' | 'Validated';
}

export interface PlanningKPIs {
  coverage: number;
  equityScore: number;
  assignedEmployees: number;
  uncoveredSlots: number;
  isCompliant: boolean;
}
