import { Express, Router } from 'express'
import employeesRouter from './employees'
import departmentsRouter from './departments'
import oAuthRouter from './oAuth'

const routers: {
  route: string
  router: Router
}[] = [
  { route: 'employees', router: employeesRouter },
  { route: 'departments', router: departmentsRouter },
  { route: 'oauth', router: oAuthRouter },
]

const configRoutes = (app: Express) => {
  for (const e of routers) app.use(`/api/${e.route}`, e.router)
}

export default configRoutes
