import { Router } from 'express'
import { getAllDepartments } from '../db/departments'
import { ensureAuthenticated } from '../middleware/oAuth'

const departmentsRouter = Router()

departmentsRouter.get('/', ensureAuthenticated, async (_, res) => {
  // query all departments
  try {
    return res.status(200).json(await getAllDepartments())
  } catch (err) {
    return res.status(500).send(String(err))
  }
})

export default departmentsRouter
