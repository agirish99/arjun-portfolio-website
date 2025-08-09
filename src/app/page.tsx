import dynamic from "next/dynamic";
import { loadSite } from "@/lib/content";
import { Button } from "@/components/ui/button";

const sceneMap = {
  neon: dynamic(() => import("@/components/three/NeonGrid"), { ssr: false }),
  constellation: dynamic(() => import("@/components/three/Constellation"), { ssr: false }),
  terrain: dynamic(() => import("@/components/three/LowPolyTerrain"), { ssr: false }), // Fallback to NeonGrid
  voxel: dynamic(() => import("@/components/three/VoxelCity"), { ssr: false }), // Fallback to Constellation
};

export default function HomePage() {
  const site = loadSite();
  const key = site.hero.scene ?? "neon";
  const Hero = sceneMap[key as keyof typeof sceneMap] ?? sceneMap.neon;
  
  return (
    <div>
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -z-10"><Hero /></div>
        <div className="container space-y-6">
          <p className="uppercase tracking-[0.35em] text-xs opacity-80">Software Engineer</p>
          <h1 className="text-4xl sm:text-6xl font-black">{site.hero.headline}</h1>
          <p className="max-w-2xl opacity-90">{site.hero.subheadline}</p>
          <div className="flex gap-3">
            {site.socials.linkedin && (
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <Button>Get in touch</Button>
              </a>
            )}
            <a href="https://www.credly.com/users/arjun-girish.283840ef/badges#credly" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">Certifications</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
