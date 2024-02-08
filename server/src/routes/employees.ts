import { Router } from 'express'
import { getAllEmployees, getEmployeeById } from '../db/employees'
import { areValidStrings } from '../utils/errorChecks'
import { ensureAuthenticated } from '../middleware/oAuth'

const employeesRouter = Router()

employeesRouter.get('/', ensureAuthenticated, async (_, res) => {
  // query all employees
  try {
    return res.status(200).json(await getAllEmployees())
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

employeesRouter.get('/:employeeId', ensureAuthenticated, async (req, res) => {
  const { employeeId } = req.params

  // error check
  try {
    areValidStrings({ employeeId })
  } catch (err) {
    return res.status(400).send(String(err))
  }

  // query specific employee
  try {
    return res.status(200).json(await getEmployeeById(employeeId))
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

export default employeesRouter
