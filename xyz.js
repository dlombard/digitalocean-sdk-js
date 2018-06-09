const doclient = require('./index').init(process.env.DO_API_TOKEN)
getActions()

function getActions() {
  var cursor = doclient.sshKeys.get()

  return cursor.next()
    .then((x) => {
      console.log(JSON.stringify(x, null, 4))
      //console.log(cursor.hasPrev())
      if (cursor.hasNext()) {
        getActions()
      }
    })
    .catch((e) => {
      console.log(e)
    })
}