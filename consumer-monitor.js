/*
  Monitor known instances of ipfs-bch-wallet-consumer. Interrogate them, generate
  a report from the data, and publish the report to Nostr.
*/

// Global npm libraries
// import RetryQueue from '@chris.troutner/retry-queue'

// Local libraries
// import config from './config/index.js'
import Consumer from './lib/consumer.js'
import Nostr from './lib/nostr.js'

const consumerUrls = [
  'https://free-bch.fullstack.cash',
  'https://dev-consumer.psfoundation.info',
  'https://cashstack.tokentiger.com'
]

// Check on the consumer instances
setInterval(function () {
  start()
}, 60000 * 1) // 1 hour

async function start () {
  try {
    console.log('Starting consumer monitor')

    // Loop through each consumer.
    for (let i = 0; i < consumerUrls.length; i++) {
      // For each consumer URL, create an instance of the Consumer class.
      const consumerUrl = consumerUrls[i]
      const consumerCheck = new Consumer({ consumerUrl })

      let report = `Report for ${consumerUrl}\n\n`

      // Get the summary
      const summaryData = await consumerCheck.getSummary()
      // console.log(`Summary data for ${consumerUrl}: `, summaryData)
      const summaryReport = `REST API calls in the last 24 hours: ${summaryData.status}`
      report += summaryReport + '\n\n'

      // Get the top endpoints
      const endpointSummary = await consumerCheck.getTopEndpoints()
      // console.log(`Endpoint data for ${consumerUrl}: `, endpointData)
      const endpointReport = `Endpoint Popularity: \n${endpointSummary}`
      report += endpointReport + '\n\n'

      // Get the top IP addresses
      const ipAddrSummary = await consumerCheck.getTopIpAddrs()
      // console.log(`IP address data for ${consumerUrl}: `, ipAddrData)
      const ipAddrReport = `IP Address Popularity: \n${ipAddrSummary}`
      report += ipAddrReport + '\n\n'

      // Get the connected service.

      // Get the connected file pinning service.
      const fileServiceData = await consumerCheck.getFileService()
      // console.log(`File service data for ${consumerUrl}: `, fileServiceData)
      const fileServiceReport = `File Service: ${fileServiceData.selectedIpfsFileProvider}`
      report += fileServiceReport + '\n\n'

      // Post the report to Nostr.
      const nostr = new Nostr()
      const noteId = await nostr.postMsg({ msg: report })

      console.log(`Report posted to Nostr for ${consumerUrl}: https://astral.psfoundation.info/${noteId}`)
    }
  } catch (error) {
    console.error('Error in consumer-monitor.js: ', error)
  }
}

const now = new Date()
console.log(`Consumer monitor started at ${now.toLocaleString()}.`)
