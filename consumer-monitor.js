/*
  Monitor known instances of ipfs-bch-wallet-consumer. Interrogate them, generate
  a report from the data, and publish the report to Nostr.
*/

// Global npm libraries
import RetryQueue from '@chris.troutner/retry-queue'

// Local libraries
import config from './config/index.js'
import Consumer from './lib/consumer.js'
import Nostr from './lib/nostr.js'

const consumerUrls = [
  // 'https://free-bch.fullstack.cash',
  'https://dev-consumer.psfoundation.info'
]

// Check on the consumer instances
setInterval(function () {
  start()
}, 60000 * 1) // 1 minute

async function start () {
  try {
    console.log('Starting consumer monitor')

    // Loop through each consumer.
    for (let i = 0; i < consumerUrls.length; i++) {
      // For each consumer URL, create an instance of the Consumer class.
      const consumerUrl = consumerUrls[i]
      const consumerCheck = new Consumer({ consumerUrl })

      let report = `Report for ${consumerUrl}\n\n`

      // Get the top endpoints
      const endpointData = await consumerCheck.getTopEndpoints()
      // console.log(`Endpoint data for ${consumerUrl}: `, endpointData)
      const endpointReport = `Endpoint Popularity: \n${JSON.stringify(endpointData, null, 2)}`
      report += endpointReport + '\n\n'

      // Get the top IP addresses

      // Get the connected service.

      // Get the connected file pinning service.

      // Post the report to Nostr.
      const nostr = new Nostr()
      const noteId = await nostr.postMsg({ msg: report })

      console.log(`Report posted to Nostr for ${consumerUrl}: https://astral.psfoundation.info/${noteId}`)
    }
  } catch (error) {
    console.error('Error in consumer-monitor.js: ', error)
  }
}
