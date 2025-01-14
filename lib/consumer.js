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

    // Bind 'this' object to the class methods.
    this.getSummary = this.getSummary.bind(this)
    this.getTopEndpoints = this.getTopEndpoints.bind(this)
    this.getTopIpAddrs = this.getTopIpAddrs.bind(this)
    this.getFileService = this.getFileService.bind(this)
  }

  async getSummary () {
    try {
      const response = await axios.get(`${this.consumerUrl}/usage/`)
      return response.data
    } catch (error) {
      console.error('Error in getSummary: ', error)
    }
  }

  async getTopEndpoints () {
    try {
      const response = await axios.get(`${this.consumerUrl}/usage/endpoints`)
      const data = response.data

      let str = ''

      for (let i = 0; i < data.endpoints.length; i++) {
        const thisEndpoint = data.endpoints[i]

        str += `${thisEndpoint.cnt}: ${thisEndpoint.endpoint}\n`
      }

      return str
    } catch (error) {
      console.error('Error in getTopEndpoints: ', error)
    }
  }

  async getTopIpAddrs () {
    try {
      const response = await axios.get(`${this.consumerUrl}/usage/ips`)
      const ipfsData = response.data

      let str = ''

      for (let i = 0; i < ipfsData.ips.length; i++) {
        const thisIp = ipfsData.ips[i]
        str += `${thisIp.cnt}: ${thisIp.ip}\n`
      }

      return str
    } catch (error) {
      console.error('Error in getTopIpAddrs: ', error)
    }
  }

  // Get the PSF FPP file pinning service this consumer is connected to.
  async getFileService () {
    try {
      const response = await axios.get(`${this.consumerUrl}/ipfs/service`)
      return response.data
    } catch (error) {
      console.error('Error in getFileService: ', error)
    }
  }
}

export default Consumer
