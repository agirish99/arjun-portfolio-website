import { loadExperience } from "@/lib/content";

export default function ExperiencePage() {
  const xp = loadExperience();
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold mb-12">Experience</h1>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
        
        <div className="space-y-8">
          {xp.map((job, i) => (
            <div key={i} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white/20 shadow-lg"></div>
              
              {/* Content card */}
              <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                  <span className="text-sm opacity-80 bg-white/10 px-3 py-1 rounded-full">
                    {job.start} – {job.end}
                  </span>
                </div>
                <div className="opacity-90 text-sm font-medium text-blue-300 mb-1">{job.company}</div>
                {job.location && (
                  <div className="opacity-80 text-sm mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                )}
                <ul className="space-y-2">
                  {job.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span className="opacity-90">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
