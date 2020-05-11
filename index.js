require("dotenv").config();
const { transactionHandler } = require("./src/transactionHandler");
const EventSource = require("eventsource");
const btoa = require("btoa");
const tokenId = process.env.TOKENID;


// //Query example
// {
//   "v": 3,
//   "q": {
//     "find": {
//       "slp.detail.tokenIdHex":
//         "7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"
//     }
//   },
//   "r": {
//     "f":
//       "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]"
//   }
// };

const query = {
  "v": 3,
  "q": {
    "find": {
      "slp.detail.tokenIdHex": "7de8cfc88977b1ff75a8c65bedc5a1d8e483108fa933455e193feed434fb9492"
    }
  },
  "r": {
    "f":
      "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]"
  }
};

// https://slpstream.fountainhead.cash/s/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjogewogICAgICAic2xwLmRldGFpbC50b2tlbklkSGV4IjogIjI5ZDM1M2EzZDE5Y2RkNzMyNGYxYzE0YjNmZTI4OTI5Mzk3Njg0Mjg2OWZlZDFiZWEzZjk1MTA1NThmNmYwMDYiCiAgICB9CiAgfSwKICAiciI6IHsKICAgICJmIjoKICAgICAgIlsgLltdIHwgeyB2YWxpZDogLnNscC52YWxpZCwgdG9rZW46IC5zbHAuZGV0YWlsLCBpbnB1dDogLmluWzBdLmUuYSwgYmxvY2t0aW1lOiAuYmxrLnQsIHR4aWQ6IC50eC5oIH1dIgogIH0KfQ==

let url = "https://slpsocket.fountainhead.cash/s/ewoidiIgOiAzLAoicSIgOiB7CiAgImZpbmQiOiB7CiAgICAic2xwLmRldGFpbC50b2tlbklkSGV4IjogIjdkZThjZmM4ODk3N2IxZmY3NWE4YzY1YmVkYzVhMWQ4ZTQ4MzEwOGZhOTMzNDU1ZTE5M2ZlZWQ0MzRmYjk0OTIiCiAgfQp9LAoiciI6IHsKICAiZiI6CiAgIlsuW10gfCB7dmFsaWQ6IC5zbHAudmFsaWQsIHRva2VuOiAuc2xwLmRldGFpbCxpbnB1dDogLmluWzBdLmUuYSwgYmxvY2t0aW1lOiAuYmxrLnQsIHR4aWQ6IC50eC5ofV0iCiAgIH0gCn0KCgo=" + btoa(JSON.stringify(query));

const bitsocket = new EventSource(url);

bitsocket.onmessage = function(event) {
  console.log("Socket connected.");
  data = JSON.parse(event.data);
  console.log(data);
  transactionHandler(data);
};