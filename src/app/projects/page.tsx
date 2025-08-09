import Link from "next/link";
import { loadProjects, loadSkills } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

// GitHub-style technology colors
const techColors: { [key: string]: string } = {
  // Programming Languages
  "JavaScript": "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
  "TypeScript": "bg-blue-400/20 text-blue-300 border-blue-400/30",
  "Python": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Java": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "C++": "bg-blue-600/20 text-blue-500 border-blue-600/30",
  "C#": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Go": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Rust": "bg-orange-600/20 text-orange-500 border-orange-600/30",
  "PHP": "bg-purple-600/20 text-purple-500 border-purple-600/30",
  "Ruby": "bg-red-500/20 text-red-400 border-red-500/30",
  "Swift": "bg-orange-400/20 text-orange-300 border-orange-400/30",
  "Kotlin": "bg-purple-400/20 text-purple-300 border-purple-400/30",
  "C": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "MATLAB": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  
  // Frontend Technologies
  "React": "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
  "Vue": "bg-green-400/20 text-green-300 border-green-400/30",
  "Angular": "bg-red-500/20 text-red-400 border-red-500/30",
  "Next.js": "bg-gray-400/20 text-gray-300 border-gray-400/30",
  "Svelte": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Nuxt": "bg-green-500/20 text-green-400 border-green-500/30",
  "HTML5": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "CSS3": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Tailwind": "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
  "MUI": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Apollo GraphQL": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  
  // Backend & Databases
  "Node.js": "bg-green-500/20 text-green-400 border-green-500/30",
  "Express": "bg-gray-400/20 text-gray-300 border-gray-400/30",
  "Express.js": "bg-gray-400/20 text-gray-300 border-gray-400/30",
  "Django": "bg-green-600/20 text-green-500 border-green-600/30",
  "Flask": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "Spring": "bg-green-500/20 text-green-400 border-green-500/30",
  "PostgreSQL": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "MongoDB": "bg-green-500/20 text-green-400 border-green-500/30",
  "MySQL": "bg-blue-600/20 text-blue-500 border-blue-600/30",
  "Redis": "bg-red-500/20 text-red-400 border-red-500/30",
  "REST API": "bg-green-500/20 text-green-400 border-green-500/30",
  
  // Cloud & DevOps
  "AWS": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Docker": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Kubernetes": "bg-blue-600/20 text-blue-500 border-blue-600/30",
  "Terraform": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Jenkins": "bg-red-500/20 text-red-400 border-red-500/30",
  "GitHub Actions": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "GitHub": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "Harness": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  
  // Tools & Libraries
  "Git": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Webpack": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Vite": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Tailwind CSS": "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
  "Bootstrap": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Material-UI": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Ant Design": "bg-blue-600/20 text-blue-500 border-blue-600/30",
  
  // Testing
  "Jest": "bg-red-500/20 text-red-400 border-red-500/30",
  "Cypress": "bg-green-500/20 text-green-400 border-green-500/30",
  "Playwright": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Mocha": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Enzyme": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "React Testing Library": "bg-red-500/20 text-red-400 border-red-500/30",
  "Selenium WebDriver": "bg-green-500/20 text-green-400 border-green-500/30",
  "Mountebank": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  
  // Monitoring & Tools
  "Splunk": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Postman": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "OpenAPI (Swagger)": "bg-green-500/20 text-green-400 border-green-500/30",
  "Rally": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Deputy": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  
  // Default fallback
  "default": "bg-gray-500/20 text-gray-400 border-gray-500/30"
};

// Technology categories mapping
const techCategories = {
  "Languages": ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "C", "MATLAB"],
  "Frontend": ["React", "Vue", "Angular", "Next.js", "Svelte", "Nuxt", "Tailwind CSS", "Bootstrap", "Material-UI", "Ant Design", "HTML5", "CSS3", "Tailwind", "MUI", "Apollo GraphQL"],
  "Backend": ["Node.js", "Express", "Express.js", "Django", "Flask", "Spring", "PostgreSQL", "MongoDB", "MySQL", "Redis", "REST API"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "GitHub", "Harness"],
  "Tools & Libraries": ["Git", "Webpack", "Vite"],
  "Testing": ["Jest", "Cypress", "Playwright", "Mocha", "Enzyme", "React Testing Library", "Selenium WebDriver", "Mountebank"],
  "Monitoring & Tools": ["Splunk", "Postman", "OpenAPI (Swagger)", "Rally", "Deputy"]
};

function getTechColor(tech: string): string {
  return techColors[tech] || techColors["default"];
}

function getTechCategory(tech: string): string {
  for (const [category, technologies] of Object.entries(techCategories)) {
    if (technologies.includes(tech)) {
      return category;
    }
  }
  return "Other";
}

export default function ProjectsPage(){
  const projects = loadProjects();
  const skills = loadSkills();
  const stacks = Array.from(new Set(projects.flatMap(p=>p.stack))).sort();
  
  // Separate featured and regular projects
  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);
  
  // Group technologies by category using skills data
  const technologiesByCategory = Object.entries(skills).reduce((acc, [category, technologies]) => {
    acc[category] = technologies;
    return acc;
  }, {} as { [key: string]: string[] });

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-6">Projects</h1>
          
          {/* Featured Projects Section */}
          {featuredProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-blue-300">Featured Projects</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {featuredProjects.map(p => (
                  <div key={p.slug} className="rounded-xl bg-white/5 p-5 border border-white/10 hover:bg-white/10 transition-colors relative">
                    {/* Featured star icon */}
                    <div className="absolute top-3 right-3">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          stroke="#ef4444" 
                          strokeWidth="1.5" 
                          fill="none"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="block">
                      <h3 className="text-lg font-semibold pr-8">{p.title}</h3>
                      <p className="opacity-80">{p.summary}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.stack.map(s => (<Badge key={s} className={getTechColor(s)}>{s}</Badge>))}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* All Projects Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {regularProjects.map(p => (
                <div key={p.slug} className="rounded-xl bg-white/5 p-5 border border-white/10 hover:bg-white/10 transition-colors">
                  <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="opacity-80">{p.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.stack.map(s => (<Badge key={s} className={getTechColor(s)}>{s}</Badge>))}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
            <div className="space-y-4">
              {Object.entries(technologiesByCategory).map(([category, technologies]) => (
                <div key={category} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="font-medium text-white mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {technologies.map(tech => (
                      <Badge key={tech} className={`${getTechColor(tech)} text-xs`}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
