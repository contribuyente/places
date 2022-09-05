import express from 'express'
import { databaseInitializer } from 'decentraland-gatsby/dist/entities/Database/utils'
// import manager from 'decentraland-gatsby/dist/entities/Job/index'
// import { jobInitializer } from 'decentraland-gatsby/dist/entities/Job/utils'
import { default as tasksManager, taskInitializer } from 'decentraland-gatsby/dist/entities/Task'
import {
  status,
  filesystem,
} from 'decentraland-gatsby/dist/entities/Route/routes'
import {
  withDDosProtection,
  withLogs,
  withCors,
  withBody,
} from 'decentraland-gatsby/dist/entities/Route/middleware'
import metrics from 'decentraland-gatsby/dist/entities/Prometheus/routes'
import handle from 'decentraland-gatsby/dist/entities/Route/handle'
import RequestError from 'decentraland-gatsby/dist/entities/Route/error'
import { serverInitializer } from 'decentraland-gatsby/dist/entities/Server/utils'
import { initializeServices } from 'decentraland-gatsby/dist/entities/Server/handler'
import { checkDeployments } from './entities/DeploymentTrack/task/chekDeployments'
import { checkActivity } from './entities/PlaceActivity/task/checkActivity'
import { summaryActivity } from './entities/PlaceActivityDaily/task/summaryActivity'

// const jobs = manager()
// jobs.cron('@eachMinute', () => console.log('Runnign Job...'))

const tasks = tasksManager()
tasks.use(checkDeployments)
tasks.use(checkActivity)
tasks.use(summaryActivity)

const app = express()
app.set('x-powered-by', false)
app.use(withLogs())
app.use('/api', [
  status(),
  withDDosProtection(),
  withCors(),
  withBody(),
  handle(async () => {
    throw new RequestError('NotFound', RequestError.NotFound)
  }),
])

app.use(metrics)
app.use(filesystem('public', '404.html'))

initializeServices([
  databaseInitializer(),
  taskInitializer(tasks),
  serverInitializer(app, process.env.PORT, process.env.HOST),
])
