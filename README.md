# Balavikas English Medium High School Web Application

A modern, elegant, and fully featured single-page web application for **Balavikas English Medium High School**, located in Kadapa, Andhra Pradesh (established in 1998). 

Live Demo: **[balavikas-school-website.vercel.app](https://balavikas-school-website.vercel.app/)**

---

## 🌟 Key Features

### 1. Header & Navigation Bar
- **Sticky, Blur Header**: Frosted glassmorphism background (`backdrop-filter`) with an elegant scroll overlay.
- **Brand Identity**: Features the school crest (a custom gold shield on a deep blue background) and established tags.
- **Enquire Now CTA**: Prominent call-to-action button that triggers an interactive admission enquiry modal popup.

### 2. Ambient Hero Section
- **Background Video Loop**: Overlaid with a dark blue gradient overlay to preserve readable white typography.
- **Achievement Badges**: Displays core school stats (100% SSC Pass Rate, 1200+ Active Students, 25+ Years Legacy).
- **Navigation Shortcuts**: Direct buttons to explore academics or schedule campus tours.

### 3. Custom HTML5 Virtual Tour Video Player
- Custom controls styled with glassmorphic layouts (Play, Pause, Mute/Unmute, Timeline Seeker, Restart, Fullscreen, and CC captions toggler).
- **Synced Narrator Captions**: High-contrast subtitles overlay updating dynamically based on current timeline ticks.
- **Interactive Sidebar Chapters**: Jumps the video head directly to designated segment timestamps (Welcome, Smart Classrooms, Co-Curricular, Our Vision) and highlights active markers.
- **Watermark Text**: Dropped shadow typography floating on top of the player.

### 4. About Us & Pillar Values
- Chronicles the school's 25+ year history, vision, and mission.
- Principal quote and signature message card.
- Beautiful grid containing the school's core pillars: Academic Rigor, Character & Ethics, Discipline, and Holistic Development.

### 5. Academics & Smart Facilities
- Tier breakdown cards for Primary Wing, Middle Wing, and Secondary Wing (SSC prep).
- Collapsible interactive accordion detailing facilities (Smart Classrooms, Science Laboratory, ICT Computer Lab).

### 6. Interactive Achievements Filter
- Dynamic tab filtering for **All, Academic Toppers, Sports Trophies, Science Fair, and State Ranks**.
- Responsive visual cards loading student names, details, batch year, and avatar badges.

### 7. Filterable Gallery with Lightbox
- Album category filters (Campus, Sports Day, Annual Day, Science Fair).
- Masonry image grid with hover captions sliding up.
- **Interactive Lightbox Overlay**: Renders expanded high-resolution photos, captions, and left/right navigation controls.

### 8. Contact, Office Timings & Map
- Address details, phone numbers, email, and office hours list.
- Embedded interactive Google Map location centered on Kadapa RTC Bus Stand.
- Instant feedback contact query form storing submissions inside local memory.

### 9. Secure Admin Portal Dashboard
- **Authentication Gateway**: Password-protected screen (Default password: `admin123`).
- **Real-time Stat Indicators**: Dynamically tallies stored enquiries, achievements, and gallery items.
- **Inquiry Logger Table**: View parent details, grades, and dates. Toggle enquiry status (Pending, Contacted, Closed) or delete logs.
- **Content Creation Forms**: Add new achievements or upload gallery image URLs to update the public site live.

---

## 🛠️ Technology Stack

- **Core**: HTML5, Vanilla CSS3, Modern JavaScript (ES6 Modules)
- **Tooling**: Vite (Development server and production bundler)
- **Typography**: Outfit (Sans-serif) & Playfair Display (Serif) from Google Fonts
- **Branding**: Handcrafted vector SVG icon sets
- **Database**: Simulated `localStorage` relational data binding

---

## 🚀 Running Locally

Follow these steps to run the application on your computer:

### 1. Prerequisites
Ensure you have **Node.js** installed on your system.

### 2. Installation
Navigate to the project folder and install dependencies:
```powershell
npm install
```

### 3. Start Development Server
Launch the local server:
```powershell
npm run dev
```
Open **`http://localhost:5173`** in your browser to view the site!

### 4. Build for Production
Bundle and compile optimization files:
```powershell
npm run build
```
This generates a production-ready compilation folder at `/dist`.

---

## 🔐 Credentials & Configs

- **Admin Portal Link**: Navigate to `#admin` or click **Admin Portal** on the header menu.
- **Admin Password**: `admin123`
