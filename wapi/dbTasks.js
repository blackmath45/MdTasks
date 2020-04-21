const db = require('./db.js');

module.exports =
{
  find: function ()
  {
    var sql = "select * from user"
    var params = []
    db.all(sql, params,  (err, rows) => {
        if (err)
        {
          throw new Error('Ran out of coffee')
        }
        console.log(rows);
        return rows
        })
  },

  findOne: function () {
    // whatever
  }
};
