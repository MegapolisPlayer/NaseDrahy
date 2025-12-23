# API documentation

## api/ endpoint
- `GET /api/` - Returns amount of days since last issue.
  - JSON input:
	```json
	{
	  "sitekey": "<api-key>"
	}
	```
  - JSON output:
	```json
	{
	  "success": true/false,
	  "days": <number_of_days>/-1
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
		"name": "<reason for event>,
		"description": "<short description>,
		"city": "<city name>",
	}
	```
  - JSON output:
	```json
	{
	  "success": true/false,
	  "uuid": "<uuid of event>/empty string"
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
	  "success": true/false
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
	  "success": true/false,
	  "days": <number_of_days>/-1
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
	  "success": true/false,
	  "event": EventType/{}
	}
	```
  - EventType structure:
	```json
	{
	  "uuid": "<uuid of event>",
	  "date": "<YYYY-MM-DD>",
	  "name": "<reason for event>",
	  "description": "<short description>",
	  "location": "<city/village name>"
	}
	```