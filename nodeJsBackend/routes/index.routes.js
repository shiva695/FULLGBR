// Routes Import
const adminRoute = require('./admin.routes')
const userRoute = require('./users.routes')

module.exports = async (app) => {
  app.use('/admin', adminRoute)
  app.use('/user', userRoute)
}
