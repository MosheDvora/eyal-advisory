# Content Management System (CMS) Setup Guide

## Overview
Your website now includes a powerful Content Management System powered by Decap CMS (formerly Netlify CMS). This allows you to edit all website content through a user-friendly interface without touching any code.

## Accessing the CMS

### Step 1: Enable Netlify Identity
1. Go to your Netlify dashboard
2. Select your site
3. Navigate to **Settings** > **Identity**
4. Click **Enable Identity**

### Step 2: Enable Git Gateway
1. In the same Identity settings
2. Scroll to **Services** > **Git Gateway**
3. Click **Enable Git Gateway**

### Step 3: Invite Users
1. Still in Identity settings
2. Click **Invite users**
3. Enter the email address of who should manage content
4. They'll receive an invitation email

### Step 4: Access the Admin Panel
Once set up, access your CMS at:
```
https://yourdomain.com/admin
```

## How to Edit Content

### Login
1. Visit `https://yourdomain.com/admin`
2. Click "Login with Netlify Identity"
3. Enter your credentials

### Edit Content
1. After logging in, you'll see "Site Settings"
2. Click on **Site Content**
3. You'll see all editable sections:

#### Sections Available for Editing:

**Company Information**
- Company Name
- Tagline

**Hero Section**
- Main title (Line 1 and Line 2)
- Description
- Button texts
- Background image

**Statistics**
- Years of experience
- Number of clients
- Transactions completed
- Client satisfaction percentage

**About Section**
- Subtitle and title
- Two description paragraphs
- About image
- Feature highlights (2 items)

**Services**
- Section title and subtitle
- 4 service cards (title + description each)

**Approach Section**
- Section title and subtitle
- 4 process steps (title + description each)

**Call to Action**
- CTA title
- Description
- Button text

**Contact Information**
- Contact title and description
- Office address (2 lines)
- Phone number
- Email address
- Business hours

### Save Changes
1. After editing, click **Save** in the top right
2. Click **Publish** to make changes live
3. Changes will be pushed to GitHub
4. Netlify will automatically rebuild your site (takes 1-2 minutes)

## Important Notes

### Publishing Workflow
- **Save**: Saves your changes as a draft
- **Publish**: Makes your changes live on the website
- Changes go through Git (version controlled)
- You can always revert to previous versions

### Images
- To upload images, use the image field's "Choose an image" button
- Supported formats: JPG, PNG, GIF, SVG
- Images are stored in the `/images` folder
- Recommended image sizes:
  - Hero background: 1920x1080px
  - About image: 800x600px

### Content Guidelines
- **Titles**: Keep concise (3-8 words)
- **Descriptions**: Be clear and professional
- **Services**: Highlight benefits, not just features
- **Contact Info**: Double-check accuracy

## Troubleshooting

### Can't Login?
- Make sure you've been invited via Netlify Identity
- Check your spam folder for the invitation email
- Try resetting your password in Netlify

### Changes Not Showing?
- Wait 2-3 minutes for Netlify to rebuild
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check Netlify deploy log for errors

### Lost Changes?
- All changes are version controlled in Git
- Contact your developer to restore previous versions
- Always save drafts before closing the CMS

## Best Practices

1. **Preview Before Publishing**: Save as draft and review on the live site
2. **One Editor at a Time**: Avoid multiple people editing simultaneously
3. **Backup Important Changes**: Take screenshots before major edits
4. **Test Links**: Ensure all email/phone links work correctly
5. **Consistent Tone**: Maintain professional, consistent messaging

## Need Help?

For technical issues or questions:
- Contact your web developer
- Visit Decap CMS documentation: https://decapcms.org/docs
- Check Netlify support: https://answers.netlify.com/

---

**Your content is automatically saved to Git, providing full version history and backup.**
