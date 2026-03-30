import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Atom, 
  Calculator, 
  TrendingUp, 
  BookOpen, 
  Target, 
  ArrowRight,
  Stethoscope,
  Factory,
  Wheat,
  Zap,
  DollarSign,
  Globe,
  Activity,
  BarChart3
} from "lucide-react";

interface RealTimeStats {
  globalMarketValue: number;
  medicalIsotopes: number;
  industrialApplications: number;
  researchFacilities: number;
  annualGrowth: number;
  costEfficiency: number;
}

interface Domain {
  id: string;
  name: string;
  icon: any;
  color: string;
  applications: string[];
  description: string;
  marketShare: number;
}

const domains: Domain[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    color: "from-cyan-400 to-blue-500",
    applications: ["Medical Imaging", "Cancer Treatment", "Sterilization", "Radiopharmaceuticals"],
    description: "Nuclear medicine saves millions of lives through diagnostic imaging and targeted therapy",
    marketShare: 45
  },
  {
    id: "industry",
    name: "Industry",
    icon: Factory,
    color: "from-purple-400 to-pink-500",
    applications: ["Material Testing", "Quality Control", "Welding", "Thickness Gauging"],
    description: "Industrial radiography ensures safety and quality in manufacturing processes",
    marketShare: 30
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: Wheat,
    color: "from-green-400 to-emerald-500",
    applications: ["Food Preservation", "Pest Control", "Crop Improvement", "Soil Analysis"],
    description: "Nuclear techniques enhance food security and agricultural productivity",
    marketShare: 15
  },
  {
    id: "research",
    name: "Research",
    icon: BookOpen,
    color: "from-orange-400 to-red-500",
    applications: ["Scientific Studies", "Dating Methods", "Environmental Monitoring", "Space Exploration"],
    description: "Nuclear technology drives scientific discovery and environmental understanding",
    marketShare: 10
  }
];

function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0, duration = 2000 }: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

function IsotopeStructure3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-black via-gray-900 to-cyan-900 rounded-3xl overflow-hidden">
      {/* 3D Perspective Container */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Central Nucleus - 3D Sphere */}
        <div className="relative">
          {/* Main Nucleus - Larger and more detailed */}
          <div
            className="w-24 h-24 relative"
            style={{
              transform: `rotateX(${rotation * 0.7}deg) rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Core nucleus with 3D effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-red-700 shadow-2xl">
              {/* 3D highlighting */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-80 blur-sm"></div>
              <div className="absolute top-3 left-3 w-4 h-4 bg-yellow-200 rounded-full opacity-90"></div>

              {/* Nuclear particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
                  style={{
                    top: `${20 + Math.cos(i * 45 * Math.PI / 180) * 15}px`,
                    left: `${20 + Math.sin(i * 45 * Math.PI / 180) * 15}px`,
                    transform: `translateZ(${Math.sin(i * 45 * Math.PI / 180) * 10}px)`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            {/* Glowing nucleus aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/30 to-red-500/30 animate-pulse scale-150 blur-md"></div>
          </div>

          {/* Electron Shells - Application Domain Orbitals */}
          {[
            { radius: 140, electrons: 2, speed: 15, color: 'cyan', tilt: 0 },
            { radius: 200, electrons: 8, speed: 20, color: 'blue', tilt: 45 },
            { radius: 280, electrons: 4, speed: 25, color: 'purple', tilt: 90 },
            { radius: 360, electrons: 4, speed: 30, color: 'green', tilt: 135 }
          ].map((shell, shellIndex) => (
            <div key={shellIndex}>
              {/* Orbital path - more visible */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-${shell.color}-400/20 rounded-full`}
                style={{
                  width: `${shell.radius}px`,
                  height: `${shell.radius}px`,
                  transform: `translate(-50%, -50%) rotateX(${shell.tilt}deg) rotateY(${rotation * 0.3}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              />

              {/* Electrons/Application Domains */}
              {shell.electrons <= domains.length && domains.slice(0, shell.electrons).map((domain, electronIndex) => {
                const angle = (360 / shell.electrons) * electronIndex;
                const IconComponent = domain.icon;
                const currentAngle = angle + (rotation * (shell.speed / 10));

                return (
                  <div
                    key={`${shellIndex}-${domain.id}`}
                    className={`absolute w-12 h-12 bg-gradient-to-r ${domain.color} rounded-full cursor-pointer shadow-2xl transition-all duration-300 hover:scale-125 hover:shadow-cyan-400/50`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `
                        translate(-50%, -50%)
                        rotateX(${shell.tilt}deg)
                        rotateY(${currentAngle}deg)
                        translateZ(${shell.radius / 2}px)
                        rotateY(-${currentAngle}deg)
                        rotateX(-${shell.tilt}deg)
                      `,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform'
                    }}
                    onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                    onMouseEnter={() => setSelectedDomain(domain.id)}
                    onMouseLeave={() => setSelectedDomain(null)}
                  >
                    {/* Electron glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${domain.color} rounded-full animate-pulse opacity-50 scale-150 blur-sm`}></div>

                    {/* Electron core */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Energy Field - Optimized particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70"
              style={{
                top: `${Math.sin((rotation + i * 30) * Math.PI / 180) * 200 + 250}px`,
                left: `${Math.cos((rotation + i * 30) * Math.PI / 180) * 200 + 250}px`,
                transform: `translateZ(${Math.sin((rotation + i * 30) * Math.PI / 180) * 50}px)`,
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}

          {/* Quantum Field Lines */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-cyan-400/10 rounded-full"
              style={{
                width: `${180 + i * 40}px`,
                height: `${180 + i * 40}px`,
                top: '50%',
                left: '50%',
                transform: `
                  translate(-50%, -50%)
                  rotateX(${i * 30}deg)
                  rotateY(${rotation * 0.2}deg)
                `,
                transformStyle: 'preserve-3d'
              }}
            />
          ))}
        </div>
      </div>

      {/* Domain Information Panel */}
      {selectedDomain && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/30">
          {(() => {
            const domain = domains.find(d => d.id === selectedDomain);
            if (!domain) return null;

            return (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 bg-gradient-to-r ${domain.color} rounded-lg flex items-center justify-center`}>
                    <domain.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-cyan-400">{domain.name}</h3>
                  <Badge className="bg-cyan-900 text-cyan-200">{domain.marketShare}% Market Share</Badge>
                </div>
                <p className="text-sm text-gray-300 mb-3">{domain.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {domain.applications.map((app, index) => (
                    <div key={index} className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded">
                      {app}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
      
      {/* Title Overlay */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <h3 className="text-xl font-bold text-cyan-400 mb-1">Nuclear Applications Ecosystem</h3>
        <p className="text-sm text-gray-300">Interactive 3D view of nuclear technology domains</p>
      </div>
    </div>
  );
}

export default function Index() {
  const [stats, setStats] = useState<RealTimeStats>({
    globalMarketValue: 17.77, // USD 17.77 billion in 2024
    medicalIsotopes: 137000, // ~137,000 procedures daily worldwide
    industrialApplications: 11000, // Over 11,000 TBq shipped annually
    researchFacilities: 195, // Active nuclear facilities worldwide
    annualGrowth: 10.16, // CAGR 2025-2030
    costEfficiency: 94.8 // Improved efficiency
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        globalMarketValue: Math.max(17.5, Math.min(18.2, prev.globalMarketValue + (Math.random() - 0.5) * 0.05)),
        medicalIsotopes: prev.medicalIsotopes + Math.floor(Math.random() * 80 + 10), // Procedures happening constantly
        industrialApplications: prev.industrialApplications + Math.floor(Math.random() * 15),
        researchFacilities: Math.max(190, Math.min(200, prev.researchFacilities + (Math.random() > 0.95 ? 1 : 0))),
        annualGrowth: Math.max(9.8, Math.min(10.5, prev.annualGrowth + (Math.random() - 0.5) * 0.1)),
        costEfficiency: Math.max(94, Math.min(96, prev.costEfficiency + (Math.random() - 0.5) * 0.2))
      }));
    }, 2000); // Faster updates for more engagement

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-900">
      {/* Clean Header */}
      <nav className="bg-black/50 backdrop-blur-sm border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Atom className="h-10 w-10 text-cyan-400 animate-spin" style={{animationDuration: '4s'}} />
                <div className="absolute inset-0 animate-ping">
                  <Atom className="h-10 w-10 text-cyan-400/30" />
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                  Nucleonomic
                </span>
                <div className="text-xs text-gray-400 tracking-wider">NUCLEAR INTELLIGENCE PLATFORM</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-cyan-600 to-cyan-400 text-black font-semibold px-4 py-2">
            ⚛️ Welcome to the Future of Nuclear Technology!
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              NUCLEONOMIC
            </span>
            <br />
            <span className="text-white text-3xl md:text-5xl">
              Unlocking the Power of Nuclear Beyond Energy!
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Nucleonomic is an educational web platform designed to help students, enthusiasts, and professionals 
              explore the <span className="text-cyan-400 font-semibold">non-energy applications</span> of nuclear technologies.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              From medical diagnostics to food preservation and industrial uses, Nucleonomic simplifies complex science through:
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {["Learn", "Explore", "Innovate", "Discover"].map((action, index) => (
                <div key={action} className="bg-gradient-to-br from-cyan-600/20 to-cyan-400/10 border border-cyan-500/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">{action}</div>
                  <div className="text-sm text-gray-300">
                    {action === "Learn" && "Master nuclear economics"}
                    {action === "Explore" && "Interactive simulations"}
                    {action === "Innovate" && "Creative applications"}
                    {action === "Discover" && "Real-world impact"}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-lg text-cyan-300 font-medium">
              Discover how radiation changes the world—outside the reactor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-semibold shadow-lg shadow-cyan-500/25 transform hover:scale-105 transition-all px-8 py-4 text-lg">
                🚀 Join the Nuclear Revolution
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transform hover:scale-105 transition-all px-8 py-4 text-lg">
                ⚡ Get Exclusive Access
              </Button>
            </Link>
          </div>


        </div>
      </section>

      {/* 3D Isotope Structure */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Nuclear Technology Applications
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Interactive 3D atomic structure showing the four major domains where nuclear technology transforms lives.
              Hover over the orbiting applications to explore each domain in detail.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge className="bg-orange-600/20 text-orange-300 border-orange-500/30">3D Nucleus</Badge>
              <Badge className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30">Application Domains</Badge>
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">Interactive Hover</Badge>
            </div>
          </div>
          <div className="flex justify-center">
            <IsotopeStructure3D />
          </div>
        </div>
      </section>

      {/* Real-time Economic Statistics */}
      <section className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Activity className="h-8 w-8 text-cyan-400" />
              Live Economic Intelligence
            </h2>
            <Badge className="bg-gradient-to-r from-green-600 to-green-400 text-black animate-pulse">
              <div className="w-2 h-2 bg-green-200 rounded-full mr-2 animate-ping"></div>
              REAL-TIME DATA
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-500/30 hover:border-cyan-400/50 transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-300">💰 Market Explosion</CardTitle>
                  <DollarSign className="h-5 w-5 text-cyan-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  $<AnimatedCounter value={stats.globalMarketValue} decimals={2} />B
                </div>
                <p className="text-xs text-gray-400">Growing to $34.5B by 2030!</p>
                <Progress value={52} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/30 hover:border-purple-400/50 transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-300">🏥 Lives Saved Daily</CardTitle>
                  <Stethoscope className="h-5 w-5 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  <AnimatedCounter value={Math.floor(stats.medicalIsotopes / 1000)} />K+
                </div>
                <p className="text-xs text-gray-400">Medical procedures happening now</p>
                <Progress value={95} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/30 hover:border-green-400/50 transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-300">🏭 Industrial Power</CardTitle>
                  <Factory className="h-5 w-5 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  <AnimatedCounter value={Math.floor(stats.industrialApplications / 1000)} />K
                </div>
                <p className="text-xs text-gray-400">TBq shipped annually</p>
                <Progress value={78} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-500/30 hover:border-orange-400/50 transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-300">🔬 Research Hubs</CardTitle>
                  <BarChart3 className="h-5 w-5 text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  <AnimatedCounter value={stats.researchFacilities} />+
                </div>
                <p className="text-xs text-gray-400">Active worldwide facilities</p>
                <Progress value={88} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/30 hover:border-blue-400/50 transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-300">📈 Explosive Growth</CardTitle>
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter value={stats.annualGrowth} decimals={1} />%
                </div>
                <p className="text-xs text-gray-400">CAGR through 2030</p>
                <Progress value={stats.annualGrowth * 10} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-900/20 to-pink-800/10 border-pink-500/30 hover:border-pink-400/50 transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-300">⚡ Future Ready</CardTitle>
                  <Zap className="h-5 w-5 text-pink-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pink-400 mb-2">
                  <AnimatedCounter value={stats.costEfficiency} decimals={1} />%
                </div>
                <p className="text-xs text-gray-400">Technology advancement</p>
                <Progress value={stats.costEfficiency} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Games Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              🎮 Learn Through <span className="text-purple-400">Interactive Gaming</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Master nuclear economics through engaging games that simulate real-world scenarios.
              <span className="text-purple-400 font-semibold"> Play, learn, and compete with professionals worldwide!</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Game 1 Preview */}
            <Card className="group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30 hover:border-purple-400/60 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 h-32 flex items-center justify-center">
                  <div className="text-4xl animate-bounce">🏭</div>
                </div>
                <Badge className="absolute top-3 right-3 bg-purple-600 text-white">Game 1</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-xl">Nuclear Facility Manager</CardTitle>
                <CardDescription className="text-gray-300">
                  Build and manage your own nuclear isotope production facility. Make strategic decisions,
                  optimize costs, and compete in the global market.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-purple-300 border-purple-400/30">Strategy</Badge>
                  <Badge variant="outline" className="text-purple-300 border-purple-400/30">Economics</Badge>
                  <Badge variant="outline" className="text-purple-300 border-purple-400/30">Management</Badge>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4">
                  <div className="text-sm text-purple-300 font-medium mb-2">What you'll learn:</div>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Production cost optimization</li>
                    <li>• Market demand analysis</li>
                    <li>• Strategic facility planning</li>
                  </ul>
                </div>
                <Link to="/login">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold">
                    🎮 Start Playing Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Game 2 Preview */}
            <Card className="group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-cyan-900/30 to-blue-800/20 border-cyan-500/30 hover:border-cyan-400/60 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-600 to-blue-600 h-32 flex items-center justify-center">
                  <div className="text-4xl animate-pulse">⚛️</div>
                </div>
                <Badge className="absolute top-3 right-3 bg-cyan-600 text-white">Game 2</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-xl">Isotope Trading Simulator</CardTitle>
                <CardDescription className="text-gray-300">
                  Navigate the complex world of nuclear isotope trading. Predict market trends,
                  manage supply chains, and maximize profits.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-cyan-300 border-cyan-400/30">Trading</Badge>
                  <Badge variant="outline" className="text-cyan-300 border-cyan-400/30">Analytics</Badge>
                  <Badge variant="outline" className="text-cyan-300 border-cyan-400/30">Finance</Badge>
                </div>
                <div className="bg-cyan-900/30 rounded-lg p-4">
                  <div className="text-sm text-cyan-300 font-medium mb-2">What you'll learn:</div>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Market trend analysis</li>
                    <li>• Supply chain optimization</li>
                    <li>• Risk management strategies</li>
                  </ul>
                </div>
                <Link to="/login">
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold">
                    📈 Start Trading Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Games CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                🏆 Compete & Learn with Gamified Nuclear Economics
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                These aren't just games – they're professional training simulators used by industry experts.
                Level up your skills while having fun!
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white font-bold px-8 py-4 text-lg transform hover:scale-105 transition-all">
                  🎮 Unlock Gaming Experience
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What You'll Master Inside Nucleonomic
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "🎓 Expert Knowledge", desc: "Master nuclear economics with cutting-edge insights", color: "cyan" },
              { icon: Target, title: "🎯 Career Advancement", desc: "Boost your career in the $17B+ nuclear industry", color: "purple" },
              { icon: Calculator, title: "💡 Strategic Thinking", desc: "Analyze million-dollar production decisions", color: "green" },
              { icon: TrendingUp, title: "📊 Market Intelligence", desc: "Access real-time industry data and trends", color: "orange" }
            ].map((feature, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700 hover:border-cyan-500/50 cursor-pointer">
                <CardHeader>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-400 mb-2 group-hover:animate-pulse`} />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-cyan-300">
                    🔒 Premium Member Access Required
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master <span className="text-cyan-400">Nuclear Economics</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              While others watch from the sidelines, you'll be inside the fastest-growing sector in energy economics.
              <span className="text-cyan-400 font-semibold"> The nuclear revolution is happening NOW.</span>
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/30 rounded-lg p-6 border border-cyan-500/30">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">💰 Industry Insider Access</h3>
              <p className="text-gray-300 text-sm">Get the same economic intelligence used by nuclear industry leaders</p>
            </div>
            <div className="bg-black/30 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold text-purple-400 mb-3">🚀 Career Acceleration</h3>
              <p className="text-gray-300 text-sm">Position yourself in the 10.16% CAGR nuclear economics boom</p>
            </div>
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/30">
              <h3 className="text-lg font-bold text-green-400 mb-3">🎯 Exclusive Network</h3>
              <p className="text-gray-300 text-sm">Connect with nuclear professionals and decision-makers</p>
            </div>
          </div>

          {/* Main CTA */}
          <div className="space-y-6">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-600 text-black font-bold shadow-2xl shadow-cyan-500/25 transform hover:scale-110 transition-all px-12 py-6 text-xl animate-pulse">
                🔥 CLAIM YOUR EXCLUSIVE ACCESS NOW
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Cancel Anytime</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Join nuclear professionals transforming their careers with Nucleonomic intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-cyan-500/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Atom className="h-8 w-8 text-cyan-400 animate-spin" style={{animationDuration: '6s'}} />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
              Nucleonomic Platform
            </span>
          </div>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Don't let the nuclear revolution pass you by. Join the elite community transforming the $17.77B industry.
          </p>

          {/* Final CTA */}
          <div className="mb-8">
            <Link to="/login">
              <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-semibold px-8 py-3 transform hover:scale-105 transition-all">
                Start Your Journey Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Platform Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">🎮</div>
              <div className="text-sm text-gray-400">Interactive Games</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">📊</div>
              <div className="text-sm text-gray-400">Real-time Data</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">🎓</div>
              <div className="text-sm text-gray-400">Expert Learning</div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            © 2024 Nucleonomic. Empowering the next generation of nuclear professionals.
          </div>
        </div>
      </footer>
    </div>
  );
}
