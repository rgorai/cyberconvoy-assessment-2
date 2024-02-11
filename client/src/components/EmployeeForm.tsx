import { FormEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import {
  areValidDates,
  areValidNumbers,
  areValidStrings,
} from '../utils/errorChecks'
import { getFormUtils } from '../utils/forms'
import { submitNewEmployeeData } from '../services/apiService'
import FormInput from './FormInput'
import Loading from './Loading'

// if details are supplied, the form will behave to edit
// otherwise, it will be used to create
type Props = {
  employeeDetails?: Employee
}

const EmployeeForm = ({ employeeDetails }: Props) => {
  const FORM_SPECS: FormSpecs<ApiEmployeeCreationDetails> = {
    first_name: {
      label: 'First Name',
      defaultValue: employeeDetails?.firstName ?? '',
      type: 'text',
      placeholder: 'John',
      validation: (firstName) => areValidStrings({ firstName }),
      invalidValueMessage: 'Please enter a valid first name.',
      required: true,
    },
    last_name: {
      label: 'Last Name',
      defaultValue: employeeDetails?.lastName ?? '',
      type: 'text',
      placeholder: 'Doe',
      validation: (lastName) => areValidStrings({ lastName }),
      invalidValueMessage: 'Please enter a valid last name.',
      required: true,
    },
    date_of_birth: {
      label: 'Date of Birth',
      defaultValue: employeeDetails?.dateOfBirth.toISOString() ?? '',
      type: 'date',
      validation: (dob) => areValidDates({ dob }, { pastDatesOnly: true }),
      invalidValueMessage: 'Please select a date from the past.',
      required: true,
    },
    department_id: {
      label: 'Department',
      defaultValue: String(employeeDetails?.department.id) ?? '',
      type: 'select',
      options: [
        { label: 'Select a department', value: -1 },
        { label: 'test1', value: 0 },
        { label: 'test2', value: 1 },
      ],
      validation: (departmentId) =>
        areValidNumbers({ departmentId }, { min: 0 }),
      invalidValueMessage: 'Please select a deparment.',
      required: true,
    },
    title: {
      label: 'Job Title',
      defaultValue: employeeDetails?.title ?? '',
      type: 'text',
      placeholder: 'Software Engineer',
      validation: (title) => areValidStrings({ title }),
      invalidValueMessage: 'Please enter a valid job title.',
      required: true,
    },
    salary: {
      label: 'Salary',
      defaultValue: String(employeeDetails?.salary) ?? '',
      type: 'number',
      placeholder: '100000',
      validation: (salary) => areValidNumbers({ salary }, { min: 0 }),
      invalidValueMessage: 'Please enter a salary greater than 0.',
      required: true,
    },
  }
  const { defaultFormState, defaultFormErrorState } = getFormUtils(FORM_SPECS)
  const [formState, setFormState] = useState(defaultFormState)
  const [formErrorState, setFormErrorState] = useState(defaultFormErrorState)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onInputChange = (key: keyof ApiEmployeeCreationDetails, value: any) =>
    setFormState((prev) => ({ ...prev, [key]: value }))

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault()

    // error check
    setFormErrorState(defaultFormErrorState)
    let formHasErrors = false
    for (const key of Object.keys(
      FORM_SPECS
    ) as (keyof ApiEmployeeCreationDetails)[])
      try {
        FORM_SPECS[key].validation?.(formState[key])
      } catch (err) {
        setFormErrorState((prev) => ({
          ...prev,
          [key]: FORM_SPECS[key].invalidValueMessage ?? err,
        }))
        formHasErrors = true
      }

    // submit data if no errors present
    if (!formHasErrors) {
      setSubmitLoading(true)
      submitNewEmployeeData({
        ...formState,
        department_id: Number(formState.department_id),
        salary: Number(formState.salary),
      })
        .then(({ data }) => {
          console.log('submit successful', data)
          navigate('/employees')
        })
        .catch((err) => {
          console.error('submit error', err?.response?.data ?? err)
          setSubmitError(err?.response?.data ?? 'See console')
        })
        .then(() => setSubmitLoading(false))
    }
  }

  const personalKeys: (keyof ApiEmployeeCreationDetails)[] = [
    'first_name',
    'last_name',
    'date_of_birth',
  ]

  const jobKeys: (keyof ApiEmployeeCreationDetails)[] = [
    'department_id',
    'title',
    'salary',
  ]

  const getFormSection = (
    label: string,
    keys: (keyof ApiEmployeeCreationDetails)[]
  ) => (
    <div className="bg-gray-800 rounded-lg p-8 pt-6">
      <h2 className="text-xl font-bold mb-7">{label}</h2>

      <div className="flex flex-row gap-10">
        {keys.map((key) => (
          <FormInput
            specKey={key}
            inputSpec={FORM_SPECS[key]}
            inputError={formErrorState[key]}
            currVal={formState[key]}
            onChange={(ev) => onInputChange(key, ev.target.value)}
            key={key}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-16">
      {!employeeDetails && (
        <h1 className="text-3xl">Enter New Employee Details</h1>
      )}

      <form className="mt-12" onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-10">
          {getFormSection('Personal', personalKeys)}
          {getFormSection('Employment', jobKeys)}
        </div>

        <div className="relative mt-10">
          {submitError && (
            <div className="absolute left-0 rounded-md bg-red-200 text-red-800 px-3 py-2">
              {`Submission Error: ${submitError}`}
            </div>
          )}

          <div className="absolute right-0 flex flex-row gap-6 items-center">
            <button
              className={cx('btn btn-tertiary box-border w-28', {
                disabled: submitLoading,
              })}
              disabled={submitLoading}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              className={cx(
                'items-center btn btn-primary w-28 flex flex-row justify-center gap-2',
                { disabled: submitLoading }
              )}
              disabled={submitLoading}
              type="submit"
            >
              {submitLoading && <Loading className="border-white" size={2} />}
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm
