define({ "api": [
  {
    "type": "delete",
    "url": "/api/invasions",
    "title": "Delete an invasion",
    "version": "0.1.0",
    "name": "DeleteInvasion",
    "group": "DeleteInvasion",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>Json body to be sent.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Delete-Example:",
          "content": "{\n    \"id\": \"59e2361517109c3cba2febe6\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     Success\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/apiController.js",
    "groupTitle": "DeleteInvasion"
  },
  {
    "type": "get",
    "url": "/api/invasions/:year/:month/:day",
    "title": "Request Invasions happening in a day",
    "version": "0.1.0",
    "name": "GetInvasionByDay",
    "group": "GetInvasions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>Year of the invasion.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the invader.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "invasion",
            "description": "<p>Name of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "when",
            "description": "<p>Date of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "confirmed",
            "description": "<p>Whether the invasion is confirmed or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"_id\": \"59e41272e6ab8b208636a64f\",\n     \"email\": \"new.employee@company.com\",\n     \"invasion\": \"New employee introduction workshop\",\n     \"location\": \"Lounge\",\n     \"when\": \"2017-11-18T09:00:00.000Z\",\n     \"confirmed\": false,\n     \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvasionNotFound",
            "description": "<p>The id of the Invasion was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  'Invasion Not found'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/apiController.js",
    "groupTitle": "GetInvasions"
  },
  {
    "type": "get",
    "url": "/api/invasions/id/:id",
    "title": "Request Invasion information by ID",
    "version": "0.1.0",
    "name": "GetInvasionById",
    "group": "GetInvasions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Invasion unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the invader.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "invasion",
            "description": "<p>Name of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "when",
            "description": "<p>Date of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "confirmed",
            "description": "<p>Whether the invasion is confirmed or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"_id\": \"59e41272e6ab8b208636a64f\",\n     \"email\": \"new.employee@company.com\",\n     \"invasion\": \"New employee introduction workshop\",\n     \"location\": \"Lounge\",\n     \"when\": \"2017-11-18T09:00:00.000Z\",\n     \"confirmed\": false,\n     \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvasionNotFound",
            "description": "<p>The id of the Invasion was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  'Invasion Not found'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/apiController.js",
    "groupTitle": "GetInvasions"
  },
  {
    "type": "get",
    "url": "/api/invasions/q?email=&invasion=&location=&when=&confirmed",
    "title": "Request Invasions via query",
    "version": "0.1.0",
    "name": "GetInvasionByQuery",
    "group": "GetInvasions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the invader. (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "invasion",
            "description": "<p>Name of the invasion. (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the invasion. (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "when",
            "description": "<p>Date of the invasion. (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmed",
            "description": "<p>Whether the invasion is confirmed or not. (optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/api/invasions/q?email=new.employee@company.com&invasion=&location=Lounge&when=&confirmed",
          "type": "url"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the invader.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "invasion",
            "description": "<p>Name of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "when",
            "description": "<p>Date of the invasion.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "confirmed",
            "description": "<p>Whether the invasion is confirmed or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n      {\n           \"_id\": \"59e41163e6ab8b208636a641\",\n           \"email\": \"new.employee@company.com\",\n          \"invasion\": \"Company website meeting\",\n          \"location\": \"Conference room\",\n          \"when\": \"2017-11-15T09:00:00.000Z\",\n          \"confirmed\": true,\n           \"__v\": 0\n      },\n      {\n          \"_id\": \"59e41163e6ab8b208636a642\",\n          \"email\": \"new.employee@company.com\",\n          \"invasion\": \"Company website meeting\",\n          \"location\": \"Conference room\",\n          \"when\": \"2017-11-15T09:30:00.000Z\",\n          \"confirmed\": true,\n          \"__v\": 0\n      }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvasionNotFound",
            "description": "<p>The id of the Invasion was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  'Invasion Not found'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/apiController.js",
    "groupTitle": "GetInvasions"
  },
  {
    "type": "post",
    "url": "/api/invasions",
    "title": "Create or update an invasion",
    "version": "0.1.0",
    "name": "CreateOrUpdateInvasion",
    "group": "PostInvasion",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>Json body to be sent.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Create-Example:",
          "content": "{\n    \"email\": \"new.employee@company.com\",\n    \"invasion\": \"New employee introduction workshop\",\n    \"location\": \"Lounge\",\n    \"when\": \"2017-11-18T09:00:00.000Z\"\n}",
          "type": "json"
        },
        {
          "title": "Update-Example:",
          "content": "{\n    \"id\": \"59e2361517109c3cba2febe6\",\n    \"email\": \"someone.else@company.com\",\n    \"invasion\": \"I need no introductions\",\n    \"location\": \"Go karts\",\n    \"when\": \"2017-11-18T09:30:00.000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     Success\n}",
          "type": "json"
        }
      ]
    },
    "filename": "controllers/apiController.js",
    "groupTitle": "PostInvasion"
  }
] });
