const AnchorParser = require('./lib/anchor-form-parser');

testParser = async () => {
  try {
    const anchorParser = await AnchorParser('EURT', 'GAP5LETOV6YIE62YAM56STDANPRDO7ZFDBGSNHJQIYGGKSMOZAHOOS2S', 'withdraw');
    // const anchorParser = await AnchorParser('BTC', 'GAP5LETOV6YIE62YAM56STDANPRDO7ZFDBGSNHJQIYGGKSMOZAHOOS2S', 'deposit');    
    console.log(anchorParser.cash);
    console.log(anchorParser.cash.schema.properties);
    console.log(anchorParser.cash.options.fields);
  } catch (e) {
    console.log(e);
  }

};

testParser();