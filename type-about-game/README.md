# TypeAbout - Word Association Typing Game

## 🎮 Game Overview

**TypeAbout** is an immersive word association typing game built for Reddit that challenges players to think quickly and creatively. Players are given a target word and must find all 5 related keywords within 20 seconds to advance to the next level. It's a fast-paced, educational game that tests vocabulary, quick thinking, and typing speed while providing a competitive social experience.

## 🎯 How to Play

### Game Flow
1. **Start Game**: Click "Start Game" on the landing page
2. **Preparation Phase**: See your target word and get ready to think
3. **Countdown**: "Ready, 3, 2, 1, GO!" sequence begins
4. **Active Gameplay**: 20-second timer starts - type related keywords
5. **Level Progression**: Find all 5 keywords to advance to the next level
6. **Game Over**: Time runs out or you complete all available levels

### Core Mechanics

#### 🎯 Target Words & Keywords
- **Target Word**: The main word you need to think about (e.g., "Cat", "Ocean", "Music")
- **Keywords**: Pre-defined related words you must find (e.g., for "Cat": feline, whiskers, meow, purr, pet)
- **5 Keywords Required**: You must find ALL 5 keywords to advance to the next level
- **No Repetition**: Each word is unique and won't be repeated for the same user

#### ⏱️ Timing System
- **20 Seconds Per Level**: Each level gives you exactly 20 seconds
- **Countdown Timer**: Visual circular timer shows remaining time
- **Game Over**: If time runs out before finding all 5 keywords, the game ends
- **Level Advancement**: Find all keywords to get a new target word and fresh 20 seconds

#### 🏆 Scoring & Progression
- **1 Point Per Keyword**: Each correct keyword earns 1 point
- **Score Accumulation**: Points carry over across all levels
- **Level Tracking**: Game tracks how many levels you completed
- **Final Score**: Total points and highest level reached are saved

### Game Rules

#### ✅ Valid Keywords
- Must be directly related to the target word
- At least 2 characters long
- Cannot be the target word itself
- No duplicate words allowed
- Case insensitive (typing "CAT" or "cat" both work)

#### ❌ Invalid Keywords
- Unrelated words to the target
- Words already used in the current game
- The target word itself
- Words shorter than 2 characters
- Nonsensical or random text

### Difficulty Levels

The game features three difficulty levels with carefully curated word sets:

#### 🟢 Easy Level
- **Target Words**: Cat, Dog, Tree, Sun, Water, Food, Car, Book, Music, Love
- **Keywords**: Simple, everyday associations
- **Example**: "Cat" → feline, whiskers, meow, purr, pet

#### 🟡 Medium Level  
- **Target Words**: Ocean, Technology, Adventure, History, Science, Art, Travel, Nature, Space, Dreams
- **Keywords**: More complex concepts and associations
- **Example**: "Ocean" → waves, blue, deep, fish, salt

#### 🔴 Hard Level
- **Target Words**: Quantum, Neuroscience, Metaphysics, Philosophy, Psychology, Economics, Architecture, Literature, Astronomy, Innovation
- **Keywords**: Advanced, abstract, and specialized terms
- **Example**: "Quantum" → particle, energy, physics, atom, wave

## 🚀 Key Features

### 🎮 Gameplay Features
- **Level Progression System**: Advance through levels by finding all keywords
- **Real-time Validation**: Instant feedback on typed words
- **Confetti Celebrations**: Visual rewards for correct keywords and level completion
- **Auto-clear Input**: Input field clears automatically after each word
- **Progress Tracking**: Visual progress bar showing keywords found vs. required

### 🏆 Competition & Social
- **Reddit Integration**: Uses your actual Reddit username on the leaderboard
- **Real-time Leaderboard**: Compete with other Reddit users worldwide
- **Score Rankings**: Rankings based on total score and highest level reached
- **Time-based Filtering**: View leaderboards by all time, today, week, or month
- **Personal Stats**: Track your own performance and word usage

### 🎨 User Experience
- **Viewport Optimized**: All screens fit perfectly within viewport - no scrolling needed
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Beautiful transitions and visual feedback
- **Intuitive Navigation**: Easy-to-use hamburger menu with all options
- **Accessibility**: Clear instructions and user-friendly interface

### 📊 Statistics & Tracking
- **Word Usage Stats**: Track which words you've used and how often
- **Game History**: View your previous games and performance
- **Daily Challenges**: Fresh target words that change daily
- **No Word Repetition**: System ensures you never see the same word twice

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with functional components and hooks
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS v3**: Modern, responsive styling framework
- **Vite**: Fast build tool and development server

### Backend & Services
- **Devvit Framework**: Reddit's platform for building immersive apps
- **Express.js**: Backend API for Reddit username integration
- **Local Storage**: Client-side data persistence for game state
- **Reddit API**: Integration with Reddit's user system

### Game Services
- **Keyword Database**: Curated database of 50+ target words with 5 keywords each
- **Word Tracker**: Prevents word repetition per user
- **Leaderboard Service**: Manages rankings and score persistence
- **Reddit User Service**: Handles Reddit username integration

## 🎯 Game Components

### Core Components
- **TypeAboutGame**: Main game orchestrator and state management
- **GameBoard**: Visual game display with timer, score, and progress
- **WordInput**: Text input with real-time validation
- **PreparationCountdown**: Combined preparation and countdown sequence
- **GameResults**: End-game results with statistics and actions
- **LeaderboardPage**: Full-page leaderboard with filtering options

### UI Components
- **Navigation**: Hamburger menu with game options
- **HowToPlay**: Comprehensive game instructions modal
- **Confetti**: Celebration animations for achievements
- **RoundTimer**: Visual circular countdown timer
- **WordStats**: Statistics tracking and display

## 🎮 Game States & Flow

### State Management
The game uses a centralized state system with the following phases:

1. **Waiting**: Landing page with daily challenge
2. **Preparation**: Shows target word and "Get ready to think..."
3. **Countdown**: "Ready, 3, 2, 1, GO!" sequence
4. **Playing**: Active gameplay with timer and input
5. **Finished**: Game results and leaderboard options

### Data Flow
```
User Input → Word Validation → Score Update → Level Check → 
Level Complete? → Next Level OR Game Over → Leaderboard Save
```

## 🏆 Scoring System

### Points Calculation
- **+1 Point**: For each correct keyword found
- **Score Persistence**: Points accumulate across all levels
- **Level Tracking**: Highest level reached is recorded
- **Final Score**: Total points + level reached = leaderboard ranking

### Leaderboard Rankings
- **Primary**: Total score (higher is better)
- **Tiebreaker**: Highest level reached
- **Timestamp**: When the game was played
- **Reddit Username**: Real Reddit usernames displayed

## 🎨 Visual Design

### Design Philosophy
- **Modern & Clean**: Gradient backgrounds with glassmorphism effects
- **Color Psychology**: Blue/purple gradients for focus, yellow for highlights
- **Typography**: Clear, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and celebratory effects
- **Responsive**: Adapts perfectly to all screen sizes

### Key Visual Elements
- **Circular Timer**: Visual countdown with progress indication
- **Word Bubbles**: Typed words displayed in attractive containers
- **Confetti Effects**: Celebration animations for achievements
- **Progress Bars**: Visual indication of keywords found vs. required
- **Modal Overlays**: Clean, accessible modal dialogs

## 🔧 Development Features

### Code Quality
- **TypeScript**: Full type safety and IntelliSense support
- **ESLint**: Code quality and consistency enforcement
- **Component Architecture**: Modular, reusable React components
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Performance**: Optimized rendering and state updates

### Testing & Quality Assurance
- **Linting**: Automated code quality checks
- **Type Checking**: Compile-time error prevention
- **Responsive Testing**: Cross-device compatibility
- **User Experience**: Intuitive navigation and feedback

## 🚀 Getting Started

### For Players
1. **Visit the Game**: Access through Reddit app or web interface
2. **Read Instructions**: Click "How to Play" for detailed guide
3. **Start Playing**: Click "Start Game" to begin your first challenge
4. **Compete**: Try to reach the highest level and score possible
5. **Check Leaderboard**: See how you rank against other players

### For Developers
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Game Strategy Tips

### For Better Performance
1. **Think Fast**: Don't overthink - go with your first associations
2. **Type Accurately**: Speed is important, but accuracy prevents wasted time
3. **Use Categories**: Think of characteristics, sounds, actions, and properties
4. **Stay Focused**: The 20-second timer creates urgency - stay concentrated
5. **Learn Patterns**: Notice common keyword types across different target words

### Keyword Types to Consider
- **Physical Characteristics**: Size, color, shape, texture
- **Sounds**: What the target word sounds like or makes
- **Actions**: What the target word does or how it behaves
- **Associations**: Related objects, concepts, or ideas
- **Properties**: Qualities, features, or attributes

## 🌟 Why TypeAbout?

### Educational Value
- **Vocabulary Expansion**: Learn new words and associations
- **Quick Thinking**: Develop rapid cognitive processing
- **Typing Skills**: Improve typing speed and accuracy
- **Pattern Recognition**: Learn to identify word relationships

### Entertainment Value
- **Short Sessions**: Perfect for quick breaks and commutes
- **Competitive**: Leaderboard creates engaging competition
- **Social**: Connect with other Reddit users
- **Replayable**: Daily challenges and varied difficulty levels

### Accessibility
- **All Ages**: Suitable for children, teens, and adults
- **All Devices**: Works on phones, tablets, and computers
- **No Downloads**: Play directly in Reddit interface
- **Free to Play**: No cost or subscription required

## 🎉 Conclusion

TypeAbout is more than just a word game - it's a comprehensive vocabulary challenge that combines education, entertainment, and social competition. With its intuitive design, engaging gameplay, and Reddit integration, it provides a unique gaming experience that's both fun and beneficial.

**Ready to test your vocabulary and compete with Reddit users worldwide? Start playing TypeAbout today!** 🚀

---

## 🛠️ Development Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## 📋 Project Structure

```
type-about-game/
├── src/
│   ├── client/          # React frontend components
│   │   ├── components/  # Game UI components
│   │   ├── services/    # Game logic services
│   │   └── hooks/       # Custom React hooks
│   ├── server/          # Backend logic and API
│   └── shared/          # Shared types and utilities
├── dist/                # Built application
├── assets/              # Game assets and images
└── tools/               # Development tools and configs
```

*Built with ❤️ using React, TypeScript, and the Reddit Devvit platform*