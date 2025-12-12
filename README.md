# Future Continuous Tense Test System

A comprehensive online test system for assessing knowledge of Future Continuous tense with anti-cheat protection and Telegram reporting.

## Features

- **Login System**: Student name and group selection
- **Timer**: 15-minute countdown with warnings
- **Anti-Cheat**: Page change detection (auto-submit after 3 changes)
- **Progress Saving**: Auto-saves progress in browser
- **Telegram Reporting**: Sends detailed results to teacher's Telegram
- **Responsive Design**: Works on all devices

## Setup Instructions

### 1. Create Telegram Bot
1. Message @BotFather on Telegram
2. Create new bot with `/newbot`
3. Save the bot token (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Start a chat with your bot
5. Get your Chat ID by messaging @userinfobot

### 2. Deploy to Vercel

**Option A: Using GitHub (Recommended)**
1. Fork/Create a new GitHub repository
2. Upload all files
3. Go to [vercel.com](https://vercel.com)
4. Import your repository
5. Configure environment variables:
   - `TELEGRAM_BOT_TOKEN`: Your bot token
   - `TELEGRAM_CHAT_ID`: Your chat ID
6. Deploy

**Option B: Using Vercel CLI**
```bash
npm install -g vercel
vercel
