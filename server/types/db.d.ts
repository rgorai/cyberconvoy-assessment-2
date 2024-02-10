import { RowDataPacket } from 'mysql2'

// define MySQL-friendly interfaces
declare global {
  interface DbEmployee extends Employee, RowDataPacket {}
  interface DbEmployeeFull extends EmployeeFull, RowDataPacket {}

  interface DbDepartment extends Department, RowDataPacket {}
}
