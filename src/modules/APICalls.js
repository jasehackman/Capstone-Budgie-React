


class APICalls {


  get(url){
    let authKey = localStorage.getItem('token')
    return fetch(url,{
      method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${authKey}`
        }
    }).then(data => data.json())

  }

  getOne(url,id){
    let authKey = localStorage.getItem('token')
    return fetch(`${url}${id}`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      }
    }).then(data => data.json())
  }

  getWithQuery(url,query,param){
    let authKey = localStorage.getItem('token')
    return fetch(`${url}?${query}=${param}`,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      }
    }).then(data => data.json())

  }



}

export default new APICalls()