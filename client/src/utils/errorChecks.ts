type ErrorFunction<Options = any> = <T extends Record<string, any>>(
  vars: T,
  options?: Options
) => void

// PRIMITIVES //

/**
 * @author rgorai
 * @description test multiple values at a time for string validity
 * @param strings object of values to test. Usage: { val1, val2, ... }
 * @return throws if string is invalid
 */
export const areValidStrings: ErrorFunction<{
  allowEmpty?: boolean
  allowUndefined?: boolean
}> = (strings, options) => {
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

export const areValidNumbers: ErrorFunction<{
  min?: number
  max?: number
}> = (numbers, options) => {
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

export const areValidDates: ErrorFunction<{ pastDatesOnly?: boolean }> = (
  dates,
  options
) => {
  for (const k in dates) {
    const dateVal = Date.parse(dates[k])
    if (isNaN(dateVal) || (options?.pastDatesOnly && Date.now() < dateVal))
      throw `${k} must be a valid date${options?.pastDatesOnly ? ' from the past' : ''}. Received: ${dates[k]}`
  }
}
