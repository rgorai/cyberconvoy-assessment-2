import { Express, Router } from 'express'
import employeesRouter from './employees'
import departmentsRouter from './departments'

const routers: {
  route: string
  router: Router
}[] = [
  { route: 'employees', router: employeesRouter },
  { route: 'departments', router: departmentsRouter },
]

const configRoutes = (app: Express) => {
  for (const e of routers) app.use(`/api/${e.route}`, e.router)
}

export default configRoutes
