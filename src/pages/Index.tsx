import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Code,
  Database,
  Globe,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Monitor,
  Terminal,
  Layers,
  Server,
  Cpu,
  Send,
  Network,
  Activity,
  Menu,
  X,
  ChevronRight,
  HardDrive,
  Shield
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ServerMetrics from "@/components/ServerMetrics";

import { Reveal } from "@/components/Reveal";
import { DataFlowBackground } from "@/components/DataFlowBackground";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Intersection Observer and scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + 100;
      setIsScrolled(window.scrollY > 50);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / docHeight) * 100;
      setScrollProgress(progress);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData();
    formData.append("entry.2005620554", contactForm.name);
    formData.append("entry.1045781291", contactForm.email);
    formData.append("entry.839337160", contactForm.message);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSe0WqCqa00zRz-UVYHA91I2YLLixuoQYQ4FoH_ia5zNdrnjXw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      alert("SYSTEM_MSG: Payload delivered successfully.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("SYS_ERR: Connection timed out.");
    }

    setIsSending(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const skills = {
    Backend: [
      { name: "Spring Boot", icon: Server },
      { name: "Spring Security", icon: Shield },
      { name: "Spring Data JPA", icon: Database },
      { name: "REST APIs", icon: Network },
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Activity },
    ],

    Languages: [
      { name: "Java", icon: Code },
      { name: "C++", icon: Cpu },
      { name: "Python", icon: Terminal },
      { name: "TypeScript", icon: Code },
      { name: "JavaScript", icon: Code },
    ],

    Database: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Redis", icon: HardDrive },
    ],

    "Cloud & DevOps": [
      { name: "AWS", icon: Globe },
      { name: "Docker", icon: Monitor },
      { name: "Git", icon: Layers },
      { name: "CI/CD", icon: Layers },
      { name: "Linux", icon: Terminal },
    ],

    // Architecture: [
    //   { name: "System Design", icon: Network },
    //   { name: "Distributed Systems", icon: Globe },
    //   { name: "Microservices", icon: Layers },
    //   { name: "WebSockets", icon: Activity },
    // ],
  };

  const projects = [
    {
      title: "SyncCanvas",
      description:
        "Production-grade real-time collaborative whiteboard backend built with Java and Spring Boot. Focused on scalable architecture, WebSocket-based synchronization, concurrent editing, and event-driven collaboration.",
      technologies: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "WebSockets",
        "JPA",
        "Docker"
      ],
      image: "syncCanvas.jpg",
      github: "https://github.com/ishansaxena012/sync-engine",
      demo: "#",
      category: "Distributed Systems",
      category2: "Backend Engineering",
    },

    {
      title: "Streaming Platform",
      description:
        "Distributed OTT streaming backend featuring asynchronous video transcoding, adaptive HLS streaming, JWT authentication, cloud storage, and CDN-backed content delivery.",
      technologies: [
        "Node.js",
        "PostgreSQL",
        "Redis",
        "BullMQ",
        "FFmpeg",
        "AWS S3",
        "CloudFront"
      ],
      image: "streaming.png",
      github: "https://github.com/ishansaxena012/streaming-platform",
      demo: "#",
      category: "Cloud Systems",
      category2: "Distributed Backend",
    },

    {
      title: "BodhGanga",
      description:
        "Educational e-commerce backend built with Spring Boot, featuring JWT authentication, Spring Security RBAC, Razorpay integration, Dockerized deployment, and automated AWS-based infrastructure.",
      technologies: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Docker",
        "AWS EC2",
        "AWS S3",
        "Spring Security"
      ],
      image: "bodhganga.png",
      github: "https://github.com/Kavix28/bodhganga",
      demo: "https://bodhganga.vercel.app/",
      category: "Backend Systems",
      category2: "Cloud Applications",
    },

    {
      title: "Lakshmi Didi",
      description:
        "Multilingual AI financial assistant backend supporting voice conversations, contextual memory, persona orchestration, and end-to-end speech processing through a scalable conversational pipeline.",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Gemini API",
        "Sarvam AI"
      ],
      images: ["fin2.png", "fin.png", "fin3.png"],
      isMobileImage: true,
      github: "https://github.com/ishansaxena012/financial-assistance-platform",
      demo: "https://financial-assistance-platform-ten.vercel.app/",
      category: "Backend Systems",
      category2: "AI Infrastructure",
    },

    {
      title: "SentinelWatch",
      description:
        "High-performance Network Intrusion Detection System developed in C++ for low-latency packet inspection, adaptive threat detection, and efficient traffic analysis.",
      technologies: [
        "C++",
        "Node.js",
        "Express",
        "SQLite"
      ],
      image: "nids.png",
      github: "https://github.com/ishansaxena012/nids",
      demo: "#",
      category: "Cybersecurity",
      category2: "Systems Programming",
    },
    {
      title: "EvokAI",
      description: "Voice journaling app",
      technologies: ["Kotlin", "Node.js", "MongoDB", "OAuth", "JWT"],
      image: "evokai.png",
      github: "https://github.com/ishansaxena012/voice-backend",
      demo: "https://evokai-app.web.app/",
      category: "Mobile Development",
      category2: "Backend Systems"
    },
  ];

  const interests = [
    { name: "Distributed Systems", icon: Network },
    { name: "System Design", icon: Server },
    { name: "Data Structures", icon: Layers },
    { name: "Cloud Architecture", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <style>{`
        .bg-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        .text-cyan-glow {
          text-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
        }
        .border-tech {
          border: 1px solid rgba(34, 211, 238, 0.2);
        }
        .border-tech:hover {
          border-color: rgba(34, 211, 238, 0.6);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.1);
        }
        .glass-panel {
          background: rgba(24, 24, 27, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }
        .glass-header {
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        }
      `}</style>

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-50 mix-blend-screen" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-zinc-800/50 ${isScrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="font-mono text-xl md:text-2xl font-bold tracking-tighter text-zinc-100 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-cyan-400" />
              <span>IS<span className="text-cyan-400">_</span>DEV</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium tracking-wide transition-colors ${activeSection === item.id ? "text-cyan-400" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-zinc-400 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 terminal-panel p-4 border-l-2 border-l-cyan-400">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 text-sm font-medium tracking-wide ${activeSection === item.id ? "text-cyan-400" : "text-zinc-400"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20" onMouseMove={handleMouseMove}>
        {/* Mouse tracking glow */}
        <div
          className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 hidden lg:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.05), transparent 40%)`
          }}
        />
        <DataFlowBackground />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono text-sm text-cyan-400/80 mb-6 tracking-wide">
                backend engineer · systems architect
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-zinc-100 tracking-tight leading-[1.05]">
                Ishan Saxena
              </h1>

              <p className="text-base md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12 border-l-2 border-zinc-800 pl-6">
                I design scalable APIs, optimize databases, and build server architectures
                that stay fast and reliable under real load — turning complex business logic
                into low-latency, high-availability systems.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 font-medium rounded-none px-8 py-6 h-auto"
                  onClick={() => scrollToSection("projects")}
                >
                  View Projects
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>

                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center border border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 transition-colors font-medium rounded-none px-8 py-6 h-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Résumé
                </a>
              </div>

              <div className="flex space-x-6 mt-16">
                {[
                  { icon: Github, href: "https://github.com/ishansaxena012", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/ishan-saxena-62781428b/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:06ishansaxena@gmail.com", label: "Email" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right side Server Metrics */}
            <div className="hidden lg:flex lg:col-span-5 justify-end relative w-full">
              <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
              <ServerMetrics />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Reveal className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-500 mb-8">
                <div className="h-px bg-zinc-800 flex-1"></div>
                <span className="text-cyan-400 font-semibold tracking-widest uppercase text-sm">About Me</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
                Architecting <br />
                <span className="text-cyan-400">Digital Infrastructure.</span>
              </h2>

              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light">
                <p>
                  I'm a final-year Computer Science student at VIT Bhopal, with a deep-rooted passion for backend engineering, system design, and the invisible architecture that powers modern web applications.
                </p>
                <p>
                  While frontend is what users see, the backend is where the real logic lives. I focus on writing clean, efficient, and scalable code—whether that means optimizing database queries, building real-time microservices, or designing RESTful APIs that just work.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-6">
                  <div className="text-3xl font-bold text-zinc-100 mb-2">10+</div>
                  <div className="text-xs text-zinc-500 uppercase font-medium">Deployed Services</div>
                </div>
                <div className="glass-panel p-6">
                  <div className="text-3xl font-bold text-zinc-100 mb-2">170+</div>
                  <div className="text-xs text-zinc-500 uppercase font-medium">Git Commits</div>
                </div>
              </div>
            </div>

            <div>
              <div className="glass-panel h-full overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                  <div className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-4">Core Competencies</div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {interests.map((interest, index) => (
                      <div key={index} className="flex items-center gap-3 text-zinc-300 bg-white/5 rounded-lg p-4 border border-white/10">
                        <interest.icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-medium">{interest.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-zinc-800">
                    <div className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-4">Current Focus</div>
                    <ul className="space-y-3 text-sm text-zinc-400">
                      <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> Deep diving into Microservices</li>
                      <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> Advanced caching with Redis</li>
                      <li className="flex items-center gap-2"><span className="text-cyan-400">•</span> Java for concurrent backends</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Reveal className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 text-zinc-500 mb-12">
              <span className="text-cyan-400 font-semibold tracking-widest uppercase text-sm">Tech Stack</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="glass-panel overflow-hidden transition-all duration-300">
                  <div className="glass-header p-4 flex items-center gap-3">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">{category}</h3>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    {skillList.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-md transition-colors">
                        <skill.icon className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Reveal className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 text-zinc-500 mb-12">
              <div className="h-px bg-zinc-800 flex-1"></div>
              <span className="text-cyan-400 font-semibold tracking-widest uppercase text-sm">Projects</span>
            </div>

            <div className="space-y-16 md:space-y-24">
              {projects.map((project, index) => (
                <div key={index} className="grid lg:grid-cols-12 gap-8 items-center group">

                  {/* Image Column */}
                  <div className={`lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="glass-panel overflow-hidden p-1">
                      <div className="relative aspect-[16/9] group-hover:opacity-100 opacity-80 transition-opacity duration-500 bg-zinc-900 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
                        {project.images ? (
                          <div className="flex w-full h-full justify-center items-center gap-2 p-2">
                            {project.images.map((imgSrc, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={imgSrc}
                                alt={`${project.title} ${imgIdx + 1}`}
                                className={`h-[85%] object-contain transition-all duration-700 rounded-md shadow-2xl ${imgIdx === 1
                                  ? 'z-20 scale-105 group-hover:scale-110'
                                  : 'z-10 scale-95 opacity-60 group-hover:opacity-100 group-hover:scale-100'
                                  }`}
                              />
                            ))}
                          </div>
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            className={`w-full h-full transition-all duration-700 ${project.isMobileImage ? 'object-contain py-2' : 'object-cover'}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-5 relative z-20 ${index % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
                    <div className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">Featured Project</div>
                    <h3 className="text-2xl md:text-4xl font-bold text-zinc-100 mb-6">{project.title}</h3>

                    <div className={`glass-panel p-6 text-zinc-300 text-sm md:text-base leading-relaxed mb-6 ${index % 2 !== 0 ? 'lg:-mr-12' : 'lg:-ml-12'}`}>
                      {project.description}
                    </div>

                    <div className={`flex flex-wrap gap-2 text-xs font-medium text-zinc-400 mb-8 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-white/5 border border-white/10 px-2 py-1 rounded-md">{tech}</span>
                      ))}
                    </div>

                    <div className={`flex items-center gap-6 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                          <Github className="w-5 h-5" />
                          <span className="text-sm font-medium">Source</span>
                        </a>
                      )}
                      {project.demo && project.demo !== "#" && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                          <ExternalLink className="w-5 h-5" />
                          <span className="text-sm font-medium">Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-24">
              <a href="https://github.com/ishansaxena012" target="_blank" rel="noopener noreferrer">
                <Button
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-zinc-900
                    to-black
                    border
                    border-zinc-700
                    text-white
                    hover:from-zinc-800
                    hover:to-zinc-900
                    hover:scale-105
                    hover:shadow-xl
                    hover:shadow-zinc-900/50
                    transition-all
                    duration-300
                    px-8
                    py-6
                    h-auto
                    font-semibold
                  "
                >
                  <Github className="mr-2 h-5 w-5" />
                  View All Repositories
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Reveal className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-zinc-500 mb-12">
              <span className="text-cyan-400 font-semibold tracking-widest uppercase text-sm">Education</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
            </div>

            <div className="glass-panel border-l-4 border-l-cyan-400 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-1">Bachelor of Technology in CS</h3>
                  <a href="https://vitbhopal.ac.in/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-medium hover:underline">
                    @ VIT Bhopal University
                  </a>
                </div>
                <div className="font-medium text-zinc-500 mt-2 md:mt-0">2023 — 2027</div>
              </div>

              <div className="space-y-4 text-zinc-400">
                <p>Currently pursuing a rigorous curriculum focused on software engineering principles, algorithm design, and modern computing paradigms.</p>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="font-medium text-zinc-500 mb-3">Key Modules:</div>
                  <div className="flex flex-wrap gap-2 font-medium text-xs">
                    {["Data Structures", "Algorithms", "Database Systems", "Machine Learning", "Operating Systems", "Computer Networks"].map((course, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-zinc-300">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-8 font-medium text-sm">
                  <div>
                    <span className="text-zinc-500">CGPA: </span>
                    <span className="text-cyan-400">8.8+</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Status: </span>
                    <span className="text-cyan-400">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Reveal className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-zinc-500 mb-12">
              <div className="h-px bg-zinc-800 flex-1"></div>
              <span className="text-cyan-400 font-semibold tracking-widest uppercase text-sm">Contact</span>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">Ping Me.</h2>
              <p className="text-zinc-400 text-lg">
                Whether you have a question, a project idea, or just want to talk about system architecture, my inbox is open. I'll try my best to get back to you!
              </p>
            </div>

            <div className="glass-panel max-w-2xl mx-auto overflow-hidden">
              <div className="glass-header p-4 md:p-6 border-b border-zinc-800/50">
                <h3 className="text-xl font-bold text-zinc-100">Get In Touch</h3>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-400">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-zinc-100 rounded-md focus-visible:ring-cyan-500/50 transition-colors"
                      placeholder="user@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-400">
                      Name
                    </label>
                    <Input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-zinc-100 rounded-md focus-visible:ring-cyan-500/50 transition-colors"
                      placeholder="Guest User"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-400">
                      Message
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="bg-white/5 border-white/10 text-zinc-100 rounded-md focus-visible:ring-cyan-500/50 transition-colors resize-none"
                      placeholder="Write your message..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-md h-12 transition-colors mt-4"
                  >
                    {isSending ? (
                      <span>Sending...</span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative z-10 bg-[#0a0a0a] border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-zinc-600 text-sm font-medium">
            Designed & Built by <span className="text-cyan-400/80">Ishan Saxena</span>
          </p>
          <p className="text-zinc-500 text-xs mt-2 font-medium">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-zinc-900 z-50">
        <div
          className="h-full bg-cyan-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, boxShadow: '0 0 10px rgba(34,211,238,0.5)' }}
        ></div>
      </div>
    </div>
  );
};

export default Index;
