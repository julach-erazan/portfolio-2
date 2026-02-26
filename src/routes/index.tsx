import { useState, useMemo, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { allJobs, allEducations } from 'content-collections'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { GraduationCap, Mail, Github, Linkedin, FileDown } from 'lucide-react'
import { marked } from 'marked'
import ResumeAssistant from '#/components/ResumeAssistant'
import Galaxy from '../components/Galaxy'
import CountUp from '../components/CountUp'
import Header from '../components/Header'
import SlantedMarquee from '../components/SlantedMarquee'
import ProjectSlider from '../components/ProjectSlider'
import TypewriterHeading from '../components/TypewriterHeading'
import FallingCapsules from '../components/FallingCapsules'

export const Route = createFileRoute('/')({
  component: App,
})

const GALAXY_CONFIG = {
  density: 2,
  glowIntensity: 0.5,
  twinkleIntensity: 0.5,
  rotationSpeed: 0.05,
  starSpeed: 0.3,
  speed: 0.8,
  mouseInteraction: true,
  mouseRepulsion: true,
  repulsionStrength: 2.5,
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const focal = useMemo(() => [0.5, 0.5] as [number, number], [])
  const rotation = useMemo(() => [1.0, 0.0] as [number, number], [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]">
          <img
            src="/loading.gif"
            alt="Loading..."
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 object-contain"
          />
        </div>
      )}
      <div className="text-white min-h-screen">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Galaxy
            {...GALAXY_CONFIG}
            focal={focal}
            rotation={rotation}
            saturation={0}
            hueShift={140}
          />
        </div>

        <div className="relative z-10">
          <Header />
          <ResumeAssistant />

          {/* Hero Section - pt clears fixed header on all views */}
          <section className="relative min-h-screen flex flex-col px-4 sm:px-6 overflow-hidden pt-24">
            <div className="flex-1 flex flex-col items-center justify-center container mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center z-10">
              <div
                className="animate-reveal-fade"
                style={{ animationDelay: '200ms' }}
              >
                <Badge
                  variant="outline"
                  className="mb-3 md:mb-4 text-[#c0c2ce] border-[#536872]/50 uppercase tracking-[0.2em] font-pixel text-xs sm:text-sm px-2.5 sm:px-3"
                >
                  Experience Liftoff
                </Badge>
                <TypewriterHeading />
                <p className="text-sm sm:text-base lg:text-lg mb-6 md:mb-8 max-w-xl font-light leading-relaxed">
                  {[
                    "I'm",
                    'a',
                    'Software',
                    'Engineer',
                    'who',
                    'loves',
                    'bridging',
                    'the',
                    'gap',
                    'between',
                    'design',
                    'and',
                    'high-performance',
                    'engineering.',
                    'I',
                    'spend',
                    'my',
                    'time',
                    'crafting',
                    'scalable,',
                    'modern',
                    'web',
                    'experiences',
                    'that',
                    'just',
                    'work.',
                  ].map((word, i) => {
                    const colors = [
                      '#c0c2ce',
                      '#ffc0cb',
                      '#a8e6cf',
                      '#ffcc5c',
                      '#536872',
                    ] as const
                    return (
                      <span key={i} style={{ color: colors[i % 5] }}>
                        {word}{' '}
                      </span>
                    )
                  })}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                  <a
                    href="#projects"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 bg-white text-black text-sm sm:text-base font-semibold rounded-full hover:scale-105 transition-transform text-center"
                  >
                    Explore Work
                  </a>
                  <a
                    href="/api/download-cv"
                    download="Julach_Earzan_Software-Engineer.pdf"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 border border-white/30 text-white text-sm sm:text-base font-semibold rounded-full hover:scale-105 hover:bg-white/10 transition-all text-center inline-flex items-center gap-2"
                  >
                    <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    Download CV
                  </a>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <a
                      href="https://github.com/julach-earzan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#536872] hover:text-[#a8e6cf] transition-colors"
                    >
                      <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a
                      href="https://linkedin.com/in/julach-earzan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#536872] hover:text-[#a8e6cf] transition-colors"
                    >
                      <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a
                      href="mailto:jesrilanka@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#536872] hover:text-[#a8e6cf] transition-colors"
                    >
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="relative flex justify-center animate-reveal-fade"
                style={{ animationDelay: '400ms' }}
              >
                <div className="absolute -inset-2 sm:-inset-4 bg-white/5 blur-2xl rounded-full" />
                <img
                  src="/hero1.webp"
                  alt="Julach Earzan Profile"
                  className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] aspect-square object-cover border border-white/10 rounded-2xl shadow-2xl animate-float"
                />
              </div>
            </div>
          </section>

          <section className="pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                <div className="glass p-4 sm:p-5 rounded-xl flex flex-col items-center justify-center text-center group">
                  <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                    <CountUp
                      from={0}
                      to={2}
                      duration={2}
                      className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gradient"
                    />
                    <span className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(55,147,255,0.5)]">
                      +
                    </span>
                  </div>
                  <p className="text-[#ffc0cb] font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium">
                    Years Experience
                  </p>
                </div>

                <div className="glass p-4 sm:p-5 rounded-xl flex flex-col items-center justify-center text-center group">
                  <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                    <CountUp
                      from={0}
                      to={5}
                      duration={2}
                      className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gradient"
                    />
                    <span className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(55,147,255,0.5)]">
                      +
                    </span>
                  </div>
                  <p className="text-[#a8e6cf] font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium">
                    Completed Projects
                  </p>
                </div>

                <div className="glass p-4 sm:p-5 rounded-xl flex flex-col items-center justify-center text-center group">
                  <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                    <CountUp
                      from={0}
                      to={2}
                      duration={2}
                      className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gradient"
                    />
                    <span className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(55,147,255,0.5)]">
                      +
                    </span>
                  </div>
                  <p className="text-[#ffcc5c] font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium">
                    Happy Clients
                  </p>
                </div>
              </div>
            </div>
          </section>

          <SlantedMarquee
            techStacks={[
              ['react', 'nextjs2', 'typescript', 'nodejs', 'python', 'mysql'],
              [
                'postgresql',
                'mongodb',
                'tailwindcss',
                'git',
                'docker',
                'firebase',
                'redux',
              ],
            ]}
            angle={-2}
          />

          {/* About & Education */}
          <section id="about" className="py-12 sm:py-16 px-4 sm:px-6">
            <div className="container mx-auto grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
              <div className="relative max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0">
                <div className="absolute -inset-4 sm:-inset-6 md:-inset-10 bg-white/5 blur-3xl rounded-2xl" />
                <img
                  src="hero2.webp"
                  alt="Julach Earzan About"
                  className="relative w-full aspect-[4/5] sm:aspect-square object-cover border border-white/10 rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                />
              </div>

              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-3 sm:mb-4 text-[#a8e6cf] border-[#536872]/50 font-pixel text-xs sm:text-sm"
                  >
                    About Me
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
                    Engineer with a Mission
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-[#ffc0cb] leading-relaxed font-light">
                    I'm a Software Engineer who cares about getting things right
                    and building stuff that lasts. I work with Next.js, React,
                    Node.js, and PostgreSQL to build full-stack apps—from
                    responsive UIs to APIs and databases. I've also worked on
                    integrating things like secure payment gateways, so I'm
                    comfortable tackling complex, real-world problems.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-3 text-[#ffcc5c]">
                    <GraduationCap className="text-[#a8e6cf]" /> Education
                  </h3>
                  {allEducations.map((edu) => (
                    <div
                      key={edu.school}
                      className="p-4 sm:p-5 lg:p-6 glass rounded-xl sm:rounded-2xl border-white/10"
                    >
                      <h4 className="font-bold text-base sm:text-lg text-slate-100">
                        {edu.school}
                      </h4>
                      <p className="text-[#c0c2ce] text-sm sm:text-base mt-1">
                        {edu.summary}
                      </p>
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {edu.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-[#536872] uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="pb-12 sm:pb-16 px-4 sm:px-6">
            <div className="container mx-auto px-2 sm:px-6 mb-8 sm:mb-12 flex flex-col items-center text-center">
              <Badge
                variant="outline"
                className="mb-3 sm:mb-4 text-[#536872] border-[#536872]/50 uppercase tracking-[0.1em] font-pixel text-xs sm:text-sm"
              >
                Portfolio Showcase
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
                Core Innovations
              </h2>
            </div>

            <ProjectSlider
              projects={[
                {
                  title: 'INDPT Website',
                  description:
                    'Next.js site with contact form, Nodemailer, webhooks and n8n automation.',
                  tags: ['Next.js', 'Tailwind', 'Nodemailer', 'Webhook', 'n8n'],
                  link: 'http://indpt.com/',
                  image: '/indpt.webp',
                },
                {
                  title: 'Salt Al Bahar Website',
                  description:
                    'Tours site with payment gateway (Geidia) and REST API integration.',
                  tags: [
                    'Next.js',
                    'Tailwind',
                    'Payment Gateway',
                    'Geidia',
                    'Rest API',
                  ],
                  link: 'https://saltalbahar.com/',
                  image: '/saltalbahar.webp',
                },
                {
                  title: 'Weather App Website',
                  description: 'React app with Redux and live weather API.',
                  tags: ['ReactJS', 'Redux', 'Tailwind', 'Weather API'],
                  link: 'https://julach-earzan-weather-app.netlify.app/get-start',
                  image: '/weatherapp.webp',
                },
              ]}
            />
          </section>

          {/* Experience Section (Bento Grid) */}
          <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6">
            <div className="container mx-auto">
              <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-20 text-center">
                <Badge
                  variant="outline"
                  className="mb-3 sm:mb-4 text-[#ffc0cb] border-[#536872]/50 uppercase tracking-[0.1em] font-pixel text-xs sm:text-sm"
                >
                  Career Trajectory
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
                  Work Experience
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...allJobs]
                  .sort(
                    (a, b) =>
                      new Date(b.startDate).getTime() -
                      new Date(a.startDate).getTime(),
                  )
                  .map((job, i) => (
                    <Card
                      key={`${job.company}-${job.jobTitle}`}
                      className={`glass border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 group ${i === 0 ? 'lg:col-span-2' : ''}`}
                    >
                      <CardContent className="p-5 sm:p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 sm:mb-6">
                          <div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1 text-slate-100">
                              {job.jobTitle}
                            </h3>
                            <p className="text-[#536872] font-mono text-xs sm:text-sm tracking-wider uppercase">
                              {job.company}
                            </p>
                          </div>
                          <Badge className="bg-white/10 text-[#ffcc5c] border-white/10 text-xs w-fit">
                            {job.startDate} - {job.endDate || 'Present'}
                          </Badge>
                        </div>
                        <p className="text-[#c0c2ce] mb-4 sm:mb-6 font-light leading-relaxed text-sm sm:text-base">
                          {job.summary}
                        </p>
                        {job.content && (
                          <div
                            className="prose prose-invert prose-sm max-w-none text-[#a8e6cf] mb-6 sm:mb-8 font-light 
                                   prose-ul:list-disc prose-li:mb-1 prose-p:hidden prose-li:text-[#a8e6cf]"
                            dangerouslySetInnerHTML={{
                              __html: marked(job.content),
                            }}
                          />
                        )}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {job.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-white/5 hover:bg-white/10 border-white/5 text-[#ffcc5c] text-[10px] uppercase tracking-widest px-2.5 sm:px-3 py-0.5 sm:py-1"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </section>

          {/* Skills Section - all skills in one falling capsules area */}
          <section id="skills" className="py-12 sm:py-16 px-4 sm:px-6">
            <div className="container mx-auto">
              <div className="flex flex-col items-center mb-10 sm:mb-12 text-center">
                <Badge
                  variant="outline"
                  className="mb-3 sm:mb-4 text-[#a8e6cf] border-[#536872]/50 uppercase tracking-[0.1em] font-pixel text-xs sm:text-sm"
                >
                  What I bring
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
                  Skills
                </h2>
              </div>

              <div className="border-b-2 border-white/20 overflow-hidden">
                <FallingCapsules
                  words={[
                    'Teamwork',
                    'Collaboration',
                    'Problem-solving',
                    'Logical',
                    'Thinking',
                    'Fast-learner',
                    'Adaptability',
                    'Knowledge-seeking',
                    'Communication',
                    'Decision-making',
                    'Leadership',
                    'ReactJS',
                    'Next.js',
                    'TypeScript',
                    'JavaScript',
                    'Tailwind',
                    'HTML',
                    'CSS',
                    'Node.js',
                    'PostgreSQL',
                    'Redux',
                    'Git',
                    'REST',
                    'API',
                  ]}
                  trigger="scroll"
                  className="min-h-[320px]"
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pb-5 sm:pb-8 text-center">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gradient">
                Let's build something exceptional.
              </h2>
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                <a
                  href="mailto:jesrilanka@gmail.com"
                  target="_blank"
                  className="text-[#ffc0cb] hover:text-[#a8e6cf] transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> Email
                </a>
                <a
                  href="https://linkedin.com/in/julach-earzan"
                  target="_blank"
                  className="text-[#c0c2ce] hover:text-[#a8e6cf] transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" /> LinkedIn
                </a>
                <a
                  href="https://github.com/julach-earzan"
                  target="_blank"
                  className="text-[#ffcc5c] hover:text-[#a8e6cf] transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" /> GitHub
                </a>
              </div>
              <p className="text-[#536872] text-xs sm:text-sm font-pixel uppercase tracking-widest">
                © 2026 All rights reserved to Julach Earzan
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
