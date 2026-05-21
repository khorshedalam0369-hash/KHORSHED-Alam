export interface DirectoryItem {
  id: string;
  category: 'union' | 'healthcare_security' | 'college' | 'school' | 'library_park' | 'market';
  nameBn: string;
  nameEn: string;
  detailsBn: string;
  detailsEn: string;
  locationBn: string;
  locationEn: string;
  estYear?: string;
  contact?: string;
  isHighlighted?: boolean;
  extraInfoBn?: string;
  extraInfoEn?: string;
  tags: string[];
}

export const unionsData: DirectoryItem[] = [
  {
    id: 'muni-1',
    category: 'union',
    nameBn: 'উলিপুর পৌরসভা',
    nameEn: 'Ulipur Municipality',
    detailsBn: 'উলিপুর সদরের মূল প্রশাসনিক, বাণিজ্যিক ও নাগরিক সেবার মূল কেন্দ্রস্থল।',
    detailsEn: 'The central administrative, commercial, and civic service hub of Ulipur headquarters.',
    locationBn: 'উলিপুর সদর, কুড়িগ্রাম',
    locationEn: 'Ulipur Sadar, Kurigram',
    estYear: '১৯৯৮',
    contact: '+৮৮০১৭০০-০০০০০০',
    isHighlighted: true,
    tags: ['municipality', 'পৌরসভা', 'সদর', 'sadar', 'প্রশাসন', 'commercial']
  },
  {
    id: 'union-1',
    category: 'union',
    nameBn: '১ নং ধামশ্রেণী ইউনিয়ন',
    nameEn: '1. Dhamshreni Union',
    detailsBn: 'ঐতিহাসিক ও কৃষিপ্রধান ইউনিয়ন, ঐতিহ্যবাহী ধামশ্রেণী মন্দিরের জন্য সুপরিচিত।',
    detailsEn: 'A historic and agricultural union, widely known for the traditional Dhamshreni Temple.',
    locationBn: 'ধামশ্রেণী, উলিপুর',
    locationEn: 'Dhamshreni, Ulipur',
    estYear: '১৯৬৫',
    tags: ['dhamshreni', 'ধামশ্রেণী', 'agricultural', 'কৃষি', 'ইউনিয়ন']
  },
  {
    id: 'union-2',
    category: 'union',
    nameBn: '২ নং গুনাইগাছ ইউনিয়ন',
    nameEn: '2. Gunaigach Union',
    detailsBn: 'শিক্ষা ও সংস্কৃতি চর্চায় অগ্রসর ইউনিয়ন, যেখানে ঐতিহ্যবাহী গুনাইগাছ ডিগ্রি কলেজ অবস্থিত।',
    detailsEn: 'Advancing in education and culture, featuring the prominent Gunaigach Degree College.',
    locationBn: 'গুনাইগাছ, উলিপুর',
    locationEn: 'Gunaigach, Ulipur',
    estYear: '১৯৬১',
    tags: ['gunaigach', 'গুনাইগাছ', 'education', 'শিক্ষা', 'ইউনিয়ন']
  },
  {
    id: 'union-3',
    category: 'union',
    nameBn: '৩ নং দলদলিয়া ইউনিয়ন',
    nameEn: '3. Doldolia Union',
    detailsBn: 'তিস্তা নদীর তীরবর্তী দৃষ্টিনন্দন প্রাকৃতিক পরিবেশ ও কৃষিসমৃদ্ধ ইউনিয়ন।',
    detailsEn: 'Scenic natural beauty alongside the Teesta River, rich in agricultural yields.',
    locationBn: 'দলদলিয়া, উলিপুর',
    locationEn: 'Doldolia, Ulipur',
    estYear: '১৯৬২',
    tags: ['doldolia', 'দলদলিয়া', 'river', 'তিস্তা', 'agricultural', 'ইউনিয়ন']
  },
  {
    id: 'union-4',
    category: 'union',
    nameBn: '৪ নং দুর্গাপুর ইউনিয়ন',
    nameEn: '4. Durgapur Union',
    detailsBn: 'ব্যস্ততম দুর্গাপুর হাট ও ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান সমৃদ্ধ একটি জনপদ।',
    detailsEn: 'A bustling union known for the Durgapur Bazar and high-performing educational institutions.',
    locationBn: 'দুর্গাপুর, উলিপুর',
    locationEn: 'Durgapur, Ulipur',
    estYear: '১৯৬৭',
    tags: ['durgapur', 'দুর্গাপুর', 'bazar', 'বাজার', 'education', 'ইউনিয়ন']
  },
  {
    id: 'union-5',
    category: 'union',
    nameBn: '৫ নং পান্ডুল ইউনিয়ন',
    nameEn: '5. Pandul Union',
    detailsBn: 'ঐতিহ্যবাহী পান্ডুল হাই স্কুল এবং সমৃদ্ধ বাজার এলাকার জন্য সুপরিচিত।',
    detailsEn: 'Highly recognized for the traditional Pandul High School and rich market zone.',
    locationBn: 'পান্ডুল, উলিপুর',
    locationEn: 'Pandul, Ulipur',
    estYear: '১৯৫৮',
    tags: ['pandul', 'পান্ডুল', 'market', 'বাজার', 'education', 'ইউনিয়ন']
  },
  {
    id: 'union-6',
    category: 'union',
    nameBn: '৬ নং ধরণীবাড়ী ইউনিয়ন',
    nameEn: '6. Dharanibari Union',
    detailsBn: 'উলিপুর সদরের সন্নিকটবর্তী সাংস্কৃতিক ঐতিহ্যে ঘেরা এবং উন্নয়নশীল অঞ্চল।',
    detailsEn: 'Bordering the town center, a culturally rich and rapidly developing area.',
    locationBn: 'ধরণীবাড়ী, উলিপুর',
    locationEn: 'Dharanibari, Ulipur',
    estYear: '১৯৬৩',
    tags: ['dharanibari', 'ধরণীবাড়ী', 'culture', 'সংস্কৃতি', 'development', 'ইউনিয়ন']
  },
  {
    id: 'union-7',
    category: 'union',
    nameBn: '৭ নং বুড়াবুড়ি ইউনিয়ন',
    nameEn: '7. Buraburi Union',
    detailsBn: 'তিস্তা ও ধরলা নদীর অববাহিকায় গঠিত একটি শান্ত ও মনোরম ইউনিয়ন।',
    detailsEn: 'A peaceful and highly scenic union formed on the basins of Teesta and Dharla rivers.',
    locationBn: 'বুড়াবুড়ি, উলিপুর',
    locationEn: 'Buraburi, Ulipur',
    estYear: '১৯৬৯',
    tags: ['buraburi', 'বুড়াবুড়ি', 'river', 'নদী', 'agriculture', 'ইউনিয়ন']
  },
  {
    id: 'union-8',
    category: 'union',
    nameBn: '৮ নং হাতিয়া ইউনিয়ন',
    nameEn: '8. Hatia Union',
    detailsBn: 'হাতিয়া গণহত্যা ও পাকিস্তান সেনাবাহিনীর বিরুদ্ধে বীরত্বপূর্ণ প্রতিরক্ষার ঐতিহাসিক স্মৃতি বিজড়িত বীরভূমি।',
    detailsEn: 'A historic land bearing memories of the Hatia Massacre and courageous defense during 1971.',
    locationBn: 'হাতিয়া, উলিপুর',
    locationEn: 'Hatia, Ulipur',
    estYear: '১৯৬২',
    isHighlighted: true,
    tags: ['hatia', 'হাতিয়া', 'history', 'ইতিহাস', 'liberation', 'মুক্তিযুদ্ধ', 'ইউনিয়ন']
  },
  {
    id: 'union-9',
    category: 'union',
    nameBn: '৯ নং বেগমগঞ্জ ইউনিয়ন',
    nameEn: '9. Begumganj Union',
    detailsBn: 'ব্রহ্মপুত্র নদীর চরাঞ্চল সমৃদ্ধ ইউনিয়ন, যা নদীকেন্দ্রিক জীবনযাত্রা ও কৃষির জন্য বিশিষ্ট।',
    detailsEn: 'An area comprised of Brahmaputra riverine chars, depicting unique life and agriculture.',
    locationBn: 'বেগমগঞ্জ, উলিপুর',
    locationEn: 'Begumganj, Ulipur',
    estYear: '১৯৭২',
    tags: ['begumganj', 'বেগমগঞ্জ', 'river', 'চর', 'agriculture', 'ইউনিয়ন']
  },
  {
    id: 'union-10',
    category: 'union',
    nameBn: '১০ নং থেতরাই ইউনিয়ন',
    nameEn: '10. Thetrai Union',
    detailsBn: 'হালতিয়া নদী ও তিস্তা অববাহিকার কৃষিভিত্তিক এবং কৃষ্টিসমৃদ্ধ ইউনিয়ন।',
    detailsEn: 'An agricultural and culturally vibrant union near the Teesta basin with active local trade.',
    locationBn: 'থেতরাই, উলিপুর',
    locationEn: 'Thetrai, Ulipur',
    estYear: '১৯৬৪',
    tags: ['thetrai', 'থেতরাই', 'bazar', 'কৃষি', 'trade', 'ইউনিয়ন']
  },
  {
    id: 'union-11',
    category: 'union',
    nameBn: '১১ নং চিলমারী ইউনিয়ন',
    nameEn: '11. Chilmari Union',
    detailsBn: 'উলিপুর সীমানা ঘেঁষে অবস্থিত ব্রহ্মপুত্র চরাঞ্চলের অপরূপ প্রাকৃতিক সৌন্দর্যের ইউনিয়ন।',
    detailsEn: 'A union adjacent to the Brahmaputra chars displaying amazing riverine layouts.',
    locationBn: 'চিলমারী চরাঞ্চল, উলিপুর',
    locationEn: 'Chilmari Char, Ulipur',
    estYear: '১৯৬৮',
    tags: ['chilmari', 'চিলমারী', 'char', 'নদী', 'scenic', 'ইউনিয়ন']
  },
  {
    id: 'union-12',
    category: 'union',
    nameBn: '১২ নং সাহেবের আলগা ইউনিয়ন',
    nameEn: '12. Shaheber Alga Union',
    detailsBn: 'বাংলাদেশ-ভারত সীমান্তবর্তী ব্রহ্মপুত্র নদের সর্বপূর্বে অবস্থিত একটি ঐতিহ্যবাহী ইউনিয়ন।',
    detailsEn: 'Bordering India along the Brahmaputra, the easternmost union of Ulipur.',
    locationBn: 'সাহেবের আলগা, উলিপুর',
    locationEn: 'Shaheber Alga, Ulipur',
    estYear: '১৯৭০',
    tags: ['shaheber alga', 'সাহেবের আলগা', 'border', 'সীমান্ত', 'river', 'ইউনিয়ন']
  },
  {
    id: 'union-13',
    category: 'union',
    nameBn: '১৩ নং তবকপুর ইউনিয়ন',
    nameEn: '13. Tabakpur Union',
    detailsBn: 'প্রাচীন ঐতিহ্যবাহী দীঘি ও কৃষিক্ষেত্রে ব্যাপক সাফল্যের অধিকারী ইউনিয়ন।',
    detailsEn: 'Known for ancient historic ponds and tremendous success in high-yield crops.',
    locationBn: 'তবকপুর, উলিপুর',
    locationEn: 'Tabakpur, Ulipur',
    estYear: '১৯৬১',
    tags: ['tabakpur', 'তবকপুর', 'ponds', 'দীঘি', 'agriculture', 'ইউনিয়ন']
  }
];

export const healthcareSecurityData: DirectoryItem[] = [
  {
    id: 'health-1',
    category: 'healthcare_security',
    nameBn: 'উলিপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
    nameEn: 'Ulipur Upazila Health Complex',
    detailsBn: '৫০ শয্যা বিশিষ্ট প্রধান সরকারি হাসপাতাল। ২৪/৭ জরুরি বিভাগ, বহির্বিভাগ, প্যাথলজি ও প্রসূতি সেবা প্রদান করে।',
    detailsEn: 'A 50-bed key government hospital. Providing 24/7 emergency service, outdoor treatments, pathology, and maternity care.',
    locationBn: 'হাসপাতাল রোড, উলিপুর পৌরসভা',
    locationEn: 'Hospital Road, Ulipur Pourashava',
    contact: '01713-359876 (Emergency Helpdesk)',
    isHighlighted: true,
    extraInfoBn: 'সেবাসমূহ: এক্স-রে, আল্ট্রাসনোগ্রাফি, ইসিজি, নিখরচায় সরকারি ওষুধ বিতরণ ও বিশেষায়িত ডক্টরস প্যানেল।',
    extraInfoEn: 'Services: X-Ray, Ultrasonography, ECG, Free Government Medicine Distribution & Specialist Doctors.',
    tags: ['hospital', 'সরকারি হাসপাতাল', 'emergency', 'স্বাস্থ্য', 'health', 'ambulance', 'ডাক্তার']
  },
  {
    id: 'police-1',
    category: 'healthcare_security',
    nameBn: 'উলিপুর থানা কার্যালয়',
    nameEn: 'Ulipur Police Station',
    detailsBn: 'উলিপুর উপজেলার আইন-শৃঙ্খলা রক্ষা, জননিরাপত্তা বিধান এবং জরুরি সহায়তার প্রধান কেন্দ্র।',
    detailsEn: 'The primary agency for maintaining law and order, ensuring public safety, and providing emergency police aid.',
    locationBn: 'থানা মোড়, উলিপুর পৌরসভা',
    locationEn: 'Thana More, Ulipur Pourashava',
    contact: '01320-135438 (OC), 999 (National Helpline)',
    isHighlighted: true,
    extraInfoBn: '২৪ ঘণ্টা জিডি করন, এফআইআর দাখিল ও যেকোনো আইনি সহায়তার জন্য উন্মুক্ত পোর্টাল।',
    extraInfoEn: 'Open 24/7 for General Diary (GD) entry, FIR filing, and prompt police assistance.',
    tags: ['police', 'থানা', 'security', 'আইনশৃঙ্খলা', 'safety', 'emergency', 'নিরাপত্তা']
  },
  {
    id: 'diag-1',
    category: 'healthcare_security',
    nameBn: 'উলিপুর পপুলার ডিজিটাল ডায়াগনস্টিক',
    nameEn: 'Ulipur Popular Digital Diagnostic',
    detailsBn: 'আধুনিক ডায়াগনস্টিক ও প্যাথলজিক্যাল রক্ত পরীক্ষা, হরমোন পরীক্ষা এবং এক্স-রে সম্পন্ন করার বিশ্বস্ত ল্যাব।',
    detailsEn: 'A trusted center for modern clinical laboratory tests, hormone assays, and digital imaging services.',
    locationBn: 'কলেজ রোড, উলিপুর',
    locationEn: 'College Road, Ulipur',
    contact: '+৮৮০১৭১২-৩৪৫৬৭৮',
    tags: ['diagnostic', 'ডায়াগনস্টিক', 'lab', 'প্যাথলজি', 'doctor', 'সেবা']
  },
  {
    id: 'diag-2',
    category: 'healthcare_security',
    nameBn: 'সেবা ডিজিটাল ক্লিনিক অ্যান্ড ডায়াগনস্টিক',
    nameEn: 'Sheba Digital Clinic & Diagnostic',
    detailsBn: 'বিশেষজ্ঞ নিয়মিত ডাক্তার ভিজিট এবং উন্নত আল্ট্রাসনোগ্রাফি ও ডেন্টাল ইউনিট সমৃদ্ধ বেসরকারি ক্লিনিক।',
    detailsEn: 'A private healthcare clinical setup with regular specialist visits, ultrasound, and dedicated dental units.',
    locationBn: 'থানা রোড, উলিপুর',
    locationEn: 'Thana Road, Ulipur',
    contact: '+৮৮০১৭২৫-৮৭৬৫৪৩',
    tags: ['clinic', 'ক্লিনিক', 'dental', 'ডেন্টাল', 'ultrasound', 'সেবা']
  }
];

export const collegesData: DirectoryItem[] = [
  {
    id: 'coll-1',
    category: 'college',
    nameBn: 'উলিপুর সরকারি কলেজ',
    nameEn: 'Ulipur Government College',
    detailsBn: 'উলিপুর উপজেলার সর্বোচ্চ ও সুপরিচিত এবং ঐতিহ্যবাহী সরকারি বিদ্যাপীঠ। উচ্চ মাধ্যমিক ও অনার্স কোর্স চালু রয়েছে।',
    detailsEn: 'The most prestigious and historic government college in Ulipur Upazila. Offering Higher Secondary and Honours graduation courses.',
    locationBn: 'কলেজ রোড, উলিপুর',
    locationEn: 'College Road, Ulipur',
    estYear: '১৯৬৪',
    contact: '০৫৮২৪-৫৬২০৪',
    isHighlighted: true,
    extraInfoBn: 'আয়তন: ১৫ একর। সুবর্ণ সুসজ্জিত সীমানা দেয়াল, খেলার মাঠ, লাইব্রেরী ও আধুনিক কম্পিউটার ল্যাব সুবিধা।',
    extraInfoEn: 'Campus: 15 Acres. Features a beautiful boundary, grand playground, multi-disciplinary library, and computer lab.',
    tags: ['college', 'সরকারি কলেজ', 'govt', 'honours', 'উচ্চ শিক্ষা', 'education']
  },
  {
    id: 'coll-2',
    category: 'college',
    nameBn: 'উলিপুর সরকারি মহিলা কলেজ',
    nameEn: 'Ulipur Government Mohila College',
    detailsBn: 'নারীদের উচ্চশিক্ষার প্রসারে নিবেদিত উপজেলার অন্যতম শ্রেষ্ঠ সরকারি বিদ্যাপীঠ।',
    detailsEn: 'Dedicated strictly to female empowerment and modern higher learning as a leading premier government college.',
    locationBn: 'মহাবিদ্যালয় লেন, উলিপুর সদর',
    locationEn: 'College Lane, Ulipur Sadar',
    estYear: '১৯৮৬',
    contact: '০৫৮২৪-৫৬৪১০',
    isHighlighted: true,
    tags: ['college', 'মহিলা কলেজ', 'girls', 'female education', 'govt', 'নারী শিক্ষা']
  },
  {
    id: 'coll-3',
    category: 'college',
    nameBn: 'উলিপুর এম.এস স্কুল অ্যান্ড কলেজ',
    nameEn: 'Ulipur M.S School & College',
    detailsBn: 'শতবর্ষী ঐতিহ্যবাহী ও মেধা অন্বেষণে শীর্ষস্থানীয় বিদ্যালয় ও মহাবিদ্যালয় ক্যাম্পাস।',
    detailsEn: 'A century-old legendary institution leading the district academic tables in secondary and intermediate exams.',
    locationBn: 'এমএস হাইস্কুল লেন, উলিপুর',
    locationEn: 'M.S High School Lane, Ulipur',
    estYear: '১৯১৪',
    tags: ['college', 'school and college', 'historical', 'শতবর্ষী', 'legendary']
  },
  {
    id: 'coll-4',
    category: 'college',
    nameBn: 'বিয়ারিং ডন কলেজ',
    nameEn: 'Bearing Dawn College',
    detailsBn: 'বিজ্ঞান এবং মানবিক উভয় শাখায় আধুনিক পঠন-পাঠন এবং যুগোপযোগী শিক্ষার বিশেষায়িত কলেজ।',
    detailsEn: 'A specialized private college renowned for focused study plans in Science and Humanities sections.',
    locationBn: 'পৌরসভা রোড, উলিপুর',
    locationEn: 'Pourashava Road, Ulipur',
    estYear: '২০০২',
    tags: ['college', 'bearing dawn', 'science', 'humanities', 'আধুনিক']
  },
  {
    id: 'coll-5',
    category: 'college',
    nameBn: 'গুনাইগাছ ডিগ্রি কলেজ',
    nameEn: 'Gunaigach Degree College',
    detailsBn: 'গুনাইগাছ এলাকার প্রগতিশীল উচ্চশিক্ষা নিশ্চিত করতে বিশেষ অবদান পালনকারী ডিগ্রি কলেজ।',
    detailsEn: 'Contributing heavily to local village development by securing academic degrees for thousands.',
    locationBn: 'গুনাইগাছ, উলিপুর',
    locationEn: 'Gunaigach, Ulipur',
    estYear: '১৯৯৬',
    tags: ['college', 'gunaigach', 'degree', 'ডিগ্রি', 'গ্রামীন শিক্ষা']
  },
  {
    id: 'coll-6',
    category: 'college',
    nameBn: 'বুড়াবুড়ি আইডিয়াল কলেজ',
    nameEn: 'Buraburi Ideal College',
    detailsBn: 'প্রান্তিক জনগোষ্ঠীর মানসম্মত আধুনিক শিক্ষা বিস্তারের উদ্দেশ্যে গড়ে ওঠা কলেজ।',
    detailsEn: 'An ideal campus established to spread quality education near rural river basin areas.',
    locationBn: 'বুড়াবুড়ি ইউনিয়ন, উলিপুর',
    locationEn: 'Buraburi Union, Ulipur',
    estYear: '২০১০',
    tags: ['college', 'buraburi', 'ideal', 'আইডিয়াল', 'rural']
  },
  {
    id: 'coll-7',
    category: 'college',
    nameBn: 'হাতিয়া ডা. আমির উদ্দিন কলেজ',
    nameEn: 'Hatia Dr. Amir Uddin College',
    detailsBn: 'ঐতিহাসিক হাতিয়া ইউনিয়নে অবস্থিত উচ্চ শিক্ষাদানে নিয়োজিত স্বনামধন্য বিদ্যাপীঠ।',
    detailsEn: 'Committed to serving the dynamic student body of Hatia union with quality education.',
    locationBn: 'হাতিয়া বাজার, উলিপুর',
    locationEn: 'Hatia Bazar, Ulipur',
    estYear: '১৯৯৯',
    tags: ['college', 'hatia', 'amir uddin', 'হাতিয়া', 'শিক্ষা']
  },
  {
    id: 'coll-8',
    category: 'college',
    nameBn: 'তবকপুর টেকনিক্যাল অ্যান্ড বিজনেস ম্যানেজমেন্ট কলেজ',
    nameEn: 'Tabakpur Technical & Business Management College',
    detailsBn: 'কারিগরী ও বানিজ্যিক ব্যবস্থাপনার ব্যবহারিক জ্ঞানে দক্ষ জনশক্তি গড়ে তোলার বিশেষ ইনস্টিটিউট।',
    detailsEn: 'A technical and business management institute fostering practical corporate capabilities.',
    locationBn: 'তবকপুর, উলিপুর',
    locationEn: 'Tabakpur, Ulipur',
    estYear: '২০০৪',
    tags: ['college', 'technical', 'vocational', 'business', 'ব্যবসায়', 'কারিগরি']
  },
  {
    id: 'coll-9',
    category: 'college',
    nameBn: 'থেতরাই মহাবিদ্যালয়',
    nameEn: 'Thetrai College',
    detailsBn: 'তিস্তা নদীর কূল ঘেষে মনোরম প্রাকৃতিক পরিবেশে উচ্চশিক্ষাদানে নিয়োজিত স্বনামধন্য শিক্ষা প্রতিষ্ঠান।',
    detailsEn: 'Offering multi-stream curriculum along the beautiful banks of region waterways.',
    locationBn: 'থেতরাই ঘাট রোড, উলিপুর',
    locationEn: 'Thetrai Ghat Road, Ulipur',
    estYear: '১৯৯৮',
    tags: ['college', 'thetrai', 'মহাবিদ্যালয়', 'নদী অববাহিকা']
  },
  {
    id: 'coll-10',
    category: 'college',
    nameBn: 'দুর্গাপুর আদর্শ মহাবিদ্যালয়',
    nameEn: 'Durgapur Adarsha College',
    detailsBn: 'উপজেলার ৪ নং দুর্গাপুর ইউনিয়নের শিক্ষার্থীদের উচ্চ শিক্ষিত করতে নিবেদিত কলেজ।',
    detailsEn: 'A high-performing rural intermediate college in Durgapur serving thousands of families.',
    locationBn: 'দুর্গাপুর বাজার, উলিপুর',
    locationEn: 'Durgapur Bazar, Ulipur',
    estYear: '২০০৩',
    tags: ['college', 'durgapur', 'adarsha', 'আদর্শ', 'rural']
  },
  {
    id: 'coll-11',
    category: 'college',
    nameBn: 'পান্ডুল বালিকা কলেজ',
    nameEn: 'Pandul Girls College',
    detailsBn: 'পান্ডুল এবং পার্শ্ববর্তী নারীদের শতভাগ উচ্চ মাধ্যমিক শিক্ষাদানের অন্যতম প্রধান সেফ-স্পেস ও কলেজ।',
    detailsEn: 'Providing safety, encouragement, and high graduation rates for female intermediate students.',
    locationBn: 'পান্ডুল মোড়, উলিপুর',
    locationEn: 'Pandul More, Ulipur',
    estYear: '২০০৫',
    tags: ['college', 'girls', 'pandul', 'মহিলা', 'নারী শিক্ষা']
  }
];

export const schoolsData: DirectoryItem[] = [
  {
    id: 'sch-1',
    category: 'school',
    nameBn: 'উলিপুর সরকারি বালিকা উচ্চ বিদ্যালয়',
    nameEn: "Ulipur Govt. Girls' High School",
    detailsBn: '১৯০৯ সালে স্থাপিত, মেয়েদের মাধ্যমিক ও উচ্চ মাধ্যমিক স্তরের শ্রেষ্ঠতম ও প্রাচীনতম শতাব্দী প্রাচীন সরকারি স্কুল।',
    detailsEn: 'Established in 1909, this is the most prestigious and century-old premier government high school for girls.',
    locationBn: 'বালিকা বিদ্যালয় সড়ক, উলিপুর পৌরসভা',
    locationEn: 'Girls School Road, Ulipur Pourashava',
    estYear: '১৯০৯',
    contact: '০৫৮২৪-৫৬৩১৫',
    isHighlighted: true,
    extraInfoBn: 'কুড়িগ্রাম জেলার শীর্ষ একাডেমিক পারফরম্যান্স রক্ষাকারী বালিকা বিদ্যাপীঠ।',
    extraInfoEn: 'Consistently maintaining top academic grades in board exams in the Kurigram district.',
    tags: ['school', 'girls school', 'মেয়েদের স্কুল', 'govt', 'শতাব্দী প্রাচীন', 'ঐতিহাসিক']
  },
  {
    id: 'sch-2',
    category: 'school',
    nameBn: 'উলিপুর মহারানী লক্ষ্মীপ্রিয়া উচ্চ বিদ্যালয় (এম.এস)',
    nameEn: 'Ulipur Maharani Laxmipriya High School (M.S)',
    detailsBn: '১৯১৪ সালে তৎকালীন মহারানি লক্ষ্মীপ্রিয়া কর্তৃক প্রতিষ্ঠিত ঐতিহ্যবাহী ও প্রাচীন ছেলেদের প্রধান একাডেমিক শ্রেষ্ঠ কেন্দ্র।',
    detailsEn: 'Founded in 1914 by the local landlord Maharani Laxmipriya, this represents a century-old historic education center.',
    locationBn: 'এম.এস হাইস্কুল রোড, উলিপুর',
    locationEn: 'M.S High School Road, Ulipur',
    estYear: '১৯১৪',
    contact: '০৫৮২৪-৫৬৩০৭',
    isHighlighted: true,
    tags: ['school', 'historical', 'maharani', 'মহারানি', 'ঐতিহ্যবাহী', 'boys']
  },
  {
    id: 'sch-3',
    category: 'school',
    nameBn: 'উলিপুর দুর্গাপুর হাই স্কুল',
    nameEn: 'Ulipur Durgapur High School',
    detailsBn: 'দুর্গাপুর ইউনিয়নের প্রাণকেন্দ্রে অবস্থিত সুপরিচিত এবং অত্যন্ত সুশৃঙ্খল মাধ্যমিক উচ্চ বিদ্যালয়।',
    detailsEn: 'A high-disciplined secondary high school serving the core local population in Durgapur region.',
    locationBn: 'দুর্গাপুর, উলিপুর',
    locationEn: 'Durgapur, Ulipur',
    estYear: '১৯৫৮',
    tags: ['school', 'durgapur', 'secondary', 'মাধ্যমিক', 'বিজ্ঞান']
  },
  {
    id: 'sch-4',
    category: 'school',
    nameBn: 'উলিপুর সরকারি প্রাথমিক বিদ্যালয়',
    nameEn: 'Ulipur Govt. Primary School',
    detailsBn: 'উলিপুর সদরের প্রাণকেন্দ্রে অবস্থিত এবং শিশুদের প্রাথমিক শিক্ষার বীজ বপনকারী প্রধান সরকারি প্রাথমিক বিদ্যালয়।',
    detailsEn: 'The primary cradle of knowledge and elementary education located right in the center of the town.',
    locationBn: 'সদর রোড, উলিপুর',
    locationEn: 'Sadar Road, Ulipur',
    estYear: '১৯৩৮',
    tags: ['school', 'primary', 'প্রাথমিক বিদ্যালয়', 'govt', 'সদর', 'কিশোর অববাহিকা']
  },
  {
    id: 'sch-5',
    category: 'school',
    nameBn: 'ধামশ্রেণী সিদ্ধেশ্বরী উচ্চ বিদ্যালয়',
    nameEn: 'Dhamshreni Siddheshwari High School',
    detailsBn: 'ধামশ্রেণী এলাকার শতবর্ষের প্রাচীন ও অন্যতম মাধ্যমিক পাঠশালার মূল কেন্দ্র।',
    detailsEn: 'An ancient secondary school imparting educational guidance to families around Dhamshreni.',
    locationBn: 'ধামশ্রেণী বাজার, উলিপুর',
    locationEn: 'Dhamshreni Bazar, Ulipur',
    estYear: '১৯২৪',
    tags: ['school', 'dhamshreni', 'siddheshwari', 'পুরাতন']
  }
];

export const librariesParksData: DirectoryItem[] = [
  {
    id: 'lib-1',
    category: 'library_park',
    nameBn: 'উলিপুর পাবলিক লাইব্রেরি',
    nameEn: 'Ulipur Public Library',
    detailsBn: 'জ্ঞানচর্চা ও বিরল বই এবং সাহিত্য অধ্যয়নের প্রধান সরকারি ও স্থানীয় স্বেচ্ছাসেবীদের পরিচালিত ঐতিহ্যবাহী গ্রন্থাগার।',
    detailsEn: 'A historical community-driven public library containing vast collections of regional and classic volumes.',
    locationBn: 'পৌরসভা ভবন প্রাঙ্গণ, উলিপুর',
    locationEn: 'Pourashava Campus, Ulipur',
    estYear: '১৯৭৫',
    isHighlighted: false,
    tags: ['library', 'লাইব্রেরি', 'বই', 'books', 'literature', 'জ্ঞানচর্চা']
  },
  {
    id: 'park-1',
    category: 'library_park',
    nameBn: 'উলিপুর পিকার্ড পুকুর পার্ক',
    nameEn: 'Ulipur Picard Pukur Park',
    detailsBn: 'উলিপুর সদরের প্রাণকেন্দ্রে অবস্থিত ঐতিহাসিক বড় পুকুর ও সুদৃশ্য ওয়াকওয়ে পার্ক। এটি স্থানীয় বাসিন্দাদের বিকেল কাটানো, প্রাতঃভ্রমণ এবং বিনোদনের প্রধান প্রাকৃতিক ও নান্দনিক দর্শনীয় স্থান।',
    detailsEn: 'A landmark historic giant pond and decorated walkway garden in the heart of Ulipur town. The absolute main hub for relaxing strolls, afternoon jogging, and family recreation.',
    locationBn: 'সদর চৌরাস্তা সংলগ্ন, উলিপুর পৌরসভা',
    locationEn: 'Near Sadar Chowrasta, Ulipur Pourashava',
    estYear: 'ঐতিহাসিক (পুনর্নির্মাণ: ২০২০)',
    isHighlighted: true,
    extraInfoBn: 'বিশেষ আকর্ষণ: পুকুরের ওপরে হাঁটার দৃষ্টিনন্দন কাঠের সেতু, ঝাউগাছ ঘেরা বাধানো ঘাট, রঙিন আলোর ফোয়ারা এবং শিশুদের খেলাধুলার খেলার জোন।',
    extraInfoEn: 'Highlights: Gorgeous wooden walkways spanning across parts of the green pond, tiled rest benches, neon water fountain displays, and fun play zones for kids.',
    tags: ['park', 'picard pukur', 'পিকার্ড পুকুর', 'বিনোদন', 'sightseeing', 'লেক', 'historic', 'দর্শনীয় স্থান']
  }
];

export const marketsData: DirectoryItem[] = [
  {
    id: 'mkt-1',
    category: 'market',
    nameBn: 'উলিপুর সদর বাজার (কাঁচাবাজার ও কাপড়ের বড় হাট)',
    nameEn: 'Ulipur Sadar Bazar',
    detailsBn: 'উলিপুরের প্রধান পাইকারি ও খুচরা কাঁচাবাজার, নিত্যপ্রয়োজনীয় জিনিসপত্র, কাপড়, স্বর্ণালঙ্কার এবং কসমেটিকসের বৃহত্তম বাজার।',
    detailsEn: 'The central and largest wholesale/retail market hub for groceries, daily essentials, apparel, and traditional jewelry.',
    locationBn: 'পৌর বাজার অঞ্চল, উলিপুর সদর',
    locationEn: 'Pourashava Market Hub, Ulipur Sadar',
    contact: 'খোলা থাকে: প্রতিদিন ভোর ৫টা - রাত ১১টা',
    isHighlighted: true,
    tags: ['market', 'বাজার', 'kaon', 'সদর', 'shopping', 'পাইকারি']
  },
  {
    id: 'mkt-restaurant-10tala',
    category: 'market',
    nameBn: 'সরদার টাওয়ার ১০ তলা ভিউ রেস্টুরেন্ট অ্যান্ড ক্যাফে',
    nameEn: 'Sardar Tower 10-Tala View Restaurant & Cafe',
    detailsBn: 'উলিপুর সদরের প্রাণকেন্দ্রে নবনির্মিত ১০ তলা বিশিষ্ট উচ্চতম ভবন সরদার টাওয়ারের ওপর অবস্থিত প্রথম আধুনিক মাল্টি-কুইজিন রেস্টুরেন্ট ও রুফটপ ক্যাফে। এখানে চমৎকার মনোরম পারিবারিক পরিবেশে উন্নত মানের খাবার উপভোগের পাশাপাশি পুরো উলিপুর শহরের আকর্ষণীয় প্যানোরামিক ভিউ উপভোগ করা যায়।',
    detailsEn: 'The first modern multi-cuisine rooftop restaurant and cafe located atop the newly built landmark 10-story Sardar Tower in the heart of Ulipur town. It features delicious cuisines in a serene family-friendly environment with a spectacular panoramic view of the entire Ulipur sub-district.',
    locationBn: 'রুফটপ (১০ম তলা), সরদার টাওয়ার, থানা রোড, উলিপুর সদর, কুড়িগ্রাম',
    locationEn: 'Rooftop (10th Level), Sardar Tower, Thana Road, Ulipur Sadar, Kurigram',
    estYear: '২০২৩',
    contact: '+৮৮০১৭০০-১০০০১০ (বুকিং ও ডেলিভারি)',
    isHighlighted: true,
    extraInfoBn: 'বিশেষ আয়োজন: ওপেন-এয়ার রুফটপ ভিউ, চায়নিজ, ইন্ডিয়ান, ইতালিয়ান ও আকর্ষণীয় বাংলা বুফে খাবার, ঘরোয়া ও বড় পার্টি আয়োজনের সুযোগ।',
    extraInfoEn: 'Specialties: Open-air rooftop cafe, Chinese, Indian, Italian, and Traditional Bengali cuisines, birthday/corporate party event spaces.',
    tags: ['restaurant', 'রেস্টুরেন্ট', 'সরদার টাওয়ার', 'سردار ٹاور', 'dine', 'rooftop', 'রুফ টপ', '১০ তলা', '10 tala', 'cafe', 'ক্যাফে', 'বাজার']
  },
  {
    id: 'mkt-2',
    category: 'market',
    nameBn: 'মহারানী বাজার',
    nameEn: 'Moharani Bazar',
    detailsBn: 'সদরের অন্যতম ব্যস্ত ও গুরুত্বপূর্ণ বাণিজ্য ও বিপণিবিতান এলাকা, ইলেকট্রনিক সামগ্রী ও আধুনিক কাপড়ের জন্য বিখ্যাত।',
    detailsEn: 'One of the busiest retail areas in the town center, mostly active in modern electronics, fashion, and hardware appliances.',
    locationBn: 'এম.এস হাইস্কুল রোড সংলগ্ন, উলিপুর',
    locationEn: 'Adjacent to M.S High School, Ulipur',
    tags: ['market', 'মহারানী বাজার', 'fashion', 'electronics', 'commercial']
  },
  {
    id: 'mkt-3',
    category: 'market',
    nameBn: 'দুর্গাপুর হাট ও বাজার',
    nameEn: 'Durgapur Bazar & Hat',
    detailsBn: 'কৃষিজ পণ্য, চাল এবং গৃহপালিত পশু কেনাবেচার জন্য উপজেলার অন্যতম সর্ববৃহৎ গ্রামীণ ও ঐতিহ্যবাহী দীর্ঘদিনের হাট।',
    detailsEn: 'One of the biggest countryside trade hats for fresh agro-produce, local rice bags, and livestock exchange.',
    locationBn: 'দুর্গাপুর মোড়, উলিপুর',
    locationEn: 'Durgapur Junction, Ulipur',
    contact: 'বিশেষ হাট: রবিবার ও বৃহস্পতিবার',
    isHighlighted: true,
    tags: ['market', 'dugrapur hat', 'কৃষিপণ্য', 'হাট', 'livestock', 'রবিবার']
  },
  {
    id: 'mkt-4',
    category: 'market',
    nameBn: 'হাতিয়া বাজার',
    nameEn: 'Hatia Bazar',
    detailsBn: 'তিস্তা নদী তীরবর্তী ঐতিহাসিক হাতিয়া ইউনিয়নের মূল বাণিজিক কেন্দ্র, তাজা নদীর মাছ এবং শুটকি বাজারের জন্য বিখ্যাত।',
    detailsEn: 'A prime riverside market renowned throughout the sub-district for fresh water Teesta fishes and premium dried fish.',
    locationBn: 'হাতিয়া ঘাট সংলগ্ন, হাতিয়া',
    locationEn: 'Near Hatia Ghat, Hatia',
    tags: ['market', 'hatia', 'fish market', 'মাছ বাজার', 'নদীর মাছ']
  },
  {
    id: 'mkt-5',
    category: 'market',
    nameBn: 'থেতরাই বাজার ও পান্ডুল বাজার',
    nameEn: 'Thetrai & Pandul Market',
    detailsBn: 'স্থানীয় ধান-গম কেনাবেচার অন্যতম প্রধান শক্তিশালী কৃষিকেন্দ্র ও আড়ত এলাকা।',
    detailsEn: 'Two strong economic and agricultural trade zones acting as leading grain transaction hubs for local crop harvests.',
    locationBn: 'থেতরাই ও পান্ডুল জংশনসমূহ',
    locationEn: 'Thetrai & Pandul Junctions, Ulipur',
    tags: ['market', 'thetrai', 'pandul', 'crops', 'ধান আড়ত']
  }
];

export const allDirectoryItems: DirectoryItem[] = [
  ...unionsData,
  ...healthcareSecurityData,
  ...collegesData,
  ...schoolsData,
  ...librariesParksData,
  ...marketsData
];
