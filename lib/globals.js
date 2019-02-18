const DEFAULT_DEPOSIT = {
  properties: {
    account: {
      type: "string",
      title: "Account",
      optional: false
    },
    asset_code: {
      type: "string",
      title: "Asset code",
      optional: false
    },
    memo: {
      type: "string",
      title: "Memo",
      optional: true
    },
    memo_type: {
      type: "string",
      title: "Memo type",
      choices: ["text", "id", "hash"],
      optional: true
    }
  },
  options: {
    fields: {
      asset_code: {
        size: 10,
        title: "Asset code",
        optional: false
      },
      memo_type: {
        type: "select",        
        choices: ["text", "id", "hash"],        
      }
    }
  }

}

module.exports = {
  DEFAULT_DEPOSIT
}