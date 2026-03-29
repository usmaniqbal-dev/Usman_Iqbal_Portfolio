# Usman Iqbal Portfolio

A modern, responsive, and feature-rich personal portfolio website built with React, TypeScript, Tailwind CSS, and Express.js.

![Portfolio Preview](./preview.png)

## Features

- **Modern 3D Animations**: Smooth animations powered by Framer Motion
- **Theme Switcher**: 4 customizable themes (Dark Blue, Purple, Green Tech, Light Mode)
- **Responsive Design**: Fully responsive for Mobile, Tablet, and Desktop
- **Animated Skill Bars**: Dynamic progress bars with smooth animations
- **Contact Form**: Backend integration with Nodemailer
- **Admin Dashboard**: Full content management system
- **Salesforce Section**: Professional CRM showcase
- **Glassmorphism UI**: Modern glass-like design elements

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- shadcn/ui components

### Backend
- Node.js
- Express.js
- Nodemailer (email service)
- CORS

## Project Structure

```
├── public/
│   └── images/
│       └── profile.png          # Your profile image
├── server/
│   ├── server.js                # Express server
│   ├── package.json             # Server dependencies
│   └── .env.example             # Environment variables template
├── src/
│   ├── components/
│   │   ├── Navigation.tsx       # Navbar component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── AdminModal.tsx       # Admin login modal
│   │   └── AdminDashboard.tsx   # Admin dashboard
│   ├── sections/
│   │   ├── Hero.tsx             # Hero section
│   │   ├── About.tsx            # About section
│   │   ├── Skills.tsx           # Skills section
│   │   ├── Projects.tsx         # Projects section
│   │   ├── Salesforce.tsx       # Salesforce section
│   │   └── Contact.tsx          # Contact section
│   ├── context/
│   │   └── ThemeContext.tsx     # Theme management
│   ├── data/
│   │   └── portfolioData.ts     # Portfolio data
│   ├── App.tsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── index.css                # Global styles
│   └── main.tsx                 # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd portfolio-website
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your email credentials
   cd ..
   ```

5. **Add your profile image**
   - Replace `public/images/profile.png` with your own image

### Running the Project

#### Development Mode (Frontend Only)
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

#### Full Stack Mode (Frontend + Backend)

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   Server will run on `http://localhost:3001`

2. **In a new terminal, start the frontend**
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

### Deploying

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server
   npm start
   ```

## Admin Dashboard

### Default Credentials
- **Username**: `usman52422`
- **Password**: `622452`

### Features
- Edit About section content
- Add/Edit/Delete skills
- Add/Edit/Delete projects
- Change theme settings
- Update contact information

## Theme Switcher

Click the theme button in the navbar to cycle through:
1. **Dark Blue Professional** - Classic dark theme with blue accents
2. **Purple Gradient Modern** - Vibrant purple gradient theme (default)
3. **Green Tech Theme** - Fresh green technology theme
4. **Classic Light Mode** - Clean light theme

## Contact Form Setup

To enable the contact form email functionality:

1. **Create a Gmail App Password**
   - Go to your Google Account
   - Navigate to Security > 2-Step Verification
   - Generate an App Password for "Mail"

2. **Configure Environment Variables**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

3. **The actual recipient email is hidden in the backend**
   - Frontend shows: `usmaniqbal@gmail.com`

## Customization

### Editing Content

You can edit content in two ways:

1. **Via Admin Dashboard** (Recommended)
   - Login with admin credentials
   - Edit content through the UI
   - Changes are saved to browser localStorage

2. **Via Code**
   - Edit `src/data/portfolioData.ts`
   - Update the `defaultPortfolioData` object

### Adding New Skills

In the Admin Dashboard:
1. Go to the "Skills" tab
2. Fill in the skill name, category, and level
3. Click "Add Skill"

### Adding New Projects

In the Admin Dashboard:
1. Go to the "Projects" tab
2. Fill in project details
3. Add technologies
4. Click "Add Project"

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized build with Vite
- Code splitting for faster load times
- Lazy loading for images
- Smooth 60fps animations

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email**: usmaniqbal@gmail.com
- **LinkedIn**: [Usman Ali](https://www.linkedin.com/in/usmaniqbaltech/)
- **GitHub**: [usmaniqbal-dev](https://github.com/usmaniqbal-dev)
- **Live Demo**: https://wmnogjp7uedwg.ok.kimi.link/

---

Built with ❤️ by Usman Iqbal
