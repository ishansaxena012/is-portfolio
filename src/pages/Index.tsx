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
  Star,
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

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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

      alert("Message sent successfully!");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
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
    Languages: [
      { name: "JavaScript", icon: Code },
      { name: "Java", icon: Code },
      { name: "C++", icon: Cpu },
      { name: "Python", icon: Activity },
      { name: "Kotlin", icon: Smartphone },
    ],
    Frontend: [
      { name: "ReactJS", icon: Layers },
      { name: "NextJS", icon: Globe },
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
      title: "SentinelWatch",
      description: "Real-time NIDS platform using C++ and Node.js for high-speed packet analysis and adaptive threat detection with minimal latency.",
      technologies: ["C++", "NodeJS", "Express", "SQLite", "JS"],
      image: "nids.png",
      github: "https://github.com/ishansaxena012/nids",
      demo: "#",
      category: "Security",
      category2: "Completed",
    },
    {
      title: "EchoChamber",
      description: "Multi-persona AI chat app that generates responses in distinct tones—Optimistic, Sarcastic, Philosophical, and Practical—through a clean dark-themed UI.",
      technologies: ["Node.js", "Express", "React", "Gemini API"],
      image: "ec.webp",
      github: "https://github.com/ishansaxena012/echo-chamber",
      demo: "#",
      category: "AI/Chat",
      category2: "Completed",
    },
    {
      title: "PixelForge",
      description: "Client-side AI image generator powered by Hugging Face Inference API, supporting multiple models, aspect ratios, API key input via localStorage, and theme toggle.",
      technologies: ["JavaScript", "HTML", "CSS", "Hugging Face API"],
      image: "pfa.webp",
      github: "https://github.com/ishansaxena012/pixel-forge-ai",
      demo: "#",
      category: "AI/ML",
      category2: "Completed",
    },
  ];

const interests = [
  { name: "Web Development", img: "/web.png", },
  { name: "Android Development", img: "/android.png",  },
  { name: "System Design", img: "/sd.jpeg",  },
  { name: "Data Structures & Algorithm", img: "/dsa.png", },
];


  const achievements = [
    {
      title: "Academic Excellence",
      description: "Maintained consistently high academic performance",
      icon: Award,
      year: ""
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
        .text-gradient {
          background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
        }
      `}</style>

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${isScrolled ? "glass-strong py-4 shadow-2xl" : "bg-transparent py-8"}`}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center">
            <div className="font-light text-xl md:text-2xl tracking-wider text-zinc-100">
              <span className="font-bold text-gradient">ISHAN SAXENA</span>
            </div>
            
            <div className="hidden md:flex space-x-8 lg:space-x-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-light tracking-wide transition-all duration-500 hover:text-amber-400 relative group ${
                    activeSection === item.id ? "text-amber-400" : "text-zinc-300"
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-zinc-100 hover:text-amber-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-8 glass-strong rounded-lg p-6 animate-fade-in-up">
              {navItems.map((item) => (
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

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 md:py-24">
        <div className="relative z-10 container mx-auto px-6 sm:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <div className={`mb-8 md:mb-12 ${isVisible.hero ? "animate-scale-in" : "opacity-0"}`}>
              <div className="relative inline-block group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-400/50 p-1 hover:border-amber-400/80 transition-all duration-500 hover:scale-105 shadow-xl">
                  <img
                    src="dp.webp"
                    alt="Ishan Saxena"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-9 md:h-9 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-zinc-950 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className={`mb-6 ${isVisible.hero ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-zinc-50 tracking-tight">
                  ISHAN SAXENA
                </h1>
                <div className="text-lg md:text-2xl lg:text-3xl font-semibold text-amber-400 mb-4 md:mb-6 tracking-widest uppercase">
                  SOFTWARE ENGINEER
                </div>
              </div>

              <div className={`mb-8 md:mb-12 ${isVisible.hero ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
                <p className="text-base md:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed px-4">
  Engineering solutions. Eliminating bugs. Delivering clarity through code.
</p>

              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center px-4 ${isVisible.hero ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-zinc-950 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-md hover-lift shadow-2xl"
                onClick={() => scrollToSection("projects")}
              >
                <span className="flex items-center whitespace-nowrap text-sm md:text-base">
                  VIEW MY WORK
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-zinc-700 text-zinc-100 bg-transparent hover:bg-zinc-800/60 px-6 md:px-8 py-3 md:py-4 rounded-md hover-lift transition-all duration-300"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span className="text-sm md:text-base">DOWNLOAD RESUME</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-strong border-zinc-700 text-zinc-100 max-w-md mx-4">
                  <DialogHeader>
                    <DialogTitle className="text-amber-400 text-xl">Download Resume</DialogTitle>
                  </DialogHeader>
                  <div className="mt-6 text-center space-y-4">
                    <p className="text-zinc-300">Get my latest resume in PDF format.</p>
                    <a
                      href="/resume.pdf"
                      download
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-semibold rounded hover:from-amber-500 hover:to-orange-600 transition-all duration-300"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className={`flex justify-center space-x-5 sm:space-x-6 mt-12 md:mt-16 ${isVisible.hero ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
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
                  className="p-3 glass-effect rounded-full hover:bg-zinc-800/40 transition-all duration-300 group hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-zinc-400 group-hover:text-amber-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2"> */}
            {/* <ChevronDown className="h-6 w-6 text-amber-400 animate-bounce" /> */}
          {/* </div> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-zinc-900/50 relative">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isVisible.about ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin mb-6 md:mb-8 text-zinc-100">
                    About <span className="text-gradient font-light">Me</span>
                  </h2>
                  <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mb-6 md:mb-8 rounded-full"></div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                    I'm a passionate third-year Computer Science student at VIT Bhopal, driven by the endless possibilities 
                    of technology. My journey began with curiosity and has evolved into a deep commitment to creating 
                    impactful digital solutions.
                  </p>

                  <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                    Every line of code I write is an opportunity to solve real-world problems and push the boundaries 
                    of what's possible. I believe in clean architecture, scalable solutions, and user-centric design.
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 md:pt-8">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                  <span className="text-sm md:text-base text-zinc-400 font-light tracking-wide">
                    Always Learning • Always Building
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8">
                  <div className="text-center p-4 glass-effect rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">10+</div>
                    <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-wide">Projects</div>
                  </div>
                  <div className="text-center p-4 glass-effect rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">150+</div>
                    <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-wide">Commits</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-6 md:mb-8">
                  Core <span className="text-gradient">Interests</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
  {interests.map((interest, index) => (
    <div
      key={index}
      className={`group relative p-4 md:p-6 glass-effect rounded-lg hover:glass-strong transition-all duration-700 hover-lift ${
        isVisible.about ? "animate-scale-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">

        {/* Outer circular background */}
        <div
          className={`flex items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105
            w-16 h-16 md:w-20 md:h-20
          `}
        >
          {/* Inner plate */}
          <div className="flex items-center justify-center rounded-full bg-white/10
              w-12 h-12 md:w-16 md:h-16
          ">
            <img
              src={interest.img}  
              alt={interest.name}
              className="object-contain w-8 h-8 md:w-10 md:h-10"
              draggable={false}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* Label */}
        <span className="text-xs md:text-sm font-light text-zinc-300 group-hover:text-zinc-100 transition-colors duration-300">
          {interest.name}
        </span>
      </div>
    </div>
  ))}
</div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-zinc-950 relative">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-12 md:mb-20 ${isVisible.skills ? "animate-fade-in-up" : "opacity-0"}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin mb-4 md:mb-6 text-zinc-100">
                Technical <span className="text-gradient font-light">Arsenal</span>
              </h2>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
              <p className="text-sm md:text-base lg:text-lg text-zinc-400 font-light max-w-2xl mx-auto px-4">
                A comprehensive toolkit honed through continuous learning and real-world application
              </p>
            </div>

            <div className={`grid sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 ${isVisible.skills ? "animate-fade-in-up" : "opacity-0"}`}>
              {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                <Card
                  key={category}
                  className={`glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 group hover-lift ${
                    isVisible.skills ? "animate-scale-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center space-x-3 mb-6 md:mb-8">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                      <h3 className="text-lg md:text-xl font-light text-zinc-100 group-hover:text-amber-400 transition-colors duration-300">
                        {category}
                      </h3>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      {skillList.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <skill.icon className="h-4 w-4 md:h-5 md:w-5 text-amber-400 shrink-0" />
                          <span className="text-sm md:text-base text-zinc-300 font-light">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className={`mt-12 md:mt-20 text-center ${isVisible.skills ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "1s" }}>
              <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-6 md:mb-8">Additional Expertise</h3>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto px-4">
                {[
                  "Problem Solving", "Algorithm Design", "System Architecture", "API Development",
                  "Testing & Debugging", "Version Control", "Agile Development", "UI/UX Design"
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 md:px-6 py-2 md:py-3 glass-effect border border-zinc-700 text-zinc-300 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300 text-xs md:text-sm font-light cursor-default rounded"
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
      <section id="projects" className="py-20 md:py-32 bg-zinc-900/30 relative">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-12 md:mb-20 ${isVisible.projects ? "animate-fade-in-up" : "opacity-0"}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin mb-4 md:mb-6 text-zinc-100">
                Featured <span className="text-gradient font-light">Projects</span>
              </h2>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
              <p className="text-sm md:text-base lg:text-lg text-zinc-400 font-light max-w-2xl mx-auto px-4">
                Showcasing innovation through code - each project tells a story of problem-solving
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 hover-lift ${
                    isVisible.projects ? "animate-scale-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
                      <span className="px-3 py-1 bg-zinc-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 bg-zinc-950/80 text-amber-400 text-xs font-medium rounded-full backdrop-blur-sm">
                        {project.category2}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-light mb-3 md:mb-4 text-zinc-100 group-hover:text-amber-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-400 mb-4 md:mb-6 leading-relaxed font-light">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs font-light hover:border-amber-400/50 hover:text-amber-400 transition-colors duration-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors font-light text-sm group/link"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                        <ExternalLink className="ml-2 h-3 w-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className={`text-center mt-12 md:mt-16 ${isVisible.projects ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "1s" }}>
              <a href="https://github.com/ishansaxena012" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-zinc-600 text-zinc-100 bg-transparent hover:bg-zinc-800/50 px-6 md:px-8 py-3 md:py-4 rounded hover-lift transition-all duration-500 group"
                >
                  <Github className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  View All Projects
                  <ExternalLink className="ml-3 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-32 bg-zinc-950 relative">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className={`text-center mb-12 md:mb-20 ${isVisible.education ? "animate-fade-in-up" : "opacity-0"}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin mb-4 md:mb-6 text-zinc-100">
                Education <span className="text-gradient font-light">Journey</span>
              </h2>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
              <p className="text-sm md:text-base lg:text-lg text-zinc-400 font-light max-w-2xl mx-auto px-4">
                Building a strong foundation through academic excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <Card
                className={`glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 hover-lift ${
                  isVisible.education ? "animate-slide-in-left" : "opacity-0"
                }`}
              >
                <CardContent className="p-6 md:p-10">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-3 md:p-4 rounded-lg flex-shrink-0">
                      <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-zinc-950" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-light text-zinc-100 mb-2 md:mb-3">
                        Bachelor of Technology
                      </h3>
                      <p className="text-lg md:text-xl text-amber-400 mb-2 md:mb-3 font-light">
                        Computer Science and Engineering
                      </p>
                      <a
                        href="https://vitbhopal.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base md:text-lg text-zinc-400 mb-4 md:mb-6 font-light hover:text-amber-400 transition-colors inline-block"
                      >
                        VIT Bhopal University
                      </a>

                      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
                          <div>
                            <p className="text-sm md:text-base text-zinc-300 font-medium">Duration</p>
                            <p className="text-xs md:text-sm text-zinc-400">2023 - 2027</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
                          <div>
                            <p className="text-sm md:text-base text-zinc-300 font-medium">Location</p>
                            <p className="text-xs md:text-sm text-zinc-400">Bhopal, MP</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-base md:text-lg font-medium text-zinc-100">Key Coursework</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Data Structures", "Algorithms", "Database Systems", "Web Development",
                            "Machine Learning", "Software Engineering", "Computer Networks", "Operating Systems"
                          ].map((course, index) => (
                            <span
                              key={index}
                              className="px-2 md:px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs md:text-sm rounded-full border border-zinc-700"
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

              <div className={`space-y-6 md:space-y-8 ${isVisible.education ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
                <div>
                  <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-4 md:mb-6">
                    Achievements & <span className="text-gradient">Recognition</span>
                  </h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <Card
                        key={index}
                        className="glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-500 group"
                      >
                        <CardContent className="p-4 md:p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-br from-amber-400/20 to-amber-500/20 p-2 md:p-3 rounded-lg">
                              <achievement.icon className="h-5 w-5 md:h-6 md:w-6 text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-base md:text-lg font-medium text-zinc-100 group-hover:text-amber-400 transition-colors">
                                {achievement.title}
                              </h4>
                              <p className="text-xs md:text-sm text-zinc-400 mt-1">{achievement.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { label: "CGPA", value: "8.9+", icon: Trophy },
                    { label: "Projects", value: "10+", icon: Code },
                    { label: "Technologies", value: "20+", icon: Layers },
                    { label: "Contributions", value: "150+", icon: Github }
                  ].map((stat, index) => (
                    <Card
                      key={index}
                      className="glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-500 text-center group hover-lift"
                    >
                      <CardContent className="p-4 md:p-6">
                        <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-amber-400 mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-xl md:text-2xl font-bold text-zinc-100 mb-1">{stat.value}</div>
                        <div className="text-zinc-400 text-xs uppercase tracking-wide">{stat.label}</div>
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
      <section id="contact" className="py-20 md:py-32 bg-zinc-900/50 relative">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 md:mb-20 ${isVisible.contact ? "animate-fade-in-up" : "opacity-0"}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin mb-4 md:mb-6 text-zinc-100">
                Let's <span className="text-gradient font-light">Connect</span>
              </h2>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
              <p className="text-sm md:text-base lg:text-lg text-zinc-400 font-light max-w-2xl mx-auto px-4">
                Ready to bring your ideas to life? Let's collaborate and create something amazing together.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <Card className={`glass-effect border-zinc-800 hover:border-amber-400/30 transition-all duration-700 ${isVisible.contact ? "animate-slide-in-left" : "opacity-0"}`}>
                <CardContent className="p-6 md:p-8 lg:p-10">
                  <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-6 md:mb-8">
                    Send a <span className="text-gradient">Message</span>
                  </h3>

                  <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-6">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:border-amber-400 focus:ring-amber-400 h-11 md:h-12"
                        required
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:border-amber-400 focus:ring-amber-400 h-11 md:h-12"
                        required
                      />
                    </div>

                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={6}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:border-amber-400 focus:ring-amber-400 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSending}
                      className={`w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-zinc-950 font-semibold py-3 md:py-4 rounded hover-lift group ${
                        isSending ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSending ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                    <p className="text-xs md:text-sm text-zinc-400 text-center mt-2">* All fields are required</p>
                  </form>
                </CardContent>
              </Card>

              <div className={`space-y-6 md:space-y-8 ${isVisible.contact ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
                <div>
                  <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-6 md:mb-8">
                    Get in <span className="text-gradient">Touch</span>
                  </h3>
                  
                  <div className="space-y-4 md:space-y-6">
                    {[
                      { icon: Mail, label: "Email", value: "06ishansaxena@gmail.com", href: "mailto:06ishansaxena@gmail.com" },
                      { icon: Phone, label: "Phone", value: "+91 9205243543", href: "tel:+919205243543" },
                      { icon: MapPin, label: "Location", value: "Ghaziabad, UP, India", href: "#" }
                    ].map((contact, index) => (
                      <a
                        key={index}
                        href={contact.href}
                        className="flex items-center space-x-4 p-4 md:p-6 glass-effect border border-zinc-800 hover:border-amber-400/30 transition-all duration-500 group hover-lift rounded-lg"
                      >
                        <div className="bg-gradient-to-br from-amber-400/20 to-amber-500/20 p-2 md:p-3 rounded-lg group-hover:scale-110 transition-transform">
                          <contact.icon className="h-5 w-5 md:h-6 md:w-6 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-zinc-400 uppercase tracking-wide">
                            {contact.label}
                          </p>
                          <p className="text-sm md:text-base text-zinc-100 font-medium group-hover:text-amber-400 transition-colors">
                            {contact.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg md:text-xl font-light text-zinc-100 mb-4 md:mb-6">Connect Online</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: "https://github.com/ishansaxena012", label: "GitHub" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/ishan-saxena-62781428b/", label: "LinkedIn" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 md:p-4 glass-effect rounded-lg border border-zinc-800 hover:border-amber-400/30 transition-all duration-500 group hover-lift"
                        title={social.label}
                      >
                        <social.icon className="h-5 w-5 md:h-6 md:w-6 text-zinc-400 group-hover:text-amber-400 transition-colors group-hover:scale-110 transform duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-2">
                  <span className="text-gradient font-bold">ISHAN SAXENA</span>
                </h3>
                <p className="text-sm md:text-base text-zinc-400 font-light">
                  Crafting digital experiences with passion :)
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end space-y-4">
                <p className="text-zinc-500 text-xs md:text-sm">
                  © 2025 Ishan Saxena. All rights reserved.
                </p>
              </div>
            </div>

            <div className="text-center mt-8 md:mt-12">
              <button
                onClick={() => scrollToSection("hero")}
                className="group inline-flex flex-col items-center space-y-2 text-zinc-400 hover:text-amber-400 transition-all duration-300"
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
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-zinc-950 shadow-2xl hover-lift"
          onClick={() => scrollToSection("contact")}
        >
          <Mail className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;