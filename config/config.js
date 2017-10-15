var configValues = require('./config.json');

module.exports = {
    getDbConnectionString: function(){
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + configValues.dbinstance;
    }
}