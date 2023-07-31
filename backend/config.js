const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://marketease-75e09-default-rtdb.asia-southeast1.firebasedatabase.app"
});
module.exports=admin