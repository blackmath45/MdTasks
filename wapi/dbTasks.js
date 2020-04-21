const db = require('./db.js');
//const Promise = require('bluebird')

//https://blog.risingstack.com/mastering-async-await-in-nodejs/

module.exports =
{
  find: function ()
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Query DB failed');
      }, 500);

      var currentTime = new Date().getTime();

/*
      while (currentTime + 1000 >= new Date().getTime()) {
      }
*/
    var sql = "select * from user"
    var params = []

    db.all(sql, params,  (err, rows) => {
        if (err)
        {
          //throw new Error('Ran out of coffee')
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        }
        else
        {
            resolve(rows)
        }
      })
    });
  },

  findOne: function () {
    // whatever
  }
};
