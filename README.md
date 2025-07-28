# 🎉 BoozeLens - Picture Perfect Party

A professional-grade real-time BAC (Blood Alcohol Content) monitoring system with interactive party games and safety features.

🌐 **Live Demo**: [https://tirongeth.github.io/boozelens/](https://tirongeth.github.io/boozelens/)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher) and npm
- A web browser (Chrome, Firefox, Safari, etc.)
- Git for version control

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tirongeth/boozelens.git
   cd boozelens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** - Vite will automatically open it at:
   ```
   http://localhost:8000
   ```

5. **Create an account or login** to start using BoozeLens!

## 📁 Project Structure

```
boozelens/
├── index.html             # Main HTML file  
├── vite.config.js         # Vite configuration
├── package.json           # Project configuration
├── .env                   # Environment variables (keep secret!)
├── .env.example          # Example environment file
├── .github/
│   └── workflows/        # GitHub Actions for deployment
├── dist/                 # Production build output
├── public/               # Static assets
├── logo/                 # App logos and PWA icons
├── src/
│   ├── css/
│   │   └── boozelens.css # All styles
│   └── js/
│       ├── main.js       # Main entry point
│       ├── auth/
│       │   └── auth.js   # Authentication
│       ├── config/
│       │   ├── firebase.js   # Firebase setup
│       │   ├── app-state.js  # State management
│       │   └── constants.js  # App constants
│       ├── features/
│       │   ├── devices.js       # Device pairing
│       │   ├── drinks.js        # Drink tracking
│       │   ├── all-functions.js # All other functions
│       │   └── games/           # Modular party games system
│       │       ├── index.js          # Game manager
│       │       ├── game-utils.js     # Shared utilities
│       │       ├── game-data.js      # Game data
│       │       ├── beer-pong.js      # Beer Pong with Tournament Mode
│       │       ├── flip-cup.js       # Flip Cup Timer
│       │       ├── kings-cup.js      # King's Cup
│       │       ├── never-have-i-ever.js
│       │       ├── truth-or-dare.js
│       │       ├── trivia.js         # Multi-category Trivia
│       │       ├── most-likely-to.js
│       │       ├── would-you-rather.js
│       │       └── spin-bottle.js    # Spin the Bottle
│       └── ui/
│           ├── dashboard.js     # Dashboard UI
│           └── notifications.js # Notifications
└── ESP32 Code DO NOT TOUCH/  # Hardware integration code
```

## 🔥 Firebase Setup

The app uses Firebase for:
- **Authentication**: User login/signup
- **Realtime Database**: Live BAC readings and friend data
- **Data Sync**: Keep everything synchronized across devices

Your Firebase config is already set up in `.env` and `src/js/config/firebase.js`.

## 🎮 Features

### 📱 Device Pairing
- Connect Arduino/ESP32 breathalyzers
- Real-time BAC monitoring
- Multiple device support

### 👥 Friends System
- Add friends with permission levels (Observer/Buddy/Guardian)
- See friends' BAC levels (with permission)
- Friend requests and management

### 🍻 Drink Tracking
- Log drinks with type, amount, and alcohol percentage
- Visual drink distribution chart
- Emergency medical report generation
- BAC estimation

### 🎮 Party Games

**Epic Game Features:**
- 🏆 **Beer Pong** - Tournament mode with bracket system, team names, and victory celebrations
- 🎯 **Flip Cup Timer** - Track team performance with stopwatch
- 👑 **King's Cup** - Classic card drinking game
- 🤔 **Never Have I Ever** - With spicy and regular modes
- 💬 **Truth or Dare** - Multiple difficulty levels
- 🧠 **Multi-Category Trivia** - General Knowledge, Science, Sports, Movies, and more
- 🎯 **Most Likely To** - Vote on fun scenarios
- 🤷 **Would You Rather** - Choose between challenging options
- 🍾 **Spin the Bottle** - Classic party game with digital twist

**Game System Features:**
- Confetti celebrations for victories
- Team-based gameplay support
- Score tracking and leaderboards
- Multiple difficulty modes
- Category selection for trivia
- Animated UI interactions

### 🚨 Safety Features
- Emergency contacts quick access
- First aid guide
- Uber integration with saved home address
- Buddy system
- Hydration reminders

### ⚙️ Settings
- Profile management
- Emergency information
- Privacy controls
- Data export

## 🛠️ Development

### Build Commands

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run test       # Run tests
```

### Deployment

The app automatically deploys to GitHub Pages when you push to the main branch:

1. **Automatic Deployment** (via GitHub Actions)
   - Push changes to `main` branch
   - GitHub Actions builds and deploys automatically
   - Live at: https://tirongeth.github.io/boozelens/

2. **Manual Deployment** (if needed)
   ```bash
   npm run deploy
   ```

### Making Changes

1. **CSS Changes**: Edit `src/css/boozelens.css`
2. **JavaScript Changes**: Edit the appropriate module in `src/js/`
3. **Add New Features**: Create new modules and import them in `main.js`
4. **Add New Games**: Create a new file in `src/js/features/games/` and register in `index.js`

### Important Development Rules

- ✅ **ALWAYS** run `npm run build` before committing
- ✅ **ALWAYS** test locally with `npm run dev` first
- ✅ **NEVER** create new files without checking for duplicates
- ✅ **NEVER** commit without testing the build
- ✅ Delete any test files after testing

### Adding Global Functions

If you need to add a function that's called from HTML onclick handlers:

1. Add the function to the appropriate module
2. Export it from that module
3. In `main.js`, import it and add to the `exposeGlobalFunctions()` function:
   ```javascript
   window.yourNewFunction = YourModule.yourNewFunction;
   ```

### Module System

The app uses ES6 modules with Vite for modern development:
- Each feature has its own module
- State is centralized in `app-state.js`
- Constants are in `constants.js`
- All modules are imported and initialized in `main.js`
- Vite handles bundling and optimization

## 🐛 Troubleshooting

### "Module not found" errors
- Make sure you're running `npm run dev` (not just opening index.html)
- Check that all import paths are correct
- Run `npm install` if dependencies are missing

### Build errors
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check for syntax errors in recently modified files

### Functions not working
- Check browser console for errors (F12)
- Ensure functions are exposed globally in `main.js`
- Verify Firebase is initialized
- Check that the build completed successfully

### Firebase connection issues
- Check internet connection
- Verify Firebase config in `.env` matches your Firebase project
- Check Firebase console for any security rule issues
- Ensure `.env` file exists and has correct values

## 📱 Mobile Support

The app is fully responsive and works on:
- iOS Safari
- Android Chrome
- Tablets
- Desktop browsers

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep Firebase API keys secure
- Use Firebase security rules to protect user data
- Sanitize user inputs

## 🤝 Contributing

1. Make your changes in a new branch
2. Test thoroughly
3. Ensure all functions still work
4. Submit a pull request

## 📄 License

MIT License - feel free to use and modify!

## 🆘 Support

Having issues? Check:
1. Browser console for errors (F12)
2. Network tab for failed requests
3. Firebase console for backend issues

## 🚀 Tech Stack

- **Frontend**: Vanilla JavaScript with ES6 modules
- **Build Tool**: Vite for fast development and optimized production builds
- **Backend**: Firebase (Auth, Realtime Database)
- **Deployment**: GitHub Pages with GitHub Actions CI/CD
- **Styling**: Custom CSS with responsive design
- **PWA**: Progressive Web App with offline support

---

**BoozeLens** - Industrial-grade party safety and entertainment platform 🎉