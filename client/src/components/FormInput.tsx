type Props<T extends Record<any, any>> = {
  specKey: keyof T
  inputSpec: FormSpecs<T>[keyof T]
  inputError: string | null
  currVal: string
  onChange: (ev: { target: { value: string } }) => void
}

const FormInput = <T extends Record<any, any>>(props: Props<T>) => {
  const keyStr = String(props.specKey)

  const isSelectType = (
    x: FormSpecs<T>[keyof T]
  ): x is FormSpecs<T>[keyof T] & SelectType => x.type === 'select'

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm text-gray-400 w-fit" htmlFor={keyStr}>
        {props.inputSpec.label}
      </label>

      {isSelectType(props.inputSpec) ? (
        <select id={keyStr} onChange={props.onChange}>
          {props.inputSpec.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...props.inputSpec.props}
          id={keyStr}
          name={props.inputSpec.label}
          value={props.currVal}
          type={props.inputSpec.type}
          required={props.inputSpec.required}
          placeholder={props.inputSpec.placeholder}
          onChange={props.onChange}
        />
      )}

      {props.inputError && (
        <div className="text-xs mt-1 text-red-500">{props.inputError}</div>
      )}
    </div>
  )
}

export default FormInput
