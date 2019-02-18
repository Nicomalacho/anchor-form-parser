const StellarSdk = require('stellar-sdk');
const Anchor = require('./resources/anchor');
const SchemeBuilder = require('./resources/schemaBuilder');
const HOME_DOMAIN = 'home_domain';
const TRANSFER_SERVER = 'TRANSFER_SERVER';

AnchorFormParser.USE_TESTNET = process.env.USE_TESTNET || false;
AnchorFormParser.PUBLIC_NET = process.env.PUBLIC_NET || 'https://horizon.stellar.org';
AnchorFormParser.TEST_NET = process.env.TEST_NET || 'https://horizon-testnet.stellar.org';

function configServer(useTestnet) {
  let uri = AnchorFormParser.TEST_NET;
  if (useTestnet) {
    StellarSdk.Network.useTestNetwork();
  } else {
    uri = AnchorFormParser.PUBLIC_NET;
    StellarSdk.Network.usePublicNetwork();
  }

  return new StellarSdk.Server(uri);
}


async function AnchorFormParser(asset, issuer, method) {
  const useTestnet = AnchorFormParser.USE_TESTNET || false;
  const server = configServer(useTestnet);

  try {
    const homeDomain = await loadAccountData(server, issuer, HOME_DOMAIN);
    const transferServer = await resolveTomlData(homeDomain, TRANSFER_SERVER);
    const anchor = new Anchor(asset, issuer, transferServer);
    const schemaBuilder = new SchemeBuilder(anchor);

    switch (method) {
      case 'deposit':
        return schemaBuilder.generateDepositScheme();
      case 'withdraw':
        return schemaBuilder.generateWithdrawSchemes();
    }
  } catch (e) {
    return e;
  }
}


async function resolveTomlData(domain, key) {
  try {
    const toml = await StellarSdk.StellarTomlResolver.resolve(domain)
    return toml[key]
  } catch (e) {
    throw e;
  }
}

async function loadAccountData(server, account, key) {
  try {
    const data = await server.loadAccount(account);
    return data[key]
  } catch (e) {
    throw e;
  }
}

module.exports = AnchorFormParser;