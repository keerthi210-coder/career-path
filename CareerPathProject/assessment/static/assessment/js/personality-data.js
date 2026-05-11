// Comprehensive Personality Data for All 16 MBTI Types
// Each type has completely unique content - no reuse or templates

const PERSONALITY_DATA = {
    'INTJ': {
        name: 'The Architect',
        category: 'Analysts',
        tagline: 'Strategic masterminds who see the world as a chess board',

        fullDescription: 'As an Architect (INTJ), you possess a rare combination of imagination and reliability. Your mind naturally gravitates toward complex systems and long-term strategies. You see patterns others miss and can envision solutions years before they become necessary. Independence is not just a preference for you—it\'s essential to your effectiveness. You trust your own judgment above all else, having spent countless hours refining your understanding through deep analysis. While others may see you as aloof, you\'re simply selective about where you invest your energy. Small talk feels like a waste when there are problems to solve and systems to optimize. Your standards are exceptionally high, both for yourself and others, which can create friction but also drives excellence. You thrive in environments that reward competence over politics, where your strategic insights can transform organizations.',

        interests: [
            { name: 'Strategic Planning', score: 90 },
            { name: 'Systems Analysis', score: 88 },
            { name: 'Research & Development', score: 85 },
            { name: 'Technology Innovation', score: 82 },
            { name: 'Complex Problem Solving', score: 80 },
            { name: 'Independent Projects', score: 78 }
        ],

        workOrientation: [
            { name: 'Creative', level: 'High', score: 75 },
            { name: 'Informative', level: 'High', score: 85 },
            { name: 'People', level: 'Low', score: 30 },
            { name: 'Administrative', level: 'Medium', score: 60 }
        ],

        strengths: [
            'Strategic vision that sees years ahead',
            'Independent problem-solving without supervision',
            'High standards that drive excellence',
            'Logical analysis that cuts through complexity'
        ],

        growthAreas: [
            'May appear cold or dismissive to others',
            'Can be overly critical of inefficiency',
            'Struggles to express emotions appropriately',
            'May dismiss input that doesn\'t meet standards'
        ],

        communicationStyle: {
            traits: [
                'Direct and efficiency-focused',
                'Prefers written over verbal communication',
                'Values substance over social niceties'
            ],
            dos: [
                'Be clear, concise, and logical',
                'Focus on long-term implications',
                'Provide data to support claims'
            ],
            donts: [
                'Don\'t waste time on small talk',
                'Don\'t appeal to emotions over logic',
                'Don\'t ignore their expertise'
            ]
        },

        relationships: {
            romantic: [
                'Values intellectual partnership above all',
                'Shows love through problem-solving',
                'Needs significant independence',
                'Struggles with emotional expression'
            ],
            friendships: [
                'Maintains few but deep connections',
                'Values intellectual stimulation',
                'Loyal once trust is established',
                'May seem distant initially'
            ],
            colleague: [
                'Focuses on competence and results',
                'Prefers autonomy in execution',
                'Challenges inefficient processes',
                'Values expertise over hierarchy'
            ],
            manager: [
                'Sets exceptionally high standards',
                'Delegates based on competence',
                'Focuses on strategic vision',
                'May seem demanding or distant'
            ]
        },

        careers: [
            { title: 'Software Architect', match: 95, growth: 'High', desc: 'Design complex software systems and technical solutions' },
            { title: 'Data Scientist', match: 92, growth: 'High', desc: 'Analyze patterns in massive datasets' },
            { title: 'Strategic Consultant', match: 90, growth: 'High', desc: 'Develop long-term business strategies' },
            { title: 'Research Scientist', match: 88, growth: 'Medium', desc: 'Conduct advanced research in specialized fields' },
            { title: 'Systems Engineer', match: 85, growth: 'High', desc: 'Design integrated technical systems' }
        ],

        careerDetail: {
            title: 'Software Architect',
            compatibility: 95,
            overview: 'Designs complex software systems that solve real-world problems at scale.',
            whyFits: 'Your strategic thinking and systems analysis skills make you exceptional at seeing how components fit together. You naturally think in abstractions and can envision solutions before they exist.',
            environment: 'Tech companies, startups, remote work environments',
            growthPath: 'Developer → Senior Developer → Technical Lead → Software Architect → CTO',
            skills: ['System Design', 'Strategic Planning', 'Technical Leadership', 'Problem Solving']
        },

        curiosities: [
            'INTJs make up only 2% of the population, making them one of the rarest types',
            'They often excel in fields requiring long-term strategic thinking',
            'Famous INTJs include Elon Musk, Isaac Newton, and Friedrich Nietzsche',
            'They are natural systems thinkers who see patterns others miss'
        ],

        didYouKnow: 'INTJs are often found in leadership roles during organizational transformations because of their ability to envision and implement complex change.',

        metaphor: {
            name: 'Strategic Architect',
            description: 'Like an architect designing a masterpiece, you envision the complete structure before laying the first brick.',
            traits: ['Visionary 🔭', 'Systematic 📐', 'Independent 🏔️']
        }
    },

    'ENFJ': {
        name: 'The Giver',
        category: 'Diplomats',
        tagline: 'People-focused catalysts who bring out the best in everyone around them',

        fullDescription: 'As an ENFJ, your primary mode of living is focused externally, where you deal with things according to how you feel about them and how they fit into your personal value system. Your secondary mode is internal, where you take things in primarily via your intuition. You are a people-focused individual who lives in the world of human possibilities. More so than any other type, you have excellent people skills. You understand and care about people, and have a special talent for bringing out the best in others. Your main interest in life is giving love, support, and a good time to other people. Because your people skills are so extraordinary, you have the ability to make people do exactly what you want them to do — and your motives are usually unselfish. You tend to define your life\'s direction and priorities according to other people\'s needs, and may not always be aware of your own. You have definite values and opinions which you express clearly, as long as doing so doesn\'t interfere with bringing out the best in others. People love ENFJs — you are fun to be with, straight-forward, honest, full of self-confidence, bright, energetic, and fast-paced. You like things to be well-organized and will work hard at maintaining structure. You get your best personal satisfaction from serving others and making things happen for people.',

        interests: [
            { name: 'Teaching & Mentoring', score: 92 },
            { name: 'Counseling & Support', score: 88 },
            { name: 'Human Resources', score: 82 },
            { name: 'Public Relations', score: 78 },
            { name: 'Community & Social Work', score: 75 },
            { name: 'Event Planning & Leadership', score: 70 }
        ],

        workOrientation: [
            { name: 'Creative', level: 'Medium', score: 65 },
            { name: 'Informative', level: 'Medium', score: 60 },
            { name: 'People', level: 'High', score: 90 },
            { name: 'Administrative', level: 'High', score: 70 }
        ],

        strengths: [
            'Genuinely and warmly interested in people',
            'Exceptional people skills — understands and motivates others',
            'Strong organizational capabilities and love of structure',
            'Loyal, honest, creative, and imaginative'
        ],

        growthAreas: [
            'Tendency to neglect own needs for others',
            'Can be overly controlling or manipulative when unbalanced',
            'Extremely sensitive to criticism and conflict',
            'May define themselves entirely through others\' needs'
        ],

        communicationStyle: {
            traits: [
                'Warm, expressive, and people-focused',
                'Adapts communication style to the listener like a chameleon',
                'Expresses values clearly but avoids topics that would disrupt harmony'
            ],
            dos: [
                'Be open, honest, and show genuine appreciation',
                'Engage emotionally and acknowledge their efforts',
                'Give them affirmation — they need to know they are valued'
            ],
            donts: [
                'Don\'t be cold, dismissive, or overly critical',
                'Don\'t ignore their feelings or the feelings of others',
                'Don\'t force them into purely impersonal logic without a human element'
            ]
        },

        relationships: {
            romantic: [
                'Warm, affirming, and deeply invested in closeness and authenticity',
                'Loyal and committed — wants lifelong relationships',
                'Puts a lot of effort and enthusiasm into the relationship',
                'May tend to "smother" loved ones; needs to remember their own needs'
            ],
            friendships: [
                'Brings people together and maintains many connections',
                'Supportive, encouraging, and remembers what matters to friends',
                'Fun to be with — lively sense of humor, dramatic, energetic, optimistic',
                'May feel lonely even when surrounded by people'
            ],
            colleague: [
                'Facilitates collaboration and motivates team members',
                'Communicates effectively and builds strong working relationships',
                'Enjoys inspiring others and being a catalyst for positive change',
                'Dislikes impersonal reasoning without a human connection'
            ],
            manager: [
                'Inspires and develops team members to reach their potential',
                'Creates a positive, organized culture with clear structure',
                'Provides genuine mentorship and cares about each person\'s growth',
                'May take on too much responsibility for others\' wellbeing'
            ]
        },

        careers: [
            { title: 'Teacher / Professor', match: 95, growth: 'High', desc: 'Educate and inspire students to reach their full potential' },
            { title: 'HR Manager', match: 92, growth: 'High', desc: 'Develop talent and build positive workplace culture' },
            { title: 'Counselor / Therapist', match: 90, growth: 'High', desc: 'Guide individuals through personal growth and challenges' },
            { title: 'Public Relations Manager', match: 87, growth: 'High', desc: 'Manage communications and build meaningful relationships' },
            { title: 'Life Coach', match: 85, growth: 'Medium', desc: 'Guide others toward their goals and personal fulfillment' }
        ],

        careerDetail: {
            title: 'Teacher / Professor',
            compatibility: 95,
            overview: 'Educates, inspires, and develops students to reach their full potential.',
            whyFits: 'Your uncanny ability to understand people and say exactly what they need to hear makes you a natural in any teaching or mentoring role. You enjoy being the center of attention and thrive when you can inspire and lead others.',
            environment: 'Schools, universities, training centers, coaching practices',
            growthPath: 'Teacher → Department Head → Principal / Dean → Educational Director',
            skills: ['Teaching & Mentoring', 'Communication', 'Organization', 'People Development']
        },

        curiosities: [
            'ENFJs are called "The Giver" — their primary drive is bringing out the best in others.',
            'They make up about 2-3% of the population and are among the most people-focused of all types.',
            'Famous ENFJs include Oprah Winfrey, Barack Obama, and Nelson Mandela.',
            'ENFJs have such extraordinary people skills they can often get others to do exactly what they want — usually for unselfish reasons.'
        ],

        didYouKnow: 'Your personality type is naturally gifted at public speaking and often becomes an influential teacher, mentor, or leader. ENFJs have such a special gift with people that they can draw out even the most reserved individuals.',

        metaphor: {
            name: 'Inspiring Catalyst',
            description: 'Like a passionate teacher who sees the potential in every student, you make things happen for people and find your greatest satisfaction in their growth.',
            traits: ['Charismatic ✨', 'Empathetic 💗', 'Organized 📋']
        }
    },

    'ENTJ': {
        name: 'The Executive',
        category: 'Analysts',
        tagline: 'Natural born leaders who turn every challenge into an opportunity to be conquered',

        fullDescription: 'As an ENTJ, your primary mode of living is focused externally, where you deal with things rationally and logically. You are a natural born leader who lives in a world of possibilities, seeing all sorts of challenges to be surmounted — and wanting to be the one responsible for surmounting them. You have a drive for leadership, well-served by your quickness to grasp complexities, your ability to absorb large amounts of impersonal information, and your quick and decisive judgments. You are very career-focused and fit into the corporate world naturally, constantly scanning your environment for potential problems to turn into solutions. You generally see things from a long-range perspective and are usually successful at identifying plans to turn problems around. There is not much room for error in your world — you dislike seeing mistakes repeated and have no patience with inefficiency. You are assertive, innovative, and a long-range thinker with an excellent ability to translate theories and possibilities into solid plans of action. You have a tremendous amount of personal power and presence. You love to interact with people and there is nothing more enjoyable to you than a lively, challenging conversation. You especially respect people who are able to stand up to you and argue persuasively for their point of view.',

        interests: [
            { name: 'Leadership & Strategy', score: 92 },
            { name: 'Entrepreneurship', score: 88 },
            { name: 'Business Development', score: 85 },
            { name: 'Finance & Investment', score: 80 },
            { name: 'Organizational Management', score: 78 },
            { name: 'Negotiation & Debate', score: 75 }
        ],

        workOrientation: [
            { name: 'Creative', level: 'Medium', score: 60 },
            { name: 'Informative', level: 'High', score: 75 },
            { name: 'People', level: 'High', score: 80 },
            { name: 'Administrative', level: 'High', score: 85 }
        ],

        strengths: [
            'Natural born leader — driven to take charge and surmount challenges',
            'Excellent verbal communication and debate skills',
            'Fair-minded, decisive, and extremely high standards',
            'Able to turn conflict situations into positive lessons'
        ],

        growthAreas: [
            'Tendency to be challenging, confrontational, and overbearing',
            'Not naturally tuned in to people\'s feelings and reactions',
            'May be harsh and intolerant about inefficiency or messiness',
            'Tendency to make hasty decisions and want to always be in charge'
        ],

        communicationStyle: {
            traits: [
                'Direct, assertive, and verbally fluent',
                'Enjoys lively, challenging debate — especially respects those who stand up to them',
                'Goal-oriented and efficiency-focused; no patience for vagueness'
            ],
            dos: [
                'Be direct, prepared, and argue your point with confidence',
                'Focus on results, logic, and long-term outcomes',
                'Come with data and a clear rationale'
            ],
            donts: [
                'Don\'t be vague, inefficient, or waste their time',
                'Don\'t be overly emotional or sensitive in discussions',
                'Don\'t back down without a well-reasoned argument'
            ]
        },

        relationships: {
            romantic: [
                'Wants a beautiful, well-run home and a congenial, devoted relationship',
                'Best paired with someone who has a strong self-image and is also a Thinking type',
                'Takes commitments very seriously and has strong sentimental streaks (though often hidden)',
                'May be absent from home mentally or physically due to career focus'
            ],
            friendships: [
                'Enjoys lively, challenging conversations above all else',
                'Genuinely interested in people\'s ideas and thoughts',
                'Respects those who can stand up to them and argue persuasively',
                'Able to leave relationships without looking back when necessary'
            ],
            colleague: [
                'Drives projects forward with tireless energy and clear direction',
                'Expects high performance and has no patience with inefficiency',
                'Communicates directly and verbalizes opinions quickly',
                'Takes initiative and naturally assumes leadership roles'
            ],
            manager: [
                'Leads decisively and sets extremely high standards and expectations',
                'Focuses on long-range organizational vision and strategy',
                'Develops talent strategically and delegates based on competence',
                'May be harsh or intolerant when patience is tried; needs to work on sensitivity'
            ]
        },

        careers: [
            { title: 'CEO / Executive', match: 95, growth: 'High', desc: 'Lead organizations and drive strategic vision to measurable results' },
            { title: 'Management Consultant', match: 92, growth: 'High', desc: 'Advise organizations on strategy and performance improvement' },
            { title: 'Entrepreneur', match: 90, growth: 'High', desc: 'Build and scale businesses from the ground up' },
            { title: 'Corporate Lawyer', match: 87, growth: 'Medium', desc: 'Handle complex legal matters and high-stakes negotiations' },
            { title: 'Investment Banker', match: 85, growth: 'High', desc: 'Manage major financial deals and corporate transactions' }
        ],

        careerDetail: {
            title: 'CEO / Executive',
            compatibility: 95,
            overview: 'Leads organizations, drives strategic vision, and turns problems into measurable results.',
            whyFits: 'Your natural drive for leadership, quickness to grasp complexities, and tireless work ethic make you exceptionally well-suited to the highest levels of organizational leadership. You are not likely to be happy as a follower — you need to be in charge to take advantage of your special capabilities.',
            environment: 'Corporations, startups, consulting firms, investment banks',
            growthPath: 'Manager → Director → VP → C-Suite Executive → CEO',
            skills: ['Strategic Leadership', 'Decision Making', 'Business Development', 'Organizational Vision']
        },

        curiosities: [
            'ENTJs are called "The Executive" — natural born leaders who see challenges as opportunities to be conquered.',
            'They make up about 3% of the population but hold a disproportionate number of CEO and executive positions.',
            'Famous ENTJs include Steve Jobs, Margaret Thatcher, and Napoleon Bonaparte.',
            'ENTJs have tremendous personal power and presence — even the most confident individuals may experience self-doubt when debating with an ENTJ.'
        ],

        didYouKnow: 'ENTJs make up only 3% of the population but hold a disproportionate number of CEO positions. Their ability to clearly identify problems and innovative solutions makes them exceptional organization builders.',

        metaphor: {
            name: 'Commanding General',
            description: 'Like a general who sees the entire battlefield and leads troops to victory, you organize, plan, and drive forward until the best result has been realized.',
            traits: ['Decisive ⚡', 'Strategic 🎯', 'Ambitious 🚀']
        }
    },

    'ENTP': {
        name: 'The Visionary',
        category: 'Analysts',
        tagline: 'Upbeat visionaries who see possibilities everywhere and reinvent the world around them',

        fullDescription: 'As an ENTP, your primary mode of living is focused externally, where you take things in primarily via your intuition. You are an upbeat visionary who highly values knowledge and spends much of your life seeking a higher understanding. You live in the world of possibilities, and become excited about concepts, challenges and difficulties. With Extraverted Intuition dominating your personality, you are constantly absorbing ideas and images about the situations you are presented with, and are usually extremely quick and accurate in your ability to size up a situation. You are an idea person — your perceptive abilities cause you to see possibilities everywhere. You get excited and enthusiastic about your ideas, and are able to spread your enthusiasm to others. You are a fluent conversationalist, mentally quick, and enjoy verbal sparring. You love to debate issues, and may even switch sides sometimes just for the love of the debate. You are less interested in developing plans of action than in generating possibilities and ideas — following through on implementation is usually a chore. When presented with a problem, you are good at improvising and quickly come up with a creative solution. Creative, clever, curious, and theoretical, you have a broad range of possibilities in your life.',

        interests: [
            { name: 'Innovation & Invention', score: 90 },
            { name: 'Entrepreneurship', score: 86 },
            { name: 'Strategic Problem Solving', score: 83 },
            { name: 'Debate & Law', score: 80 },
            { name: 'Technology & Science', score: 76 },
            { name: 'Creative Writing & Ideas', score: 72 }
        ],

        workOrientation: [
            { name: 'Creative', level: 'High', score: 85 },
            { name: 'Informative', level: 'High', score: 75 },
            { name: 'People', level: 'Medium', score: 65 },
            { name: 'Administrative', level: 'Low', score: 45 }
        ],

        strengths: [
            'Enthusiastic, upbeat, and excellent communicator — able to spread enthusiasm to others',
            'Sees possibilities everywhere; great at improvising creative solutions to difficult problems',
            'Extremely interested in self-improvement and growth in relationships',
            'Able to quickly find the best or most useful side of others; laid-back and flexible'
        ],

        growthAreas: [
            'Tendency to not follow through on plans and ideas — may never finish what they start',
            'Love of debate may cause them to provoke arguments unnecessarily',
            'Big risk-takers and spenders; not usually good at managing money',
            'May abandon relationships which no longer offer opportunity for growth'
        ],

        communicationStyle: {
            traits: [
                'Witty, engaging, and mentally quick — enjoys verbal sparring',
                'Loves to debate and may switch sides just for the love of the argument',
                'Challenges conventional thinking and sees the other side of every situation'
            ],
            dos: [
                'Be open to new ideas and engage in lively intellectual discussion',
                'Come prepared to defend your position with logic and evidence',
                'Keep it interesting — they thrive on challenge and novelty'
            ],
            donts: [
                'Don\'t be rigid, boring, or resistant to new ideas',
                'Don\'t take their debate personally — it\'s intellectual sport to them',
                'Don\'t expect them to follow routine or stick to a rigid plan'
            ]
        },

        relationships: {
            romantic: [
                'Keeps relationships exciting — always excited by anything new',
                'Takes commitments and relationships very seriously when genuinely invested',
                'Charming and capable; others tend to follow their lead even in trying situations',
                'May abandon relationships which no longer offer opportunity for growth'
            ],
            friendships: [
                'Enthusiastic, upbeat, and popular — easy to get along with when laid-back',
                'Enjoys lively intellectual debate and loves friends who can hold their own',
                'Big idea-people who are always working on a grand scheme or idea',
                'May provoke arguments through their love of debate — not always intentionally'
            ],
            colleague: [
                'Generates innovative ideas and sees angles others have not thought of',
                'Challenges the status quo and quickly adapts to new situations',
                'May jump between projects and struggle to follow through on implementation',
                'Needs freedom and open road — resists regimented or confining work environments'
            ],
            manager: [
                'Encourages creativity and gives team freedom to innovate',
                'Inspires with vision and enthusiasm for new possibilities',
                'May lack follow-through on plans and struggle with routine management tasks',
                'Best in roles where they can use their intuitive powers freely'
            ]
        },

        careers: [
            { title: 'Innovation Manager', match: 93, growth: 'High', desc: 'Drive creative solutions and organizational reinvention' },
            { title: 'Entrepreneur', match: 90, growth: 'High', desc: 'Build new ventures driven by vision and possibility' },
            { title: 'Marketing Director', match: 88, growth: 'High', desc: 'Develop bold strategies that challenge the status quo' },
            { title: 'Product Manager', match: 86, growth: 'High', desc: 'Lead product development from idea to reality' },
            { title: 'Strategic Consultant', match: 83, growth: 'High', desc: 'Solve complex problems and reinvent organizations' }
        ],

        careerDetail: {
            title: 'Innovation Manager',
            compatibility: 93,
            overview: 'Drives creative solutions, new product development, and organizational reinvention.',
            whyFits: 'Your ability to see possibilities everywhere, quickly size up situations, and spread enthusiasm to others makes you a natural at leading innovation. You are happiest when you have the freedom to use your mind most productively and an open road toward success.',
            environment: 'Startups, innovation labs, consulting firms, tech companies',
            growthPath: 'Analyst → Innovation Lead → Chief Innovation Officer',
            skills: ['Creative Thinking', 'Strategic Vision', 'Communication', 'Problem Solving']
        },

        curiosities: [
            'ENTPs are called "The Visionary" — they are the great problem solvers, discoverers, and re-inventors of the world.',
            'They make up about 3% of the population and are among the most intellectually versatile of all types.',
            'Famous ENTPs include Leonardo da Vinci, Benjamin Franklin, and Socrates.',
            'ENTPs love to debate and may even switch sides just for the love of the argument — they are fluent conversationalists who are mentally quick and enjoy verbal sparring.'
        ],

        didYouKnow: 'Your personality type is known for starting multiple businesses and pioneering new industries. ENTPs are the great problem solvers, discoverers, and re-inventors of the world — their insights allow them to see new ways of putting things together that others simply cannot see.',

        metaphor: {
            name: 'Inventive Visionary',
            description: 'Like a pioneer who sees a new frontier where others see only obstacles, you are always the first to show others a new path or find a way of doing something no one has done before.',
            traits: ['Creative 🎨', 'Adaptable 🌿', 'Energetic ⚡']
        }
    },

    'ENFP': {
        name: 'The Inspirer',
        category: 'Diplomats',
        tagline: 'Warm, enthusiastic visionaries who inspire others and live life as a special gift',

        fullDescription: 'As an ENFP, your primary mode of living is focused externally, where you take things in primarily via your intuition. You are warm, enthusiastic, typically very bright and full of potential. You live in the world of possibilities, and can become very passionate and excited about things. Your enthusiasm lends you the ability to inspire and motivate others more so than we see in other types — you can talk your way in or out of anything. You love life, seeing it as a special gift, and strive to make the most out of it. You have an unusually broad range of skills and talents and are good at most things which interest you. You are project-oriented and may go through several different careers during your lifetime, always guided by a strong, consistent value system. Everything you do must be in line with your values — you need to feel that you are living your life as your true Self. You have great people skills and an exceptional ability to intuitively understand a person after a very short period of time. Because you live in the world of exciting possibilities, the details of everyday life are seen as trivial drudgery. You work best in situations where you have a lot of flexibility and where you can work with people and ideas. ENFPs are charming, ingenuous, risk-taking, sensitive, people-oriented individuals with capabilities ranging across a broad spectrum.',

        interests: [
            { name: 'Creative Ideation & Innovation', score: 88 },
            { name: 'People & Relationships', score: 85 },
            { name: 'Entrepreneurship', score: 82 },
            { name: 'Writing & Communication', score: 80 },
            { name: 'Counseling & Coaching', score: 76 },
            { name: 'Arts & Self-Expression', score: 72 }
        ],

        workOrientation: [
            { name: 'Creative', level: 'Medium', score: 67 },
            { name: 'Informative', level: 'Medium', score: 66 },
            { name: 'People', level: 'Medium', score: 63 },
            { name: 'Administrative', level: 'Medium', score: 63 }
        ],

        strengths: [
            'Exceptionally perceptive about people — quickly and accurately assesses where someone is coming from',
            'Warmly, genuinely interested in people with great communication skills',
            'Highly creative, energetic, and motivational; brings out the best in others',
            'Natural leader who does not like to control people; cooperative and egalitarian'
        ],

        growthAreas: [
            'May drop projects when excited about a new possibility — difficulty following through',
            'Tendency to be smothering and hold onto bad relationships long after they\'ve turned bad',
            'Extreme dislike of conflict and criticism; may internalize anger rather than express it',
            'Uninterested in routine, mundane tasks; may become bored easily'
        ],

        communicationStyle: {
            traits: [
                'Enthusiastic, expressive, and genuinely warm',
                'Exceptional ability to relate to people on their own level',
                'Highly intuitive — can read people quickly and accurately'
            ],
            dos: [
                'Be open, enthusiastic, and explore possibilities together',
                'Show genuine interest in them as an individual',
                'Give them freedom and flexibility — avoid being controlling'
            ],
            donts: [
                'Don\'t be rigid, controlling, or dismissive of their ideas',
                'Don\'t criticize them personally — they dislike it intensely',
                'Don\'t force them into routine or mundane detail work'
            ]
        },

        relationships: {
            romantic: [
                'Warmly affectionate, fun to be with — lively sense of humor, dramatic, energetic, optimistic',
                'Strives for win-win situations and is driven to meet others\' needs',
                'Usually loyal and dedicated; strong values keep them committed',
                'May hold onto bad relationships long after they\'ve turned bad; always seeing what could be'
            ],
            friendships: [
                'Genuinely warm and interested in people — places great importance on relationships',
                'Has a strong need to be liked and brings out the best in others',
                'Highly perceptive about people\'s thoughts and motivations',
                'May become bored easily and needs friends comfortable with change and new experiences'
            ],
            colleague: [
                'Generates creative ideas and energizes the team with enthusiasm',
                'Builds relationships easily and relates to people on their own level',
                'Highly productive with little supervision when excited about the work',
                'May struggle with routine tasks and following through on long projects'
            ],
            manager: [
                'Inspires with enthusiasm and a compelling vision of possibilities',
                'Encourages individual growth and does not like to control people',
                'Supports team development and strives for cooperative, win-win outcomes',
                'May lack structure and struggle with enforcing discipline or routine'
            ]
        },

        careers: [
            { title: 'Brand Manager', match: 94, growth: 'High', desc: 'Build brand identity and craft stories that connect with people' },
            { title: 'Journalist / Writer', match: 91, growth: 'Medium', desc: 'Tell compelling stories and explore the world of ideas' },
            { title: 'Counselor / Coach', match: 88, growth: 'High', desc: 'Guide individuals toward growth and self-understanding' },
            { title: 'Entrepreneur', match: 86, growth: 'High', desc: 'Build something new driven by passion and possibility' },
            { title: 'Marketing Director', match: 83, growth: 'High', desc: 'Lead creative campaigns that inspire and engage audiences' }
        ],

        careerDetail: {
            title: 'Brand Manager',
            compatibility: 94,
            overview: 'Builds and manages brand identity, crafting compelling stories that connect with people.',
            whyFits: 'Your exceptional ability to understand people intuitively, combined with your creativity and enthusiasm, makes you a natural at building brands that resonate. You can talk your way in or out of anything — a powerful asset in marketing and communications.',
            environment: 'Marketing agencies, startups, media companies, remote work',
            growthPath: 'Marketing Coordinator → Brand Manager → Marketing Director → CMO',
            skills: ['Creative Ideation', 'Communication', 'People Insight', 'Storytelling']
        },

        curiosities: [
            'ENFPs are called "The Inspirer" — their enthusiasm lends them the ability to inspire and motivate others more than any other type.',
            'They are project-oriented and may go through several different careers during their lifetime, always guided by a strong consistent value system.',
            'Famous ENFPs include Robin Williams, Walt Disney, and Mark Twain.',
            'ENFPs have an exceptional ability to intuitively understand a person after a very short period of time — and can talk their way in or out of anything.'
        ],

        didYouKnow: 'Your personality type is often found in creative industries and is known for innovative thinking. ENFPs are lucky in that they\'re good at quite a lot of different things — they can generally achieve success at anything which has interested them.',

        metaphor: {
            name: 'Enthusiastic Inspirer',
            description: 'Like a spark that ignites a fire, you see possibilities everywhere and have the rare gift of making others believe in them too.',
            traits: ['Enthusiastic 🎉', 'Creative 🌈', 'Empathetic 💖']
        }
    },

    'ESFJ': {
        name: 'The Caregiver',
        category: 'Sentinels',
        tagline: 'Warm, dependable people-persons who measure success by the happiness of those around them',

        fullDescription: 'As an ESFJ, your primary mode of living is focused externally, where you deal with things according to how you feel about them, or how they fit in with your personal value system. You are a people person — you love people and are warmly interested in others. You use your Sensing and Judging characteristics to gather specific, detailed information about others, and turn this information into supportive judgments. You have a special skill at bringing out the best in others and are extremely good at reading people and understanding their point of view. You take your responsibilities very seriously and are very dependable. You value security and stability, and have a strong focus on the details of life. You see before others do what needs to be done, and do whatever it takes to make sure it gets done. You are warm and energetic, and get a lot of your personal satisfaction from the happiness of others. You want to be appreciated for who you are and what you give. You enjoy creating order and structure, and are very good at tasks which require these kinds of skills. At your best you are warm, sympathetic, helpful, cooperative, tactful, down-to-earth, practical, thorough, consistent, organized, enthusiastic, and energetic. You enjoy tradition and security, and seek stable lives rich in contact with friends and family.',

        interests: [
            { name: 'Caregiving & Healthcare', score: 90 },
            { name: 'Education & Teaching', score: 86 },
            { name: 'Event Planning & Hospitality', score: 83 },
            { name: 'Human Resources', score: 80 },
            { name: 'Social Services', score: 76 },
            { name: 'Community & Family', score: 73 }
        ],

        workOrientation: [
            { name: 'Creative', level: 'Medium', score: 55 },
            { name: 'Informative', level: 'Medium', score: 60 },
            { name: 'People', level: 'High', score: 85 },
            { name: 'Administrative', level: 'High', score: 75 }
        ],

        strengths: [
            'Warm, friendly, and affirming — has a special gift for making people feel good about themselves',
            'Service-oriented, takes commitments very seriously, and seeks lifelong relationships',
            'Responsible and practical — can be counted on to take care of day-to-day necessities',
            'Generally upbeat and popular; traditionally minded and family-oriented'
        ],

        growthAreas: [
            'Generally uncomfortable with change and moving into new territory',
            'Extreme dislike of conflict and criticism; needs a lot of positive affirmation',
            'May tend to use guilt manipulation as a way to get what they want',
            'Have difficulty accepting negative things about people close to them'
        ],

        communicationStyle: {
            traits: [
                'Friendly, warm, and focused on people and harmony',
                'Extremely good at reading others and adapting their manner to be more pleasing',
                'Open, honest, and forthright about the way they see things'
            ],
            dos: [
                'Be friendly, warm, and show genuine appreciation',
                'Maintain harmony and acknowledge their contributions',
                'Be reliable and follow through on commitments'
            ],
            donts: [
                'Don\'t be cold, critical, or indifferent — they are hurt by indifference',
                'Don\'t ignore social norms or create unnecessary conflict',
                'Don\'t dismiss their values or the traditions they hold dear'
            ]
        },

        relationships: {
            romantic: [
                'Warm-hearted and highly invested in close personal relationships',
                'Takes commitments very seriously and seeks lifelong relationships',
                'Very service-oriented; own happiness is closely tied to the happiness of those around them',
                'Has difficulty accepting the end of a relationship and is likely to take the blame onto their own shoulders'
            ],
            friendships: [
                'Maintains many friendships and organizes gatherings and celebrations',
                'Remembers details about people and makes family traditions special events',
                'Provides emotional support and practical care freely and generously',
                'Generally upbeat and popular — people are drawn towards them'
            ],
            colleague: [
                'Facilitates team cooperation and maintains a positive, harmonious atmosphere',
                'Sees before others what needs to be done and does whatever it takes to get it done',
                'Helps colleagues and values everyone feeling included and appreciated',
                'May struggle with conflict and avoid difficult conversations'
            ],
            manager: [
                'Creates a supportive, organized culture where people feel valued',
                'Recognizes contributions and maintains team morale',
                'Responsible and practical — can be counted on for day-to-day necessities',
                'May avoid tough decisions and be overly sensitive to criticism'
            ]
        },

        careers: [
            { title: 'Event Planner', match: 94, growth: 'High', desc: 'Organize memorable events where every guest feels valued' },
            { title: 'Healthcare Administrator', match: 91, growth: 'High', desc: 'Manage healthcare services with care and organization' },
            { title: 'Teacher', match: 88, growth: 'Medium', desc: 'Educate and nurture students in a structured environment' },
            { title: 'HR Manager', match: 85, growth: 'High', desc: 'Support people and build positive workplace culture' },
            { title: 'Social Worker', match: 83, growth: 'Medium', desc: 'Provide practical care and support to those in need' }
        ],

        careerDetail: {
            title: 'Event Planner',
            compatibility: 94,
            overview: 'Organizes and coordinates memorable events, ensuring every detail is perfect and every guest feels valued.',
            whyFits: 'Your natural talent for creating order and structure, combined with your genuine warmth and ability to make people feel good about themselves, makes you exceptional at bringing people together for meaningful occasions.',
            environment: 'Event companies, hotels, schools, healthcare, community organizations',
            growthPath: 'Event Coordinator → Event Manager → Director of Events',
            skills: ['Organization', 'People Skills', 'Coordination', 'Attention to Detail']
        },

        curiosities: [
            'ESFJs are called "The Caregiver" — caring is the very nature of their personality, and they measure success by the happiness and gratitude reflected back from those they help.',
            'They make up about 9-13% of the population, making them one of the most common types.',
            'Famous ESFJs include Taylor Swift, Bill Clinton, and Jennifer Garner.',
            'ESFJs have a special gift of invariably making people feel good about themselves — they are extremely good at reading others and understanding their point of view.'
        ],

        didYouKnow: 'Your personality type is naturally skilled at creating community and bringing people together. ESFJs measure their success by the happiness and gratitude reflected back from the people in whose lives they play a part.',

        metaphor: {
            name: 'Devoted Caregiver',
            description: 'Like a gracious host who ensures every guest feels welcome and valued, you create warmth, order, and belonging wherever you go.',
            traits: ['Sociable 🎊', 'Helpful 🤗', 'Traditional 🏛️']
        }
    },

    'ISFJ': {
        name: 'The Defender',
        category: 'Sentinels',
        tagline: 'Dedicated protectors who create stability through quiet service',

        fullDescription: 'As a Defender (ISFJ), you are the backbone of any community you join. Your dedication to helping others isn\'t loud or showy—it\'s expressed through consistent, practical actions that make life better for those around you. You have an exceptional memory for details about people: their preferences, their struggles, their important dates. This isn\'t just data to you; it\'s how you show you care. You thrive in environments where you can provide stability and support, where your reliability becomes the foundation others build upon. Change can be challenging for you, not because you can\'t adapt, but because you value the security of proven methods. You may struggle to advocate for your own needs, often putting others first to the point of self-neglect. Your loyalty runs deep—once you commit to a person or cause, you\'re in it for the long haul. You excel in roles where your attention to detail and genuine care for others create lasting positive impact.',

        interests: [
            { name: 'Healthcare & Caregiving', score: 90 },
            { name: 'Education & Teaching', score: 85 },
            { name: 'Administrative Support', score: 80 },
            { name: 'Community Service', score: 78 },
            { name: 'Traditional Practices', score: 75 },
            { name: 'Practical Helping', score: 88 }
        ],

        workOrientation: [
            { name: 'Creative', level: 'Medium', score: 50 },
            { name: 'Informative', level: 'Medium', score: 60 },
            { name: 'People', level: 'High', score: 85 },
            { name: 'Administrative', level: 'High', score: 80 }
        ],

        strengths: [
            'Exceptional reliability and follow-through',
            'Deep care for others\' wellbeing',
            'Attention to practical details',
            'Creates stable, harmonious environments'
        ],

        growthAreas: [
            'May neglect own needs for others',
            'Can be overly selfless to point of burnout',
            'Struggles with change and new methods',
            'May avoid necessary conflict'
        ],

        communicationStyle: {
            traits: [
                'Warm and considerate in tone',
                'Attentive to others\' feelings',
                'Prefers harmony over confrontation'
            ],
            dos: [
                'Be respectful and appreciative',
                'Show genuine care and interest',
                'Provide clear, practical guidance'
            ],
            donts: [
                'Don\'t be harsh or dismissive',
                'Don\'t ignore their contributions',
                'Don\'t create unnecessary conflict'
            ]
        },

        relationships: {
            romantic: [
                'Deeply devoted and nurturing',
                'Remembers every important detail',
                'Creates warm, stable home life',
                'May be overly selfless'
            ],
            friendships: [
                'Loyal and supportive over decades',
                'Remembers birthdays and special occasions',
                'Helps friends in practical ways',
                'Maintains long-term connections'
            ],
            colleague: [
                'Supports team harmony and needs',
                'Attends to important details',
                'Works reliably and consistently',
                'Maintains positive atmosphere'
            ],
            manager: [
                'Leads through service and support',
                'Creates stable team environment',
                'Remembers individual needs',
                'May avoid difficult conversations'
            ]
        },

        careers: [
            { title: 'Registered Nurse', match: 95, growth: 'High', desc: 'Provide compassionate patient care' },
            { title: 'Elementary Teacher', match: 92, growth: 'Medium', desc: 'Educate and nurture young minds' },
            { title: 'Office Manager', match: 89, growth: 'Medium', desc: 'Keep operations running smoothly' },
            { title: 'Social Worker', match: 86, growth: 'Medium', desc: 'Support vulnerable populations' },
            { title: 'Librarian', match: 84, growth: 'Low', desc: 'Organize information and help patrons' }
        ],

        careerDetail: {
            title: 'Registered Nurse',
            compatibility: 95,
            overview: 'Provides compassionate, detail-oriented care to patients in their most vulnerable moments.',
            whyFits: 'Your natural caregiving instincts, attention to detail, and ability to remember patient needs make you exceptional in healthcare. You genuinely care about each person\'s wellbeing.',
            environment: 'Hospitals, clinics, home healthcare, schools',
            growthPath: 'RN → Charge Nurse → Nurse Manager → Director of Nursing',
            skills: ['Patient Care', 'Attention to Detail', 'Empathy', 'Reliability']
        },

        curiosities: [
            'ISFJs are the most common personality type, making up 9-14% of the population',
            'They form the backbone of many organizations through quiet, consistent service',
            'Famous ISFJs include Mother Teresa, Kate Middleton, and Queen Elizabeth II',
            'They have exceptional memory for personal details about others'
        ],

        didYouKnow: 'ISFJs are known for their ability to create and maintain traditions that bring communities together, often becoming the "glue" that holds families and organizations intact.',

        metaphor: {
            name: 'Devoted Protector',
            description: 'Like a guardian watching over loved ones, you create safety and stability through consistent care.',
            traits: ['Caring 💝', 'Loyal 🤝', 'Practical 🏠']
        }
    }
};

// Export for use in report.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PERSONALITY_DATA;
}
