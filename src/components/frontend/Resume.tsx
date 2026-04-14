import React from 'react';

const Resume = () => {
    const education = [
        {
            title: "B.Sc. in Computer Science & Engineering",
            institution: "Presidency University, Dhaka",
            duration: "2022 – 2026 (Final Semester)",
            result: "CGPA: 3.70",
            desc: "Currently focusing on advanced algorithms, software engineering principles, and completing the final year thesis/project."
        },
        {
            title: "Higher Secondary Certificate (Science)",
            institution: "Hazi Asmat Govt. College",
            duration: "2018 – 2020",
            result: "GPA: 5.00",
            desc: "Completed higher secondary education with a strong focus on Mathematics and Physics."
        }
    ];

    const experience = [
        {
            title: "I2I MERN Stack Developer Program",
            institution: "SkillJobs (Internship at Goinnovior Limited)",
            duration: "Jan 2026 – Present",
            desc: "Hands-on training and internship focusing on MongoDB, Express.js, React.js, and Node.js. Working on RESTful APIs, authentication, and scalable web applications."
        },
        {
            title: "President",
            institution: "Presidency University Programming Club (PUPC)",
            duration: "Jan 2024 – Dec 2025",
            desc: "Leading the programming community, organizing workshops, contests, and fostering a collaborative learning environment for students."
        }
    ];

    return (
        <section id="resume" className="bg-[#0d0d0d] py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Heading */}
                <div className="text-center mb-16">
                    <span className="text-red-600 uppercase tracking-widest font-medium">Resume</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase">My Resume</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* EDUCATION PART */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">Education :-</h3>
                        <div className="space-y-8 border-l border-gray-800 ml-2">
                            {education.map((edu, index) => (
                                <div key={index} className="relative pl-8 group">
                                    {/* Timeline Dot */}
                                    <div className="absolute w-4 h-4 bg-red-600 rounded-full -left-[8.5px] top-1 group-hover:scale-125 transition-transform shadow-[0_0_10px_#dc2626]" />
                                    
                                    <div className="bg-[#121212] p-6 rounded-xl hover:bg-[#1a1a1a] transition-colors border border-gray-900 shadow-xl">
                                        <h4 className="text-xl font-bold text-red-500">{edu.title}</h4>
                                        <p className="text-gray-400 text-sm font-semibold mt-1 uppercase">{edu.institution} : {edu.duration}</p>
                                        <p className="text-white/60 text-xs mt-1 italic">{edu.result}</p>
                                        <div className="h-px w-full bg-gray-800 my-4" />
                                        <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EXPERIENCE PART */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">Experience :-</h3>
                        <div className="space-y-8 border-l border-gray-800 ml-2">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 group">
                                    {/* Timeline Dot */}
                                    <div className="absolute w-4 h-4 bg-red-600 rounded-full -left-[8.5px] top-1 group-hover:scale-125 transition-transform shadow-[0_0_10px_#dc2626]" />
                                    
                                    <div className="bg-[#121212] p-6 rounded-xl hover:bg-[#1a1a1a] transition-colors border border-gray-900 shadow-xl">
                                        <h4 className="text-xl font-bold text-red-500">{exp.title}</h4>
                                        <p className="text-gray-400 text-sm font-semibold mt-1 uppercase">{exp.institution} : {exp.duration}</p>
                                        <div className="h-px w-full bg-gray-800 my-4" />
                                        <p className="text-gray-400 text-sm leading-relaxed">{exp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Resume;