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
  HardDrive
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ServerMetrics from "@/components/ServerMetrics";
import { ScrambleText } from "@/components/ScrambleText";
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
    { id: "hero", label: "00. Init" },
    { id: "about", label: "01. Kernel" },
    { id: "skills", label: "02. Stack" },
    { id: "projects", label: "03. Deploys" },
    { id: "education", label: "04. Training" },
    { id: "contact", label: "05. Ping" },
  ];

  const skills = {
    Backend: [
      { name: "Node.js", icon: Server },
      { name: "NestJS", icon: Server },
      { name: "Express.js", icon: Activity },
      { name: "REST APIs", icon: Network },
    ],
    Languages: [
      { name: "C++", icon: Cpu },
      { name: "Java", icon: Code },
      { name: "Python", icon: Terminal },
      { name: "JavaScript/TS", icon: Code },
    ],
    Database: [
      { name: "PostgreSQL", icon: Database },
      { name: "Prisma", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Redis", icon: HardDrive },
      { name: "MySQL", icon: Database },
    ],
    DevOps: [
      { name: "Docker", icon: Monitor },
      { name: "AWS", icon: Globe },
      { name: "Linux", icon: Terminal },
      { name: "Git/CI-CD", icon: Layers },
    ],
  };

  const projects = [
    {
      title: "SentinelWatch",
      description: "Low-latency NIDS platform using C++ and Node.js. Processes network packets at high speeds with adaptive threat detection algorithms.",
      technologies: ["C++", "NodeJS", "Express", "SQLite"],
      image: "nids.png",
      github: "https://github.com/ishansaxena012/nids",
      demo: "#",
      category: "Security",
      category2: "Systems",
    },
    {
      title: "Lakshmi Didi",
      description: "A multilingual voice-first financial assistant built for simplified personal finance guidance, featuring persona-driven conversations, contextual memory, and structured financial insights through an end-to-end conversational AI pipeline.",
      technologies: ["MongoDB", "Express.js", "Node.js", "Gemini API", "Redis", "Web Speech API"],
      images: ["fin2.png", "fin.png", "fin3.png"],
      isMobileImage: true,
      github: "https://github.com/ishansaxena012/financial-assistance-platform",
      demo: "https://financial-assistance-platform-ten.vercel.app/",
      category: "Backend Systems",
      category2: "Conversational AI"
    },
    {
        title: "EvokAI",
        description: "Voice-first AI journaling backend. Manages complex audio processing pipelines, speech-to-text integration, and real-time inference.",
        technologies: ["Node.js", "Express", "MongoDB", "Audio API"],
        image: "evokai.png",
        github: "https://github.com/ishansaxena012/voice-backend",
        demo: "https://evokai-app.web.app/",
        category: "Backend",
        category2: "Pipeline",
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
        .terminal-panel {
          background: #111;
          border: 1px solid #333;
        }
        .terminal-header {
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }
      `}</style>

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-50 mix-blend-screen" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-zinc-800/50 ${isScrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 md:px-8 py-4">
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
                  className={`text-xs font-mono tracking-wider transition-colors relative ${
                    activeSection === item.id ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span className={`${activeSection === item.id ? "opacity-100" : "opacity-0"} text-cyan-400 mr-1`}>&gt;</span>
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
                  className={`block w-full text-left py-3 text-sm font-mono tracking-wider ${
                    activeSection === item.id ? "text-cyan-400" : "text-zinc-400"
                  }`}
                >
                  <span className="text-cyan-400 mr-2">$</span>{item.label}
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
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.06), transparent 40%)`
          }}
        />
        <DataFlowBackground />
        <div className="relative z-10 container mx-auto px-6 sm:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono text-cyan-400 mb-6 flex items-center gap-3">
              <span className="animate-pulse">_</span>
              STATUS: SYSTEM_ONLINE
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-4 text-zinc-100 tracking-tighter leading-none flex flex-col">
              <span className="glitch w-fit" data-text="ISHAN">ISHAN</span>
              <span className="glitch w-fit" data-text="SAXENA.">SAXENA.</span>
            </h1>
            
            <div className="text-xl md:text-3xl font-mono text-zinc-500 mb-8 tracking-tight">
              &gt; <span className="typewriter">BACKEND_ENGINEER / SYSTEMS_ARCHITECT</span>
            </div>

            <p className="text-base md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12 border-l-2 border-zinc-800 pl-6">
              Designing scalable APIs, optimizing databases, and building robust server architectures. 
              Translating complex business logic into low-latency, high-availability systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 font-mono rounded-none px-8 py-6 h-auto"
                onClick={() => scrollToSection("projects")}
              >
                <ChevronRight className="mr-2 h-4 w-4" />
                EXECUTE /projects
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-zinc-800 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100 font-mono rounded-none px-8 py-6 h-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PULL /resume.pdf
                  </Button>
                </DialogTrigger>
                <DialogContent className="terminal-panel text-zinc-100 rounded-none border-zinc-800">
                  <DialogHeader className="terminal-header -mx-6 -mt-6 p-4 mb-4">
                    <DialogTitle className="text-cyan-400 font-mono flex items-center">
                      <Terminal className="w-4 h-4 mr-2"/>
                      download_manager.exe
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 font-mono text-sm text-zinc-400">
                    <p>&gt; Initializing download sequence...</p>
                    <p>&gt; Target: ishan_saxena_resume.pdf</p>
                    <a
                      href="/resume.pdf"
                      download
                      className="mt-4 flex items-center justify-center w-full px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 transition-colors"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      [ CONFIRM_DOWNLOAD ]
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex space-x-6 mt-16">
              {[
                { icon: Github, href: "https://github.com/ishansaxena012", label: "github" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/ishan-saxena-62781428b/", label: "linkedin" },
                { icon: Mail, href: "mailto:06ishansaxena@gmail.com", label: "email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-cyan-400 transition-colors flex items-center gap-2 font-mono text-sm"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="hidden sm:inline">/{social.label}</span>
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
        <div className="container mx-auto px-6 md:px-8">
          <Reveal className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="font-mono flex items-center gap-4 text-zinc-500 mb-8">
                <span className="text-cyan-400">01.</span>
                <div className="h-px bg-zinc-800 flex-1"></div>
                <ScrambleText text="KERNEL_INFO" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
                Architecting <br/>
                <span className="text-cyan-400">Digital Infrastructure.</span>
              </h2>

              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light">
                <p>
                  I'm a third-year Computer Science student at VIT Bhopal, with a deep-rooted passion for backend engineering, system design, and the invisible architecture that powers modern web applications.
                </p>
                <p>
                  While frontend is what users see, the backend is where the real logic lives. I focus on writing clean, efficient, and scalable code—whether that means optimizing database queries, building real-time microservices, or designing RESTful APIs that just work.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono">
                <div className="terminal-panel p-6 border-l-2 border-l-cyan-400">
                  <div className="text-3xl font-bold text-zinc-100 mb-2">10+</div>
                  <div className="text-xs text-zinc-500 uppercase">Deployed Services</div>
                </div>
                <div className="terminal-panel p-6 border-l-2 border-l-cyan-400">
                  <div className="text-3xl font-bold text-zinc-100 mb-2">170+</div>
                  <div className="text-xs text-zinc-500 uppercase">Git Commits</div>
                </div>
              </div>
            </div>

            <div>
              <div className="terminal-panel h-full rounded-none overflow-hidden">
                <div className="terminal-header p-3 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="text-cyan-400 font-mono text-sm mb-4">Core Competencies:</div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {interests.map((interest, index) => (
                      <div key={index} className="flex items-center gap-3 text-zinc-300 bg-zinc-900/50 p-4 border border-zinc-800">
                        <interest.icon className="w-5 h-5 text-cyan-400" />
                        <span className="font-mono text-sm">{interest.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-zinc-800">
                    <div className="text-cyan-400 font-mono text-sm mb-4">Current Focus:</div>
                    <ul className="space-y-3 font-mono text-sm text-zinc-400">
                      <li className="flex items-center gap-2"><span className="text-cyan-400">&gt;</span> Deep diving into Microservices</li>
                      <li className="flex items-center gap-2"><span className="text-cyan-400">&gt;</span> Advanced caching with Redis</li>
                      <li className="flex items-center gap-2"><span className="text-cyan-400">&gt;</span> Golang for concurrent backends</li>
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
        <div className="container mx-auto px-6 md:px-8">
          <Reveal className="max-w-6xl mx-auto">
            <div className="font-mono flex items-center gap-4 text-zinc-500 mb-12">
              <span className="text-cyan-400">02.</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <ScrambleText text="TECH_STACK" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="terminal-panel border-tech transition-all duration-300">
                  <div className="terminal-header p-4 flex items-center gap-3">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-mono text-sm text-zinc-100 uppercase tracking-wider">{category}</h3>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    {skillList.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 transition-colors">
                        <skill.icon className="w-4 h-4 text-zinc-500" />
                        <span className="font-mono text-sm text-zinc-300">{skill.name}</span>
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
        <div className="container mx-auto px-6 md:px-8">
          <Reveal className="max-w-6xl mx-auto">
            <div className="font-mono flex items-center gap-4 text-zinc-500 mb-12">
              <span className="text-cyan-400">03.</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <ScrambleText text="ACTIVE_DEPLOYMENTS" />
            </div>

            <div className="space-y-16 md:space-y-24">
              {projects.map((project, index) => (
                <div key={index} className="grid lg:grid-cols-12 gap-8 items-center group">
                  
                  {/* Image Column */}
                  <div className={`lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="terminal-panel p-1 border-tech overflow-hidden">
                      <div className="relative aspect-[16/9] group-hover:opacity-100 opacity-80 transition-opacity duration-500 bg-zinc-900 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
                        {project.images ? (
                          <div className="flex w-full h-full justify-center items-center gap-2 p-2">
                            {project.images.map((imgSrc, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={imgSrc}
                                alt={`${project.title} ${imgIdx + 1}`}
                                className={`h-[85%] object-contain transition-all duration-700 rounded-md shadow-2xl ${
                                  imgIdx === 1 
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
                    <div className="font-mono text-cyan-400 text-sm mb-2">Featured Project</div>
                    <h3 className="text-2xl md:text-4xl font-bold text-zinc-100 mb-6">{project.title}</h3>
                    
                    <div className={`terminal-panel p-6 text-zinc-300 text-sm md:text-base leading-relaxed mb-6 ${index % 2 !== 0 ? 'lg:-mr-12' : 'lg:-ml-12'}`}>
                      {project.description}
                    </div>

                    <div className={`flex flex-wrap gap-3 font-mono text-xs text-zinc-500 mb-8 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex}>[{tech}]</span>
                      ))}
                    </div>

                    <div className={`flex items-center gap-6 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                          <Github className="w-5 h-5" />
                          <span className="font-mono text-sm">Source</span>
                        </a>
                      )}
                      {project.demo && project.demo !== "#" && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                          <ExternalLink className="w-5 h-5" />
                          <span className="font-mono text-sm">Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-24">
              <a href="https://github.com/ishansaxena012" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 font-mono rounded-none px-8 py-6 h-auto">
                  <Terminal className="mr-2 h-4 w-4" />
                  ls -la /all-repositories
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative border-t border-zinc-900 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 md:px-8">
          <Reveal className="max-w-4xl mx-auto">
            <div className="font-mono flex items-center gap-4 text-zinc-500 mb-12">
              <span className="text-cyan-400">04.</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <ScrambleText text="TRAINING_DATA" />
            </div>

            <div className="terminal-panel border-l-4 border-l-cyan-400 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-1">Bachelor of Technology in CS</h3>
                  <a href="https://vitbhopal.ac.in/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-mono hover:underline">
                    @ VIT Bhopal University
                  </a>
                </div>
                <div className="font-mono text-zinc-500 mt-2 md:mt-0">2023 — 2027</div>
              </div>

              <div className="space-y-4 text-zinc-400">
                <p>Currently pursuing a rigorous curriculum focused on software engineering principles, algorithm design, and modern computing paradigms.</p>
                
                <div className="pt-4 border-t border-zinc-800">
                  <div className="font-mono text-zinc-500 mb-3">Key Modules:</div>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {["Data Structures", "Algorithms", "Database Systems", "Machine Learning", "Operating Systems", "Computer Networks"].map((course, idx) => (
                      <span key={idx} className="bg-zinc-900 border border-zinc-800 px-3 py-1 text-zinc-300">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-8 font-mono text-sm">
                  <div>
                    <span className="text-zinc-500">CGPA: </span>
                    <span className="text-cyan-400">8.9+</span>
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
        <div className="container mx-auto px-6 md:px-8">
          <Reveal className="max-w-4xl mx-auto">
            <div className="font-mono flex items-center gap-4 text-zinc-500 mb-12">
              <span className="text-cyan-400">05.</span>
              <div className="h-px bg-zinc-800 flex-1"></div>
              <ScrambleText text="OPEN_CONNECTION" />
            </div>

            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">Ping Me.</h2>
              <p className="text-zinc-400 text-lg">
                Whether you have a question, a project idea, or just want to talk about system architecture, my inbox is open. I'll try my best to get back to you!
              </p>
            </div>

            <div className="terminal-panel max-w-2xl mx-auto">
              <div className="terminal-header p-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500" />
                <span className="font-mono text-xs text-zinc-500">message_protocol.sh</span>
              </div>
              <div className="p-6 md:p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-cyan-400 flex items-center gap-2">
                      <span className="text-zinc-500">$</span> set EMAIL
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-zinc-100 font-mono rounded-none focus-visible:ring-cyan-500/50"
                      placeholder="user@host.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-mono text-sm text-cyan-400 flex items-center gap-2">
                      <span className="text-zinc-500">$</span> set NAME
                    </label>
                    <Input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-zinc-100 font-mono rounded-none focus-visible:ring-cyan-500/50"
                      placeholder="Guest User"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-sm text-cyan-400 flex items-center gap-2">
                      <span className="text-zinc-500">$</span> set PAYLOAD
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-zinc-100 font-mono rounded-none focus-visible:ring-cyan-500/50 resize-none"
                      placeholder="Write your message..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 font-mono rounded-none h-12"
                  >
                    {isSending ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        SEND_PAYLOAD
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
        <div className="container mx-auto px-6 text-center">
          <p className="font-mono text-zinc-600 text-sm">
            Designed & Built by <span className="text-cyan-400/70">Ishan Saxena</span>
          </p>
          <p className="font-mono text-zinc-700 text-xs mt-2">
            &copy; {new Date().getFullYear()} // ALL_RIGHTS_RESERVED
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