const db = require('./db.js');
//const Promise = require('bluebird')

//https://blog.risingstack.com/mastering-async-await-in-nodejs/

module.exports =
{
  find: function ()
  {
    return new Promise((resolve, reject) =>
    {
      setTimeout(() => {
        reject('Query DB failed');
      }, 500);

/*
      var currentTime = new Date().getTime();
      while (currentTime + 5000 >= new Date().getTime())
      {
      }
*/

    var sql = `SELECT ID, ID_Project, Nom, ID_Compartiment, Progression, Priorite,
                DateDebut, DateEcheance, Notes FROM tasks`;

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

//CREATE TABLE `tasks` ( `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `ID_Project` INTEGER, `Nom` TEXT, `Compartiment` INTEGER, `Progression` INTEGER, `Priorite` INTEGER, `DateDebut` INTEGER, `DateEcheance` INTEGER, `Notes` TEXT )
//CREATE TABLE `comments` ( `ID` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `ID_Task` INTEGER NOT NULL, `Date` INTEGER, `Ordre` INTEGER, `Commentaire` TEXT )
