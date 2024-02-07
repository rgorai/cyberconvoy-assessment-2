import { RowDataPacket } from 'mysql2'

// define MySQL-friendly types
declare global {
  interface DbEmployee extends Employee, RowDataPacket {}

  interface DbDepartment extends Department, RowDataPacket {}
}
