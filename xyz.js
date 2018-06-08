const doclient = require('./index').init(process.env.DO_API_TOKEN)

doclient.account.get().then((account) => console.log(account)).catch((error) => {
  //console.error(error)
})