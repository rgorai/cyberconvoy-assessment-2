import { OkPacket } from 'mysql2'

export const isOkInsertSingle = (x: any): x is OkPacket =>
  !!x.insertId &&
  x.affectedRows === 1 &&
  x.warningStatus === 0 &&
  x.serverStatus === 2

export const isOkUpdateSingle = (x: any): x is OkPacket =>
  x.changedRows === 1 && x.warningStatus === 0 && x.serverStatus === 2

export const isOkDeleteSingle = (x: any): x is OkPacket =>
  x.affectedRows === 1 && x.warningStatus === 0 && x.serverStatus === 2
