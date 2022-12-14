var pgtools = require('pgtools');

// This can also be a connection string
// (in which case the database part is ignored and replaced with postgres)

const config = {
	user: 'postgres', // local postgresql username
    password: '',  // local postgresql password, if any
	port: 5432, 
	host: 'localhost'
}

pgtools.dropdb(config, 'oslashdb', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
    console.log(res);
});
