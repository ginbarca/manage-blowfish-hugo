# Firebase Views and Likes

- Source: https://blowfish.page/docs/firebase-views/
- Checked: 2026-07-24
- Read when: enabling or diagnosing dynamic view and like counts.

## Architecture

Blowfish uses a Firebase web application, Cloud Firestore, and anonymous
authentication to add dynamic counters to an otherwise static Hugo site.

Configure the documented public Firebase web identifiers under the `firebase`
section of `params.*`, including the API key, auth domain, project ID, storage
bucket, sender ID, app ID, and optional measurement ID.

These browser-visible values identify the application; they are not the security
boundary. Firestore rules and enabled authentication methods protect data.

## Setup

1. Create a Firebase project and web application.
2. Copy the web-app identifiers into Blowfish configuration.
3. Create a Firestore database in production mode.
4. Publish restrictive rules for only the `views` and `likes` collections.
5. Enable anonymous authentication.
6. Enable `showViews` and/or `showLikes` globally or on selected page families and
   articles.

## Required Rule Behavior

The checked official example:

- requires an authenticated request, normally the anonymous user;
- permits view documents to be created at `1`;
- permits an existing view count to increase by exactly `1`;
- permits like documents to be created at `1`;
- permits likes to change only by `+1` or `-1`;
- prevents likes from becoming negative;
- denies all other documents and operations.

Retrieve the current full rules from the official page instead of reconstructing
them from this summary. Test them in the Firebase rules simulator before
production.

## Security and Operations

- Never embed Firebase Admin credentials, service-account keys, or private server
  secrets in Hugo config.
- Assume motivated users can automate anonymous requests; the basic counter is not
  a fraud-proof analytics system.
- Apply Firebase quotas, monitoring, and billing alerts appropriate to the site.
- Review privacy/consent implications before enabling Firebase Analytics.
- Test counter failures and blocked third-party requests so articles remain usable
  when Firebase is unavailable.
