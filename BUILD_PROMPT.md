# Build pasS2Kampus - Complete French Student Journey Platform

Create a comprehensive React TypeScript application called "pasS2Kampus" - a complete guide and tracking platform for international students studying in France. This should be a modern, responsive web application with a sidebar navigation and multiple interactive modules.

## Core Architecture & Setup

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Layout**: Sidebar navigation with main content area
- **State Management**: React useState for local state
- **Routing**: React Router DOM for navigation
- **UI Library**: shadcn/ui components (cards, buttons, dialogs, tabs, etc.)

## Main Layout Structure

### Sidebar Navigation (AppSidebar)
Create a collapsible sidebar with these navigation items:
- 🎯 Checklist (main page)
- 📄 Documents & Renewals
- 💬 Ask Me Anything
- 👥 Community Hub
- 📚 Stay Updated
- 🏢 Our Partners
- 🇫🇷 Learn French
- 🌐 Translate
- 📞 Contact Us

### Header Component
- Logo: "pasS2Kampus" with stylized S and K
- Current page title
- User progress indicators (keys earned: 🗝️)
- Notification and profile buttons

### Footer
- Copyright with creators: "Kousthubhee Krishna K & Srivatsava CK"

## Core Features & Pages

### 1. Main Checklist Module (Primary Feature)
**Gamified Progress System:**
- Users start with 4 keys
- Modules are locked/unlocked based on keys required
- Completing modules earns keys
- Progress tracking with visual indicators

**Modules to Include:**
1. **School & Local Insights** (Always unlocked)
   - City selector with 13+ French cities
   - School information for each city
   - Local insights (transportation, culture, food, recreation)
   - Detailed school profiles with programs, fees, deadlines

2. **Pre-Arrival Checklist Part 1** (Always unlocked)
   - Campus France registration
   - VFS visa application
   - Document translation
   - Travel insurance
   - Flight booking
   - Interactive checklists with document requirements

3. **Pre-Arrival Checklist Part 2** (Always unlocked)
   - City-specific preparation guide
   - Food preparation (local supermarkets, Indian items to bring)
   - Clothing recommendations based on climate
   - Cultural preparation tips
   - Interactive checklists for each category

4. **Post-Arrival Checklist** (Requires 2 keys)
   - Bank account opening
   - Social security number application
   - Health insurance registration
   - CAF housing allowance application
   - Urgent tasks timeline

5. **French Integration** (Requires 3 keys)
   - Language & communication modules
   - Cultural etiquette guidelines
   - Food & grocery guidance
   - Festivals & social events
   - Student life integration
   - French bureaucracy navigation
   - Mental health & adjustment tips
   - Cultural comparison tools
   - Indo-French specific guidance

6. **Finance Tracking** (Requires 1 key)
   - Comprehensive financial dashboard
   - Budget planning and tracking
   - Expense management with receipt scanning
   - Student discount cards tracker
   - Subscription management
   - Currency converter
   - Emergency fund builder
   - Bill splitter
   - Part-time job tracker
   - Loan calculator
   - Financial reports

### 2. Documents & Renewals Page
- Document tracker with expiry dates
- Renewal process guidelines
- Notification system for upcoming renewals
- Status tracking (valid/expiring/expired)
- Add/edit/delete documents functionality

### 3. Ask Me Anything (QA Page)
- Chat-like interface for questions
- Common questions quick-select
- Simulated AI responses about studying in France

### 4. Community Hub
- Multi-tab interface: Q&A, Blogs, Reels, Polls
- Post creation and interaction
- Comment and reply system
- Like functionality
- Community stats and achievements
- Upcoming events section

### 5. Stay Updated (News Page)
- Latest news about French education
- Important deadlines tracker
- Official partner information
- Quick links to important resources

### 6. Our Partners (Affiliation Page)
- Partner organization cards
- Services offered by each partner
- Contact information and ratings
- Partnership benefits explanation

### 7. Learn French (Language Page)
- Interactive language lessons
- Pronunciation practice with speech synthesis
- Progress tracking
- Lesson categories (greetings, university life, daily life, bureaucracy)

### 8. Translate Page
- Real-time translation tool
- Common phrases library
- Language switching (English ↔ French)

### 9. Contact Us Page
- Contact form
- Creator information
- Support options
- Mission statement

## Technical Implementation Details

### Key Components to Build:

1. **ChecklistModule**: Main gamified checklist with module cards
2. **ModuleCard**: Individual module display with lock/unlock states
3. **ModuleContent**: Detailed content for each module
4. **SchoolSelector**: City and school selection interface
5. **ProgressSection**: Visual progress tracking
6. **Header**: Top navigation with user stats
7. **AppSidebar**: Side navigation menu

### State Management:
```typescript
interface UserProgress {
  keys: number;
  completedModules: string[];
  unlockedModules: string[];
  currentPage: string;
}
```

### Styling Requirements:
- Modern, clean design with card-based layouts
- Responsive design for mobile and desktop
- Gradient backgrounds and hover effects
- Color-coded modules and status indicators
- Professional typography and spacing
- Interactive elements with smooth transitions

### Data Structure Examples:

**Cities with Schools:**
- Paris, Lyon, Toulouse, Rouen, Reims, Lille, Strasbourg, Bordeaux, Nice, Marseille, Grenoble, Nantes, Montpellier
- Each city includes: schools list, local insights (transportation, culture, food, recreation)

**Module Structure:**
- ID, title, description, icon, color gradient, type, keys required
- Completion tracking and progress indicators

## Special Features to Implement:

1. **Gamification**: Key-based unlocking system
2. **City-Specific Content**: Tailored information for each French city
3. **Interactive Checklists**: Step-by-step completion tracking
4. **Financial Tools**: Comprehensive money management suite
5. **Cultural Integration**: Detailed French culture adaptation guide
6. **Document Management**: Renewal tracking and notifications
7. **Community Features**: Social interaction and content sharing

## Design Principles:
- Apple-level design aesthetics
- Intuitive user experience
- Comprehensive information architecture
- Progressive disclosure of features
- Mobile-first responsive design
- Accessibility considerations

Build this as a complete, production-ready application with all features fully functional and interconnected. The app should feel like a comprehensive companion for international students throughout their entire French education journey.