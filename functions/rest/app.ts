import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Fail } from './type'
import type { AppEnv } from './middleware/auth'

import authRoutes from './routes/auth'
import uploadRoutes from './routes/upload'
import imageRoutes from './routes/images'
import folderRoutes from './routes/folders'
import shareRoutes from './routes/share'
import albumRoutes from './routes/album'
import adminRoutes from './routes/admin'
import settingsRoutes from './routes/settings'
import apiKeyRoutes from './routes/api-keys'
import { userMeHandler, userMeStatsHandler } from './routes/user'

const app = new Hono<AppEnv>().basePath('/rest')

app.use('*', cors())

app.get('/user/me', userMeHandler)
app.get('/user/me/stats', userMeStatsHandler)

app.route('/', authRoutes)
app.route('/', uploadRoutes)
app.route('/', folderRoutes)
app.route('/', shareRoutes)
app.route('/', albumRoutes)
app.route('/admin', adminRoutes)
app.route('/settings', settingsRoutes)
app.route('/', apiKeyRoutes)
app.route('/', imageRoutes)

app.onError((err, c) => {
    console.error(`${err}`)
    return c.json(Fail(err.message), 500)
})

app.notFound((c) => {
    return c.json(Fail('not found'), 404)
})

export default app
export { app }
export type { AppEnv as Bindings }