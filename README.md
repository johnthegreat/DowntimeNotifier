## DowntimeNotifier

Periodically polls a website and sends a text message (using Twilio) if the website is down.

### Usage

1. Clone or download the repo.
2. Run `yarn` or `npm install`.
3. Copy `.env.example` to `.env`.
4. Update `.env` to include your Twilio credentials.
5. Update `app.js` to add a website you want checked. The file demonstrates example usage.
5. Run `node app.js`

### License

Copyright &copy; 2019-2020 John Nahlen

MIT License. See `LICENSE.txt`.
