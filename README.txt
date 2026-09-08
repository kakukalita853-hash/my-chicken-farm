MY CHICKEN FARM V6 - INSTALLABLE OFFLINE PWA

IMPORTANT: This version is a proper PWA app shell. It can be installed and opened without internet after the first online installation.

FILES
- index.html       PWA frontend
- sw.js            Offline cache / service worker
- manifest.json    Install metadata
- icon files       App icons
- Code.gs          Updated Google Apps Script backend API

STEP 1
Replace your Apps Script Code.gs with this V6 Code.gs and deploy a new version.

STEP 2
Copy the /exec deployment URL.

STEP 3
Open index.html and replace:
PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE
with your actual /exec URL.

STEP 4
Upload these static files (index.html, sw.js, manifest.json, icons) to a free HTTPS static host such as GitHub Pages or Cloudflare Pages.

STEP 5
Open the hosted app once with internet. Login successfully with PIN 0060.

STEP 6
Install it:
- Android Chrome: menu -> Install app / Add to Home screen
- Laptop Chrome/Edge: install icon in address bar

After installation, the app shell opens offline even after browser restart.
Offline entries remain queued and sync when internet returns.

Existing Google Sheet data is preserved.
