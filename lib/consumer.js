/*
  This class is instantiated for each consumer instance. It contains utility
  functions for interrogating the health of the consumer instance.
*/

// Global variables
import axios from 'axios'

class Consumer {
  constructor (localConfig = {}) {
    this.consumerUrl = localConfig.consumerUrl
    if (!this.consumerUrl) {
      throw new Error('consumerUrl is required')
    }
  }

  async getTopEndpoints () {
    try {
      const response = await axios.get(`${this.consumerUrl}/usage/endpoints`)
      return response.data
    } catch (error) {
      console.error('Error in getTopEndpoints: ', error)
    }
  }
}

export default Consumer
