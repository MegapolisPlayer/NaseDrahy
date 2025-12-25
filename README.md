# NaseDrahy
__(Czech for "Our Railways")__

A simple web application that tracks all extraordinary events, issues and (sometimes idiotic) accidents of the Czech Railways (České dráhy, ČD) and the railway administration (Správa železnic, SŽ).

In collaboration with [@kukuricapolna](https://github.com/kukuricapolna).

# Running locally
```
	npm install
	npm run db:start
	npm run db:push
	npm run dev	
```
During local development a `/admin` page is accessible for experimentation with the API.

# Deployment
The application is build to be deployed using Cloudflare Workers. Hyperdrive is used for DB access (PostgreSQL as the DB itself).

# API
API use stored in the settings table. Please contact the administrator for an API key to the live program. Documentation is available at `/src/routes/api/` directory.

# Contributing
Feel free to open issues or pull requests.