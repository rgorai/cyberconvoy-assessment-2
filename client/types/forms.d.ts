/**
 * @author rgorai
 * @description specifications for an input option
 * @param label user-facing label for this field
 * @param value developer-friendly key name for this field
 */
type InputOption = {
  label: string
  value: string
}

/**
 * @author rgorai
 * @description specify additional params when form spec type is 'select'
 * @param type specify this is for the 'select' form spec type
 * @param options list of options to use for this select type input
 */
type SelectType = {
  type: 'select'
  options: InputOption[]
}

/**
 * @author rgorai
 * @description specifications for a form input field
 * @param T the type that these form specs are for
 * @param label user-facing label for this field
 * @param type HTML input type for this field, or custom in-app type
 * @param defaultValue the default form value for this field
 * @param placeholder optional placeholder for the input
 * @param validation the function to validate the data supplied for this field - will usually one of the error functions in the project utils, or can be a custom function, but should throw when invalid data is received
 * @param invalidValueMessage message to display to user if an invalid value is entered for this field
 * @param required whether or not this data field is required
 * @param props optional additional HTML input props for this field
 */
type FormSpecs<T extends Record<any, any>> = {
  [key in keyof T]: {
    label: string
    defaultValue: string
    placeholder?: string
    validation?: (val: string) => void
    invalidValueMessage?: string
    required?: true
    props?: any
  } & (
    | SelectType
    | {
        type: string
      }
  )
}
