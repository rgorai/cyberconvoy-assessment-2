import { OkPacket } from 'mysql2'

export const isOkSingleInsert = (x: any): x is OkPacket =>
  !!x.insertId &&
  x.affectedRows === 1 &&
  x.warningStatus === 0 &&
  x.serverStatus === 2

export const isOkSingleUpdate = (x: any): x is OkPacket =>
  x.changedRows === 1 && x.warningStatus === 0 && x.serverStatus === 2

export const isOkSingleDelete = (x: any): x is OkPacket =>
  x.affectedRows === 1 && x.warningStatus === 0 && x.serverStatus === 2
