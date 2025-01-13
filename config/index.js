/*
  Configuration settings
*/

const config = {

  // Nostr config
  dmTarget: 'npub188msq9d8tkdnakhlg9j0sn4602773et7ue95u5xeuszf082wx79qq4vz6a',
  relay: 'wss://nostr-relay.psfoundation.info',

  // Nostr keys for this app
  nostrPrivKey: '6c97a368ef3d3aca31fbdecb15b890559cba112efffc93bbc6e60ed5aa848075',
  nostrPubKey: '6ba7d5584114b32b97b5e6710076cc6f3d441598366da11d802ea56cf62776a0',
  // npub1dwna2kzpzjejh9a4uecsqakvdu75g9vcxek6z8vq96jkea38w6sqvusvpu

  // Targets for AVAX-Stablecoin pair
  avaxHighTarget: 40.64,
  avaxLowTarget: 30.24,

  // Targets for AVAX-ETH pair
  ethHighTarget: 104.16,
  ethLowTarget: 69.44,

  // Targets for AVAX-BTC pair
  btcHighTarget: 3000,
  btcLowTarget: 2000
}

// module.exports = config
export default config
