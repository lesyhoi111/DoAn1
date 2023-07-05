
const port = 5000
const admin = require("./config")
const express = require("express");
const cors = require("cors");
const THUCPHAM = require("./config");


const app = express();
app.use(cors());


app.get("/recommend", async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("THUCPHAM").get();
    const listContent = [];
    snapshot.docs.forEach((doc) => {
      listContent.push({ id: doc.id, content: doc.data().ten })
    });

    const snapshot2 = await admin.firestore().collection("KHACHHANG").doc(req.query.idUser).collection("GIOHANG").get();
    const listIdGH = [];
    snapshot2.docs.forEach((doc) => {
      listIdGH.push(doc.id)
      console.log(doc.id)
    });


    const ContentBasedRecommender = require('content-based-recommender')
    const recommender = new ContentBasedRecommender({
      minScore: 0.06,
      maxSimilarDocuments: 100
    });
    recommender.train(listContent);
    //get top 10 similar items to document 1000002
    var similarDocuments = [];
    listIdGH.forEach(id => {
      console.log(recommender.getSimilarDocuments(id, 0, 5))
      similarDocuments = [...similarDocuments, ...recommender.getSimilarDocuments(id, 0, 5)]
    })

    const uniqueIds = [];

    similarDocuments.forEach((obj) => {
      if (!uniqueIds.includes(obj.id)) {
        uniqueIds.push(obj.id);
      }
    });

    res.json(uniqueIds);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})