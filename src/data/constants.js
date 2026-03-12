export const SITE_CONFIG = {
  name: 'AKP Welfare Foundation',
  tagline: 'Together We Can Change Lives',
  description: 'AKP Welfare Foundation is dedicated to empowering underprivileged communities through education, nutrition, healthcare, and sustainable development programs across India.',
  email: 'info@akpwelfare.org',
  phone: '+91 98765 43210',
  address: '123, MG Road, Bangalore, Karnataka 560001, India',
  social: {
    facebook: 'https://facebook.com/akpwelfare',
    twitter: 'https://twitter.com/akpwelfare',
    instagram: 'https://instagram.com/akpwelfare',
    linkedin: 'https://linkedin.com/company/akpwelfare',
    youtube: 'https://youtube.com/@akpwelfare',
  },
  registration: {
    ngo: 'NGO/2018/BLR/12345',
    pan: 'AAATA1234A',
    section80G: '80G/2019/DEL/67890',
    fcra: 'FCRA/2020/MUM/11111',
  },
};

export const IMPACT_STATS = [
  { label: 'Meals Provided', value: 250000, suffix: '+', icon: 'meal' },
  { label: 'Children Educated', value: 15000, suffix: '+', icon: 'education' },
  { label: 'Families Helped', value: 50000, suffix: '+', icon: 'family' },
  { label: 'Volunteers', value: 5000, suffix: '+', icon: 'volunteer' },
];

export const PROGRAMS = [
  {
    id: 'education',
    title: 'Education Support',
    shortDescription: 'Providing quality education and scholarships to underprivileged children, ensuring no child is left behind.',
    fullDescription: 'Our Education Support program provides comprehensive learning opportunities including school supplies, scholarships, after-school tutoring, digital literacy programs, and mentorship. We partner with local schools and educators to create sustainable educational ecosystems in underserved communities.',
    icon: 'FaGraduationCap',
    image: '/images/programs/education.jpg',
    stats: { beneficiaries: '15,000+', schools: '120+', scholarships: '3,500+' },
    color: '#2E7D32',
  },
  {
    id: 'food',
    title: 'Food Distribution',
    shortDescription: 'Fighting hunger by providing nutritious meals and food supplies to families in need across communities.',
    fullDescription: 'Our Food Distribution program operates community kitchens and mobile food distribution units that serve nutritious meals daily. We also run nutrition awareness campaigns and sustainable farming initiatives to address the root causes of food insecurity.',
    icon: 'FaUtensils',
    image: '/images/programs/food.jpg',
    stats: { meals: '250,000+', kitchens: '25+', cities: '15+' },
    color: '#FF6F00',
  },
  {
    id: 'healthcare',
    title: 'Medical Camps',
    shortDescription: 'Organizing free medical camps and health awareness programs in rural and underserved areas.',
    fullDescription: 'Our Medical Camps program brings quality healthcare to doorsteps of communities that lack access. We organize regular health check-up camps, eye care programs, dental camps, and mental health awareness sessions with qualified medical professionals.',
    icon: 'FaHeartbeat',
    image: '/images/programs/healthcare.jpg',
    stats: { patients: '75,000+', camps: '500+', doctors: '200+' },
    color: '#d32f2f',
  },
  {
    id: 'community',
    title: 'Community Welfare',
    shortDescription: 'Building stronger communities through skill development, women empowerment, and infrastructure projects.',
    fullDescription: 'Our Community Welfare program focuses on holistic development including skill training workshops, women self-help groups, clean water initiatives, sanitation drives, and rural infrastructure development. We believe in empowering communities to become self-sustaining.',
    icon: 'FaHandsHelping',
    image: '/images/programs/community.jpg',
    stats: { villages: '200+', women: '10,000+', projects: '350+' },
    color: '#1565c0',
  },
];

export const IMPACT_STORIES = [
  {
    id: 1,
    title: 'From Street to School: Riya\'s Journey',
    excerpt: 'Riya was selling flowers at traffic signals before AKP Foundation stepped in. Today, she tops her class and dreams of becoming a doctor.',
    image: '/images/stories/story1.jpg',
    category: 'Education',
  },
  {
    id: 2,
    title: 'A Village Transformed by Clean Water',
    excerpt: 'Sundarpura village had no clean drinking water. Our community well project now serves 500 families with safe, clean water every day.',
    image: '/images/stories/story2.jpg',
    category: 'Community',
  },
  {
    id: 3,
    title: 'Feeding Hope: The Community Kitchen Story',
    excerpt: 'Our Bangalore community kitchen started with 50 meals a day. Today it serves 2,000 nutritious meals daily to those in need.',
    image: '/images/stories/story3.jpg',
    category: 'Food',
  },
];

export const TEAM_MEMBERS = [
  {
    name: 'Arun Kumar Patel',
    role: 'Founder & President',
    bio: 'With over 20 years of social work experience, Arun founded AKP Welfare Foundation with a vision to create lasting change in underserved communities.',
    image: '/images/team/founder.jpg',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Director of Programs',
    bio: 'A public health expert who oversees all welfare programs and ensures maximum impact in every community we serve.',
    image: '/images/team/director.jpg',
  },
  {
    name: 'Rajesh Menon',
    role: 'Head of Operations',
    bio: 'Rajesh brings 15 years of NGO management experience, ensuring smooth execution of all field operations.',
    image: '/images/team/operations.jpg',
  },
  {
    name: 'Sneha Gupta',
    role: 'Volunteer Coordinator',
    bio: 'Sneha manages our network of 5,000+ volunteers and drives community engagement across all programs.',
    image: '/images/team/volunteer-coord.jpg',
  },
];

export const DONATION_AMOUNTS = [100, 500, 1000, 5000];

export const GALLERY_IMAGES = [
  { id: 1, src: '/images/gallery/img1.jpg', alt: 'Education program classroom' },
  { id: 2, src: '/images/gallery/img2.jpg', alt: 'Food distribution drive' },
  { id: 3, src: '/images/gallery/img3.jpg', alt: 'Medical camp in rural area' },
  { id: 4, src: '/images/gallery/img4.jpg', alt: 'Community development project' },
  { id: 5, src: '/images/gallery/img5.jpg', alt: 'Volunteer team at work' },
  { id: 6, src: '/images/gallery/img6.jpg', alt: 'Children in school program' },
];

export const MILESTONES = [
  { year: '2018', title: 'Foundation Established', description: 'AKP Welfare Foundation was registered with a mission to serve underprivileged communities.' },
  { year: '2019', title: 'First 1,000 Meals', description: 'Launched our food distribution program, serving 1,000 meals in the first month.' },
  { year: '2020', title: 'COVID Relief', description: 'Provided emergency relief to 10,000+ families during the pandemic.' },
  { year: '2021', title: 'Education Centers', description: 'Opened 50 community learning centers across 3 states.' },
  { year: '2022', title: 'Healthcare Expansion', description: 'Conducted 200+ medical camps serving 30,000+ patients.' },
  { year: '2023', title: 'National Recognition', description: 'Awarded Best NGO for Community Development by the Ministry of Social Justice.' },
  { year: '2024', title: '250K Meals Milestone', description: 'Crossed 250,000 meals served and expanded to 15 cities.' },
];
