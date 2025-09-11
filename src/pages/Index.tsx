import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Code,
  Database,
  Globe,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  ChevronDown,
  Monitor,
  Smartphone,
  Brain,
  Trophy,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Terminal,
  Layers,
  Server,
  Cpu,
  Send,
  Award,
  GraduationCap,
  Phone,
  Menu,
  X,
  Activity,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Script } from "vm";
// import
import emailjs from '@emailjs/browser';



const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    skills: false,
    projects: false,
    education: false,
    contact: false,
  });
  const [isSending, setIsSending] = useState(false);


  // Particle system
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;
      setIsScrolled(window.scrollY > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }));
      });
    }, observerOptions);

    const sections = ["hero", "about", "skills", "projects", "education", "contact"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    handleScroll();

    let animationFrameId;
    const animate = () => {
      setCursorPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15,
        y: prev.y + (targetPos.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [targetPos]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

const handleContactSubmit = (e) => {
  e.preventDefault();

  const serviceID = 'service_t4mmr1r';
  const templateID = 'template_or92l9q';
  const publicKey = 'HToDbbiPtfV1qqA7A';

  const templateParams = {
    from_name: contactForm.name,
    reply_to: contactForm.email,
    message: contactForm.message,
  };

  emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then(() => {
      alert('Message sent successfully!');
      setContactForm({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Try again later.');
    });
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
Languages: [
  { name: "TypeScript", icon: Code },
  { name: "Java", icon: Code },
  { name: "C++", icon: Cpu },            
  { name: "Python", icon: Activity },    
  { name: "Kotlin", icon: Smartphone },  
],

  Frontend: [
    { name: "React", icon: Layers },
    { name: "Next.js", icon: Globe },
    { name: "TailwindCSS", icon: Globe },
  ],
  Backend: [
    { name: "Node.js", icon: Server },
    { name: "Express.js", icon: Server },
  ],
  Database: [
    { name: "MongoDB", icon: Database },
    { name: "MySQL", icon: Database },
  ],
  DevOps: [
    { name: "Docker", icon: Monitor },
    { name: "AWS", icon: Monitor },
    { name: "Git", icon: Monitor },
    { name: "Linux", icon: Terminal },
  ],
};


const projects = [
  {
    title: "AgroFinCare",
    description:
      "Smart agricultural finance platform with AI-driven crop yield prediction and financial analytics for farmers.",
    technologies: ["React", "Node.js", "MongoDB", "CNN", "Flask"],
    image: "afc-img.webp",
    github: "https://github.com/razzakshat/AgroFinCare",
    demo: "#",
    category: "AI/ML",
    category2: "Collaborative",
  },
  {
    title: "BridgeTalk",
    description:
      "Real-time multilingual call translator using Whisper, WebRTC, and open-source translation with emotion & cultural intelligence features.",
    technologies: ["React", "TailwindCSS", "Whisper", "WebRTC", "Open Source APIs"],
    image: "bt-img.webp",
    github: "https://github.com/ishansaxena012/bridge-talk",
    demo: "#",
    category: "Realtime AI",
    category2: "In Progress",
  },
  {
    title: "Smart Diet Planner",
    description:
      "AI-powered nutrition app with personalized meal recommendations using machine learning algorithms.",
    technologies: ["Kotlin", "Python", "Flask", "SQLite", "KNN", "OAuth"],
    image: "bg3.webp",
    github: "https://github.com/ishansaxena012/SmartDietPlannerApp",
    demo: "#",
    category: "Mobile",
    category2: "Completed",
  },
];



const interests = [
  {
    name: "Web Development",
    icon: Brain,
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Android Development",
    icon: Layers,
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "System Design",
    icon: Cpu,
    color: "from-emerald-400 to-green-500",
  },
  {
    name: "Data Engineering",
    icon: Database,
    color: "from-violet-400 to-purple-500",
  },
];


  const achievements = [
    {
      title: "Academic Excellence",
      description: "Maintained consistently high academic performance",
      icon: Award,
      year: "2023-2025"
    },
    {
      title: "Project Innovation",
      description: "Developed multiple projects",
      icon: Star,
      year: ""
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 1s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-strong {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .mesh-gradient {
          background: 
            radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.4) 0%, transparent 50%);
        }
        .text-gradient {
          background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .typing-effect::after {
          content: '|';
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .smooth-scroll {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
      />

      {/* Custom Cursor */}
      {/* <div
        className={`fixed rounded-full pointer-events-none z-50 mix-blend-difference transition-all ease-out duration-300 ${
          isHovering ? 'w-12 h-12 border-2 border-amber-400/80' : 'w-6 h-6 border-2 border-amber-400/60'
        } ${
          isMouseDown ? 'scale-75 border-amber-200/90' : ''
        }`}
        style={{
          left: cursorPos.x - (isHovering ? 24 : 12),
          top: cursorPos.y - (isHovering ? 24 : 12),
        }}
      >
        <div
          className={`absolute rounded-full transition-all duration-300 ease-out bg-amber-400/80 ${
            isHovering ? 'w-2 h-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'w-1.5 h-1.5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          }`}
        />
      </div> */}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled ? "glass-strong py-4 shadow-2xl" : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="font-light text-2xl tracking-wider text-zinc-100">
              <span className="font-bold text-gradient">ISHAN SAXENA</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className={`text-sm font-light tracking-wide transition-all duration-500 hover:text-amber-400 relative group ${
                    activeSection === item.id
                      ? "text-amber-400"
                      : "text-zinc-300"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-zinc-100 hover:text-amber-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-8 glass-strong rounded-lg p-6">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 text-sm font-light tracking-wide transition-all duration-300 hover:text-amber-400 ${
                    activeSection === item.id ? "text-amber-400" : "text-zinc-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

<section
  id="hero"
  className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-16 lg:py-24" // Slightly reduced overall vertical padding to make content fit better
>
  <div className="absolute inset-0 mesh-gradient" />

  {/* Animated Geometric Shapes - Adjusting positions and sizes to be more visible and balanced */}
  <div className="absolute top-16 left-1/4 w-28 h-28 border border-amber-400/10 rotate-45 animate-spin-slow hover:rotate-90 transition-transform duration-1000 -translate-x-1/2 -translate-y-1/2 hidden md:block lg:w-32 lg:h-32"></div> {/* Adjusted top/left, slightly smaller for better fit, responsive size increase */}
  <div className="absolute bottom-16 right-1/4 w-20 h-20 border border-blue-400/10 rotate-12 animate-spin-reverse hover:rotate-45 transition-transform duration-1000 translate-x-1/2 translate-y-1/2 hidden md:block lg:w-24 lg:h-24"></div> {/* Adjusted bottom/right, slightly smaller for better fit, responsive size increase */}
  {/* Smaller dots - positions remain good, ensuring they are not too close to the main content */}
  <div className="absolute top-1/2 left-12 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse-slow"></div>
  <div className="absolute top-1/3 right-28 w-1.5 h-1.5 bg-blue-400/70 rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
  <div className="absolute bottom-1/3 left-1/5 w-2.5 h-2.5 bg-emerald-400/70 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

  <div className="relative z-10 container mx-auto px-6 sm:px-8 text-center">
    <div className="max-w-5xl mx-auto">
      <div
        className={`mb-12 ${ // Slightly reduced bottom margin
          isVisible.hero ? "animate-scale-in" : "opacity-0"
        }`}
        style={{ animationDelay: "0.1s" }}
      >
        <div className="relative inline-block group">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-amber-400/50 p-1 hover:border-amber-400/80 transition-all duration-500 hover:scale-105 shadow-xl"> {/* Slightly reduced profile picture size */}
            <img
              src="dp.webp"
              alt="Ishan Saxena Profile"
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-7 h-7 md:w-9 md:h-9 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center animate-pulse-slowest shadow-md"> {/* Slightly reduced status dot size */}
            <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-zinc-950 rounded-full"></div> {/* Inner dot size adjusted */}
          </div>
        </div>
      </div>

      <div className="text-center">
        <div
          className={`mb-6 ${ // Reduced bottom margin for tighter grouping
            isVisible.hero ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 text-zinc-50 tracking-tighter sm:tracking-normal lg:tracking-tight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 transition-all duration-700 cursor-default">
            ISHAN SAXENA
          </h1> {/* Significantly reduced text sizes for all breakpoints */}
          <div className="text-xl md:text-3xl lg:text-4xl font-semibold text-amber-400 mb-6 tracking-widest uppercase typing-effect">
            SOFTWARE ENGINEER
          </div> {/* Significantly reduced text sizes for all breakpoints */}
        </div>

        <div
          className={`mb-12 ${ // Slightly reduced bottom margin
            isVisible.hero ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-base md:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal"> {/* Reduced text sizes and max-width for paragraph */}
            Crafting exceptional digital experiences through innovative solutions and clean, scalable code.
            Passionately transforming complex problems into elegant software.
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${ // Reduced gap between buttons
          isVisible.hero ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.9s" }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-zinc-950 font-semibold px-8 py-4 rounded-md hover-lift shadow-2xl relative overflow-hidden group transition-all duration-300" // Reduced button padding
          onClick={() => scrollToSection("projects")}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="relative z-10 flex items-center whitespace-nowrap text-sm md:text-base"> {/* Adjusted font size for buttons */}
            VIEW MY WORK
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /> {/* Smaller icon and margin */}
          </span>
          <div className="absolute inset-0 shimmer"></div>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-zinc-700 text-zinc-100 bg-transparent hover:bg-zinc-800/60 px-8 py-4 rounded-md hover-lift transition-all duration-300 group" // Reduced button padding
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> {/* Smaller icon and margin */}
              <span className="text-sm md:text-base">DOWNLOAD RESUME</span> {/* Adjusted font size for buttons */}
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-zinc-700 text-zinc-100 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-amber-400 text-xl">
                Download Resume
              </DialogTitle>
            </DialogHeader>
            <div className="mt-6 text-center space-y-4">
              <p className="text-zinc-300">Get my latest resume in PDF format.</p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-semibold rounded hover:from-amber-500 hover:to-orange-600 transition-all duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div
        className={`flex justify-center space-x-5 sm:space-x-6 mt-16 ${ // Reduced space-x and top margin
          isVisible.hero ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{ animationDelay: "1.2s" }}
      >
        {[
          { icon: Github, href: "https://github.com/ishansaxena012", label: "GitHub" },
          { icon: Linkedin, href: "https://linkedin.com/in/ishansaxena012", label: "LinkedIn" },
          { icon: Mail, href: "mailto:ishan@example.com", label: "Email" }
        ].map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-effect rounded-full hover:bg-zinc-800/40 transition-all duration-300 group hover:scale-110 flex items-center justify-center border border-transparent hover:border-amber-400/30" // Reduced padding slightly
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label={social.label}
          >
            <social.icon className="h-5 w-5 text-zinc-400 group-hover:text-amber-400 transition-colors" /> {/* Reduced icon size */}
          </a>
        ))}
      </div>
    </div>

    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-pulse-slow md:bottom-10"> {/* Adjusted bottom position */}
      <div className="flex flex-col items-center space-y-2"> {/* Reduced space-y */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-amber-400/80 to-transparent"></div> {/* Reduced line height */}
        <ChevronDown className="h-6 w-6 text-amber-400 animate-bounce-slow" /> {/* Reduced icon size */}
        <span className="text-xs text-zinc-400 tracking-widest uppercase"></span>
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="py-32 bg-zinc-900/50 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div
              className={`grid lg:grid-cols-2 gap-20 items-center ${
                isVisible.about ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-thin mb-8 text-zinc-100">
                    About <span className="text-gradient font-light">Me</span>
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mb-8 rounded-full"></div>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-zinc-300 leading-relaxed font-light">
                    I'm a passionate third-year Computer Science student at VIT Bhopal, driven by the endless possibilities 
                    of technology. My journey began with curiosity and has evolved into a deep commitment to creating 
                    impactful digital solutions.
                  </p>

                  <p className="text-lg text-zinc-300 leading-relaxed font-light">
                    Every line of code I write is an opportunity to solve real-world problems and push the boundaries 
                    of what's possible. I believe in clean architecture, scalable solutions, and user-centric design.
                  </p>

                  <p className="text-lg text-zinc-300 leading-relaxed font-light">
                    My approach combines technical excellence with creative thinking, ensuring that every project 
                    not only functions flawlessly but also delivers an exceptional user experience.
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-8">
                  <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-zinc-400 font-light tracking-wide">
                    Always Learning • Always Building • Always Innovating
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">10+</div>
                    <div className="text-sm text-zinc-400 uppercase tracking-wide">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">100+</div>
                    <div className="text-sm text-zinc-400 uppercase tracking-wide">Commits</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-light text-zinc-100 mb-8">
                  Core <span className="text-gradient">Interests</span>
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {interests.map((interest, index) => (
                    <div
                      key={index}
                      className={`group relative p-8 glass-effect rounded-lg hover:glass-strong transition-all duration-700 hover-lift ${
                        isVisible.about ? "animate-scale-in" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div
                          className={`p-4 rounded-full bg-gradient-to-r ${interest.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-500`}
                        >
                          <interest.icon className="h-8 w-8 text-zinc-100" />
                        </div>
                        <span className="text-sm font-light text-zinc-300 group-hover:text-zinc-100 transition-colors duration-300">
                          {interest.name}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    </div>
                  ))}
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-zinc-950 relative">
        <div className="container mx-auto px-10">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-20 ${
                isVisible.skills ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-thin mb-6 text-zinc-100">
                Technical{" "}
                <span className="text-gradient font-light">Arsenal</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg">
                A comprehensive toolkit honed through continuous learning and real-world application
              </p>
            </div>

            <div
              className={`grid md:grid-cols-2 lg:grid-cols-5 gap-8 ${
                isVisible.skills ? "animate-fade-in-up" : "opacity-0"
              }`}
            >

              {Object.entries(skills).map(
                ([category, skillList], categoryIndex) => (
                  <Card
                    key={category}
                    className={`glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 group hover-lift ${
                      isVisible.skills ? "animate-scale-in" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-3 mb-8">
                        <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                        <h3 className="text-xl font-light text-zinc-100 group-hover:text-amber-400 transition-colors duration-300">
                          {category}
                        </h3>
                      </div>
                      <div className="space-y-6">
                        {skillList.map((skill, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 whitespace-nowrap">
                                <skill.icon className="h-5 w-5 text-amber-400 shrink-0" />
                                <span className="text-zinc-300 font-light">{skill.name}</span>
                              </div>

                              {/* <span className="text-xs text-zinc-500 font-medium">
                                {skill.proficiency}%
                              </span> */}
                            </div>
                            {/* <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1500 ease-out"
                                style={{
                                  width: isVisible.skills
                                    ? `${skill.proficiency}%`
                                    : "0%",
                                  transitionDelay: `${categoryIndex * 0.2 + index * 0.1}s`
                                }}
                              ></div>
                            </div> */}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>

            {/* Additional Skills */}
            <div className={`mt-20 text-center ${isVisible.skills ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "1s" }}>
              <h3 className="text-2xl font-light text-zinc-100 mb-8">Additional Expertise</h3>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {[
                  "Problem Solving", "Algorithm Design", "System Architecture", "API Development",
                  "Testing & Debugging", "Version Control", "Agile Development", "UI/UX Design",
                  "Cloud Computing", "DevOps", "Data Structures", "Machine Learning"
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 glass-effect border border-zinc-700 text-zinc-300 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300 text-sm font-light cursor-default"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-zinc-900/30 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-20 ${
                isVisible.projects ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-thin mb-6 text-zinc-100">
                Featured{" "}
                <span className="text-gradient font-light">Projects</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg">
                Showcasing innovation through code - each project tells a story of problem-solving and technical excellence
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 hover-lift ${
                    isVisible.projects ? "animate-scale-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <span className="px-3 py-1 bg-zinc-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                       <span className="px-3 py-1 bg-zinc-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
                        {project.category2}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <CardContent className="p-8">
                    <h3 className="text-2xl font-light mb-4 text-zinc-100 group-hover:text-amber-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 mb-6 leading-relaxed font-light">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs font-light hover:border-amber-400/50 hover:text-amber-400 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors font-light text-sm group/link"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                        <ExternalLink className="ml-2 h-3 w-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                      
                      {project.demo !== "#" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-zinc-400 hover:text-amber-400 transition-colors font-light text-sm"
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          <Monitor className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View More Projects */}
            <div className={`text-center mt-16 ${isVisible.projects ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "1s" }}>
                <a
                  href="https://github.com/ishansaxena012"
                  target="_blank"
                  rel="noopener noreferrer"
                >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-zinc-600 text-zinc-100 bg-transparent hover:bg-zinc-800/50 px-8 py-4 rounded-none hover-lift transition-all duration-500 group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Github className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View All Projects on GitHub
                <ExternalLink className="ml-3 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 bg-zinc-950 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            <div
              className={`text-center mb-20 ${
                isVisible.education ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-thin mb-6 text-zinc-100">
                Education{" "}
                <span className="text-gradient font-light">Journey</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg">
                Building a strong foundation through academic excellence and continuous learning
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Main Education */}
              <Card
                className={`glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 hover-lift ${
                  isVisible.education ? "animate-slide-in-left" : "opacity-0"
                }`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CardContent className="p-10">
                  <div className="flex items-start space-x-6">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-4 rounded-lg flex-shrink-0">
                      <GraduationCap className="h-8 w-8 text-zinc-950" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-light text-zinc-100 mb-3">
                        Bachelor of Technology
                      </h3>
                      <p className="text-xl text-amber-400 mb-3 font-light">
                        Computer Science and Engineering
                      </p>
                      <a
                        href="https://vitbhopal.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-zinc-400 mb-6 font-light"
                      >
                        VIT Bhopal University
                      </a>


                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-amber-400" />
                          <div>
                            <p className="text-zinc-300 font-medium">Duration</p>
                            <p className="text-zinc-400 text-sm">2023 - 2027</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-amber-400" />
                          <div>
                            <p className="text-zinc-300 font-medium">Location</p>
                            <p className="text-zinc-400 text-sm">Bhopal, MP</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-zinc-100">Key Coursework</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Data Structures", "Algorithms", "Database Systems", "Web Development",
                            "Machine Learning", "Software Engineering", "Computer Networks", "Operating Systems"
                          ].map((course, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-sm rounded-full border border-zinc-700"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements & Certifications */}
              <div className={`space-y-8 ${isVisible.education ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
                <div>
                  <h3 className="text-2xl font-light text-zinc-100 mb-6">
                    Achievements & <span className="text-gradient">Recognition</span>
                  </h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <Card
                        key={index}
                        className="glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-500 group"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-br from-amber-400/20 to-amber-500/20 p-3 rounded-lg">
                              <achievement.icon className="h-6 w-6 text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-zinc-100 group-hover:text-amber-400 transition-colors">
                                {achievement.title}
                              </h4>
                              <p className="text-zinc-400 text-sm mb-2">{achievement.description}</p>
                              <span className="text-amber-400 text-xs font-medium">{achievement.year}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Learning Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "CGPA", value: "8.8+", icon: Trophy },
                    { label: "Projects", value: "10+", icon: Code },
                    { label: "Technologies", value: "20+", icon: Layers },
                    { label: "Contributions", value: "100+", icon: Github }
                  ].map((stat, index) => (
                    <Card
                      key={index}
                      className="glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-500 text-center group hover-lift"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <CardContent className="p-6">
                        <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-2xl font-bold text-zinc-100 mb-1">{stat.value}</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wide">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-zinc-900/50 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-20 ${
                isVisible.contact ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-thin mb-6 text-zinc-100">
                Let's{" "}
                <span className="text-gradient font-light">Connect</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-zinc-400 font-light max-w-2xl mx-auto text-lg">
                Ready to bring your ideas to life? Let's collaborate and create something amazing together.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              {/* Contact Form */}
<Card
  className={`glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 ${
    isVisible.contact ? "animate-slide-in-left" : "opacity-0"
  }`}
>
  <CardContent className="px-4 py-6 sm:px-6 md:px-8 lg:px-10">
    <h3 className="text-2xl font-light text-zinc-100 mb-8">
      Send a <span className="text-gradient">Message</span>
    </h3>

    <form onSubmit={handleContactSubmit} className="space-y-6">
      <div>
        <Input
          placeholder="Your Name"
          value={contactForm.name}
          onChange={(e) =>
            setContactForm((prev) => ({ ...prev, name: e.target.value }))
          }
          className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:border-amber-400 focus:ring-amber-400 h-12"
          required
        />
      </div>

      <div>
        <Input
          type="email"
          placeholder="Your Email"
          value={contactForm.email}
          onChange={(e) =>
            setContactForm((prev) => ({ ...prev, email: e.target.value }))
          }
          className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:border-amber-400 focus:ring-amber-400 h-12"
          required
        />
      </div>

      <div>
        <Textarea
          placeholder="Your Message"
          rows={6}
          value={contactForm.message}
          onChange={(e) =>
            setContactForm((prev) => ({ ...prev, message: e.target.value }))
          }
          className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:border-amber-400 focus:ring-amber-400 resize-none"
          required
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSending}
        className={`w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-zinc-950 font-semibold py-4 rounded-none hover-lift group ${
          isSending ? "opacity-60 cursor-not-allowed" : ""
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isSending ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-zinc-950"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          <>
            <Send className="mr-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Send Message
          </>
        )}
      </Button>
    </form>
  </CardContent>
</Card>



              {/* Contact Information */}
              <div className={`space-y-8 ${isVisible.contact ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
                <div>
                  <h3 className="text-2xl font-light text-zinc-100 mb-8">
                    Get in <span className="text-gradient">Touch</span>
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: "06ishansaxena@gmail.com",
                        href: "mailto:06ishansaxen@gmail.com"
                      },
                      {
                        icon: Phone,
                        label: "Phone",
                        value: "+91 9205243543",
                        href: "tel:+919205243543"
                      },
                      {
                        icon: MapPin,
                        label: "Location",
                        value: "Ghaziabad, Uttar Pradesh, India",
                        href: "#"
                      }
                    ].map((contact, index) => (
                      <a
                        key={index}
                        href={contact.href}
                        className="flex items-center space-x-4 p-6 glass-effect border border-zinc-800 hover:border-amber-400/30 transition-all duration-500 group hover-lift"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <div className="bg-gradient-to-br from-amber-400/20 to-amber-500/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
                          <contact.icon className="h-6 w-6 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-zinc-400 text-sm uppercase tracking-wide">
                            {contact.label}
                          </p>
                          <p className="text-zinc-100 font-medium group-hover:text-amber-400 transition-colors">
                            {contact.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-xl font-light text-zinc-100 mb-6">Connect Online</h4>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: Github,
                        href: "https://github.com/ishansaxena012",
                        label: "GitHub",
                        color: "hover:bg-gray-800"
                      },
                      {
                        icon: Linkedin,
                        href: "https://linkedin.com/in/ishansaxena012",
                        label: "LinkedIn",
                        color: "hover:bg-blue-600"
                      },
                      {
                        icon: Mail,
                        href: "mailto:ishansaxena012@gmail.com",
                        label: "Email",
                        color: "hover:bg-red-900"
                      },
                      {
                        icon: Globe,
                        href: "#",
                        label: "Portfolio",
                        color: "hover:bg-gray-600"
                      }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 glass-effect rounded-lg border border-zinc-800 hover:border-amber-400/30 transition-all duration-500 group hover-lift ${social.color}`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        title={social.label}
                      >
                        <social.icon className="h-6 w-6 text-zinc-400 group-hover:text-amber-400 transition-colors group-hover:scale-110 transform duration-300" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Availability Status */}
                {/* <Card className="glass-effect border-zinc-800 hover:border-green-400/30 transition-all duration-500">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-30"></div>
                      </div>
                      <div>
                        <p className="text-zinc-100 font-medium">Available for new opportunities</p>
                        <p className="text-zinc-400 text-sm">Open to internships and collaborations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}

                {/* Quick Stats */}
                {/* <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Response Time", value: "< 24hrs", icon: Zap },
                    { label: "Projects Completed", value: "50+", icon: Trophy }
                  ].map((stat, index) => (
                    <Card
                      key={index}
                      className="glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-500 text-center group hover-lift"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <CardContent className="p-6">
                        <stat.icon className="h-6 w-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-lg font-bold text-zinc-100">{stat.value}</div>
                        <div className="text-zinc-400 text-xs uppercase tracking-wide">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-light text-zinc-100 mb-2">
                  <span className="text-gradient font-bold">ISHAN SAXENA</span>
                </h3>
                <p className="text-zinc-400 font-light">
                  Crafting digital experiences with passion and precision
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end space-y-4">
                <div className="flex space-x-6">
                  {[
                    { icon: Github, href: "https://github.com/ishansaxena012" },
                    { icon: Linkedin, href: "https://linkedin.com/in/ishansaxena012" },
                    { icon: Mail, href: "mailto:ishansaxena012@gmail.com" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-400 hover:text-amber-400 transition-colors duration-300"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm">
                  © 2025 Ishan Saxena. All rights reserved.
                </p>
              </div>
            </div>

            {/* Back to Top */}
            <div className="text-center mt-12">
              <button
                onClick={() => scrollToSection("hero")}
                className="group inline-flex flex-col items-center space-y-2 text-zinc-400 hover:text-amber-400 transition-all duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="p-3 glass-effect rounded-full border border-zinc-800 group-hover:border-amber-400/30 transition-all duration-300">
                  <ChevronDown className="h-5 w-5 rotate-180 group-hover:-translate-y-1 transition-transform" />
                </div>
                <span className="text-xs uppercase tracking-widest">Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-150 ease-out"
          style={{
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
          }}
        ></div>
      </div>

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-zinc-950 shadow-2xl hover-lift"
          onClick={() => scrollToSection("contact")}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Mail className="h-6 w-6" />
        </Button>
      </div>

      {/* Loading Overlay */}
      <div className="fixed inset-0 bg-zinc-950 z-[100] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-1000">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-400 font-light">Loading Excellence...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;