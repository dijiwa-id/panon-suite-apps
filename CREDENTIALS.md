# Platform Credentials

This document contains the credentials used for the standard demonstration and testing of the platform.

## Demo System Administrator Account

To access the platform's full capabilities during the development and demonstration phases, use the following interactive demo credentials. These are securely validated in the `SignIn.tsx` page.

- **Email Address:** `admin@panonsuite.com`
- **Password:** `admin123`

*Note: For security reasons, you will be required to configure a new secure password upon your first login.*

### Notes on Local Authentication
- Authentication is currently handled locally in a fixed configuration inside `src/pages/SignIn.tsx`.
- Real authentication, token management, and session validation (e.g., via OAuth, JWT, or database-backed authentication) should be integrated prior to deploying into a real production environment. 
- In future phases, these credentials should be migrated to environment variables and handled server-side securely. 
