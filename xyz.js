const doclient = require('./index').init(process.env.DO_API_TOKEN)
getActions()

function getActions() {
  doclient.sshKeys.destroyByName("Settler.Cloud").then((x) => {
    console.log(x)
  }).catch(e => { console.error(e) })
  /*
  var cursor = doclient.droplets.get()

  return cursor.next()
    .then((droplets) => {
      droplets.forEach((droplet) => {
        if (droplet.name == 'etzouk') {
          console.log(droplet)
          doclient.droplets.delete(droplet.id)
        }
      })

      if (cursor.hasNext()) {
        getActions()
      }
    })
    .catch((e) => {
      console.log(e)
    })
    */
}