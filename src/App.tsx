import { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Building2,
  Hospital,
  ShieldCheck,
  GraduationCap,
  School as SchoolIcon,
  MapPin,
  Sparkles,
  BookOpen,
  Phone,
  Compass,
  Store,
  Trees,
  Globe,
  Languages,
  Calendar,
  ChevronRight,
  Info,
  AlertCircle,
  ThumbsUp,
  ExternalLink,
  CheckCircle,
  Clock,
  Train,
  Menu,
  X,
  Send,
  SlidersHorizontal,
  PlusCircle,
  ArrowUpRight,
  Heart
} from 'lucide-react';

import { allDirectoryItems, DirectoryItem } from './data';

const translateNumToBn = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export default function App() {
  // Localization state
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterHighlightedOnly, setFilterHighlightedOnly] = useState<boolean>(false);
  
  // Interactive Stats Auto-Focus Highlight Tracker
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

  // Suggested tags state for quick chips
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Time-based Greetings State
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Feedbacks / Corrections Local State Queue
  const [correctionsList, setCorrectionsList] = useState<Array<{
    id: string;
    itemName: string;
    description: string;
    submittedBy: string;
    date: string;
    status: 'pending' | 'applied';
  }>>([
    {
      id: 'req-1',
      itemName: 'উলিপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
      description: 'অ্যাম্বুলেন্স সার্ভিসের জন্য অতিরিক্ত মোবাইল নম্বর যুক্ত করা হোক।',
      submittedBy: 'মোস্তফা কামাল',
      date: '২০২৬-০৫-১৮',
      status: 'pending'
    }
  ]);

  // Submit Correction Form State
  const [correctionTarget, setCorrectionTarget] = useState<string>('');
  const [correctionDetail, setCorrectionDetail] = useState<string>('');
  const [correctionUser, setCorrectionUser] = useState<string>('');
  const [correctionSuccess, setCorrectionSuccess] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Selected Item details modal state
  const [selectedDetailItem, setSelectedDetailItem] = useState<DirectoryItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [pukurMapTab, setPukurMapTab] = useState<'map' | 'info'>('map');

  // Dynamic Bangladesh Date and Greeting Calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const getBangladeshTimeInfo = () => {
    // Current server time is UTC, we offset for Bangladesh (UTC+6)
    const utcHours = currentTime.getUTCHours();
    const bdHours = (utcHours + 6) % 24;
    
    let greetingBn = 'শুভেচ্ছা';
    let greetingEn = 'Welcome';
    
    if (bdHours >= 5 && bdHours < 12) {
      greetingBn = 'শুভ সকাল';
      greetingEn = 'Good Morning';
    } else if (bdHours >= 12 && bdHours < 15) {
      greetingBn = 'শুভ দুপুর';
      greetingEn = 'Good Afternoon';
    } else if (bdHours >= 15 && bdHours < 18) {
      greetingBn = 'শুভ বিকেল';
      greetingEn = 'Good Evening';
    } else {
      greetingBn = 'শুভ সন্ধ্যা';
      greetingEn = 'Good Evening / Night';
    }

    // Bangla day names
    const bdDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    const enDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = currentTime.getUTCDay();

    // English month names for display
    const formattedDateEn = currentTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedDateBn = `${translateNumToBn(currentTime.getUTCDate())} মে, ২০২৬`;

    return {
      greetingBn,
      greetingEn,
      dayBn: bdDays[dayOfWeek],
      dayEn: enDays[dayOfWeek],
      dateBn: formattedDateBn,
      dateEn: formattedDateEn,
      timeString: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  };

  const bdTimeInfo = getBangladeshTimeInfo();

  // Translation Dictionaries
  const dict = {
    bn: {
      navHome: 'হোম',
      navDirectory: 'সেবা নির্দেশিকা',
      navHistory: 'ইতিহাস ও ঐতিহ্য',
      navCorrection: 'তথ্য সংশোধন',
      heroTitle: 'উলিপুর উপজেলা তথ্য ও সেবা হাব',
      heroSubtitle: 'সবুজ-শ্যামল তিস্তা-ব্রহ্মপুত্র নদীর রূপসী পলি অববাহিকার ঐতিহ্যবাহী ও আধুনিক ডিজিটাল তথ্য কোষ',
      searchPlaceholder: 'নাম, কাজ, স্থান বা কিওয়ার্ড দিয়ে খুঁজুন...',
      searchLabel: 'দ্রুত অনুসন্ধান করুন',
      categoryAll: 'সব তথ্য',
      categoryUnion: 'ইউনিয়ন ও পৌরসভা',
      categoryHealthcare: 'চিকিৎসা ও নিরাপত্তা',
      categoryColleges: 'প্রধান মহাবিদ্যালয়সমূহ (১১টি)',
      categorySchools: 'বিদ্যালয়সমূহ',
      categoryParks: 'লাইব্রেরি ও বিনোদন',
      categoryMarkets: 'বাজার ও বাণিজ্য',
      statUnions: '১৪টি ইউনিয়ন ও পৌরসভা',
      statSchools: '৫০+ উচ্চ বিদ্যালয়',
      statColleges: '১১টি মহাবিদ্যালয়',
      statParks: '১টি ঐতিহাসিক পার্ক',
      btnLanguageToggle: 'English',
      badgeHighlighted: 'জরুরি/গুরুত্বপূর্ণ সেবা',
      estYearLabel: 'প্রতিষ্ঠা সাল',
      locationLabel: 'অবস্থান',
      contactLabel: 'যোগাযোগ/হেল্পলাইন',
      filterTitle: 'ফিল্টার করুন',
      filterReset: 'সব মুছুন',
      allHighlightOnly: 'শুধুমাত্র প্রধান আকর্ষণ ও হেল্পলাইনগুলো দেখান',
      noResults: 'দুঃখিত! অনুসন্ধান অনুযায়ী কোনো তথ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য কিছু খুঁজুন।',
      quickTagsLabel: 'জনপ্রিয় অনুসন্ধান চিপস:',
      picardPukurSpecial: 'প্রধান প্রাকৃতিক আকর্ষণ',
      picardPukurWalkway: 'সম্পূর্ণ সাজানো ওয়াকওয়ে ও কাঠের ঝোলানো সেতু',
      picardPukurWater: 'রঙিন আলোর ঝর্ণাধারা ও সবুজ জলের গভীর মায়া',
      unionsOverviewTitle: 'প্রশাসনিক এলাকা পরিচিতি',
      unionsOverviewDesc: 'উলিপুর উপজেলা কুড়িগ্রাম জেলার অন্যতম প্রাচীন ও সমৃদ্ধ অঞ্চল। এটি ১টি পৌরসভা ও ১৩টি ঐতিহ্যবাহী ইউনিয়ন নিয়ে গঠিত।',
      sidebarTitle: 'প্রয়োজনীয় পরিসংখ্যান ও পরিচিতি',
      sidebarDistance: 'জেলা সদর (কুড়িগ্রাম) থেকে দূরত্ব',
      sidebarDistanceVal: '১৮ কিলোমিটার দক্ষিণ-পূর্বে',
      sidebarTransport: 'যোগাযোগ ব্যবস্থা',
      sidebarTransportVal: 'ঢাকা ও বাংলাদেশের সব প্রান্ত থেকে বাস এবং উলিপুর রেলওয়ে স্টেশন দিয়ে ট্রেন যোগাযোগ রয়েছে।',
      correctionModalTitle: 'তথ্য সংশোধন বা নতুন সংযোজন অনুরোধ',
      correctionModalDesc: 'উলিপুরের কোনো তথ্য পরিবর্তিত হয়ে থাকলে বা নতুন কোনো প্রতিষ্ঠান যুক্ত করতে চাইলে আমাদের জানান। যাচাইপূর্বক আমরা সেটি দ্রুত আপডেট করব।',
      formItemName: 'প্রতিষ্ঠানের নাম বা বিষয়',
      formItemPlaceholder: 'উদা: উলিপুর সরকারি কলেজ বা হাতিয়া ঘাট...',
      formDetail: 'সংশোধনী বা নতুন তথ্যের বিবরণ',
      formDetailPlaceholder: 'ফোন নম্বর পরিবর্তন, নতুন তথ্য যোগ বা ভুল সংশোধন ইত্যাদি বিষদভাবে নির্দেশ করুন...',
      formUser: 'আপনার নাম ও মোবাইল নম্বর',
      formUserPlaceholder: 'উদা: রাসেল মাহমুদ, ০১৭১১-XXXXXX',
      formSubmit: 'অনুরোধ পাঠান',
      formSuccessTitle: 'ধন্যবাদ! আপনার অনুরোধ সফলভাবে গৃহীত হয়েছে।',
      formSuccessDesc: 'পরবর্তী ২৪ ঘণ্টার মধ্যে আমাদের মডারেটর প্যানেল তথ্যটি মিলিয়ে যাচাই করে মূল ডাটাবেজে যুক্ত করবেন।',
      formBtnClose: 'বন্ধ করুন',
      latestRequestsTitle: 'সম্প্রতিক জমা পড়া সংশোধনীসমূহ',
      footerText: 'উলিপুর উপজেলা তথ্য ও সেবা হাব © ২০২৬। উলিপুরের ঐতিহ্য ও উন্নয়ন প্রসারে একটি অলাভজনক নাগরিক উদ্যোগ।',
      footerDev: 'ডিজাইন ও উন্নয়নে: কুড়িগ্রাম কম্পিউটার অ্যান্ড আইসিটি ফোরাম',
      visitOfficial: 'কুড়িগ্রাম বার্তা লিংকে যান',
      parkDescription: 'উলিপুর পিকার্ড পুকুর পার্ক সদরের প্রাণকেন্দ্রে অবস্থিত ঐতিহাসিক বড় দীঘি ও সুসজ্জিত শান্ত পার্ক। এটি স্থানীয় মানুষের বিকেল কাটানো, প্রাতঃভ্রমণ এবং বিনোদনের প্রধান দর্শনীয় স্থান।',
      modalCloseBtn: 'বন্ধ করুন',
      modalEst: 'প্রতিষ্ঠা সাল',
      modalLoc: 'অবস্থান ও ঠিকানা',
      modalPhn: 'যোগাযোগ ও হেল্পলাইন ফোন',
      modalPhotos: 'পিকার্ড পুকুর পার্কের অ্যালবাম ও গ্যালারি',
      modalFeatures: 'প্রধান আকর্ষণ এবং বিবরণ',
      modalCategory: 'বিভাগ',
      cardDetailBtn: 'বিস্তারিত ও গ্যালারি দেখুন ➔',
      clickToExplore: 'পিকার্ড পুকুর পার্কের সুন্দর বাস্তব দৃশ্য ও অ্যালবাম দেখতে এখানে ক্লিক করুন!',
      ulipurMapTitle: 'উলিপুর ম্যাপ 🗺️',
      ulipurMapSubtitle: 'উলিপুর উপজেলার স্যাটেলাইট ও ট্রাফিক মানচিত্র',
      mapModalHeader: 'উলিপুর উপজেলা ইন্টারঅ্যাক্টিভ ম্যাপ'
    },
    en: {
      navHome: 'Home',
      navDirectory: 'Service Directory',
      navHistory: 'History & Tradition',
      navCorrection: 'Submit Correction',
      heroTitle: 'Ulipur Upazila Information Hub',
      heroSubtitle: 'The digital archives of local services, institutions, administrative bodies & commercial markets of Ulipur, Kurigram',
      searchPlaceholder: 'Search by name, work, location, tags...',
      searchLabel: 'Quick Search Engine',
      categoryAll: 'All Directories',
      categoryUnion: 'Unions & Municipality',
      categoryHealthcare: 'Health & Security',
      categoryColleges: 'Top 11 Colleges',
      categorySchools: 'Major Schools',
      categoryParks: 'Libraries & Parks',
      categoryMarkets: 'Markets & Commerce',
      statUnions: '14 Unions & Pourashava',
      statSchools: '50+ High Schools',
      statColleges: '11 Academic Colleges',
      statParks: '1 Iconic Walkway Park',
      btnLanguageToggle: 'বাংলা',
      badgeHighlighted: 'Emergency & Highlighted',
      estYearLabel: 'Est. Year',
      locationLabel: 'Location',
      contactLabel: 'Contact / Helpline',
      filterTitle: 'Filter Directory',
      filterReset: 'Reset Filters',
      allHighlightOnly: 'Show major highlights & crucial emergency helplines only',
      noResults: 'Sorry! No information matches your search query. Please try searching something else.',
      quickTagsLabel: 'Popular Search Tags:',
      picardPukurSpecial: 'Main Natural Attraction of Ulipur',
      picardPukurWalkway: 'Fully illuminated walkway & wooden bypass bridges',
      picardPukurWater: 'Color water fountains & refreshing emerald water body',
      unionsOverviewTitle: 'Administrative Sub-divisions',
      unionsOverviewDesc: 'Ulipur is one of the oldest and largest sub-districts under Kurigram District, composed of 1 Municipality & 13 Unions.',
      sidebarTitle: 'Key Facts & Geography',
      sidebarDistance: 'Distance from District center',
      sidebarDistanceVal: '18 Kilometers South-East',
      sidebarTransport: 'Communication Modes',
      sidebarTransportVal: 'Connected with daily intercity buses from Dhaka, and broad-gauge trains directly to Ulipur Railway Station.',
      correctionModalTitle: 'Add New info or Suggest Correction',
      correctionModalDesc: 'Help us keep the directory up-to-date. If any phone number is changed or you want to insert a missing school/hospital, describe below.',
      formItemName: 'Name of Institution or Topic',
      formItemPlaceholder: 'e.g., Ulipur Govt College or Hatia Ghat...',
      formDetail: 'Detailed amendment/content correction',
      formDetailPlaceholder: 'State clearly which phone number or info needs to be updated or added...',
      formUser: 'Your Name & Mobile Number',
      formUserPlaceholder: 'e.g., Rasel Mahmud, 01711-XXXXXX',
      formSubmit: 'Submit Request',
      formSuccessTitle: 'Thank you! Request Submitted',
      formSuccessDesc: 'Our content moderating group will verify the facts within 24 hours and patch it into the system.',
      formBtnClose: 'Close Page',
      latestRequestsTitle: 'Recent Correction Requests Queue',
      footerText: 'Ulipur Upazila Information Hub © 2026. A non-profitable civic project representing traditional Ulipur Upazila.',
      footerDev: 'Designed & Fostered by: Kurigram Computer & ICT Forum',
      visitOfficial: 'Visit Kurigram News',
      parkDescription: 'Ulipur Picard Pukur Park is a landmark historic giant pond and decorated walkway garden in the heart of Ulipur town. The absolute main hub for relaxing strolls, afternoon jogging, and family recreation.',
      modalCloseBtn: 'Close Details',
      modalEst: 'Established',
      modalLoc: 'Exact Location',
      modalPhn: 'Contact / Hotline',
      modalPhotos: 'Picard Pukur Park Photo Gallery',
      modalFeatures: 'Features & Offerings Info',
      modalCategory: 'Category Group',
      cardDetailBtn: 'View Details & Gallery ➔',
      clickToExplore: 'Click here to explore photos and deep features of Picard Lake Park!',
      ulipurMapTitle: 'Ulipur Map 🗺️',
      ulipurMapSubtitle: 'Satellite & Traffic Map of Ulipur Upazila',
      mapModalHeader: 'Ulipur Upazila Interactive Map'
    }
  }[lang];

  // Helper dictionary to dynamically translate categories
  const categoryMap: Record<string, string> = {
    union: dict.categoryUnion,
    healthcare_security: dict.categoryHealthcare,
    college: dict.categoryColleges,
    school: dict.categorySchools,
    library_park: dict.categoryParks,
    market: dict.categoryMarkets
  };

  // Helper to get corresponding tab code based on string
  const handleStatClick = (statType: 'unions' | 'schools' | 'colleges' | 'parks') => {
    setSelectedTag(null);
    setSearchQuery('');
    
    if (statType === 'unions') {
      setActiveTab('union');
      scrollToSection('directory-container');
    } else if (statType === 'schools') {
      setActiveTab('school');
      scrollToSection('directory-container');
    } else if (statType === 'colleges') {
      setActiveTab('college');
      scrollToSection('directory-container');
    } else if (statType === 'parks') {
      setActiveTab('library_park');
      setFocusedItemId('park-1'); // Auto focus on Picard Pukur Park code!
      scrollToSection('directory-container');
      // Trigger a light 3-second focus highlighter pulse
      setTimeout(() => {
        setFocusedItemId(null);
      }, 5000);
    }
  };

  // Safe smoother scrolling helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return allDirectoryItems.filter((item) => {
      // 1. Tab / Category Filter
      if (activeTab !== 'all' && item.category !== activeTab) {
        return false;
      }

      // 2. Highlighted Only filter
      if (filterHighlightedOnly && !item.isHighlighted) {
        return false;
      }

      // 3. Tag Filter (from quick chips)
      if (selectedTag && !item.tags.includes(selectedTag)) {
        return false;
      }

      // 4. Search text filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesNameBn = item.nameBn.toLowerCase().includes(query);
        const matchesNameEn = item.nameEn.toLowerCase().includes(query);
        const matchesDetailsBn = item.detailsBn.toLowerCase().includes(query);
        const matchesDetailsEn = item.detailsEn.toLowerCase().includes(query);
        const matchesLocBn = item.locationBn.toLowerCase().includes(query);
        const matchesLocEn = item.locationEn.toLowerCase().includes(query);
        
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        
        return (
          matchesNameBn ||
          matchesNameEn ||
          matchesDetailsBn ||
          matchesDetailsEn ||
          matchesLocBn ||
          matchesLocEn ||
          matchesTags
        );
      }

      return true;
    });
  }, [activeTab, filterHighlightedOnly, selectedTag, searchQuery]);

  // Handle Form Submission
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!correctionTarget || !correctionDetail || !correctionUser) {
      alert(lang === 'bn' ? 'দয়া করে সবগুলো ঘর পূরণ করুন।' : 'Please fill standard required fields.');
      return;
    }

    const newRequest = {
      id: 'req-' + Date.now(),
      itemName: correctionTarget,
      description: correctionDetail,
      submittedBy: correctionUser,
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const
    };

    setCorrectionsList([newRequest, ...correctionsList]);
    setCorrectionSuccess(true);
    setCorrectionTarget('');
    setCorrectionDetail('');
    setCorrectionUser('');

    // Highlight submitted request visually, auto close after brief timeout
    setTimeout(() => {
      setCorrectionSuccess(false);
      setIsFormOpen(false);
    }, 4000);
  };

  // Helper to fetch images dynamically for selected map items
  const getItemImages = (item: DirectoryItem): string[] => {
    // All categories have images disabled as per user requests
    return [];
  };

  // Get most unique tags for search assist
  const popularTags = lang === 'bn' 
    ? ['হাসপাতাল', 'থানা', 'শতবর্ষী', 'বিখ্যাত', 'পুকুর', 'তিস্তা', 'চর', 'পৌরসভা', 'মেয়েদের স্কুল']
    : ['hospital', 'police', 'historical', 'scenic', 'river', 'college', 'market', 'agriculture', 'girls'];

  return (
    <div className="min-h-screen bg-[#fafcfb] text-slate-800 font-sans flex flex-col selection:bg-forest-600 selection:text-white">
      {/* Dynamic Upper Accent Bar */}
      <div className="bg-forest-800 text-amber-100/90 text-xs py-2 px-4 shadow-sm border-b border-forest-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 text-center sm:text-left">
          <div className="flex items-center space-x-2 font-medium">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {lang === 'bn'
                ? `গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের কুড়িগ্রাম জেলার একটিঐতিহ্যবাহী উপজেলা | ${bdTimeInfo.greetingBn}`
                : `Official District Registry | ${bdTimeInfo.greetingEn}`}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-amber-200 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {lang === 'bn'
                  ? `${translateNumToBn(bdTimeInfo.timeString)} (বাংলাদেশ সময়)`
                  : `${bdTimeInfo.timeString} (BST)`}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-1 font-semibold text-amber-300">
              <span className="text-xs">
                {lang === 'bn'
                  ? `${bdTimeInfo.dayBn}, ${bdTimeInfo.dateBn}`
                  : `${bdTimeInfo.dayEn}, ${bdTimeInfo.dateEn}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Styled Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-18">
            {/* Logo Brand Brand */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-3 cursor-pointer" 
              onClick={() => scrollToSection('home-hero')}
            >
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-300 flex items-center justify-center font-bold text-lg shadow-md border-2 border-emerald-300">
                উ
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-forest-900 text-lg tracking-tight leading-tight">
                  {lang === 'bn' ? 'উলিপুর উপজেলা হাব' : 'Ulipur Info Hub'}
                </span>
                <span className="text-forest-600 text-xs font-semibold tracking-wider uppercase">
                  {lang === 'bn' ? 'উলিপুর, কুড়িগ্রাম' : 'Ulipur, Kurigram'}
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 78, 59, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                  setSelectedTag(null);
                  scrollToSection('home-hero');
                }}
                className="text-slate-600 hover:text-forest-800 px-4 py-2 rounded-lg font-medium transition cursor-pointer"
              >
                {dict.navHome}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 78, 59, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('directory-container')}
                className="text-slate-600 hover:text-forest-800 px-4 py-2 rounded-lg font-medium transition cursor-pointer"
              >
                {dict.navDirectory}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 78, 59, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsFormOpen(true);
                  scrollToSection('feedback-form-section');
                }}
                className="text-slate-600 hover:text-forest-800 px-4 py-2 rounded-lg font-medium transition cursor-pointer"
              >
                {dict.navCorrection}
              </motion.button>

              {/* Ulipur Map Button */}
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#047857", color: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMapModalOpen(true)}
                className="text-emerald-800 border border-emerald-200/50 hover:border-transparent px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1 cursor-pointer shadow-sm ml-2 bg-emerald-50/50 text-xs transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white shrink-0" />
                <span>{dict.ulipurMapTitle}</span>
              </motion.button>

              {/* Language Switcher Button */}
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#022c22" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="ml-4 flex items-center space-x-1 bg-forest-900 text-gold-200 border border-emerald-300/30 text-xs px-3.5 py-2 rounded-full font-bold shadow-sm cursor-pointer"
                aria-label="Toggle language preference"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{dict.btnLanguageToggle}</span>
              </motion.button>
            </div>

            {/* Mobile menu and Language toggle buttons */}
            <div className="flex xl:hidden items-center space-x-2 md:hidden">
              <button
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="flex items-center space-x-1 bg-forest-900 text-gold-100 text-xs px-2.5 py-1.5 rounded-full font-bold cursor-pointer"
              >
                <Languages className="w-3 h-3" />
                <span>{dict.btnLanguageToggle}</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown with staggered drawer items */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-emerald-100 overflow-hidden shadow-inner"
            >
              <div className="px-4 pt-3 pb-4 space-y-1.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchQuery('');
                    setActiveTab('all');
                    scrollToSection('home-hero');
                  }}
                  className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-lg text-slate-700 hover:bg-forest-50 hover:text-forest-900"
                >
                  {dict.navHome}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection('directory-container');
                  }}
                  className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-lg text-slate-700 hover:bg-forest-50 hover:text-forest-900"
                >
                  {dict.navDirectory}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsFormOpen(true);
                    scrollToSection('feedback-form-section');
                  }}
                  className="block w-full text-left px-4 py-2.5 text-base font-medium rounded-lg text-slate-700 hover:bg-forest-50 hover:text-forest-900"
                >
                  {dict.navCorrection}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsMapModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2.5 text-base font-bold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{dict.ulipurMapTitle}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Header Section */}
      <header
        id="home-hero"
        className="relative bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 text-white min-h-[480px] flex items-center pb-20 pt-16 clip-path-slant-sm overflow-hidden"
      >
        {/* Abstract Golden Water & Forest Background Glow Elements */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-[130px] pointer-events-none"></div>
        
        {/* Subtle diagonal line pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#041f12_12%,transparent_12%,transparent_50%,#041f12_50%,#041f12_62%,transparent_62%,transparent_100%)] bg-[size:30px_30px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Title & Banner Description */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-emerald-900/40 text-emerald-300 border border-emerald-600/30 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>{lang === 'bn' ? 'নতুন ডিজিটাল সেবা হাব ২০২৬' : 'Modernized Citizen Hub 2026'}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2]"
              >
                {lang === 'bn' ? (
                  <>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-300 to-amber-200">
                      উলিপুর উপজেলা
                    </span>
                    <br />
                    তথ্য ও সেবা কেন্দ্র
                  </>
                ) : (
                  <>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-300 to-amber-200">
                      Ulipur Upazila
                    </span>
                    <br />
                    Information Hub
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-emerald-100/90 text-md sm:text-lg max-w-2xl leading-relaxed"
              >
                {dict.heroSubtitle}
              </motion.p>

              {/* Real-time search element built directly inside hero for seamless UX */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="max-w-xl relative"
              >
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    scrollToSection('directory-container');
                  }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5.5 w-5.5 text-emerald-300" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedTag(null); // Reset tag filters when typing
                    }}
                    placeholder={dict.searchPlaceholder}
                    className="block w-full pl-12 pr-12 py-4 text-base bg-white/10 backdrop-blur-md text-white placeholder-emerald-200/60 rounded-2xl border-2 border-emerald-500/30 focus:border-gold-400 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/25 shadow-xl transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-200 hover:text-white"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5 text-slate-500 focus:text-slate-800 hover:text-rose-600 transition-colors" />
                    </button>
                  )}
                </form>

                {/* Dynamic Floating Autocomplete Suggestions Dropdown Panel */}
                <AnimatePresence>
                  {searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2 text-slate-800"
                    >
                      <div className="px-3 py-2 text-[11px] font-bold text-slate-400 tracking-wider uppercase flex justify-between items-center border-b border-slate-50">
                        <span className="flex items-center gap-1">
                          🔍 {lang === 'bn' ? 'তাৎক্ষণিক মিলসমূহ' : 'Instant Matches'}
                        </span>
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold">
                          {lang === 'bn' ? `${translateNumToBn(filteredItems.slice(0, 5).length)} টি পাওয়া গেছে` : `${filteredItems.slice(0, 5).length} found`}
                        </span>
                      </div>
                      
                      {filteredItems.length === 0 ? (
                        <div className="px-4 py-8 text-center text-slate-500">
                          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-pulse" />
                          <p className="text-xs font-bold text-slate-700">
                            {lang === 'bn' ? 'দুঃখিত, কোনো মিল পাওয়া যায়নি!' : 'No entries match this search!'}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {lang === 'bn' ? 'অন্য কীওয়ার্ড যেমন "১০ তলা", "হাসপাতাল" বা "পুকুর" লিখে দেখুন।' : 'Try searching for terms like "10 tala", "hospital" or "pukur"'}
                          </p>
                        </div>
                      ) : (
                        <div className="max-h-[280px] overflow-y-auto divide-y divide-slate-50">
                          {filteredItems.slice(0, 5).map((item) => {
                            const iconMap: Record<string, any> = {
                              union: Building2,
                              healthcare_security: Hospital,
                              college: GraduationCap,
                              school: SchoolIcon,
                              library_park: Trees,
                              market: Store
                            };
                            const ItemIcon = iconMap[item.category] || Globe;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setSelectedDetailItem(item);
                                  setFocusedItemId(item.id);
                                  setActiveTab('all');
                                  scrollToSection('directory-container');
                                  setTimeout(() => {
                                    setFocusedItemId(null);
                                  }, 5000);
                                }}
                                className="w-full text-left p-3 hover:bg-forest-50/50 rounded-xl transition flex items-center justify-between group cursor-pointer"
                              >
                                <div className="flex items-center space-x-3 min-w-0 pr-2">
                                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 font-bold group-hover:bg-forest-800 group-hover:text-gold-200 transition-colors">
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-extrabold text-xs text-forest-950 truncate flex items-center gap-1 group-hover:text-forest-700">
                                      {lang === 'bn' ? item.nameBn : item.nameEn}
                                      {item.isHighlighted && <span className="text-gold-500 text-[10px]">★</span>}
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                                      📍 {lang === 'bn' ? item.locationBn : item.locationEn}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold bg-slate-50 text-emerald-800 px-2.5 py-1 rounded-lg shrink-0 border border-emerald-100 group-hover:bg-forest-800 group-hover:text-white group-hover:border-transparent transition-all">
                                  {lang === 'bn' ? 'উন্মুক্ত করুন' : 'Open'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      
                      {filteredItems.length > 5 && (
                        <div className="p-2 px-3 border-t border-slate-50 text-center bg-slate-50/50 rounded-b-xl">
                          <button 
                            type="button"
                            onClick={() => scrollToSection('directory-container')}
                            className="text-[11px] font-bold text-forest-800 hover:text-emerald-700 transition underline underline-offset-2 cursor-pointer"
                          >
                            {lang === 'bn' 
                              ? `আরও ${translateNumToBn(filteredItems.length - 5)} টি ফলাফল নিচে তালিকাভুক্ত আছে` 
                              : `View ${filteredItems.length - 5} more results below`}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Popular Tags Quick Chips Helper */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-emerald-200/80 mr-1">{dict.quickTagsLabel}</span>
                  {popularTags.slice(0, 5).map((tg) => {
                    const mappedTag = lang === 'bn' 
                      ? (tg === 'হাসপাতাল' ? ['hospital', 'সরকারি হাসপাতাল'] : tg === 'থানা' ? ['police', 'thana'] : tg === 'শতবর্ষী' ? ['historical'] : tg === 'পুকুর' ? ['picard pukur', 'পিকার্ড পুকুর'] : ['river', 'তিস্তা'])
                      : tg;
                    const isSelect = selectedTag === String(mappedTag);
                    return (
                      <button
                        key={tg}
                        onClick={() => {
                          // Clean mapping for Bangla inputs
                          if (lang === 'bn') {
                            if (tg === 'হাসপাতাল') {
                              setSelectedTag('hospital');
                            } else if (tg === 'থানা') {
                              setSelectedTag('police');
                            } else if (tg === 'শতবর্ষী') {
                              setSelectedTag('historical');
                            } else if (tg === 'পুকুর') {
                              setSelectedTag('picard pukur');
                            } else if (tg === 'তিস্তা') {
                              setSelectedTag('তিস্তা');
                            } else {
                              setSelectedTag(tg);
                            }
                          } else {
                            setSelectedTag(tg);
                          }
                          setSearchQuery('');
                          scrollToSection('directory-container');
                        }}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all border font-semibold ${
                          isSelect
                            ? 'bg-gold-400 text-forest-950 border-gold-300 shadow-md scale-105'
                            : 'bg-white/5 text-emerald-200 border-white/10 hover:bg-white/15'
                        }`}
                      >
                        #{tg}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Showcase Badge & Image / Map Vector Box */}
            <div className="lg:col-span-5 flex justify-center py-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative bg-emerald-900/30 border border-emerald-500/20 p-6 rounded-3xl backdrop-blur-md w-full max-w-md shadow-2xl"
              >
                {/* Embedded Map/Fact Widget */}
                <h3 className="font-bold text-lg text-gold-300 border-b border-emerald-500/20 pb-2 mb-4 flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-gold-400" />
                  <span>{dict.sidebarTitle}</span>
                </h3>

                <ul className="space-y-4 text-xs tracking-wide">
                  <li className="flex items-start space-x-3">
                    <div className="p-1 px-2 rounded-lg bg-emerald-800/40 text-emerald-300 mt-0.5 font-bold font-mono">01</div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{dict.sidebarDistance}</h4>
                      <p className="text-emerald-100/80 text-xs mt-0.5">{dict.sidebarDistanceVal}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="p-1 px-2 rounded-lg bg-emerald-800/40 text-emerald-300 mt-0.5 font-bold font-mono">02</div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{dict.sidebarTransport}</h4>
                      <p className="text-emerald-100/80 text-xs mt-0.5">{dict.sidebarTransportVal}</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="p-1 px-2 rounded-lg bg-emerald-800/40 text-emerald-300 mt-0.5 font-bold font-mono">03</div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === 'bn' ? 'ভূগোল ও জলবায়ু' : 'Geography & Rivers'}
                      </h4>
                      <p className="text-emerald-100/80 text-xs mt-0.5">
                        {lang === 'bn' 
                          ? 'তিস্তা, ধরলা এবং ব্রহ্মপুত্র নদী বাহিত চরাঞ্চল দ্বারা পরিবেষ্টিত।'
                          : 'Bounded deeply by the dynamic flows of Teesta, Dharla & Brahmaputra waterways.'}
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-5 pt-4 border-t border-emerald-500/10 flex justify-between items-center text-xs text-amber-200/80">
                  <span>{lang === 'bn' ? 'জেলা: কুড়িগ্রাম' : 'District: Kurigram'}</span>
                  <span>{lang === 'bn' ? 'বিভাগ: রংপুর' : 'Division: Rangpur'}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Counter Section - Clickable and Navigable! */}
      <section className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              id: 'unions',
              label: dict.statUnions,
              subLabel: lang === 'bn' ? 'প্রশাসনিক এলাকা' : 'Admin Divisions',
              val: '১৪',
              engVal: '14',
              icon: Building2,
              color: 'from-emerald-800 to-emerald-900',
              hoverGlow: 'hover:shadow-emerald-900/40'
            },
            {
              id: 'schools',
              label: dict.statSchools,
              subLabel: lang === 'bn' ? 'মাধ্যমিক ও প্রাথমিক' : 'High & Primary',
              val: '৫০+',
              engVal: '50+',
              icon: SchoolIcon,
              color: 'from-forest-700 to-emerald-800',
              hoverGlow: 'hover:shadow-forest-800/40'
            },
            {
              id: 'colleges',
              label: dict.statColleges,
              subLabel: lang === 'bn' ? '১ম শ্রেনী ও ডিগ্রী' : 'Honours & Degree',
              val: '১১টি',
              engVal: '11',
              icon: GraduationCap,
              color: 'from-forest-600 to-forest-700',
              hoverGlow: 'hover:shadow-forest-700/40'
            },
            {
              id: 'parks',
              label: dict.statParks,
              subLabel: lang === 'bn' ? 'পিকার্ড পুকুর ওয়াকওয়ে' : 'Historic Picard Pukur',
              val: '১টি',
              engVal: '1',
              icon: Trees,
              color: 'from-emerald-500 to-forest-600',
              hoverGlow: 'hover:shadow-emerald-500/40',
              hasGlow: true
            }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.button
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 120, damping: 15 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleStatClick(stat.id as any)}
                className={`group text-left p-4 sm:p-5 rounded-3xl bg-white border border-emerald-100 shadow-lg hover:shadow-xl transition-all ${stat.hoverGlow} flex flex-col justify-between max-h-[170px] relative overflow-hidden`}
              >
                {/* Active ripple background effect on stat hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex justify-between items-start w-full">
                  <div className={`p-2.5 rounded-xl bg-forest-50 text-forest-800 group-hover:bg-forest-900 group-hover:text-gold-200 transition-colors ${stat.hasGlow ? 'ripple-glow bg-emerald-100 text-emerald-900' : ''}`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-slate-300 group-hover:text-forest-600 text-xs font-mono font-bold flex items-center gap-0.5">
                    {lang === 'bn' ? 'কুড়িগ্রাম' : 'Kurigram'}
                    <Compass className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="text-2xl sm:text-3.5xl font-black text-forest-900 font-sans tracking-tight leading-none">
                    {lang === 'bn' ? stat.val : stat.engVal}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-forest-800 tracking-tight transition-colors line-clamp-1 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">
                    {stat.subLabel}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Primary Directory Showcase Container */}
      <main id="directory-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow">
        
        {/* Upper Directory Layout Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-900 tracking-tight flex items-center justify-center gap-2">
            <Compass className="w-7 h-7 text-emerald-600 animate-spin-slow" />
            <span>{lang === 'bn' ? 'সেবা ও প্রতিষ্ঠান নির্দেশিকা' : 'Service Directory Board'}</span>
          </h2>
          <p className="mt-3 text-slate-500 text-md">
            {lang === 'bn' 
              ? 'নিচের ক্যাটাগরি ট্যাবগুলো ব্যবহার করে সহজে তথ্যগুলো ফিল্টার করুন। অনুসন্ধান বক্সে তথ্য টাইপ করতে পারেন।'
              : 'Easily toggle between tabs or search to find schools, hospital, emergency desks, and local unions.'}
          </p>
        </div>

        {/* Dynamic Navigation Tabs System */}
        <div className="bg-white p-2 sm:p-3 rounded-2xl sm:rounded-full shadow-md border border-emerald-500/10 mb-8 max-w-5xl mx-auto flex flex-wrap justify-center gap-1 relative z-10">
          {[
            { id: 'all', labelBn: 'সব তথ্য', labelEn: 'All Infos', icon: Globe },
            { id: 'union', labelBn: 'ইউনিয়ন ও পৌরসভা', labelEn: 'Unions', icon: Building2 },
            { id: 'healthcare_security', labelBn: 'চিকিৎসা ও নিরাপত্তা', labelEn: 'Medical & Help', icon: Hospital },
            { id: 'college', labelBn: 'মহাবিদ্যালয়সমূহ (১১)', labelEn: 'Colleges', icon: GraduationCap },
            { id: 'school', labelBn: 'বিদ্যালয়সমূহ', labelEn: 'Schools', icon: SchoolIcon },
            { id: 'library_park', labelBn: 'বিনোদন ও পার্ক', labelEn: 'Culture & Parks', icon: Trees },
            { id: 'market', labelBn: 'বাজার ও হাট', labelEn: 'Bazaars & Commerce', icon: Store }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedTag(null); // Clear tag selection when tab is changed
                  setSearchQuery(''); // Reset search text for a clean view
                }}
                className={`relative flex items-center space-x-1.5 px-4 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'text-gold-200 z-10 scale-102 font-black'
                    : 'text-slate-600 hover:text-forest-900 hover:bg-forest-50/40 z-10'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-forest-800 rounded-xl sm:rounded-full shadow-md border-b-2 border-amber-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-gold-300' : 'text-slate-400'}`} />
                <span>{lang === 'bn' ? tab.labelBn : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filtrations overview banner (If any filters applied) */}
        {(searchQuery || filterHighlightedOnly || selectedTag) && (
          <div className="bg-forest-50/80 border border-forest-100 rounded-2xl p-4 mb-8 max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs lg:text-sm">
              <span className="font-bold text-forest-900">
                {lang === 'bn' ? 'সক্রিয় ফিল্টারসমূহ:' : 'Applied Filters:'}
              </span>
              
              {searchQuery && (
                <span className="bg-white border border-forest-200 text-forest-800 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  🔍 "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-rose-600 font-bold font-mono">×</button>
                </span>
              )}

              {selectedTag && (
                <span className="bg-white border border-amber-200 text-amber-800 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  🏷️ #{selectedTag}
                  <button onClick={() => setSelectedTag(null)} className="text-slate-400 hover:text-rose-600 font-bold font-mono">×</button>
                </span>
              )}

              {filterHighlightedOnly && (
                <span className="bg-white border border-emerald-200 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  🔥 {lang === 'bn' ? 'জরুরি/প্রধান সেবা শুধু' : 'Highlights Only'}
                  <button onClick={() => setFilterHighlightedOnly(false)} className="text-slate-400 hover:text-rose-600 font-bold font-mono">×</button>
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
                setFilterHighlightedOnly(false);
              }}
              className="text-xs font-bold text-amber-700 hover:text-rose-800 transition underline underline-offset-2"
            >
              {dict.filterReset}
            </button>
          </div>
        )}

        {/* Highlighted services filter toggle button checkbox */}
        <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
          <label className="inline-flex items-center space-x-2.5 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/50 px-4 py-2 rounded-xl cursor-pointer select-none transition">
            <input
              type="checkbox"
              checked={filterHighlightedOnly}
              onChange={() => setFilterHighlightedOnly(!filterHighlightedOnly)}
              className="rounded text-forest-600 focus:ring-forest-500 w-4.5 h-4.5 cursor-pointer accent-forest-700"
            />
            <span className="text-xs md:text-sm font-bold text-slate-700">
              {dict.allHighlightOnly}
            </span>
          </label>
          <span className="text-xs font-mono font-bold text-slate-400">
            {lang === 'bn' 
              ? `মোট প্রাপ্ত সংখ্যা: ${translateNumToBn(filteredItems.length)}` 
              : `Found items: ${filteredItems.length}`}
          </span>
        </div>

        {/* Grid Container for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isPukur = item.id === 'park-1';
              const isHosp = item.id === 'health-1';
              const isPolice = item.id === 'police-1';
              const isMuni = item.id === 'muni-1';
              const isUnderFocus = focusedItemId === item.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ 
                    scale: 1.025,
                    y: -5,
                    boxShadow: "0px 14px 28px rgba(4, 31, 18, 0.08)",
                    borderColor: "#10b981"
                  }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  key={item.id}
                  id={`card-${item.id}`}
                  onClick={(e) => {
                    // Prevent triggering modal if clicking links, phone triggers, or specific buttons
                    if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('.tag-span')) {
                      return;
                    }
                    setSelectedDetailItem(item);
                    setActiveImageIndex(0);
                  }}
                  className={`relative rounded-3xl bg-white border p-6 flex flex-col justify-between cursor-pointer transition-colors ${
                    isPukur
                      ? 'border-emerald-400 shadow-[0_10px_30px_rgba(22,163,101,0.15)] ring-2 ring-emerald-400/25'
                      : item.isHighlighted
                      ? 'border-amber-300 shadow-lg'
                      : 'border-slate-100 shadow-sm'
                  } ${
                    isUnderFocus 
                      ? 'ring-4 ring-gold-400 shadow-xl border-amber-400' 
                      : ''
                  }`}
                >
                  {/* Picard Pukur Floating Badge / Water Waves Design Detail */}
                  {isPukur && (
                    <div className="absolute top-0 right-0 -mr-1 -mt-2 bg-gradient-to-r from-emerald-600 to-forest-800 text-gold-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      ★ {dict.picardPukurSpecial}
                    </div>
                  )}

                  {/* Top card metadata info */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold bg-forest-50 text-forest-800 rounded-lg px-2.5 py-1 tracking-wider uppercase border border-forest-100/55">
                        {categoryMap[item.category] || item.category}
                      </span>
                      {item.estYear && (
                        <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1 font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {dict.estYearLabel}: {lang === 'bn' ? translateNumToBn(item.estYear) : item.estYear}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Landmark Card Title styling */}
                    <div className="mb-2">
                      <h3 className="text-lg font-extrabold text-forest-950 flex items-baseline gap-1">
                        {lang === 'bn' ? item.nameBn : item.nameEn}
                        {item.isHighlighted && (
                          <span className="text-gold-500 font-bold" title="গুরুত্বপূর্ণ সেবা">★</span>
                        )}
                      </h3>
                      {lang === 'bn' ? (
                        <div className="text-[11px] font-bold text-slate-300 tracking-wide font-mono uppercase">
                          {item.nameEn}
                        </div>
                      ) : (
                        <div className="text-[11px] font-bold text-slate-400 tracking-wide font-mono uppercase">
                          {item.nameBn}
                        </div>
                      )}
                    </div>

                    {/* Main detail text */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4">
                      {lang === 'bn' ? item.detailsBn : item.detailsEn}
                    </p>

                    {/* Extra detail highlighting especially for Picard Pukur & Emergency Complex */}
                    {item.extraInfoBn && (
                      <div className="mb-4 bg-emerald-50/50 border border-emerald-100/60 rounded-2xl p-3 text-xs text-forest-900 font-medium">
                        <strong className="text-[10px] font-bold text-forest-800 block mb-1 uppercase tracking-wide">
                          {lang === 'bn' ? 'বিশেষ সেবাসমূহ ও বৈশিষ্ট্য:' : 'Highlights / Unique Traits:'}
                        </strong>
                        <p className="leading-relaxed">
                          {lang === 'bn' ? item.extraInfoBn : item.extraInfoEn}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom section housing contact / geographical location */}
                  <div className="border-t border-slate-50 pt-4 mt-2 space-y-2.5 text-xs">
                    {/* Location element */}
                    <div className="flex items-start space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-slate-400">{dict.locationLabel}:</strong>{' '}
                        {lang === 'bn' ? item.locationBn : item.locationEn}
                      </span>
                    </div>

                    {/* Direct Helpline helpline dialing wrapper */}
                    {item.contact && (
                      <div className="flex items-center space-x-2 text-slate-700 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/15 p-2 rounded-xl transition cursor-pointer">
                        <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                        <div className="flex-grow">
                          <strong className="text-[10px] text-slate-400 block -mb-0.5">{dict.contactLabel}:</strong>
                          {item.contact.includes('-') || item.contact.match(/\d+/) ? (
                            <a
                              href={`tel:${item.contact.replace(/[^\d+]/g, '')}`}
                              onClick={(e) => e.stopPropagation()}
                              className="font-mono text-xs font-bold text-slate-800 hover:text-emerald-700 transition"
                            >
                              {lang === 'bn' ? translateNumToBn(item.contact) : item.contact}
                            </a>
                          ) : (
                            <span className="font-semibold text-slate-800">
                              {item.contact}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Simple tag indicators */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-slate-50 mt-1">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 hover:bg-emerald-100 hover:text-emerald-950 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded transition cursor-pointer tag-span"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search results message fallback section */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white border border-slate-100 rounded-3xl max-w-lg mx-auto"
          >
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-bounce" />
            <h3 className="font-bold text-lg text-slate-800 mb-2">
              {lang === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No entries found'}
            </h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-5">
              {dict.noResults}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
                setFilterHighlightedOnly(false);
                setActiveTab('all');
              }}
              className="bg-forest-800 hover:bg-forest-900 text-gold-200 text-xs px-5 py-2.5 rounded-xl font-bold transition"
            >
              {lang === 'bn' ? 'সব তথ্য রিসেট করুন' : 'Clear all search filters'}
            </button>
          </motion.div>
        )}
      </main>

      {/* Specialty Highlight - Ulipur Picard Pukur Park Showcase Section */}
      <section className="bg-gradient-to-tr from-forest-950 to-forest-900 text-white py-16 relative overflow-hidden clip-path-slant-sm z-10 -mt-10">
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text explanation with decorative graphics */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-700/30 text-emerald-300 border border-emerald-500/20 text-xs px-3.5 py-1.5 rounded-full font-bold">
                <Trees className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? 'প্রধান স্থানীয় আকর্ষণ' : 'Top Local Highlight'}</span>
              </div>

              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-tight">
                {lang === 'bn' ? 'উলিপুর পিকার্ড পুকুর পার্ক' : 'Ulipur Picard Pukur Park'}
              </h2>

              <p className="text-emerald-100/80 leading-relaxed text-base">
                {dict.parkDescription}
              </p>

              <div className="space-y-3.5">
                {[
                  dict.picardPukurWalkway,
                  dict.picardPukurWater,
                  lang === 'bn' ? 'প্রাতঃভ্রমণ ও বিকেল কাটানোর সেরা মনোরম পরিবেশ' : 'Calm, refreshing atmosphere for local jogging or morning walkthroughs'
                ].map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm text-emerald-100/95 font-medium">
                    <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveTab('library_park');
                  setFocusedItemId('park-1');
                  scrollToSection('directory-container');
                  setTimeout(() => setFocusedItemId(null), 5000);
                }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-forest-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-amber-500/20 transition-all hover:scale-102 mt-4 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'ডাইরেকটরিতে পার্কটি দেখুন' : 'Explore Park in Directory'}</span>
                <ChevronRight className="w-4 h-4 text-forest-950" />
              </button>
            </div>

            {/* Right side beautifully styled card replica with interactive map integration */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="bg-white/10 p-2 sm:p-3 rounded-3xl backdrop-blur-md border border-white/10 w-full max-w-lg shadow-2xl relative flex flex-col space-y-3">
                {/* Embedded Map & Info Tab Switcher */}
                <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 self-center">
                  <button
                    onClick={() => setPukurMapTab('map')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all relative cursor-pointer ${
                      pukurMapTab === 'map' ? 'text-gold-200' : 'text-emerald-200 hover:text-white'
                    }`}
                  >
                    {pukurMapTab === 'map' && (
                      <motion.div
                        layoutId="pukurTabBg"
                        className="absolute inset-0 bg-forest-800 rounded-lg border border-emerald-500/20 shadow-md animate-none"
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      {lang === 'bn' ? 'বাস্তব মানচিত্র 🗺️' : 'Live Satellite Map'}
                    </span>
                  </button>
                  <button
                    onClick={() => setPukurMapTab('info')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all relative cursor-pointer ${
                      pukurMapTab === 'info' ? 'text-gold-200' : 'text-emerald-200 hover:text-white'
                    }`}
                  >
                    {pukurMapTab === 'info' && (
                      <motion.div
                        layoutId="pukurTabBg"
                        className="absolute inset-0 bg-forest-800 rounded-lg border border-emerald-500/20 shadow-md animate-none"
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {lang === 'bn' ? 'তথ্য ও ইতিহাস ℹ️' : 'Park Info & Stats'}
                    </span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {pukurMapTab === 'map' ? (
                    <motion.div
                      key="pukur-map-view"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="w-full relative rounded-2xl overflow-hidden border border-emerald-500/20 bg-slate-900 shadow-inner h-[280px] sm:h-[320px]"
                    >
                      {/* Embedded Google Maps Satellite View of Picard Pond, Ulipur */}
                      <iframe
                        title="Picard Pukur Lake Park Map"
                        src="https://maps.google.com/maps?q=Picard%20Pond,%20Ulipur,%20Kurigram&t=k&z=18&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full border-0 absolute inset-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      {/* Floating Location Overlay badge */}
                      <div className="absolute bottom-3 left-3 bg-forest-950/90 text-gold-200 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-400/20 text-[10px] font-semibold flex items-center gap-1.5 shadow-lg pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                        <span>{lang === 'bn' ? '🛰️ বাস্তব উপগ্রহ অবস্থান' : '🛰️ Satellite Active'}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pukur-info-view"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="bg-forest-900 rounded-2xl p-6 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between relative overflow-hidden border border-emerald-500/20 shadow-inner w-full"
                    >
                      {/* Styled Background Ripple Animation Circles */}
                      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-emerald-500/40 animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-emerald-500/20 animate-pulse delay-500"></div>
                      </div>

                      <div className="relative z-10 flex justify-between items-start">
                        <div className="bg-emerald-600/40 text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {lang === 'bn' ? 'ঐতিহাসিক বড় দীঘি' : 'Grand Heritage Pond'}
                        </div>
                        <div className="text-gold-300 font-bold text-xs flex items-center space-x-1">
                          <span>{lang === 'bn' ? 'সদর, উলিপুর' : 'Sadar, Ulipur'}</span>
                        </div>
                      </div>

                      <div className="relative z-10 py-6 text-center">
                        <span className="text-gold-200 text-3xl font-black block font-sans tracking-wide">
                          পিকার্ড পুকুর পার্ক
                        </span>
                        <span className="text-emerald-300/80 text-xs block mt-1 tracking-wider uppercase font-mono">
                          Picard Pukur Lake Park
                        </span>
                      </div>

                      <div className="relative z-10 border-t border-emerald-500/20 pt-4 flex justify-between text-[11px] text-emerald-200 font-medium">
                        <span>{lang === 'bn' ? 'ওয়াকওয়ে: নির্মিত ২০২০' : 'Walkway rebuilt 2020'}</span>
                        <span>{lang === 'bn' ? 'অবস্থান: থানা সংলগ্ন' : 'Near police terminal'}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sub title helper inside container */}
                <div className="p-3 text-[11px] text-slate-300 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between space-x-2">
                  <span>
                    {lang === 'bn' 
                      ? '📍 বাটন ট্যাপ করে স্যাটেলাইট ম্যাপ ও তথ্য পরিবর্তন করুন' 
                      : '📍 Tap the buttons above to toggle between Satellite Map & Stats'}
                  </span>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Verification submission section */}
      <section id="feedback-form-section" className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Informational Guidelines column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 border border-amber-200 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'bn' ? 'তথ্য যাচাই ও আধুনিকায়ন' : 'Data Integrity & Submissions'}</span>
              </div>

              <h2 className="text-3xl font-extrabold text-forest-950 tracking-tight leading-tight">
                {dict.correctionModalTitle}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                {dict.correctionModalDesc}
              </p>

              {/* Informational Card showing the workflow of how information is corrected offline / verified */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-forest-900 border-b border-slate-100 pb-2 flex items-center gap-1.5">
                  <Info className="w-4.5 h-4.5 text-emerald-600" />
                  <span>{lang === 'bn' ? 'তথ্য সংশোধন প্রক্রিয়া' : 'Correction Procedure'}</span>
                </h4>
                
                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold shrink-0">১</span>
                    <span>
                      {lang === 'bn' 
                        ? 'নিচের ফর্মের মাধ্যমে প্রতিষ্ঠানের সঠিক নাম, পরিবর্তিত ফোন নাম্বার বা বিস্তারিত জমা দিন।'
                        : 'Submit details like corrected mobile helplines or establishment years through the form on the right.'}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold shrink-0">২</span>
                    <span>
                      {lang === 'bn'
                        ? 'আমাদের মডারেটর টিম সরাসরি প্রতিষ্ঠান প্রধান বা স্থানীয় বিশ্বস্ত সূত্রের সাথে কথা বলে নিশ্চিত করবেন।'
                        : 'Our moderator teams verify with official authorities or trusted representatives.'}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center font-bold shrink-0">৩</span>
                    <span>
                      {lang === 'bn'
                        ? 'সফল তথ্য যাচাই সাপেক্ষে ২৪ ঘণ্টার মধ্যে মূল ডিরেক্টরিতে সংযোজন হালনাগাদ করা হবে।'
                        : 'Verification is resolved within 24 hours to keep our local database secure.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Input Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-emerald-500/10 p-6 sm:p-8 shadow-xl relative">
                
                {/* Form header success validation overlay */}
                <AnimatePresence>
                  {correctionSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 rounded-3xl flex flex-col justify-center items-center p-6 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-extrabold text-forest-950 mb-2">
                        {dict.formSuccessTitle}
                      </h3>
                      <p className="text-slate-600 text-sm max-w-sm mb-5">
                        {dict.formSuccessDesc}
                      </p>
                      <button
                        onClick={() => setCorrectionSuccess(false)}
                        className="bg-forest-800 hover:bg-forest-900 text-gold-200 text-xs px-5 py-2.5 rounded-xl font-bold transition-all shadow"
                      >
                        {dict.formBtnClose}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Select target item name input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {dict.formItemName} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={correctionTarget}
                      onChange={(e) => setCorrectionTarget(e.target.value)}
                      placeholder={dict.formItemPlaceholder}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-500/15 transition text-sm font-medium"
                    />
                  </div>

                  {/* Clarification detail textbox */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {dict.formDetail} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={correctionDetail}
                      onChange={(e) => setCorrectionDetail(e.target.value)}
                      placeholder={dict.formDetailPlaceholder}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-500/15 transition text-sm font-medium"
                    />
                  </div>

                  {/* Submission person details and phone for moderation callback */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {dict.formUser} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={correctionUser}
                      onChange={(e) => setCorrectionUser(e.target.value)}
                      placeholder={dict.formUserPlaceholder}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-500/15 transition text-sm font-medium"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-forest-800 hover:bg-forest-950 text-gold-200 font-bold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-gold-300" />
                      <span>{dict.formSubmit}</span>
                    </button>
                  </div>
                </form>

                {/* Queue Display of Submitted items in state to satisfy real persistence experience */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-xs text-slate-400 block mb-3 uppercase tracking-wider">
                    {dict.latestRequestsTitle} ({correctionsList.length})
                  </h4>
                  <div className="space-y-3">
                    {correctionsList.map((req) => (
                      <div key={req.id} className="bg-slate-50 border border-slate-150 p-3 rounded-2xl flex justify-between items-start text-xs">
                        <div className="space-y-1">
                          <div className="font-bold text-forest-950">{req.itemName}</div>
                          <div className="text-slate-500 line-clamp-2 max-w-md">{req.description}</div>
                          <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                            <span>{lang === 'bn' ? 'অনুরোধকারী:' : 'By:'} {req.submittedBy}</span>
                            <span>•</span>
                            <span>{req.date}</span>
                          </div>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
                          {lang === 'bn' ? 'যাচাইধীন' : 'In Review'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Styled Footers */}
      <footer className="bg-forest-950 text-white pt-12 pb-8 border-t border-emerald-950/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-forest-900/40">
            {/* Logo description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-forest-800 text-gold-300 flex items-center justify-center font-bold text-md shadow-inner">
                  উ
                </div>
                <span className="font-extrabold text-white text-md tracking-tight">
                  {lang === 'bn' ? 'উলিপুর উপজেলা তথ্য সেবা পোর্টালা' : 'Ulipur Upazila Information Portal'}
                </span>
              </div>
              <p className="text-emerald-100/70 text-xs leading-relaxed max-w-sm">
                {lang === 'bn' 
                  ? 'এটি কুড়িগ্রাম জেলার উলিপুর এলাকার শিক্ষাপ্রতিষ্ঠান, জরুরি নম্বর, হাসপাতাল, ইউনিয়ন এবং স্থানীয় বাজারের বিবরণ সহজে খুঁজে পাওয়ার সেবা পোর্টাল।'
                  : 'A dedicated, highly curated open-knowledge service directory representing schools, emergency services, hospitals, unions and historical attractions of Ulipur, Kurigram.'}
              </p>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <h4 className="font-bold text-gold-300 uppercase tracking-wider">
                {lang === 'bn' ? 'দ্রুত নেভিগেশন' : 'Quick Jumps'}
              </h4>
              <ul className="space-y-2 text-emerald-100/70 font-medium">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('all');
                      scrollToSection('directory-container');
                    }}
                    className="hover:text-gold-200 hover:underline transition"
                  >
                    {lang === 'bn' ? 'সব ডিরেক্টরি পরিচিতি' : 'Search All Directory'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('union');
                      scrollToSection('directory-container');
                    }}
                    className="hover:text-gold-200 hover:underline transition"
                  >
                    {lang === 'bn' ? '১৪টি ইউনিয়ন ও পৌরসভা বিবরণ' : 'Explore Municipality & 13 Unions'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('library_park');
                      setFocusedItemId('park-1');
                      scrollToSection('directory-container');
                      setTimeout(() => setFocusedItemId(null), 5000);
                    }}
                    className="hover:text-gold-200 hover:underline transition text-left"
                  >
                    {lang === 'bn' ? 'ঐতিহাসিক পিকার্ড পুকুর পার্ক' : 'Highlight: Picard Pukur Park'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Helpline and emergency */}
            <div className="md:col-span-4 space-y-3 text-xs">
              <h4 className="font-bold text-gold-300 uppercase tracking-wider">
                {lang === 'bn' ? 'জরুরি সেবা ও কুড়িগ্রাম বার্তা' : 'National Help Desk Linked'}
              </h4>
              <p className="text-emerald-100/70 leading-relaxed">
                {lang === 'bn' 
                  ? 'জাতীয় তথ্য বাতায়ন ও স্থানীয় উপজেলা প্রশাসন কর্তৃক পরিচালিত সেবাসমূহের লিংক জানতে ও যেকোনো জরুরি প্রয়োজনে ৯৯৯ এ কল করুন।'
                  : 'For immediate security, crime-related report or medical disasters, call national helpline 999.'}
              </p>
              
              <div className="pt-2">
                <a
                  href="https://kurigram.gov.bd"
                  target="_blank"
                  rel="noreferrer referrer"
                  className="inline-flex items-center space-x-1.5 bg-forest-900 border border-emerald-800 text-gold-200 font-bold px-3 py-2 rounded-lg text-[10px] shadow-sm hover:bg-forest-800 transition"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{dict.visitOfficial}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-emerald-100/50 space-y-3 sm:space-y-0 text-center sm:text-left">
            <div>
              <p>{dict.footerText}</p>
              <p className="mt-1 font-mono text-[10px]">{dict.footerDev}</p>
            </div>
            <div className="flex items-center space-x-1.5 font-bold text-amber-200/60">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>for Ulipur, Kurigram</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Beautiful Detailed Modal Popup with Image Gallery Slider */}
      <AnimatePresence>
        {selectedDetailItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedDetailItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-emerald-500/10 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Photo Gallery Carousel */}
              {(() => {
                const imgs = getItemImages(selectedDetailItem);
                const hasImages = imgs.length > 0;

                if (!hasImages) {
                  return (
                    <div className="bg-gradient-to-br from-forest-800 to-emerald-950 p-6 sm:p-8 shrink-0 relative text-white border-b border-emerald-900/30">
                      {/* Badge showing Category */}
                      <div className="inline-block bg-white/10 text-gold-300 font-bold text-[10px] px-3 py-1 rounded-full border border-white/10 shadow uppercase tracking-wider mb-4">
                        {categoryMap[selectedDetailItem.category] || selectedDetailItem.category}
                      </div>

                      {/* Close Button top-right */}
                      <button
                        onClick={() => setSelectedDetailItem(null)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all backdrop-blur-sm shadow cursor-pointer font-bold text-lg"
                        aria-label="Close modal"
                      >
                        <X className="w-4.5 h-4.5" />
                      </button>

                      {/* Title & subtitle details inside header */}
                      <div className="text-white mt-1">
                        <h3 className="text-2xl font-black tracking-tight drop-shadow-md">
                          {lang === 'bn' ? selectedDetailItem.nameBn : selectedDetailItem.nameEn}
                        </h3>
                        <p className="text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase mt-1 drop-shadow-sm">
                          {lang === 'bn' ? selectedDetailItem.nameEn : selectedDetailItem.nameBn}
                        </p>
                      </div>
                    </div>
                  );
                }

                const activeImg = imgs[activeImageIndex] || imgs[0];
                return (
                  <div className="relative h-64 sm:h-80 bg-slate-900 shrink-0 select-none">
                    <div className="w-full h-full relative">
                      {/* Active Image with smooth fade animation */}
                      <motion.img
                        key={activeImageIndex}
                        src={activeImg}
                        alt={selectedDetailItem.nameBn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Visual dark overlay at the bottom for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                      {/* Left & Right arrow controls (Only show if multiple images exist) */}
                      {imgs.length > 1 && (
                        <>
                          <button
                            onClick={() => setActiveImageIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1))}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/45 text-white flex items-center justify-center transition-all backdrop-blur-sm shadow cursor-pointer font-bold text-lg"
                          >
                            ❮
                          </button>
                          <button
                            onClick={() => setActiveImageIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/45 text-white flex items-center justify-center transition-all backdrop-blur-sm shadow cursor-pointer font-bold text-lg"
                          >
                            ❯
                          </button>
                          
                          {/* Pagination indicators dots page */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                            {imgs.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                  activeImageIndex === idx ? 'bg-amber-400 w-4' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      
                      {/* Badge showing Category inside Image area */}
                      <div className="absolute top-4 left-4 bg-forest-900/90 text-gold-300 font-bold text-[10px] px-3 py-1 rounded-full border border-emerald-300/20 backdrop-blur-sm shadow uppercase tracking-wider">
                        {categoryMap[selectedDetailItem.category] || selectedDetailItem.category}
                      </div>

                      {/* Close Button top-right */}
                      <button
                        onClick={() => setSelectedDetailItem(null)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-md cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Floating caption overlay with Name */}
                      <div className="absolute bottom-4 left-6 right-6 text-white">
                        <h3 className="text-2xl font-black tracking-tight drop-shadow-md">
                          {lang === 'bn' ? selectedDetailItem.nameBn : selectedDetailItem.nameEn}
                        </h3>
                        <p className="text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase mt-0.5 drop-shadow-sm">
                          {lang === 'bn' ? selectedDetailItem.nameEn : selectedDetailItem.nameBn}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm flex-grow">
                
                {/* Main detailed explanation */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base border-b border-slate-100 pb-1.5">
                    {lang === 'bn' ? 'সংক্ষিপ্ত তথ্য ও পরিচিতি:' : 'Brief Overview & Intro:'}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-md">
                    {lang === 'bn' ? selectedDetailItem.detailsBn : selectedDetailItem.detailsEn}
                  </p>
                </div>

                {/* Special highlights section */}
                {selectedDetailItem.extraInfoBn && (
                  <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-3xl p-5 text-forest-950">
                    <h5 className="font-black text-xs text-forest-900 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>{dict.modalFeatures}</span>
                    </h5>
                    <p className="leading-relaxed font-medium">
                      {lang === 'bn' ? selectedDetailItem.extraInfoBn : selectedDetailItem.extraInfoEn}
                    </p>
                  </div>
                )}

                {/* Geological location details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Location row */}
                  <div className="flex items-start space-x-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-400 text-xs block font-bold uppercase tracking-wider">{dict.modalLoc}</strong>
                      <span className="text-slate-700 font-semibold mt-0.5 block">
                        {lang === 'bn' ? selectedDetailItem.locationBn : selectedDetailItem.locationEn}
                      </span>
                    </div>
                  </div>

                  {/* Est Year Row if available */}
                  {selectedDetailItem.estYear && (
                    <div className="flex items-start space-x-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <Calendar className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-400 text-xs block font-bold uppercase tracking-wider">{dict.modalEst}</strong>
                        <span className="text-slate-700 font-mono font-bold mt-0.5 block">
                          {lang === 'bn' ? translateNumToBn(selectedDetailItem.estYear) : selectedDetailItem.estYear}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Helplines & Calling panel */}
                {selectedDetailItem.contact && (
                  <div className="bg-amber-500/5 border border-amber-500/15 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-baseline sm:items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <strong className="text-slate-400 text-xs block font-bold uppercase tracking-wider">{dict.modalPhn}</strong>
                        <span className="font-mono text-sm font-semibold text-slate-800">
                          {lang === 'bn' ? translateNumToBn(selectedDetailItem.contact) : selectedDetailItem.contact}
                        </span>
                      </div>
                    </div>
                    
                    {/* Dial Button */}
                    {(selectedDetailItem.contact.includes('-') || selectedDetailItem.contact.match(/\d+/)) ? (
                      <a
                        href={`tel:${selectedDetailItem.contact.replace(/[^\d+]/g, '')}`}
                        className="w-full sm:w-auto text-center bg-forest-800 hover:bg-forest-950 text-gold-200 text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
                      >
                        {lang === 'bn' ? 'সরাসরি কল দিন' : 'Call Now'}
                      </a>
                    ) : null}
                  </div>
                )}

              </div>

              {/* Footer controls */}
              <div className="border-t border-slate-100 p-4 bg-slate-50 shrink-0 flex justify-end">
                <button
                  onClick={() => setSelectedDetailItem(null)}
                  className="bg-forest-900 hover:bg-forest-950 text-gold-200 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow cursor-pointer"
                >
                  {dict.modalCloseBtn}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beautiful Ulipur Interactive Map Modal */}
      <AnimatePresence>
        {isMapModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setIsMapModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full border border-emerald-500/10 h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-forest-800 to-emerald-950 p-5 px-6 shrink-0 relative text-white border-b border-emerald-900/30 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gold-300" />
                    <span>{dict.mapModalHeader}</span>
                  </h3>
                  <p className="text-emerald-300 text-xs font-semibold tracking-wide mt-1">
                    {dict.ulipurMapSubtitle}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsMapModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/45 text-gold-300 flex items-center justify-center transition-all backdrop-blur-sm shadow cursor-pointer font-bold text-lg"
                  aria-label="Close map modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Map body and Quick geography info */}
              <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                {/* Embedded google map iframe */}
                <div className="flex-grow h-3/5 lg:h-full relative overflow-hidden bg-slate-100">
                  <iframe
                    title="Ulipur Map"
                    src="https://maps.google.com/maps?q=Ulipur%20Upazila,%20Kurigram&t=&z=12&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Regional/Geographical Fast Facts sidebar */}
                <div className="w-full lg:w-80 h-2/5 lg:h-full overflow-y-auto bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100 p-6 space-y-5 text-sm shrink-0">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-widest border-b border-slate-200 pb-2 mb-3 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'bn' ? 'ভৌগোলিক সীমানা' : 'Geographical Borders'}</span>
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {lang === 'bn' 
                        ? 'উত্তরে কুড়িগ্রাম সদর ও রাজারহাট উপজেলা, দক্ষিণে চিলমারী ও সুন্দরগঞ্জ (গাইবান্ধা) উপজেলা, পূর্বে নাগেশ্বরী ও ভারতের আসাম সীমানা, পশ্চিমে পীরগাছা উপজেলা।'
                        : 'North: Kurigram Sadar & Rajarhat Upazila, South: Chilmari & Sundarganj (Gaibandha) Upazila, East: Nageshwari & Assam Border of India, West: Pirgacha Upazila.'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-widest border-b border-slate-200 pb-2 mb-3 flex items-center gap-1.5">
                      <Trees className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'bn' ? 'প্রধান নদ-নদীসমূহ' : 'Major Rivers'}</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['তিস্তা', 'ধরলা', 'ব্রহ্মপুত্র', 'বুড়ি তিস্তা'].map((river) => (
                        <span key={river} className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {lang === 'bn' ? river : { 'তিস্তা': 'Teesta', 'ধরলা': 'Dharla', 'ব্রহ্মপুত্র': 'Brahmaputra', 'বুড়ি তিস্তা': 'Buri Teesta' }[river]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-widest border-b border-slate-200 pb-2 mb-3 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'bn' ? 'প্রশাসনিক কাঠামো' : 'Administrative Units'}</span>
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {lang === 'bn'
                        ? '১টি থানা, ১টি পৌরসভা, ১টি স্বাস্থ্য কমপ্লেক্স, ১৪টি ইউনিয়ন এবং ৪১টি ডিজিটাল ওয়ার্ড ও গ্রাম নিয়ে গঠিত।'
                        : 'Comprises 1 Police Station, 1 Municipality/Pourashava, 1 Upazila Health Complex, 14 Unions, and 41 local wards/villages.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 p-4 bg-slate-50 shrink-0 flex justify-end">
                <button
                  onClick={() => setIsMapModalOpen(false)}
                  className="bg-forest-900 hover:bg-forest-950 text-gold-200 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow cursor-pointer"
                >
                  {dict.modalCloseBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
