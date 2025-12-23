# API documentation

## api/ endpoint
- `GET /api/` - Returns all events
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
- `POST /api/` - Accepts JSON payload to create a new accident.
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
- `DELETE /api/` - Deletes some accident. (SZ sweeping stuff under the rug with this one)
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

## api/roudnice/ endpoint
- `GET /api/roudnice/` - Returns amount of days since last issue in Roudnice nad Labem.
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

## api/last/ endpoint
- `GET /api/last/` - Returns details of the last reported accident.
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