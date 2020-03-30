const app = require('./config/server');
const socket = require('./config/socket');
require('dotenv').config({ path: '/var/env/.envreporting' })

require('./app/routes/users')(app);
require('./app/routes/status')(app);
require('./app/routes/conditions')(app);
require('./app/routes/symptoms')(app);
require('./app/routes/report')(app);

// starting the server
const server = socket.connect(app)
server.listen(app.get('port'));

// app.listen(app.get('port'), () => {
//   console.log('server on port', app.get('port'));
// });
