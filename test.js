const AnchorParser = require('./lib/anchor-form-parser');

testParser = async () => {
  try {
    const anchorParser = await AnchorParser('EURT', 'GAP5LETOV6YIE62YAM56STDANPRDO7ZFDBGSNHJQIYGGKSMOZAHOOS2S', 'withdraw');
    // const anchorParser = await AnchorParser('BTC', 'GAUTUYY2THLF7SGITDFMXJVYH3LHDSMGEAKSBU267M2K7A3W543CKUEF', 'withdraw');    
    console.log(anchorParser);
    console.log(anchorParser.crypto.schema.properties);
    console.log(anchorParser.crypto.options.fields);
  } catch (e) {
    console.log(e);
  }

};

testParser();