const RC_SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();

RINGCENTRAL_CLIENTID = process.env.RC_CLIENT_ID;
RINGCENTRAL_CLIENTSECRET = process.env.RC_CLIENT_SECRET;
RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com"; // Currently set for Sandbox, change to Production if needed
RINGCENTRAL_USERNAME = process.env.RC_USERNAME;
RINGCENTRAL_PASSWORD = process.env.RC_PASSWORD;
RINGCENTRAL_EXTENSION = process.env.RC_EXTENSION

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
    "timeSettings": {
      "timeRange": {
        "timeFrom": "2021-10-25T05:52:17.745Z",
        "timeTo": "2022-03-10T05:52:17.745Z"
      },
      "advancedTimeSettings": {
        "timeZone": "Europe/Moscow",
        "includeDays": [
          "Sunday"
        ],
        "includeHours": [
          {
            "from": "00:00",
            "to": "23:59"
          }
        ]
      }
    },
    "additionalFilters": {
      "callSegment": "Setup",
      "direction": "Inbound",
      "origin": "Internal",
      "callResponse": "Answered",
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
        },
        "callsByType": {
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
        "callsSegmentsDuration": {
          "aggregationType": "Sum"
        },
        "callsDurationByResult": {
          "aggregationType": "Sum"
        },
        "callsDurationByCompanyHours": {
          "aggregationType": "Sum"
        },
        "callsDurationByType": {
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
    "timeSettings": {
      "timeRange": {
        "timeFrom": "2021-12-02T00:00:00.877Z",
        "timeTo": "2022-01-02T04:01:33.877Z"
      },
      "advancedTimeSettings": {
        "timeZone": "Europe/Moscow",
        "includeDays": [
          "Sunday"
        ],
        "includeHours": [
          {
            "from": "00:00",
            "to": "23:59"
          }
        ]
      }
    },
    "additionalFilters": {
      "direction": "Inbound",
      "origin": "Internal",
      "callResponse": "Answered",
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
      "calledNumbers": [],
      "callType": [
        "Direct"
      ]
    },
    "responseOptions": {
      "counters": {
        "allCalls": true,
        "callsByDirection": true,
        "callsByOrigin": true,
        "callsByResponse": true,
        "callsSegments": true,
        "callsByResult": true,
        "callsByCompanyHours": true,
        "callsByActions": true,
        "callsByType": true
      },
      "timers": {
        "allCallsDuration": true,
        "callsDurationByDirection": true,
        "callsDurationByOrigin": true,
        "callsDurationByResponse": true,
        "callsSegmentsDuration": true,
        "callsDurationByResult": true,
        "callsDurationByCompanyHours": true,
        "callsDurationByType": true
      }
    }
};

platform.login({
  username: RINGCENTRAL_USERNAME,
  password: RINGCENTRAL_PASSWORD,
  extension: RINGCENTRAL_EXTENSION
  }).then(async function(){
      try {
        let aggregateResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/aggregate", aggregateJSON);
        console.log("-----AGGREGATE DATA------");
        console.log(await aggregateResult.json());
      }
      catch (e) {
        console.log(e.message);
      }
  }).then(async function(){
      try {
        let timelineResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/timeline?interval=Week", timelineJSON);
        console.log("-----TIMELINE DATA------");
        console.log(await timelineResult.json());
      }
      catch (e) {
        console.log(e.message);
      }
  });

  