
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

}

export default new APICalls()