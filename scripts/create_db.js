var pgtools = require('pgtools');

// This can also be a connection string
// (in which case the database part is ignored and replaced with postgres)

const config = {
	user: 'postgres', // local postgresql username
    password: '',  // local postgresql password, if any
	port: 5432, 
	host: 'localhost'
}

pgtools.createdb(config, 'oslashdb', function (err, res) {
	if (err) {
		console.error(`Error occured: ${err}`);
		process.exit(-1);
	}
	console.log(`DB created successfully : ${JSON.stringify(res)}`);
});
