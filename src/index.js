const app = require('./config/server');
require('dotenv').config({ path: '/var/env/.envreporting' })

require('./app/routes/users')(app);
require('./app/routes/status')(app);
require('./app/routes/symptoms')(app);
require('./app/routes/report')(app);

// starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
