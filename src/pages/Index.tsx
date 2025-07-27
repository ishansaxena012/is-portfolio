import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  MapPin
} from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = {
    "Programming Languages": [
      { name: "Python", icon: Code },
      { name: "JavaScript", icon: Code },
      { name: "Java", icon: Code },
      { name: "C++", icon: Code },
      { name: "TypeScript", icon: Code }
    ],
    "Frameworks & Libraries": [
      { name: "React", icon: Globe },
      { name: "Node.js", icon: Globe },
      { name: "Express.js", icon: Globe },
      { name: "Next.js", icon: Globe },
      { name: "TailwindCSS", icon: Globe }
    ],
    "Databases": [
      { name: "MongoDB", icon: Database },
      { name: "PostgreSQL", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "Redis", icon: Database }
    ],
    "Tools & Platforms": [
      { name: "Git", icon: Monitor },
      { name: "Docker", icon: Monitor },
      { name: "AWS", icon: Monitor },
      { name: "VS Code", icon: Monitor },
      { name: "Linux", icon: Monitor }
    ]
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "JWT"],
      image: "https://placehold.co/600x400/1e3a8a/ffffff?text=E-Commerce+Platform",
      github: "#",
      demo: "#"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered chatbot integration using modern web technologies.",
      technologies: ["React", "Socket.io", "Python", "OpenAI API", "Redis"],
      image: "https://placehold.co/600x400/3b82f6/ffffff?text=AI+Chat+App",
      github: "#",
      demo: "#"
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for data analysis with real-time charts and customizable widgets.",
      technologies: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
      image: "https://placehold.co/600x400/6366f1/ffffff?text=Data+Dashboard",
      github: "#",
      demo: "#"
    }
  ];

  const interests = [
    { name: "Artificial Intelligence", icon: Brain },
    { name: "Web Development", icon: Globe },
    { name: "Competitive Programming", icon: Code },
    { name: "Data Science", icon: Database },
    { name: "Mobile Development", icon: Smartphone },
    { name: "Machine Learning", icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-primary">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-smooth hover:text-accent ${
                    activeSection === item.id ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center gradient-hero text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Your Name
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Aspiring Software Engineer | Full Stack Enthusiast
            </p>
            <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
              Passionate about creating innovative solutions and turning complex problems into elegant code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-blue-50 transition-smooth"
                onClick={() => scrollToSection('projects')}
              >
                View My Projects
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary transition-smooth"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-white" />
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm a passionate third-year Computer Science and Engineering student with a deep fascination for technology 
                  and its potential to solve real-world problems. My journey in programming began with curiosity and has evolved 
                  into a commitment to building innovative, user-centric solutions.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Through various projects and continuous learning, I've developed a strong foundation in full-stack development, 
                  with particular interests in artificial intelligence and modern web technologies. I'm always eager to take on 
                  new challenges and collaborate on projects that make a meaningful impact.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-6 text-primary">Key Interests</h3>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((interest, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-soft">
                      <interest.icon className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">{interest.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Technical Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="shadow-medium hover:shadow-large transition-smooth">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-primary">{category}</h3>
                    <div className="space-y-3">
                      {skillList.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <skill.icon className="h-4 w-4 text-accent" />
                          <span className="text-sm text-muted-foreground">{skill.name}</span>
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
      <section id="projects" className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="shadow-medium hover:shadow-large transition-smooth">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-smooth"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-primary">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Education</h2>
            <Card className="shadow-large">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Bachelor of Technology in Computer Science and Engineering
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      Your University Name
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Expected Graduation: 2025</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>City, State</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Relevant Coursework:</span> Data Structures & Algorithms, 
                        Database Management Systems, Software Engineering, Machine Learning, Computer Networks, 
                        Operating Systems
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Achievements:</span> Dean's List (2022-2023), 
                        Programming Competition Winner, Technical Society Member
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-primary">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-primary">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in discussing new opportunities, innovative projects, 
                  or just having a conversation about technology. Feel free to reach out!
                </p>
                <div className="space-y-4">
                  <a 
                    href="mailto:your.email@example.com"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-accent transition-smooth"
                  >
                    <Mail className="h-5 w-5" />
                    <span>your.email@example.com</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/yourprofile"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-accent transition-smooth"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>linkedin.com/in/yourprofile</span>
                  </a>
                  <a 
                    href="https://github.com/yourusername"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-accent transition-smooth"
                  >
                    <Github className="h-5 w-5" />
                    <span>github.com/yourusername</span>
                  </a>
                </div>
              </div>
              <Card className="shadow-medium">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-primary">Send a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Your Name" className="transition-smooth" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Your Email" className="transition-smooth" />
                    </div>
                    <div>
                      <Input placeholder="Subject" className="transition-smooth" />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Your Message" 
                        rows={4}
                        className="transition-smooth resize-none"
                      />
                    </div>
                    <Button className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;