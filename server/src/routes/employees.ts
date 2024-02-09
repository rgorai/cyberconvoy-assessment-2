import { Router } from 'express'
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  insertEmployee,
  updateEmployeeDetails,
} from '../db/employees'
import { areValidNumbers, areValidEmployeeDetails } from '../utils/errorChecks'
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
  .post(ensureAuthenticated, async (req, res) => {
    const employeeDetails: EmployeeCreationDetails = req.body

    // error check
    try {
      await areValidEmployeeDetails(employeeDetails)
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
      areValidNumbers({ employeeId })
    } catch (err) {
      return res.status(400).send(String(err))
    }

    // retrieve specific employee
    try {
      const employee = await getEmployeeById(Number(employeeId))
      return employee ? res.status(200).json(employee) : res.sendStatus(404)
    } catch (err) {
      return res.status(500).send(String(err))
    }
  })
  .put(ensureAuthenticated, async (req, res) => {
    const { employeeId } = req.params
    const employeeDetails: EmployeeCreationDetails = req.body

    // error check
    try {
      areValidNumbers({ employeeId })
      await areValidEmployeeDetails(employeeDetails)
    } catch (err) {
      return res.status(400).send(String(err))
    }

    // update employee details in db
    try {
      const employee = await updateEmployeeDetails({
        ...employeeDetails,
        id: Number(employeeId),
      })
      return employee ? res.status(200).json(employee) : res.sendStatus(404)
    } catch (err) {
      return res.status(500).send(String(err))
    }
  })
  .delete(ensureAuthenticated, async (req, res) => {
    const { employeeId } = req.params

    // error check
    try {
      areValidNumbers({ employeeId })
    } catch (err) {
      return res.status(400).send(String(err))
    }

    // delete employee row
    try {
      const result = await deleteEmployee(Number(employeeId))
      return result ? res.status(200).json(result) : res.sendStatus(404)
    } catch (err) {
      return res.status(500).send(String(err))
    }
  })

export default employeesRouter
