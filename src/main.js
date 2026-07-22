import './style.css';

/* ==========================================================================
   Balavikas School Main Engine (Vanilla JS)
   ========================================================================== */

// 1. Initial State & Local Storage Setup
const DEFAULT_ACHIEVEMENTS = [
  {
    id: 'ach-1',
    name: 'A. Rajesh Varma',
    desc: 'Scored 10/10 GPA in SSC Public Examinations (District Topper)',
    category: 'academics',
    year: '2025'
  },
  {
    id: 'ach-2',
    name: 'K. Harini Reddy',
    desc: 'Gold Medalist at AP State Level Under-16 Girls Athletics (100m sprint)',
    category: 'sports',
    year: '2025'
  },
  {
    id: 'ach-3',
    name: 'Balavikas Science Team',
    desc: 'First Prize at District Science Congress for Smart Irrigation Model',
    category: 'science',
    year: '2026'
  },
  {
    id: 'ach-4',
    name: 'P. Vignesh & Group',
    desc: 'Top Rank in State Math Olympiad (Sub-Junior Division)',
    category: 'ranks',
    year: '2025'
  }
];

const DEFAULT_GALLERY = [
  {
    id: 'gal-1',
    title: 'State-of-the-Art Science Lab Experiment',
    category: 'campus',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-2',
    title: 'Annual Sports Meet Opening Ceremony',
    category: 'sports',
    url: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-3',
    title: 'Silver Jubilee Annual Day Dance Drama',
    category: 'annual',
    url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-4',
    title: 'Exhibition Hall Smart City Project Showcase',
    category: 'science',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-5',
    title: 'Students Accessing the Digital Library Reading Room',
    category: 'campus',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-6',
    title: 'Primary Kids Playing Outdoors',
    category: 'sports',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80'
  }
];

const DEFAULT_ENQUIRIES = [
  {
    id: 'BV-1002',
    studentName: 'M. Rohit',
    parentName: 'M. Prasad Rao',
    grade: '9th Grade',
    mobile: '9876543210',
    email: 'prasad@email.com',
    notes: 'Interested in hostel facility if available, looking for admission in the current term.',
    status: 'pending',
    date: '2026-07-22T08:10:00Z'
  },
  {
    id: 'BV-1001',
    studentName: 'V. Pranitha',
    parentName: 'V. Subba Reddy',
    grade: '6th Grade',
    mobile: '9440234567',
    email: 'subbareddy@email.com',
    notes: 'Transitioning from CBSE board, want to check if bridge courses are available.',
    status: 'contacted',
    date: '2026-07-21T10:30:00Z'
  }
];

// Load or initialize LocalStorage
const getStorageItem = (key, defaultVal) => {
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(item);
};

let db = {
  achievements: getStorageItem('bv_achievements', DEFAULT_ACHIEVEMENTS),
  gallery: getStorageItem('bv_gallery', DEFAULT_GALLERY),
  enquiries: getStorageItem('bv_enquiries', DEFAULT_ENQUIRIES)
};

const saveDB = () => {
  localStorage.setItem('bv_achievements', JSON.stringify(db.achievements));
  localStorage.setItem('bv_gallery', JSON.stringify(db.gallery));
  localStorage.setItem('bv_enquiries', JSON.stringify(db.enquiries));
  updateStats();
};

// 2. Client-Side Hash Routing Engine
const handleRoute = () => {
  const hash = window.location.hash || '#home';
  const sections = document.querySelectorAll('.page-section');
  let activeSection = null;

  sections.forEach(sec => {
    if ('#' + sec.id === hash) {
      sec.classList.add('section-active');
      activeSection = sec;
    } else {
      sec.classList.remove('section-active');
    }
  });

  // If no sections matched, fall back to home
  if (!activeSection) {
    document.getElementById('home').classList.add('section-active');
  }

  // Update Nav Active highlights
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile menu close on link click
  const navMenu = document.getElementById('nav-menu');
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  navMenu.classList.remove('open');
  toggleBtn.querySelector('.hamburger').style.backgroundColor = 'white';

  // Specific panel triggers
  if (hash === '#admin') {
    checkAdminSession();
  }
};

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
  handleRoute();
  initializeComponents();
});

// Mobile menu toggle
document.getElementById('mobile-nav-toggle').addEventListener('click', function() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('open');
  const hamburger = this.querySelector('.hamburger');
  if (navMenu.classList.contains('open')) {
    hamburger.style.backgroundColor = 'transparent';
  } else {
    hamburger.style.backgroundColor = 'white';
  }
});

/* ==========================================================================
   Custom HTML5 Video Player Controller
   ========================================================================== */

const CAPTIONS = [
  { start: 0, end: 5.0, text: "Welcome to Balavikas English Medium High School, Kadapa. Shaping minds since 1998." },
  { start: 5.0, end: 10.0, text: "Established in Yerramukkapalli, we have been delivering premier education for over 25 years." },
  { start: 10.0, end: 16.0, text: "Step into our digital smart classrooms, where technology meets traditional pedagogy." },
  { start: 16.0, end: 22.0, text: "Interactive digital boards make complex concepts easier to visualize and comprehend." },
  { start: 22.0, end: 28.0, text: "We strongly believe in holistic development. Co-curricular activities are a core pillar." },
  { start: 28.0, end: 35.0, text: "From track events on Sports Day to classical arts, children discover their true potential." },
  { start: 35.0, end: 41.0, text: "Our ultimate vision is to build responsible, ethical leaders who contribute to society." },
  { start: 41.0, end: 1000.0, text: "Join the Balavikas family today. Let us shape a bright educational future together!" }
];

const CHAPTERS = [
  { id: 1, start: 0, end: 10, title: "Welcome to Balavikas" },
  { id: 2, start: 10, end: 22, title: "Smart Classrooms" },
  { id: 3, start: 22, end: 35, title: "Co-Curricular Growth" },
  { id: 4, start: 35, end: 1000, title: "Our Ultimate Vision" }
];

function initVideoPlayer() {
  const video = document.getElementById('tour-video');
  const playBtn = document.getElementById('play-pause-btn');
  const restartBtn = document.getElementById('restart-btn');
  const muteBtn = document.getElementById('mute-btn');
  const ccBtn = document.getElementById('cc-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  
  const timelineProgress = document.getElementById('timeline-progress');
  const timelineLoaded = document.getElementById('timeline-loaded');
  const timelineHandle = document.getElementById('timeline-handle');
  const timelineContainer = document.getElementById('timeline-container');
  const videoTimeText = document.getElementById('video-time');
  const captionsOverlay = document.getElementById('video-captions');
  
  let showCC = true;

  if (!video) return;

  // Formatting utility
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Play / Pause toggler
  const togglePlay = () => {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };

  playBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);

  video.addEventListener('play', () => {
    playBtn.querySelector('.icon-play').classList.add('hidden');
    playBtn.querySelector('.icon-pause').classList.remove('hidden');
  });

  video.addEventListener('pause', () => {
    playBtn.querySelector('.icon-play').classList.remove('hidden');
    playBtn.querySelector('.icon-pause').classList.add('hidden');
  });

  // Seeker reset restart
  restartBtn.addEventListener('click', () => {
    video.currentTime = 0;
    video.play();
  });

  // Mute volume
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (video.muted) {
      muteBtn.querySelector('.icon-volume').classList.add('hidden');
      muteBtn.querySelector('.icon-mute').classList.remove('hidden');
    } else {
      muteBtn.querySelector('.icon-volume').classList.remove('hidden');
      muteBtn.querySelector('.icon-mute').classList.add('hidden');
    }
  });

  // CC toggling
  ccBtn.addEventListener('click', () => {
    showCC = !showCC;
    if (showCC) {
      ccBtn.classList.add('active-cc');
      captionsOverlay.classList.remove('hidden');
    } else {
      ccBtn.classList.remove('active-cc');
      captionsOverlay.classList.add('hidden');
    }
  });

  // Fullscreen trigger
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      const container = document.getElementById('tour-player-container');
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) { // Safari
        container.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  // Update Time, progress seeker, and CC captions text
  video.addEventListener('timeupdate', () => {
    const curTime = video.currentTime;
    const duration = video.duration || 0;
    
    // Seeker progress percentage
    if (duration > 0) {
      const pct = (curTime / duration) * 100;
      timelineProgress.style.width = pct + '%';
      timelineHandle.style.left = pct + '%';
      videoTimeText.textContent = `${formatTime(curTime)} / ${formatTime(duration)}`;
    }

    // Synchronized CC caption updates
    if (showCC) {
      const currentCaption = CAPTIONS.find(c => curTime >= c.start && curTime < c.end);
      if (currentCaption) {
        captionsOverlay.textContent = currentCaption.text;
        captionsOverlay.classList.remove('hidden');
      } else {
        captionsOverlay.classList.add('hidden');
      }
    }

    // Synchronize active chapter highlights in the navigation panel
    const currentChapter = CHAPTERS.find(chap => curTime >= chap.start && curTime < chap.end);
    if (currentChapter) {
      const activeBtn = document.querySelector(`.chapter-item[data-time="${currentChapter.start === 0 ? '0' : currentChapter.start}"]`);
      if (activeBtn) {
        document.querySelectorAll('.chapter-item').forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
      }
    }
  });

  // Buffer progress
  video.addEventListener('progress', () => {
    const duration = video.duration || 0;
    if (duration > 0 && video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const pct = (bufferedEnd / duration) * 100;
      timelineLoaded.style.width = pct + '%';
    }
  });

  // Seeker Drag and Drop / Clicks
  const seek = (e) => {
    const rect = timelineContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const duration = video.duration || 0;
    video.currentTime = pos * duration;
  };

  let isDragging = false;
  timelineContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    seek(e);
  });
  window.addEventListener('mousemove', (e) => {
    if (isDragging) seek(e);
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Chapter buttons trigger playback head jump
  document.querySelectorAll('.chapter-item').forEach(button => {
    button.addEventListener('click', function() {
      const targetTime = parseFloat(this.getAttribute('data-time'));
      video.currentTime = targetTime;
      video.play();
    });
  });
}

/* ==========================================================================
   Achievements & Gallery Filters Engine
   ========================================================================== */

function renderAchievements(filter = 'all') {
  const container = document.getElementById('achievements-cards-container');
  if (!container) return;

  container.innerHTML = '';
  const filtered = filter === 'all' 
    ? db.achievements 
    : db.achievements.filter(a => a.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="text-center col-span-2 py-8"><p>No achievements logged in this category.</p></div>`;
    return;
  }

  filtered.forEach(ach => {
    const letter = ach.name.charAt(0);
    const card = document.createElement('div');
    card.className = 'achievement-visual-card';
    card.innerHTML = `
      <div class="achievement-img-wrapper">
        <div class="achievement-avatar-bg">
          <span>${letter}</span>
        </div>
        <span class="achievement-category-badge">${ach.category}</span>
      </div>
      <div class="achievement-card-details">
        <span class="achievement-year-tag">Batch Year: ${ach.year}</span>
        <h5 class="achievement-student-name">${ach.name}</h5>
        <p class="achievement-description">${ach.desc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderGallery(filter = 'all') {
  const container = document.getElementById('gallery-images-container');
  if (!container) return;

  container.innerHTML = '';
  const filtered = filter === 'all' 
    ? db.gallery 
    : db.gallery.filter(g => g.category === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="text-center col-span-2 py-8"><p>No photos available in this album category.</p></div>`;
    return;
  }

  filtered.forEach((img, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', idx);
    item.innerHTML = `
      <img src="${img.url}" alt="${img.title}" loading="lazy">
      <div class="gallery-hover-overlay">
        <span class="gallery-item-tag">${img.category}</span>
        <h4 class="gallery-item-title">${img.title}</h4>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(filtered, idx));
    container.appendChild(item);
  });
}

// Interactive filter listeners
function initFilterSystems() {
  // Achievements tabs
  document.querySelectorAll('.tab-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderAchievements(this.getAttribute('data-filter'));
    });
  });

  // Gallery tabs
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderGallery(this.getAttribute('data-filter'));
    });
  });
}

/* ==========================================================================
   Interactive Lightbox Module
   ========================================================================== */

let lightboxList = [];
let lightboxIdx = 0;

function openLightbox(list, index) {
  lightboxList = list;
  lightboxIdx = index;
  
  const modal = document.getElementById('gallery-lightbox-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Stop page scroll
  
  updateLightboxContent();
}

function updateLightboxContent() {
  const activeImg = document.getElementById('lightbox-active-img');
  const activeTitle = document.getElementById('lightbox-active-title');
  const activeCategory = document.getElementById('lightbox-active-category');

  if (lightboxList.length === 0) return;
  const current = lightboxList[lightboxIdx];

  activeImg.src = current.url;
  activeImg.alt = current.title;
  activeTitle.textContent = current.title;
  activeCategory.textContent = current.category;
}

function initLightboxEvents() {
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');
  const modal = document.getElementById('gallery-lightbox-modal');

  const closeLightbox = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Re-enable scroll
  };

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  prevBtn.addEventListener('click', () => {
    lightboxIdx = (lightboxIdx - 1 + lightboxList.length) % lightboxList.length;
    updateLightboxContent();
  });

  nextBtn.addEventListener('click', () => {
    lightboxIdx = (lightboxIdx + 1) % lightboxList.length;
    updateLightboxContent();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

/* ==========================================================================
   Modals & Query Form Submit Operations
   ========================================================================== */

function initModalsAndForms() {
  const enquireModal = document.getElementById('admission-enquiry-modal');
  const triggers = document.querySelectorAll('.enquire-trigger-btn');
  const closeModalBtn = document.getElementById('modal-close-btn');

  // Trigger admissions modal popup
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      enquireModal.classList.remove('hidden');
      document.getElementById('admission-enquiry-form').classList.remove('hidden');
      document.getElementById('enquiry-success-message').classList.add('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeEnqModal = () => {
    enquireModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  closeModalBtn.addEventListener('click', closeEnqModal);
  enquireModal.addEventListener('click', (e) => {
    if (e.target === enquireModal) closeEnqModal();
  });

  // Admission Enquiry Submit
  const enquiryForm = document.getElementById('admission-enquiry-form');
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const studentName = document.getElementById('enq-student-name').value;
    const parentName = document.getElementById('enq-parent-name').value;
    const grade = document.getElementById('enq-grade').value;
    const mobile = document.getElementById('enq-mobile').value;
    const email = document.getElementById('enq-email').value;
    const notes = document.getElementById('enq-notes').value;

    const refId = 'BV-' + Math.floor(1000 + Math.random() * 9000);
    const newEnq = {
      id: refId,
      studentName,
      parentName,
      grade,
      mobile,
      email,
      notes,
      status: 'pending',
      date: new Date().toISOString()
    };

    db.enquiries.unshift(newEnq);
    saveDB();

    // Show Success screen
    enquiryForm.classList.add('hidden');
    const successMsg = document.getElementById('enquiry-success-message');
    document.getElementById('enquiry-ref-id').textContent = refId;
    successMsg.classList.remove('hidden');
    enquiryForm.reset();
  });

  // Public Query Form Submit
  const queryForm = document.getElementById('public-query-form');
  const successAlert = document.getElementById('query-success-alert');

  queryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('query-name').value;
    const email = document.getElementById('query-email').value;
    const mobile = document.getElementById('query-phone').value;
    const subject = document.getElementById('query-subject').value;
    const message = document.getElementById('query-message').value;

    const refId = 'BV-Q-' + Math.floor(1000 + Math.random() * 9000);
    const newEnq = {
      id: refId,
      studentName: 'General Query',
      parentName,
      grade: subject,
      mobile,
      email,
      notes: message,
      status: 'pending',
      date: new Date().toISOString()
    };

    db.enquiries.unshift(newEnq);
    saveDB();

    // Show Success
    queryForm.classList.add('hidden');
    successAlert.classList.remove('hidden');
    queryForm.reset();

    // Revert form layout back after 6 seconds
    setTimeout(() => {
      successAlert.classList.add('hidden');
      queryForm.classList.remove('hidden');
    }, 6000);
  });
}

/* ==========================================================================
   Admin Portal Controller and Management Table
   ========================================================================== */

function checkAdminSession() {
  const isLoggedIn = sessionStorage.getItem('bv_admin_session') === 'true';
  const loginCard = document.getElementById('admin-login-card');
  const dashboard = document.getElementById('admin-dashboard-panel');

  if (isLoggedIn) {
    loginCard.classList.add('hidden');
    dashboard.classList.remove('hidden');
    updateAdminDashboard();
  } else {
    loginCard.classList.remove('hidden');
    dashboard.classList.add('hidden');
  }
}

function initAdminPortal() {
  const loginForm = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password');
  const errorMsg = document.getElementById('login-error-msg');
  const logoutBtn = document.getElementById('admin-logout-btn');

  // Login handler
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passwordInput.value === 'admin123') {
      sessionStorage.setItem('bv_admin_session', 'true');
      errorMsg.classList.add('hidden');
      passwordInput.value = '';
      checkAdminSession();
    } else {
      errorMsg.classList.remove('hidden');
      passwordInput.value = '';
    }
  });

  // Logout handler
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('bv_admin_session');
    checkAdminSession();
    window.location.hash = '#home';
  });

  // Add Achievement Form Submit
  const achievementForm = document.getElementById('admin-add-achievement-form');
  achievementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('ach-name').value;
    const desc = document.getElementById('ach-desc').value;
    const category = document.getElementById('ach-category').value;
    const year = document.getElementById('ach-year').value;

    const newAch = {
      id: 'ach-' + Date.now(),
      name,
      desc,
      category,
      year
    };

    db.achievements.unshift(newAch);
    saveDB();
    achievementForm.reset();
    renderAchievements(document.querySelector('.tab-filter-btn.active').getAttribute('data-filter'));
    updateAdminDashboard();
  });

  // Add Gallery Form Submit
  const galleryForm = document.getElementById('admin-add-gallery-form');
  galleryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('gal-title').value;
    const url = document.getElementById('gal-url').value;
    const category = document.getElementById('gal-category').value;

    const newImg = {
      id: 'gal-' + Date.now(),
      title,
      url,
      category
    };

    db.gallery.unshift(newImg);
    saveDB();
    galleryForm.reset();
    renderGallery(document.querySelector('.gallery-filter-btn.active').getAttribute('data-filter'));
    updateAdminDashboard();
  });
}

function updateAdminDashboard() {
  const tableBody = document.getElementById('admin-enquiries-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (db.enquiries.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No inquiries logged.</td></tr>`;
    return;
  }

  db.enquiries.forEach(enq => {
    const row = document.createElement('tr');
    const formattedDate = new Date(enq.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    row.innerHTML = `
      <td>
        <div style="font-weight: 700;">${enq.parentName}</div>
        <div style="font-size: 0.75rem; color: var(--neutral-slate);">Ref: ${enq.id} | Student: ${enq.studentName}</div>
      </td>
      <td>${enq.grade}</td>
      <td>${enq.mobile}</td>
      <td>
        <span class="status-badge status-${enq.status}">${enq.status}</span>
      </td>
      <td>${formattedDate}</td>
      <td>
        <select class="action-select-sm" data-id="${enq.id}">
          <option value="pending" ${enq.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="contacted" ${enq.status === 'contacted' ? 'selected' : ''}>Contacted</option>
          <option value="closed" ${enq.status === 'closed' ? 'selected' : ''}>Closed</option>
        </select>
        <button class="btn-delete-sm" data-id="${enq.id}">Delete</button>
      </td>
    `;

    // Dropdown change listener
    row.querySelector('.action-select-sm').addEventListener('change', function() {
      const enqId = this.getAttribute('data-id');
      const matched = db.enquiries.find(e => e.id === enqId);
      if (matched) {
        matched.status = this.value;
        saveDB();
        updateAdminDashboard();
      }
    });

    // Delete button listener
    row.querySelector('.btn-delete-sm').addEventListener('click', function() {
      const enqId = this.getAttribute('data-id');
      if (confirm(`Are you sure you want to delete inquiry from ${enq.parentName}?`)) {
        db.enquiries = db.enquiries.filter(e => e.id !== enqId);
        saveDB();
        updateAdminDashboard();
      }
    });

    tableBody.appendChild(row);
  });
}

function updateStats() {
  const enquiriesCount = document.getElementById('stat-enquiries-count');
  const achievementsCount = document.getElementById('stat-achievements-count');
  const galleryCount = document.getElementById('stat-gallery-count');

  if (enquiriesCount) enquiriesCount.textContent = db.enquiries.length;
  if (achievementsCount) achievementsCount.textContent = db.achievements.length;
  if (galleryCount) galleryCount.textContent = db.gallery.length;
}

/* ==========================================================================
   Academics Accordion Facility Explanations
   ========================================================================== */

function initAccordion() {
  document.querySelectorAll('.facility-header').forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      const content = item.querySelector('.facility-content');
      
      // Toggle active states
      content.classList.toggle('hidden');
    });
  });
  
  // Collapse all accordion elements except the first one initially
  document.querySelectorAll('.facility-item').forEach((item, index) => {
    if (index !== 0) {
      item.querySelector('.facility-content').classList.add('hidden');
    }
  });
}

/* ==========================================================================
   Initializer Routine
   ========================================================================== */

function initializeComponents() {
  initVideoPlayer();
  initFilterSystems();
  initLightboxEvents();
  initModalsAndForms();
  initAdminPortal();
  initAccordion();

  // Populate data initially
  renderAchievements();
  renderGallery();
  updateStats();
}
