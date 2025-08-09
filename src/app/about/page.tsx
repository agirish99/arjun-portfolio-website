import { loadSite } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AboutPage() {
  const site = loadSite();
  
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex flex-col items-center gap-6">
          {/* Photo Spot */}
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/20 flex items-center justify-center overflow-hidden photo-container">
            <img 
              src="/arjun-photo.jpg" 
              alt="Arjun Girish" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              {site.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2 lg:grid-rows-2 lg:h-[600px]">
        {/* Quick Facts Card */}
        <Card className="bg-white/5 border-white/10 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">👋</span>
              Quick Facts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">3+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400">10+</div>
                <div className="text-sm opacity-80">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">5+</div>
                <div className="text-sm opacity-80">Technologies</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">∞</div>
                <div className="text-sm opacity-80">Coffee Cups</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Philosophy */}
        <Card className="bg-white/5 border-white/10 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Work Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">💡</span>
                <span className="opacity-90">Solve problems, don't just write code</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">🔍</span>
                <span className="opacity-90">Test everything, trust nothing</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">🚀</span>
                <span className="opacity-90">Ship fast, iterate faster</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">🤝</span>
                <span className="opacity-90">Code is read more than written</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location & Contact */}
        <Card className="bg-white/5 border-white/10 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              Location & Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400">🏠</span>
              </div>
              <div>
                <div className="font-medium">{site.location}</div>
                <div className="text-sm opacity-70">Australia</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400">📧</span>
              </div>
              <div>
                <div className="font-medium">{site.email}</div>
                <div className="text-sm opacity-70">Always open to opportunities</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-400">📱</span>
              </div>
              <div>
                <div className="font-medium">{site.phone}</div>
                <div className="text-sm opacity-70">Available for calls</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="bg-white/5 border-white/10 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Fun Facts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">🍕</span>
                <span className="opacity-90">Self-proclaimed foodie</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">🏍️</span>
                <span className="opacity-90">Adventure seeker on two wheels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">📸</span>
                <span className="opacity-90">Currently mastering photography</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">⚡</span>
                <span className="opacity-90">I can debug code in my dreams (literally!)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-4">Let's Connect!</h2>
        <p className="opacity-80 mb-6 max-w-md mx-auto">
          I'm always interested in hearing about new opportunities and exciting projects.
        </p>
        <div className="flex gap-4 justify-center">
          {site.socials.linkedin && (
            <a 
              href={site.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              Connect on LinkedIn
            </a>
          )}
          <a 
            href="mailto:agirish1999@gmail.com"
            className="px-6 py-3 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}
