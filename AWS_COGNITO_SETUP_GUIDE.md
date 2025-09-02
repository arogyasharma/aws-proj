# AWS Cognito Setup Guide

This guide will walk you through setting up AWS Cognito for your React application.

## Prerequisites
- AWS Account
- Basic understanding of AWS services

## Step 1: Create a User Pool

1. **Go to AWS Cognito Console**
   - Navigate to https://console.aws.amazon.com/cognito/
   - Choose your preferred region (e.g., us-east-1)

2. **Create User Pool**
   - Click "Create user pool"
   - Choose "Sign-in options":
     - ✅ Email
     - ✅ Username (optional)
   - Click "Next"

3. **Configure Security Requirements**
   - **Password policy**: Choose "Cognito defaults" or customize
   - **Multi-factor authentication (MFA)**: Choose "No MFA" for development, "Optional" or "Required" for production
   - **User account recovery**: Choose "Enable self-service account recovery" - Recommended
   - Click "Next"

4. **Configure Sign-up Experience**
   - **Self-service sign-up**: ✅ Enable self-registration
   - **Required attributes**: Select attributes you want (Name, Email are common)
   - **Email verification**: ✅ Send email verification messages
   - Click "Next"

5. **Configure Message Delivery**
   - **Email provider**: Choose "Send email with Cognito" (default)
   - For production, consider "Send email with Amazon SES"
   - Click "Next"

6. **Integrate Your App**
   - **User pool name**: Enter a name (e.g., "sportech-users")
   - **App client name**: Enter a name (e.g., "sportech-web-client")
   - **Client secret**: Choose "Don't generate a client secret" (for web apps)
   - Click "Next"

7. **Review and Create**
   - Review all settings
   - Click "Create user pool"

## Step 2: Get Your Configuration Values

After creating the user pool, you'll need these values:

1. **User Pool ID**: Found on the "General settings" tab
   - Format: `us-east-1_XXXXXXXXX`

2. **App Client ID**: Found under "App integration" → "App clients and analytics"
   - Format: 26-character alphanumeric string

3. **Region**: The AWS region where you created the pool
   - Example: `us-east-1`

## Step 3: Update Your Configuration

1. Open `src/aws-config.js` in your project
2. Replace the placeholder values:

```javascript
export const cognitoConfig = {
  Auth: {
    region: 'us-east-1', // Your region
    userPoolId: 'us-east-1_XXXXXXXXX', // Your User Pool ID
    userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3', // Your Client ID
    mandatorySignIn: false,
    signUpVerificationMethod: 'code',
  }
};
```

## Step 4: Test Your Setup

1. Start your React application:
   ```bash
   npm start
   ```

2. Navigate to your application
3. Click "Sign Up" to test registration
4. Check your email for the verification code
5. Complete the signup process
6. Test login functionality

## Step 5: Production Considerations

### Security Best Practices
- Enable MFA for production
- Use strong password policies
- Set up proper CORS settings
- Use HTTPS in production

### Email Configuration
- For production, set up Amazon SES for email delivery
- Customize email templates
- Configure proper sender domains

### Monitoring
- Enable CloudWatch logs
- Set up CloudWatch alarms for failed logins
- Monitor user activity

## Troubleshooting

### Common Issues

1. **"User does not exist" error**
   - Check if the user pool ID is correct
   - Verify the region matches

2. **"Invalid client" error**
   - Verify the app client ID is correct
   - Make sure client secret is disabled for web apps

3. **Email not sending**
   - Check if email verification is enabled
   - Verify email settings in Cognito console
   - Check spam folder

4. **CORS errors**
   - Make sure your domain is added to allowed origins
   - Check if running on correct port (default: 3000)

### Environment Variables (Optional)

You can use environment variables for your configuration:

1. Create `.env` file in your project root:
```env
REACT_APP_COGNITO_REGION=us-east-1
REACT_APP_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID=your_client_id
```

2. Update `src/aws-config.js`:
```javascript
export const cognitoConfig = {
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: false,
    signUpVerificationMethod: 'code',
  }
};
```

## Support

If you need help:
1. Check AWS Cognito documentation
2. Review CloudWatch logs
3. Test with minimal configuration first
4. Verify all configuration values are correct

## Next Steps

Once authentication is working:
- Implement protected routes
- Add user profile management
- Set up user groups and roles
- Integrate with your backend API
- Add social login providers (Google, Facebook, etc.)