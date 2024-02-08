import { Router } from 'express'
import {
  getAllEmployees,
  getEmployeeById,
  insertEmployee,
} from '../db/employees'
import { areValidStrings, isValidEmployee } from '../utils/errorChecks'
import { ensureAuthenticated } from '../middleware/oAuth'

const employeesRouter = Router()

employeesRouter
  .route('/')
  .get(ensureAuthenticated, async (_, res) => {
    // query all employees
    try {
      return res.status(200).json(await getAllEmployees())
    } catch (err) {
      return res.status(500).send(String(err))
    }
  })
  .post(async (req, res) => {
    const {
      first_name,
      last_name,
      date_of_birth,
      department_id,
      title,
      salary,
    } = req.body
    const employeeDetails = {
      first_name,
      last_name,
      date_of_birth,
      department_id,
      title,
      salary,
    }

    // error check
    try {
      await isValidEmployee(employeeDetails)
    } catch (err) {
      return res.status(400).send(String(err))
    }

    // insert new employee into db
    try {
      return res.status(200).json(await insertEmployee(employeeDetails))
    } catch (err) {
      return res.status(500).send(String(err))
    }
  })

employeesRouter
  .route('/:employeeId')
  .get(ensureAuthenticated, async (req, res) => {
    const { employeeId } = req.params

    // error check
    try {
      areValidStrings({ employeeId })
    } catch (err) {
      return res.status(400).send(String(err))
    }

    // retrieve specific employee
    try {
      const employee = await getEmployeeById(Number(employeeId))

      if (!employee) return res.sendStatus(404)
      return res.status(200).json()
    } catch (err) {
      return res.status(500).send(String(err))
    }
  })
  .put(async (req, res) => {
    const { employeeId } = req.params
    const {
      first_name,
      last_name,
      date_of_birth,
      department_id,
      title,
      salary,
    } = req.body

    // error check
    try {
      areValidStrings({ employeeId })
      await isValidEmployee({
        first_name,
        last_name,
        date_of_birth,
        department_id,
        title,
        salary,
      })
    } catch (err) {
      return res.status(400).send(String(err))
    }

    // update employee details in db
    try {
      return res.status(200).json()
    } catch (err) {
      return res.status(500).send(String(err))
    }
  })
  .delete(async (req, res) => {
    const { employeeId } = req.params

    // error check
    try {
      areValidStrings({ employeeId })
    } catch (err) {
      return res.status(400).send(String(err))
    }

    // delete employee row
  })

export default employeesRouter
