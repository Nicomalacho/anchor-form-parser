const request = require('request-promise');
const buildUrl = require('build-url');
const INFO_PATH = '/info';
const DEPOSIT_PATH = '/deposit';
const WITHDRAW_PATH ='/withdraw';
const FEE_PATH ='/fee';

class Anchor {
  constructor(asset, issuer, transferServer){    
    this.code = asset,
    this.issuer = issuer,
    this.transferServer = transferServer
  }

  async getInfo(){
    const formData = await requestFormData(this.transferServer, INFO_PATH, 'GET');
    return JSON.parse(formData)
  }

  async getDepositFormData(params){
    return await requestFormData(this.transferServer, DEPOSIT_PATH, 'GET', params);
  }

  // async getWithdrawFormData(){

  // }

  // async getFeeInfo(){
    
  // }

}


async function requestFormData(uri, path, method, params){
  const url = buildUrl(uri, {
    path: `${path}`,
    queryParams: params ? params : null
  });
  const options = {
    uri: url,
    method: method
  }

  return await request(options);
}


module.exports = Anchor;