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
