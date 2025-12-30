# API documentation

All API endpoints require a valid `sitekey` to be provided in the JSON payload. You can obtain an API key by contacting the site administrator.
You can test all API routes during development from the `/admin/` page. This page is only available in development mode. (env.DEV is true)

All requests are POST because I don't want to have GETs with JSON bodies.
(Excellent article here)[https://roy.gbiv.com/untangled/2009/it-is-okay-to-use-post]

- `POST /api/get/` - Returns all events
  - JSON input:

  ```json
  {
  	"sitekey": "<api-key>"
  }
  ```

  - JSON output:

  ```json
  {
    "success": true,
    "events": [EventType,...]
  }
  ```

- `POST /api/add/` - Accepts JSON payload to create a new accident.
  - JSON input:

  ```json
  {
    	"sitekey": "<api-key>",
  	"year": <year>,
  	"month": <month>,
  	"day": <day>,
  	"name": "<reason for event>",
  	"description": "<short description>",
  	"city": "<city name>",
  }
  ```

  - JSON output:

  ```json
  {
  	"success": true,
  	"uuid": "<uuid of event>"
  }
  ```

- `POST /api/delete/` - Deletes some accident. (SZ sweeping stuff under the rug with this one)
  - JSON input:

  ```json
  {
  	"sitekey": "<api-key>",
  	"uuid": "<uuid of event>"
  }
  ```

  - JSON output:

  ```json
  {
  	"success": true
  }
  ```

- `POST /api/roudnice/` - Returns amount of days since last issue in Roudnice nad Labem.
  - JSON input:

  ```json
  {
  	"sitekey": "<api-key>"
  }
  ```

  - JSON output:

  ```json
  {
    "success": true,
    "days": <number_of_days>
  }
  ```

- `POST /api/last/` - Returns details of the last reported accident.
  - JSON input:

  ```json
  {
  	"sitekey": "<api-key>"
  }
  ```

  - JSON output:

  ```json
  {
    "success": true,
    "event": EventType
  }
  ```

## EventType object

    ```json
    {
      "uuid": "<uuid of event>",
      "day": <day>,
      "month": <month>,
      "year": <year>,
      "name": "<reason for event>",
      "description": "<short description>",
      "location": "<city/village name>"
    }
    ```

## Response codes
- `204 No Content` - OK
- `400 Bad Request` - Missing or invalid parameters
- `401 Unauthorized` - Invalid sitekey
- `404 Not Found` - Event with given UUID not found or no events exist
- `418 I'm a teapot` - Date is in the future (Back to the future!) 
- `500 Internal Server Error` - Something went wrong on the server
- `503 Service Unavailable` - Database is down or something went wrong on the server