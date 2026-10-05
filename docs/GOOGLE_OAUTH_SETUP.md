# Google Developer Console & OAuth 2.0 Setup Guide

This guide walks you step-by-step through setting up your own personal or organizational Google Cloud credentials to authenticate and send emails with **Email Automator**.

---

## Architecture & Security Philosophy

Unlike legacy email utilities that ask for raw account passwords or generate persistent SMTP app passwords, **Email Automator** uses the official **Google OAuth 2.0 protocol**.

- **Narrow Permission Scope**: The app only requests `https://www.googleapis.com/auth/gmail.send`.
- **Zero Inbox Access**: The application cannot view received emails, read drafts, access contacts, or delete mail.
- **Direct Mail Pipeline**: Outgoing messages appear directly in your official Gmail/Google Workspace "Sent" folder, preserving sender reputation and deliverability.

```mermaid
flowchart LR
    User([Operator]) -->|1. Sign in| Client[Next.js App]
    Client -->|2. Redirect| GoogleAuth[Google OAuth 2.0]
    GoogleAuth -->|3. User Approves gmail.send| Consent[Consent Granted]
    Consent -->|4. Return Auth Code| NextAuth[/api/auth Callback]
    NextAuth -->|5. Exchange for Token| GoogleTokens[Google Token Endpoint]
    GoogleTokens -->|6. Encrypted Session| Client
```

---

## Step 1: Create a Google Cloud Project

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Log in with your standard Google Account or Google Workspace administrative account.
3. In the top navigation bar, click the **Project Dropdown** and select **New Project**.
4. Configure your project:
   - **Project Name**: `Email-Automator-Personal` (or your company name).
   - **Organization**: Leave as *No organization* (for personal accounts) or select your Workspace organization.
5. Click **Create** and wait a few seconds for project provisioning to complete.
6. Make sure your newly created project is selected in the top bar.

---

## Step 2: Enable the Gmail API

1. In the left-hand navigation menu, go to **APIs & Services** > **Library**.
2. In the search box, type `Gmail API` and press Enter.
3. Click on the **Gmail API** tile in the results.
4. Click the blue **Enable** button.

---

## Step 3: Configure the OAuth Consent Screen

Before creating client credentials, Google requires an OAuth consent screen configuration:

1. Navigate to **APIs & Services** > **OAuth consent screen**.
2. Select your **User Type**:
   - **External**: Choose this if you are using a standard personal `@gmail.com` account or want to allow any Google user.
   - **Internal**: Recommended if you are using Google Workspace and only want users inside your organization to access it.
3. Click **Create**.
4. Fill in the **App Information** fields:
   - **App name**: `Email Automator`
   - **User support email**: Select your own Gmail address.
   - **Developer contact email**: Enter your own email address.
   - Other fields (App logo, App domain) can be left blank.
5. Click **Save and Continue**.
6. On the **Scopes** page:
   - Click **Add or Remove Scopes**.
   - In the filter/search box, search for `gmail.send`.
   - Check the box for:
     - `.../auth/gmail.send` (*Send email on your behalf*)
     - `openid` (*Associate you with your personal info on Google*)
     - `.../auth/userinfo.email` (*See your primary Google Account email address*)
     - `.../auth/userinfo.profile` (*See your personal info, including personal info you've made public*)
   - Click **Update** and then **Save and Continue**.
7. On the **Test Users** page (*Crucial for personal accounts in Testing mode*):
   - Click **+ Add Users**.
   - Add your own Google email address (and any other teammates/accounts that will use this setup).
   - Click **Save and Continue**.
8. Review the summary and return to the dashboard.

---

## Step 4: Create OAuth 2.0 Web Application Credentials

1. Navigate to **APIs & Services** > **Credentials**.
2. Click **+ Create Credentials** at the top and select **OAuth client ID**.
3. Select **Application type**: **Web application**.
4. Set the **Name**: `Email Automator Web Client`.
5. Under **Authorized JavaScript origins**, click **+ Add URI**:
   - For local development: `http://localhost:3000`
   - For production deployment: `https://emailauto.syedmahi.me`
6. Under **Authorized redirect URIs**, click **+ Add URI**:
   - For local development: `http://localhost:3000/api/auth/callback/google`
   - For production deployment: `https://emailauto.syedmahi.me/api/auth/callback/google`
   > **Note**: The path `/api/auth/callback/google` is the exact callback route managed by NextAuth.
7. Click **Create**.
8. A modal dialog will appear displaying:
   - **Your Client ID** (e.g., `1234567890-abcdefg.apps.googleusercontent.com`)
   - **Your Client Secret** (e.g., `GOCSPX-xyz1234567890`)
9. Copy both values immediately.

---

## Step 5: Configure Local Environment Variables

1. In the root directory of the project, create or edit `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the Google credentials:
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret_here
   ```
3. Set your application URL:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Generate and set a random 32-character `NEXTAUTH_SECRET`:
   - **On Linux / macOS / Git Bash**:
     ```bash
     openssl rand -base64 32
     ```
   - **On Windows PowerShell**:
     ```powershell
     [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
     ```
   - Copy the output string and paste it into `.env.local`:
     ```env
     NEXTAUTH_SECRET=your_generated_random_secret
     ```

---

## Step 6: First Run & Verification Screen Walkthrough

1. Launch the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.
3. Click **Sign in with Google**.
4. Select the Google account you added as a test user in Step 3.
5. **Handling the "Google hasn't verified this app" warning**:
   - Because you created your own unverified personal developer project, Google will present an alert: *"Google hasn't verified this app"*.
   - This is expected standard behavior for self-hosted developer tools.
   - Click **Advanced** (bottom left).
   - Click **Go to Email Automator (unsafe)**.
   - Check the permission prompt granting permission to send email on your behalf.
   - Click **Continue**.
6. You will be redirected back into Email Automator, authenticated and ready to send.

---

## Sending Limits & Throttling Reference

Google enforces rolling 24-hour dispatch quotas on all accounts to preserve global email deliverability:

| Account Type | Daily Rolling Limit | Recommended Batch Size | Throttling Delay |
| :--- | :--- | :--- | :--- |
| **Personal Gmail (`@gmail.com`)** | **500 emails / 24 hrs** | Up to 450 per session | 2,000 ms built-in delay |
| **Google Workspace (Business / EDU)** | **2,000 emails / 24 hrs** | Up to 1,800 per session | 2,000 ms built-in delay |

> **Automated Protection**: Email Automator includes an automatic alert whenever your loaded dataset exceeds 500 recipients, along with a mandatory 2-second rate-limiting delay between outgoing API requests to comply with Google's burst quotas.

---

## Troubleshooting Common Errors

### `redirect_uri_mismatch` (Error 400)
- **Cause**: The redirect URI configured in Google Cloud Console does not match the exact URL NextAuth is requesting.
- **Fix**: Check `Authorized redirect URIs` in the Google Cloud Console. Ensure it is `http://localhost:3000/api/auth/callback/google` without trailing slashes. Note that `localhost` is case-sensitive and must match `http`, not `https`, during local testing.

### `Access blocked: App has not completed the Google verification process` / `Error 403: access_denied`
- **Cause**: Your OAuth consent screen is in "Testing" status, and the Google Account attempting to log in is not listed under "Test users".
- **Fix**: Go to **APIs & Services** > **OAuth consent screen** > **Test users**, click **+ Add Users**, and add the email address you are attempting to log in with.

### `Missing email details` or `Invalid credentials`
- **Cause**: Expired session token or missing environment variable.
- **Fix**: Sign out using the user button in the top right, clear cookies or restart the development server, and sign in again. Verify that `.env.local` contains no trailing spaces or misquoted strings.
