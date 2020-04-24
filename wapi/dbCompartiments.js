const db = require('./db.js');

module.exports =
{
  find: function ()
  {
    return new Promise((resolve, reject) =>
    {
      setTimeout(() => {
        reject('Query DB failed');
      }, 500);

    var sql = `SELECT ID, Ordre, Nom FROM compartiments ORDER BY Ordre`;

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
  }
};
