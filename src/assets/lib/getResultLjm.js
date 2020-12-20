import axios from "axios";

export function disciplineList() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/discipline", {})
      .then((res => {
        // console.log("res",res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function majorList() {
  return new Promise((resolve, reject) => {
    axios.get("/api/meta/major", {})
      .then((res => {
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function schoolList() {
  return new Promise((resolve, reject) => {
    axios.get(`/api/meta/college`, {})
      .then((res => {
        //           console.log("res",res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function getEvaluationList(sround) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/evaluation?round=${sround}`, {})
      .then((res => {
//             console.log("evaluation",res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function schoolDetail(cid) {
  return new Promise((resolve, reject) => {
    axios.get("/api/base/college", {
      params: {
        cidList: cid.join(",")
      }
    })
      .then((res => {
        console.log("res", res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function setFavouriteMajor(favorlist) {
  console.log("favor" + favorlist)
  return new Promise((resolve, reject) => {
    axios.post("/api/favor/p/major", favorlist)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
        console.log("获取失败！")
      })
  })
}

export function setFavouriteTutor(favorlist) {
  return new Promise((resolve, reject) => {
    axios.post("/api/favor/p/tutor", favorlist)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
        console.log("获取失败！")
      })
  })
}

export function rankList(scid) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/latest-college-rank?cid=${scid}`, {})
      .then((res => {
        // console.log("res",res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function rateList(scid) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/acceptance-rate?cid=${scid}`, {})
      .then((res => {
         console.log("录取率", res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}

export function tutorList(scid) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/base/tutor?cid=${scid}`, {})
      .then((res => {
        // console.log("res",res.data)
        console.log("导师信息", res.data)
        resolve(res.data.data);
      }))
      .catch((error) => {
        reject(error);
      })
  })
}


//某一轮评估结果
export function getSomeResult() {
  return new Promise((resolve, reject) => {
    axios.get('/api/base/evaluation', {})
      .then((res) => {
        console.log(resolve);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err)
      })
  })
}

//最近新闻
export function getLatestNews() {
  return new Promise((resolve, reject) => {
    axios.get('/api/base/latest-news', {})
      .then((res) => {
        console.log(resolve);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
        console.log(err)
      })
  })
}
