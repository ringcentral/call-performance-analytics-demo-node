let assert = require('assert');
const RC_SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();

RINGCENTRAL_CLIENTID = process.env.RC_CLIENT_ID;
RINGCENTRAL_CLIENTSECRET = process.env.RC_CLIENT_SECRET;
RINGCENTRAL_SERVER = RC_SDK.server.sandbox;
RINGCENTRAL_USERNAME = process.env.RC_USERNAME;
RINGCENTRAL_PASSWORD = process.env.RC_PASSWORD;
RINGCENTRAL_EXTENSION = process.env.RC_EXTENSION;

let rcsdk = new RC_SDK({
    server: RINGCENTRAL_SERVER,
    clientId: RINGCENTRAL_CLIENTID,
    clientSecret: RINGCENTRAL_CLIENTSECRET
});

let platform = rcsdk.platform();

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
    "timeFrom": "2021-07-18T05:53:49.150Z",
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

describe('testAuthentication', function() {
  it("test login", async function() {
    let login = await platform.login({
      username: RINGCENTRAL_USERNAME,
      password: RINGCENTRAL_PASSWORD,
      extension: RINGCENTRAL_EXTENSION
    });
      assert.equal(login.status, 200, "Authentication API Status Code should be 200");
  });
});

describe('testAggreateAPI', function() {
  it("should be able to make Aggregate API call successfully", async function() {
    platform.login({
      username: RINGCENTRAL_USERNAME,
      password: RINGCENTRAL_PASSWORD,
      extension: RINGCENTRAL_EXTENSION
    }).then(async function() {
      console.log("-----AGGREGATE API TEST------");
      let aggregateResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/aggregate", aggregateJSON);
      let actualResponseCode = await aggregateResult.status;
      assert.equal(actualResponseCode, 200, "Status code should be 200");
    })
  })
});

describe('testTimelineAPI', function() {
    it("should be able to make Timeline API call successfully", async function() {
      platform.login({
        username: RINGCENTRAL_USERNAME,
        password: RINGCENTRAL_PASSWORD,
        extension: RINGCENTRAL_EXTENSION
      }).then(async function() {
        console.log("-----TIMELINE API TEST------");
        let timelineResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/timeline?interval=Week", timelineJSON);
        let actualResponseCode = await timelineResult.status;
        assert.equal(actualResponseCode, 200, "Status code should be 200");
      })
    })
  });
