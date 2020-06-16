import { api } from '../../env.json'

const Api = resource => {
  // ...

  return {
    /**
     * Fetch a listing of the resource.
     *
     * @param {String} page
     */
    index: page => {
      return fetch(page ?? api[resource])
    },

    /**
     * Store a new resource.
     *
     * @param {Object} data
     */
    store: data => {
      return fetch(api[resource], {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    },

    /**
     * Fetch the specified resource.
     *
     * @param {Number} id
     */
    show: id => {
      return fetch(`${api[resource]}${id}`)
    }
  }
}

export default Api
