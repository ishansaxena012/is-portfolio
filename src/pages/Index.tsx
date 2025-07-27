import { useState, useEffect } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
    "Programming Languages": [
      { name: "Python", icon: Code },
      { name: "JavaScript", icon: Code },
      { name: "Java", icon: Code },
      { name: "C++", icon: Code },
      { name: "Kotlin", icon: Code },
      { name: "TypeScript", icon: Code },
    ],
    "Frameworks & Libraries": [
      { name: "React", icon: Globe },
      { name: "Node.js", icon: Globe },
      { name: "Express.js", icon: Globe },
      { name: "Next.js", icon: Globe },
      { name: "TailwindCSS", icon: Globe },
    ],
    Databases: [
      { name: "MongoDB", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "Redis", icon: Database },
    ],
    "Tools & Platforms": [
      { name: "Git", icon: Monitor },
      { name: "Docker", icon: Monitor },
      { name: "AWS", icon: Monitor },
      { name: "VS Code", icon: Monitor },
      { name: "Linux", icon: Monitor },
    ],
  };

  const projects = [
    {
      title: "AgroFinCare",
      description:
        "A smart agricultural finance solution to help farmers manage loans, predict crop yield, and analyze financial data with AI-driven insights.",
      technologies: ["React", "Node.js", "MongoDB", "CNN", "Flask"],
      image: "/bg1.webp",
      github: "https://github.com/razzakshat/AgroFinCare",
      demo: "#",
      featured: false,
    },
    {
      title: "UniDashPortal",
      description:
        "A university dashboard portal for students and faculty to manage courses, grades, and notifications in one place.",
      technologies: ["React", "Express.js", "MongoDB", "TailwindCSS"],
      image: "/bg2.webp",
      github: "https://github.com/ishansaxena012/uni-dash-portal",
      demo: "#",
      featured: false,
    },
    {
      title: "Smart Diet Planner App",
      description:
        "AI-powered diet planning app that provides personalized meal suggestions based on user health data and goals.",
      technologies: [
        "Kotlin",
        "Python",
        "Flask",
        "SQLite",
        "KNN",
        "Google OAuth",
      ],
      image: "/bg3.webp",
      github: "https://github.com/ishansaxena012/SmartDietPlannerApp",
      demo: "#",
      featured: false,
    },
  ];

  const interests = [
    {
      name: "Artificial Intelligence",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Web Development",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Competitive Programming",
      icon: Code,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Data Science",
      icon: Database,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Machine Learning",
      icon: Monitor,
      color: "from-teal-500 to-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Cursor follower */}
      <div
        className="fixed w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-lighten"
        style={{
          left: cursorPos.x - 16,
          top: cursorPos.y - 16,
          transform: `scale(${isScrolled ? 0.6 : 1})`,
          transition: "transform 0.3s ease",
        }}
      />

      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ISHAN SAXENA
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-purple-400 relative group ${
                    activeSection === item.id
                      ? "text-purple-400"
                      : "text-gray-300"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full ${
                      activeSection === item.id ? "w-full" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Particles */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

        {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Profile Image with Glow */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75 animate-pulse" />
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                  <img
                    src="/dp.webp"
                    alt="Ishan Saxena"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Animated Name with Gradient */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              ISHAN SAXENA
            </h1>

            {/* Typing Effect Tagline */}
            <div className="text-2xl md:text-3xl mb-4 text-gray-300 font-light">
              <span className="inline-flex items-center">
                Aspiring Software Engineer
                <Sparkles className="ml-2 h-6 w-6 text-yellow-400 animate-spin" />
              </span>
            </div>

            <p className="text-lg mb-10 text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences that merge creativity with
              cutting-edge technology. Passionate about building the future, one
              line of code at a time.
            </p>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                onClick={() => scrollToSection("projects")}
              >
                <Zap className="mr-2 h-5 w-5" />
                Explore My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-500/50 text-white bg-black hover:bg-purple-200/10 backdrop-blur-sm px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-purple-500/30 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-purple-400">
                      Download My Resume
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 text-center">
                    <a
                      href="/resume.pdf"
                      download
                      className="text-purple-400 underline hover:text-pink-400 transition-colors"
                    >
                      Click here to download
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  I'm a passionate third-year Computer Science student who
                  believes in the power of technology to transform ideas into
                  reality. My journey began with simple curiosity and has
                  evolved into a relentless pursuit of innovation.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Every project I undertake is an opportunity to push
                  boundaries, learn something new, and create solutions that
                  matter. I thrive on challenges and love collaborating with
                  fellow innovators to build the future.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <span className="text-lg font-semibold text-purple-400">
                    Always Learning • Always Building
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-8 text-white">
                  Passionate About
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 hover:scale-105"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <div className="relative flex items-center space-x-3">
                        <interest.icon className="h-6 w-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
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
      <section id="skills" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card
                  key={category}
                  className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 group"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6 text-white group-hover:text-purple-400 transition-colors duration-300">
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {skillList.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <skill.icon className="h-5 w-5 text-purple-400" />
                          <span className="text-gray-300 font-medium">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                return (
                  <Card
                    key={index}
                    className={`group relative overflow-hidden bg-gradient-to-b from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-700 hover:scale-105 ${
                      project.featured ? "lg:col-span-1 lg:row-span-1" : ""
                    }`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <CardContent className="p-6 relative">
                      {project.featured && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </div>
                      )}
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education Journey
            </h2>
            <Card className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Bachelor of Technology in Computer Science and Engineering
                    </h3>
                    <p className="text-xl text-purple-400 mb-6 font-semibold">
                      VIT Bhopal University
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Calendar className="h-5 w-5 text-purple-400" />
                        <span>Expected Graduation: 2027</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <MapPin className="h-5 w-5 text-purple-400" />
                        <span>Bhopal, Madhya Pradesh</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <h4 className="font-semibold text-purple-400 mb-2">
                          Relevant Coursework
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Data Structures & Algorithms, Database Management
                          Systems, Software Engineering, Machine Learning,
                          Computer Networks, Operating Systems
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Create Together
            </h2>
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-3xl font-bold mb-8 text-white">
                  Ready to Connect?
                </h3>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  I'm always excited to discuss new opportunities, innovative
                  projects, or just chat about the latest in tech. Let's build
                  something amazing together!
                </p>
                <div className="space-y-6">
                  <a
                    href="mailto:06ishansaxena@gmail.com"
                    className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-all duration-300 group"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg">06ishansaxena@gmail.com</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ishan-saxena-62781428b/"
                    className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-all duration-300 group"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg">Ishan Saxena</span>
                  </a>
                  <a
                    href="https://github.com/ishansaxena012"
                    className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-all duration-300 group"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg">ishansaxena012</span>
                  </a>
                </div>
              </div>
              <Card className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">
                    Send a Message
                  </h3>
                  <form className="space-y-6">
                    <Input
                      placeholder="Your Name"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors"
                    />
                    <Input
                      placeholder="Subject"
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors"
                    />
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors resize-none"
                    />
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transform hover:scale-105 transition-all duration-300">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <p className="text-gray-400 font-medium">
                &copy; 2025 Ishan Saxena. Crafted with passion and precision.
              </p>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-500">
              Built with React, Tailwind CSS, and a lot of ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
