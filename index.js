const RC_SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();

RINGCENTRAL_CLIENTID = process.env.RC_CLIENT_ID;
RINGCENTRAL_CLIENTSECRET = process.env.RC_CLIENT_SECRET;
RINGCENTRAL_SERVER = RC_SDK.server.production;

RINGCENTRAL_USERNAME = process.env.RC_USERNAME;
RINGCENTRAL_PASSWORD = process.env.RC_PASSWORD;
RINGCENTRAL_EXTENSION = process.env.RC_EXTENSION;

let rcsdk = new RC_SDK({
    server: RINGCENTRAL_SERVER,
    clientId: RINGCENTRAL_CLIENTID,
    clientSecret: RINGCENTRAL_CLIENTSECRET
});

let platform = rcsdk.platform();

// JSON Request Body is defined below, feel free to modify the same as per your needs. For more information refer to the API documentation.
let aggregateJSON = 
{
    "grouping": {
      "groupBy": "CompanyNumbers",
      "ids": []
    },
    "timeRange": {
      "timeFrom": "2021-10-25T05:52:17.745Z",
      "timeTo": "2021-10-27T05:52:17.745Z"
    },
    "additionalFilters": {
      "direction": "Inbound",
      "origin": "Internal",
      "callResponse": "Answered",
      "callResponseType": [
        "InboundDirect"
      ],
      "callResult": [
        "Completed"
      ],
      "callSegments": [
        {
          "callSegment": "Ringing",
          "callSegmentLength": {
            "minValueSeconds": 0,
            "maxValueSeconds": 200
          }
        }
      ],
      "callActions": [
        {
          "callAction": "HoldOff"
        }
      ],
      "companyHours": "BusinessHours",
      "callDuration": {
        "minValueSeconds": 0,
        "maxValueSeconds": 200
      },
      "timeSpent": {
        "minValueSeconds": 0,
        "maxValueSeconds": 200
      },
      "callerExtensionIds": [],
      "calledExtensionIds": [],
      "calledNumbers": []
    },
    "responseOptions": {
      "counters": {
        "allCalls": {
          "aggregationType": "Sum"
        },
        "callsByDirection": {
          "aggregationType": "Sum"
        },
        "callsByOrigin": {
          "aggregationType": "Sum"
        },
        "callsByResponse": {
          "aggregationType": "Sum"
        },
        "callsByResponseType": {
          "aggregationType": "Sum"
        },
        "callsSegments": {
          "aggregationType": "Sum"
        },
        "callsByResult": {
          "aggregationType": "Sum"
        },
        "callsByCompanyHours": {
          "aggregationType": "Sum"
        },
        "callsByActions": {
          "aggregationType": "Sum"
        }
      },
      "timers": {
        "allCallsDuration": {
          "aggregationType": "Sum"
        },
        "callsDurationByDirection": {
          "aggregationType": "Sum"
        },
        "callsDurationByOrigin": {
          "aggregationType": "Sum"
        },
        "callsDurationByResponse": {
          "aggregationType": "Sum"
        },
        "callsDurationByResponseType": {
          "aggregationType": "Sum"
        },
        "callsSegmentsDuration": {
          "aggregationType": "Sum"
        },
        "callsDurationByResult": {
          "aggregationType": "Sum"
        },
        "callsDurationByCompanyHours": {
          "aggregationType": "Sum"
        }
      }
    }
  };

let timelineJSON =
{
  "grouping": {
    "groupBy": "Users",
    "ids": []
  },
  "timeRange": {
    "timeFrom": "2021-05-18T05:53:49.150Z",
    "timeTo": "2021-10-27T05:53:49.150Z"
  },
  "additionalFilters": {
    "direction": "Inbound",
    "origin": "Internal",
    "callResponse": "Answered",
    "callResponseType": [
      "InboundDirect"
    ],
    "callResult": [
      "Completed"
    ],
    "callSegments": [
      {
        "callSegment": "Ringing",
        "callSegmentLength": {
          "minValueSeconds": 0,
          "maxValueSeconds": 200
        }
      }
    ],
    "callActions": [
      {
        "callAction": "HoldOff"
      }
    ],
    "companyHours": "BusinessHours",
    "callDuration": {
      "minValueSeconds": 0,
      "maxValueSeconds": 200
    },
    "timeSpent": {
      "minValueSeconds": 0,
      "maxValueSeconds": 200
    },
    "callerExtensionIds": [],
    "calledExtensionIds": [],
    "calledNumbers": []
  },
  "responseOptions": {
    "counters": {
      "allCalls": {
        "aggregationType": "Sum"
      },
      "callsByDirection": {
        "aggregationType": "Sum"
      },
      "callsByOrigin": {
        "aggregationType": "Sum"
      },
      "callsByResponse": {
        "aggregationType": "Sum"
      },
      "callsByResponseType": {
        "aggregationType": "Sum"
      },
      "callsSegments": {
        "aggregationType": "Sum"
      },
      "callsByResult": {
        "aggregationType": "Sum"
      },
      "callsByCompanyHours": {
        "aggregationType": "Sum"
      },
      "callsByActions": {
        "aggregationType": "Sum"
      }
    },
    "timers": {
      "allCallsDuration": {
        "aggregationType": "Sum"
      },
      "callsDurationByDirection": {
        "aggregationType": "Sum"
      },
      "callsDurationByOrigin": {
        "aggregationType": "Sum"
      },
      "callsDurationByResponse": {
        "aggregationType": "Sum"
      },
      "callsDurationByResponseType": {
        "aggregationType": "Sum"
      },
      "callsSegmentsDuration": {
        "aggregationType": "Sum"
      },
      "callsDurationByResult": {
        "aggregationType": "Sum"
      },
      "callsDurationByCompanyHours": {
        "aggregationType": "Sum"
      }
    }
  }
};

platform.login({
  username: RINGCENTRAL_USERNAME,
  password: RINGCENTRAL_PASSWORD,
  extension: RINGCENTRAL_EXTENSION
  })
  .then(async function() {
    let aggregateResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/aggregate", aggregateJSON);
    console.log("-----AGGREGATE DATA------")
    console.log(await aggregateResult.json())
  })
  .then(async function() {
    console.log("-----TIMELINE DATA------")
    let timelineResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/timeline?interval=Month", timelineJSON );
    console.log(await timelineResult.json())
  });