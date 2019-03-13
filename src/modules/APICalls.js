class APICalls {


  get(url) {
    let authKey = localStorage.getItem('token')
    return fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      }
    }).then(data => data.json())

  }

  getOne(url, id) {
    let authKey = localStorage.getItem('token')
    return fetch(`${url}${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      }
    }).then(data => data.json())
  }

  getOneWithUrl(url) {
    let authKey = localStorage.getItem('token')
    return fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      }
    }).then(data => data.json())
  }

  getWithQuery(url, query, param) {
    let authKey = localStorage.getItem('token')
    return fetch(`${url}?${query}=${param}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      }
    }).then(data => data.json())

  }

  post(url, data) {
    let authKey = localStorage.getItem('token')
    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      },
      body: JSON.stringify(data)

    }).then(data => data.json())
  }

  update(url, id, data) {
    let authKey = localStorage.getItem('token')
    return fetch(`${url}${id}/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      },
      body: JSON.stringify(data)

    }).then(data => data.json())
  }
  updateExactUrl(url, data) {
    let authKey = localStorage.getItem('token')
    return fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      },
      body: JSON.stringify(data)

    }).then(data => data.json())
  }

  delete(url, id) {
    let authKey = localStorage.getItem('token')
    return fetch(`${url}${id}/`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      },

    })
  }
  deleteExactUrl(url) {
    let authKey = localStorage.getItem('token')
    return fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authKey}`
      },

    })
  }

}

export default new APICalls()