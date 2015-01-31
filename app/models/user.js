// app/models/user.js
// load the things we need

TOKEN_PRICE=0.01;

var bcrypt   = require('bcrypt-nodejs');
var UserDB = new Map();

var BlockIo = require('block_io');
var version = 2; // API version
var block_io = new BlockIo('aaf6-156b-0bb8-bfb5', '2CD2632F', version);

function get_address (err, arg) {
    console.log('My address=');
    console.log(arg);
}
//

// define the schema for our user model
function User (email, address) {
}

// methods ======================
// generating a hash
//User.prototype.save = function(callback) {
User.save = function(email, callback) {
	console.log('==========User.save= '+email+'=================');
	block_io.get_new_address({'label': email}, callback);
};

User.findOne = function (email, callback) {
	console.log('=========User.findOne= '+email+'==================');
	callback(null, UserDB.get(email));
};

User.findById = function(id, callback) {
	console.log('findNyId =========User.findById== '+id+'===============');
	var e = UserDB.get(id) ;
	console.log('UserDB.get(id) = ' +e);
	callback(null, id+':'+e);
};

User.checkPayment = function(email, callback) {
	console.log('=========User.checkPassword= '+email+'==================');
	block_io.get_address_balance({'address': email}, callback); 
}

User.validPayment = function(arg) {
 	var balance = arg.data.available_balance;
	return (balance >= TOKEN_PRICE);
}

User.setAddress = function(email, arg) {
	//var i = Math.floor(Math.random()*5+1);
	//address=arg.data.addresses[i].address;
	address=arg.data.address;
	console.log('=========User.setAddress= '+email+'=>'+address+'==========');
	return UserDB.set(email, address);
}
User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};



//
// checking if password is valid
//User.validPassword = function(password) {
    //return bcrypt.compareSync(password, this.local.password);
//};

// create the model for users and expose it to our app
module.exports = User;
