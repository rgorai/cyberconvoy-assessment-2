// PRIMITIVES //

import db from '../db'
import { getISODate } from './strings'

type ErrorFunction = <T extends Record<string, any>>(
  vars: T,
  options?: any
) => void

/**
 * @author rgorai
 * @description test multiple values at a time for string validity
 * @param strings object of values to test. Usage: { val1, val2, ... }
 * @return throws if string is invalid
 */
export const areValidStrings: ErrorFunction = (
  strings,
  options?: {
    allowEmpty?: boolean
    allowUndefined?: boolean
  }
) => {
  const { allowEmpty = false, allowUndefined = false } = options ?? {}
  for (const k in strings) {
    if (strings[k] === undefined) {
      if (!allowUndefined) throw `${k} cannot be undefined`
      continue
    }

    if (
      typeof strings[k] !== 'string' ||
      (!allowEmpty && strings[k].trim().length === 0)
    ) {
      throw `${k} must be a${
        !allowEmpty ? ' non-empty' : ''
      } string. Received: ${strings[k]}`
    }
  }
}

export const areValidNumbers: ErrorFunction = (
  numbers,
  options?: {
    min?: number
    max?: number
  }
) => {
  for (const k in numbers) {
    const currVal = numbers[k]

    if (
      !(
        (typeof currVal === 'string' && !isNaN(currVal)) ||
        typeof currVal === 'number'
      )
    )
      throw `${k} must be a valid number. Received: ${currVal}`
    else if (
      (options?.min !== undefined && currVal < options.min) ||
      (options?.max !== undefined && currVal > options.max)
    )
      throw `${k} must be a valid number ${
        options.min !== undefined ? `${options.min} or more` : ''
      }${
        options.min !== undefined && options.max !== undefined ? ' and ' : ''
      }${
        options.max !== undefined ? `${options.max} or less` : ''
      }. Received: ${currVal}`
  }
}

// OTHER //

export const isValidDate: ErrorFunction = (dates, pastDatesOnly?: boolean) => {
  for (const k in dates) {
    const dateVal = Date.parse(dates[k])
    if (isNaN(dateVal) || (pastDatesOnly && Date.now() < dateVal))
      throw `${k} must be a valid date${pastDatesOnly ? ' from the past' : ''}. Received: ${dates[k]}`
  }
}

export const areValidEmployeeDetails = async (
  details: EmployeeCreationDetails
) => {
  const { first_name, last_name, date_of_birth, department_id, title, salary } =
    details

  // validate fields
  areValidStrings({ first_name, last_name, title })
  areValidNumbers({ department_id, salary }, { min: 0 })
  isValidDate({ date_of_birth }, true)

  // trim strings
  details.first_name = details.first_name.trim()
  details.last_name = details.last_name.trim()
  details.title = details.title.trim()

  // cast numbers
  details.department_id = Number(details.department_id)
  details.salary = Number(details.salary)

  // standardize date string
  details.date_of_birth = getISODate(details.date_of_birth)

  // ensure department exists
  const [[data]] = await db.query<DbDepartment[]>(
    `SELECT * FROM departments WHERE id = ?`,
    [details.department_id]
  )
  if (!data) throw `Department ${details.department_id} does not exist.`
}
