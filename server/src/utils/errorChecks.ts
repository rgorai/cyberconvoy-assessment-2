// PRIMITIVES //

/**
 * @author rgorai
 * @description test multiple values at a time for string validity
 * @param strings object of values to test. Usage: { val1, val2, ... }
 * @return throws if string is invalid
 */
export const areValidStrings = <T extends Record<string, any>>(
  strings: T,
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

export const areValidNumbers = <T extends Record<string, number>>(
  data: T,
  options?: {
    min?: number
    max?: number
  }
): Record<string, number> => {
  const ret: Record<keyof T, number> = {} as any
  for (const k in data) {
    const currVal = data[k]

    if (isNaN(currVal))
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
    else ret[k] = Number(currVal)
  }
  return ret
}

// OTHER //

export const isValidEmail = (email: any) => {
  if (
    typeof email !== 'string' ||
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  )
    throw `Invalid email. Received: ${email}`
}

export const isValidDate = (date: any, pastDatesOnly?: boolean) => {
  const dateVal = Date.parse(date)
  if (isNaN(dateVal) || (pastDatesOnly && Date.now() < dateVal))
    throw `Invalid date. Received: ${date}`
}
