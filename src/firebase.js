import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

// Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if configuration is provided
const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.apiKey !== 'YOUR_API_KEY');

let app;
let firestoreDb;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
    console.log('Successfully connected to live Firebase Firestore!');
  } catch (error) {
    console.error('Firebase initialization failed, falling back to local database:', error);
  }
} else {
  console.log('Firebase credentials not found. Running in Local Storage Mode.');
}

// Helper to check active state
export const isLiveDatabase = () => !!firestoreDb;

/* ==========================================================================
   Database Operations (Firestore with Local Storage Fallbacks)
   ========================================================================== */

// 1. Achievements Operations
export async function getAchievements(localFallback) {
  if (!isLiveDatabase()) return localFallback;
  try {
    const q = query(collection(firestoreDb, 'achievements'), orderBy('year', 'desc'));
    const querySnapshot = await getDocs(q);
    const achievements = [];
    querySnapshot.forEach((docSnap) => {
      achievements.push({ id: docSnap.id, ...docSnap.data() });
    });
    return achievements.length > 0 ? achievements : localFallback;
  } catch (err) {
    console.error('Error fetching achievements from Firestore:', err);
    return localFallback;
  }
}

export async function addAchievement(ach) {
  if (!isLiveDatabase()) return false;
  try {
    const docRef = await addDoc(collection(firestoreDb, 'achievements'), {
      name: ach.name,
      desc: ach.desc,
      category: ach.category,
      year: ach.year,
      date: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving achievement to Firestore:', err);
    return false;
  }
}

// 2. Gallery Operations
export async function getGallery(localFallback) {
  if (!isLiveDatabase()) return localFallback;
  try {
    const q = query(collection(firestoreDb, 'gallery'));
    const querySnapshot = await getDocs(q);
    const galleryItems = [];
    querySnapshot.forEach((docSnap) => {
      galleryItems.push({ id: docSnap.id, ...docSnap.data() });
    });
    return galleryItems.length > 0 ? galleryItems : localFallback;
  } catch (err) {
    console.error('Error fetching gallery from Firestore:', err);
    return localFallback;
  }
}

export async function addGalleryItem(img) {
  if (!isLiveDatabase()) return false;
  try {
    const docRef = await addDoc(collection(firestoreDb, 'gallery'), {
      title: img.title,
      url: img.url,
      category: img.category,
      date: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving gallery item to Firestore:', err);
    return false;
  }
}

// 3. Admission Enquiries Operations
export async function getEnquiries(localFallback) {
  if (!isLiveDatabase()) return localFallback;
  try {
    const q = query(collection(firestoreDb, 'enquiries'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const enquiries = [];
    querySnapshot.forEach((docSnap) => {
      enquiries.push({ id: docSnap.id, ...docSnap.data() });
    });
    return enquiries;
  } catch (err) {
    console.error('Error fetching enquiries from Firestore:', err);
    return localFallback;
  }
}

export async function addEnquiry(enq) {
  if (!isLiveDatabase()) return false;
  try {
    const docRef = await addDoc(collection(firestoreDb, 'enquiries'), {
      studentName: enq.studentName,
      parentName: enq.parentName,
      grade: enq.grade,
      mobile: enq.mobile,
      email: enq.email || '',
      notes: enq.notes || '',
      status: enq.status,
      date: enq.date
    });
    return docRef.id;
  } catch (err) {
    console.error('Error saving enquiry to Firestore:', err);
    return false;
  }
}

export async function updateEnquiryStatus(id, status) {
  if (!isLiveDatabase()) return false;
  try {
    const docRef = doc(firestoreDb, 'enquiries', id);
    await updateDoc(docRef, { status: status });
    return true;
  } catch (err) {
    console.error('Error updating enquiry status in Firestore:', err);
    return false;
  }
}

export async function deleteEnquiry(id) {
  if (!isLiveDatabase()) return false;
  try {
    const docRef = doc(firestoreDb, 'enquiries', id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('Error deleting enquiry from Firestore:', err);
    return false;
  }
}
