# Dispatcher

_Your Personalized News Companion — All the News, Weather, and COVID-19 Updates You Need in One Place_

> A Comprehensive, Real-Time News & Info Hub — Powered by Next.js, Mantine, Zustand, and More

## Overview

**Dispatcher** is a full-featured web application that delivers real-time updates on the latest news, weather conditions, and COVID-19 statistics. Built for users who want a one-stop solution to stay informed, Dispatcher provides a clean and interactive experience across devices.

It solves the problem of fragmented sources for vital information by aggregating trusted data feeds and presenting them in an intuitive UI.

## Why This Project?

In today's fast-paced world, users struggle to keep up with critical updates from multiple platforms:

- Most apps focus only on one type of content (news OR weather OR health).
- There’s a lack of centralized dashboards for personal awareness.
- Many platforms don’t prioritize real-time performance or customization.

**Dispatcher** was born out of the need to simplify how people consume information. Our philosophy is to unify essential updates (news, weather, health) in one accessible interface, powered by modern frontend tech for speed, accessibility, and ease of use.

## Features

- Real-Time Global News Aggregation
- Accurate and Timely Weather Forecasts
- COVID-19 Case Tracking (Global & Regional)
- Clean UI/UX using Mantine
- State Management with Zustand
- Data Fetching with React Query
- Built with TypeScript & Next.js

## Roadmap

- [x] Phase 1: MVP with News, Weather, and COVID Sections
- [ ] Phase 2: Add User Preferences and Saved Articles
- [ ] Phase 3: Mobile App Integration
- [ ] Phase 4: Push Notifications and Localization Support

## Tech Stack

**Frontend / Web:**

- Next.js
- React
- TypeScript
- Mantine
- Zustand
- React Query

**APIs & Services:**

- News API
- OpenWeatherMap
- COVID-19 API

## Getting Started

### Prerequisites

- Node.js & npm
- Git

### Installation

```bash
git clone https://github.com/yourusername/dispatcher.git
cd dispatcher
npm install
npm run dev
```

## Environment Variables

Create a `.env` file and configure the following:

```env
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_COVID_API_URL=https://...
```

## Usage

```bash
# Start the development server
npm run dev

# Run production build
npm run build && npm start
```

## Architecture

```plaintext
[Client (Next.js + React + Mantine)]
          ↓
[State Management (Zustand)]
          ↓
[Data Layer (React Query)]
          ↓
[APIs (News, Weather, COVID-19)]
```

## Deployment

- **Cloud:** Deployed on Vercel
- **APIs:** NewsAPI.org · OpenWeatherMap · COVID-19 API (Johns Hopkins CSSE, or equivalent)

## Contributing

We love contributions! To get started:

1. Fork this repo
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit your changes
4. Push: `git push origin feature/feature-name`
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

- Inspired by apps like Google News & Apple Weather
- Built by John Rommel Octaviano
- Powered by Next.js, Zustand, Mantine, and Open APIs
