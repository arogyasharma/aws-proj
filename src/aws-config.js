// AWS Cognito Configuration
// Replace these values with your actual Cognito User Pool details

export const cognitoConfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'ap-south-1', // Change to your preferred region
    
    // REQUIRED - Amazon Cognito User Pool ID
    userPoolId: 'ap-south-1_Q8EEkGazB', // Replace with your User Pool ID
    
    // REQUIRED - Amazon Cognito Web Client ID (26-char alphanumeric string)  
    userPoolClientId: '6as23k6edrt9e5b4rk38qheb5m', // Replace with your Client ID
  }
};

// Instructions for setup:
// 1. Go to AWS Cognito Console
// 2. Create a new User Pool
// 3. Configure sign-in options (email, phone, username)
// 4. Set password policy
// 5. Enable MFA if needed
// 6. Create the User Pool
// 7. Create an App Client
// 8. Replace the values above with your actual User Pool ID and Client ID