const apiURL = "http://127.0.0.1:8000/api/v1/"

class APICalls {

  getAll() {
    return fetch(apiURL)
      .then(data => data.json())
  }

  getAllFromCategory(category) {
    return fetch(`${apiURL}${category}/`)
      .then(data => data.json())
  }

  getOneFromCategory(category, id) {
    return fetch(`${apiURL}${category}/${id}/`)
      .then(data => data.json())
  }

  getAllFromCategoryWithQuery(category, queryName, parameter) {
    return fetch(`${apiURL}${category}/?${queryName}=${parameter}/`)
      .then(data => data.json())

  }

  post(category, obj){
    return fetch(`${apiURL}${category}/`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(data => data.json())
  }

  update(category, obj, id){
    return fetch(`${apiURL}${category}/${id}/`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(data => data.json())
  }
}

export default new APICalls()