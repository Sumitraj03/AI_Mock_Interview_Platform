export const analyticsSummary = [
  { label: 'Sessions', value: '18', change: '+24%', tone: 'teal' },
  { label: 'Avg score', value: '82%', change: '+9%', tone: 'emerald' },
  { label: 'Practice time', value: '14h', change: '+3.5h', tone: 'amber' },
  { label: 'Offers ready', value: '91%', change: '+12%', tone: 'rose' },
]

export const scoreTrend = [
  { week: 'W1', score: 58, confidence: 46 },
  { week: 'W2', score: 64, confidence: 54 },
  { week: 'W3', score: 71, confidence: 62 },
  { week: 'W4', score: 76, confidence: 70 },
  { week: 'W5', score: 82, confidence: 78 },
  { week: 'W6', score: 87, confidence: 83 },
]

export const categoryPerformance = [
  { category: 'React', score: 88 },
  { category: 'JavaScript', score: 84 },
  { category: 'System design', score: 72 },
  { category: 'HR', score: 79 },
  { category: 'CSS', score: 86 },
]

export const mockQuestions = [
  {
    id: 'q-react-1',
    category: 'Frontend',
    difficulty: 'Medium',
    type: 'Technical',
    question: 'Explain how React reconciliation works and how keys influence rendering performance.',
    hints: ['Mention virtual DOM comparison', 'Explain stable keys', 'Discuss re-render boundaries'],
  },
  {
    id: 'q-js-1',
    category: 'JavaScript',
    difficulty: 'Medium',
    type: 'Technical',
    question: 'What is the event loop, and how do microtasks differ from macrotasks?',
    hints: ['Call stack', 'Promise callbacks', 'setTimeout scheduling'],
  },
  {
    id: 'q-css-1',
    category: 'Frontend',
    difficulty: 'Easy',
    type: 'Technical',
    question: 'How would you build a responsive card grid that remains readable on small screens?',
    hints: ['CSS grid', 'minmax', 'content density'],
  },
  {
    id: 'q-hr-1',
    category: 'HR',
    difficulty: 'Easy',
    type: 'Behavioral',
    question: 'Tell me about a time you received critical feedback and changed your approach.',
    hints: ['Use STAR', 'Show ownership', 'End with measurable improvement'],
  },
  {
    id: 'q-system-1',
    category: 'System Design',
    difficulty: 'Hard',
    type: 'Technical',
    question: 'Design a frontend architecture for a real-time collaborative whiteboard.',
    hints: ['State sync', 'latency handling', 'offline recovery'],
  },
]

export const mockFeedback = {
  score: 84,
  verdict: 'Strong hire signal with room to sharpen system design structure.',
  strengths: [
    'Clear React fundamentals and practical trade-off language.',
    'Good ownership stories with specific project outcomes.',
    'Confident communication pace and concise examples.',
  ],
  weaknesses: [
    'System design answers need clearer phases before implementation details.',
    'A few answers skipped measurable impact.',
    'Could ask more clarifying questions before solving.',
  ],
  suggestions: [
    'Open architecture answers with constraints, data flow, failure modes, and trade-offs.',
    'Prepare two metrics-backed stories for performance and teamwork.',
    'Practice summarizing long answers in one closing sentence.',
  ],
  rubric: [
    { label: 'Technical depth', value: 86 },
    { label: 'Communication', value: 88 },
    { label: 'Problem solving', value: 80 },
    { label: 'Role fit', value: 83 },
  ],
}

export const sessions = [
  {
    id: 'sess-1001',
    title: 'React frontend mock',
    date: '2026-05-08',
    duration: '38 min',
    score: 87,
    category: 'Frontend',
    notes: 'Improved hook explanations and gave better examples for memoization.',
  },
  {
    id: 'sess-1002',
    title: 'HR behavioral round',
    date: '2026-05-06',
    duration: '26 min',
    score: 78,
    category: 'HR',
    notes: 'Good structure, needs stronger metrics in ownership story.',
  },
  {
    id: 'sess-1003',
    title: 'JavaScript fundamentals',
    date: '2026-05-02',
    duration: '42 min',
    score: 81,
    category: 'JavaScript',
    notes: 'Event loop answer was strong, prototype chain answer needs polish.',
  },
  {
    id: 'sess-1004',
    title: 'Frontend system design',
    date: '2026-04-29',
    duration: '45 min',
    score: 72,
    category: 'System Design',
    notes: 'Needs better data modeling and edge case handling.',
  },
]

export const testimonials = [
  {
    name: 'Nisha Verma',
    role: 'Frontend Intern, SaaS startup',
    quote: 'The feedback reports made my answers tighter in one week. It feels like a senior mentor reviewing every mock.',
  },
  {
    name: 'Rohan Mehta',
    role: 'React fresher',
    quote: 'The video room plus question generator helped me practice like a real interview instead of reading notes.',
  },
  {
    name: 'Kavya Iyer',
    role: 'Placement candidate',
    quote: 'The analytics page showed exactly where I was weak. My confidence score moved from 55 to 82.',
  },
]

export const pricingPlans = [
  {
    name: 'Starter',
    price: 0,
    description: 'For focused daily practice.',
    features: ['10 AI questions per day', 'Mock video room', 'Basic feedback'],
  },
  {
    name: 'Pro',
    price: 12,
    description: 'For active interview prep.',
    features: ['Unlimited question sets', 'Advanced feedback', 'Analytics history', 'Room recordings ready'],
    highlighted: true,
  },
  {
    name: 'Teams',
    price: 29,
    description: 'For cohorts and bootcamps.',
    features: ['Shared dashboards', 'Mentor review notes', 'Team reports'],
  },
]

export const featureList = [
  {
    title: 'Adaptive question generation',
    description: 'Choose role, category, and difficulty, then get structured prompts with follow-up hints.',
  },
  {
    title: 'Realistic mock rooms',
    description: 'Practice with camera, mic, timer, interview prompts, and a Stream-ready production path.',
  },
  {
    title: 'AI feedback reports',
    description: 'Turn rough interview notes into scores, strengths, weaknesses, and clear improvement actions.',
  },
  {
    title: 'Progress analytics',
    description: 'Track category performance, score trends, confidence, and practice consistency.',
  },
]
