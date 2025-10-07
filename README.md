# VoiceLearn - AI-Powered Voice Learning Assistant

A Khanmigo-style voice interaction tool with real-time speech-to-text transcription, high accuracy, and full accessibility support. Built with Next.js 15, React 19, and the Web Speech API.

## 🌟 Features

### Core Functionality
- **Real-Time Speech Recognition**: Instant transcription with low latency streaming using the Web Speech API
- **Push-to-Talk Interface**: Hold the microphone button or Space bar to speak
- **Live Transcript Display**: See your words appear in real-time with confidence scores
- **Session Management**: Track and manage conversation sessions with GraphQL backend
- **Transcript Export**: Download your transcripts as text files

### Voice Features
- **Audio Waveform Visualization**: Visual feedback while speaking
- **Continuous Recognition**: Support for long-form speech input
- **Interim Results**: See words as you speak before they're finalized
- **High Accuracy**: Confidence scores displayed for each transcript entry

### Accessibility
- **WCAG 2.1 Compliant**: Full accessibility support for users with disabilities
- **Keyboard Navigation**: Complete keyboard control without mouse
- **Screen Reader Support**: ARIA labels and live regions for screen readers
- **Visual Feedback**: Clear indicators for all states and actions
- **Customizable Themes**: Dark and light mode support

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Touch Support**: Touch-friendly controls for mobile users
- **Keyboard Shortcuts**: Quick access to common actions
- **Session Persistence**: Save and retrieve conversation history
- **Copy to Clipboard**: Easily copy individual transcript entries

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **pnpm**: Package manager (or npm/yarn)
- **Modern Browser**: Chrome, Edge, or Safari (required for Web Speech API)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/johaankjis/Khanmigo-Style-Voice-Interaction-Tool.git
   cd Khanmigo-Style-Voice-Interaction-Tool
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Operation

1. **Start Recording**:
   - Click and hold the microphone button
   - Or press and hold the **Space** bar

2. **Stop Recording**:
   - Release the microphone button
   - Or release the **Space** bar
   - Or press **Esc**

3. **View Transcript**:
   - Your speech appears in real-time in the transcript panel
   - Final results are displayed with confidence scores
   - Each entry shows a timestamp

4. **Export Transcript**:
   - Click the **Export** button to download as a text file
   - Format: `transcript-YYYY-MM-DD.txt`

5. **Clear Transcript**:
   - Click the **Clear** button
   - Or use keyboard shortcut **Ctrl + K**

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Space** (hold) | Start/Stop recording |
| **Esc** | Stop recording |
| **Ctrl + K** | Clear transcript |
| **Ctrl + E** | Export transcript |
| **Tab** | Navigate between controls |
| **Enter** | Activate focused button |

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.2.4**: React framework with App Router
- **React 19**: UI library with latest features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4.1.9**: Utility-first styling
- **Geist Font**: Modern typography

### UI Components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Shadcn/ui**: Reusable component system
- **Recharts**: Data visualization

### APIs & Features
- **Web Speech API**: Browser-native speech recognition
- **GraphQL**: API layer for session management
- **Vercel Analytics**: Performance monitoring

### Development Tools
- **pnpm**: Fast, disk space efficient package manager
- **ESLint**: Code linting
- **PostCSS**: CSS processing

## 📁 Project Structure

```
Khanmigo-Style-Voice-Interaction-Tool/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── graphql/             # GraphQL endpoint
│   │       └── route.ts         # Session & transcript management
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (Radix/shadcn)
│   ├── accessibility-announcer.tsx  # Screen reader announcements
│   ├── keyboard-shortcuts-dialog.tsx # Keyboard help
│   ├── session-controls.tsx     # Session management UI
│   ├── theme-provider.tsx       # Theme context
│   ├── theme-toggle.tsx         # Dark/light mode toggle
│   ├── transcript-display.tsx   # Transcript viewer
│   ├── voice-interaction-interface.tsx # Main interface
│   └── voice-visualizer.tsx     # Waveform visualization
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection
│   ├── use-session-manager.ts  # Session state management
│   ├── use-speech-recognition.ts # Speech API wrapper
│   └── use-toast.ts            # Toast notifications
│
├── lib/                        # Utilities
│   ├── graphql-client.ts      # GraphQL client & queries
│   └── utils.ts               # Helper functions
│
├── public/                     # Static assets
├── styles/                     # Additional styles
├── components.json             # UI component config
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── tailwind.config.ts         # Tailwind configuration
```

## 🎨 Features in Detail

### Speech Recognition (`use-speech-recognition.ts`)
- Continuous speech recognition with interim results
- Automatic error handling and recovery
- Browser compatibility detection
- Real-time transcript updates with confidence scores

### Session Management (`use-session-manager.ts`)
- Create and track conversation sessions
- Save transcripts to backend via GraphQL
- Session persistence and retrieval
- Error handling and loading states

### Transcript Display
- Real-time display of speech-to-text results
- Copy individual entries to clipboard
- Export entire transcript
- Visual indicators for interim vs. final results
- Automatic scrolling to latest entry

### Voice Visualizer
- Animated waveform bars during recording
- Visual feedback for audio input
- 40-bar animation with random heights
- Smooth transitions and animations

### Accessibility Features
- **ARIA Labels**: All interactive elements properly labeled
- **Live Regions**: Screen reader announcements for state changes
- **Keyboard Navigation**: Full keyboard support without mouse
- **Focus Management**: Clear focus indicators
- **High Contrast**: Readable in light and dark modes
- **Semantic HTML**: Proper structure for assistive technologies

## 🔧 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Environment Setup

The application runs entirely on the client side with a built-in GraphQL API. No external environment variables are required for basic operation.

### Browser Support

The Web Speech API is required for core functionality:

- ✅ **Google Chrome** (recommended)
- ✅ **Microsoft Edge**
- ✅ **Safari** (macOS/iOS)
- ❌ Firefox (limited support)

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/johaankjis/Khanmigo-Style-Voice-Interaction-Tool)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings
4. No environment variables needed

### Build Optimization

The project includes:
- Static optimization for pages
- Automatic code splitting
- Image optimization (disabled for static export)
- CSS minification
- Tree shaking

## 🎯 Use Cases

- **Educational Tools**: Voice-based learning assistants
- **Accessibility**: Hands-free text input for users with disabilities
- **Note-Taking**: Quick voice memos and transcription
- **Language Learning**: Practice pronunciation and fluency
- **Meeting Transcription**: Record and transcribe conversations
- **Voice Commands**: Integration with voice-controlled applications

## 🔒 Privacy & Security

- All speech processing happens in the browser
- No audio data sent to external servers
- Transcripts stored in-memory (session-based)
- No persistent storage of sensitive data
- Local-only session management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app) - AI-powered UI generation
- Inspired by Khan Academy's Khanmigo
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub](https://github.com/johaankjis/Khanmigo-Style-Voice-Interaction-Tool/issues)
- Review the [keyboard shortcuts](#keyboard-shortcuts) for usage help
- Check browser compatibility if speech recognition isn't working

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Made with ❤️ by the VoiceLearn Team**
