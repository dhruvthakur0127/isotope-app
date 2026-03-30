import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Atom, 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Activity, 
  Users, 
  ArrowRight, 
  LogOut,
  Zap,
  Target,
  BarChart3,
  Clock
} from "lucide-react";

interface RealTimeData {
  globalIsotopeMarket: number;
  medicalProcedures: number;
  activeFacilities: number;
  averageCost: number;
  energyOutput: number;
  researchProjects: number;
}

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({ value, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    globalIsotopeMarket: 8.2,
    medicalProcedures: 47000000,
    activeFacilities: 147,
    averageCost: 2450,
    energyOutput: 12.8,
    researchProjects: 312
  });

  useEffect(() => {
    // Check authentication
    const authState = localStorage.getItem("nucleonomic_auth");
    const userData = localStorage.getItem("nucleonomic_user");
    
    if (!authState || !userData) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(userData));

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        globalIsotopeMarket: prev.globalIsotopeMarket + (Math.random() - 0.5) * 0.1,
        medicalProcedures: prev.medicalProcedures + Math.floor(Math.random() * 1000),
        activeFacilities: prev.activeFacilities + (Math.random() > 0.8 ? 1 : 0),
        averageCost: prev.averageCost + (Math.random() - 0.5) * 50,
        energyOutput: prev.energyOutput + (Math.random() - 0.5) * 0.5,
        researchProjects: prev.researchProjects + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("nucleonomic_auth");
    localStorage.removeItem("nucleonomic_user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Nucleonomic</h1>
                <p className="text-xs text-slate-400">Intelligence Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Welcome, {user.name}</p>
                <p className="text-xs text-slate-400">Last login: {new Date(user.loginTime).toLocaleTimeString()}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-slate-600 text-slate-300">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Real-time Market Overview */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Live Market Intelligence</h2>
            <Badge variant="outline" className="text-green-400 border-green-400/30 animate-pulse">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              LIVE
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-300">Global Market Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  $<AnimatedCounter value={realTimeData.globalIsotopeMarket} decimals={1} />B
                </div>
                <p className="text-xs text-slate-400 mt-1">+12.3% YoY growth</p>
                <Progress value={78} className="mt-3 h-1" />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-300">Medical Procedures</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={realTimeData.medicalProcedures} />
                </div>
                <p className="text-xs text-slate-400 mt-1">Annual procedures globally</p>
                <Progress value={85} className="mt-3 h-1" />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-300">Active Facilities</CardTitle>
                  <Globe className="h-4 w-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={realTimeData.activeFacilities} />
                </div>
                <p className="text-xs text-slate-400 mt-1">Production facilities worldwide</p>
                <Progress value={92} className="mt-3 h-1" />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-300">Average Cost/MBq</CardTitle>
                  <BarChart3 className="h-4 w-4 text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  $<AnimatedCounter value={realTimeData.averageCost} />
                </div>
                <p className="text-xs text-slate-400 mt-1">Industry average pricing</p>
                <Progress value={67} className="mt-3 h-1" />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-300">Energy Output</CardTitle>
                  <Zap className="h-4 w-4 text-yellow-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={realTimeData.energyOutput} decimals={1} />TW
                </div>
                <p className="text-xs text-slate-400 mt-1">Global nuclear capacity</p>
                <Progress value={73} className="mt-3 h-1" />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-300">Research Projects</CardTitle>
                  <Target className="h-4 w-4 text-red-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter value={realTimeData.researchProjects} />
                </div>
                <p className="text-xs text-slate-400 mt-1">Active R&D initiatives</p>
                <Progress value={89} className="mt-3 h-1" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-400" />
            Start Your Learning Journey
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/learn">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Atom className="h-8 w-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Educational Content</h3>
                  <p className="text-blue-100 text-sm mb-4">Comprehensive nuclear economics modules</p>
                  <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/quiz">
              <Card className="bg-gradient-to-br from-green-600 to-green-700 border-green-500 hover:from-green-500 hover:to-green-600 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Knowledge Quiz</h3>
                  <p className="text-green-100 text-sm mb-4">Test your understanding</p>
                  <Button size="sm" className="bg-white text-green-600 hover:bg-green-50">
                    Take Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/comparison">
              <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500 hover:from-purple-500 hover:to-purple-600 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Economic Analysis</h3>
                  <p className="text-purple-100 text-sm mb-4">Compare production methods</p>
                  <Button size="sm" className="bg-white text-purple-600 hover:bg-purple-50">
                    Analyze
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/results">
              <Card className="bg-gradient-to-br from-orange-600 to-orange-700 border-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">View Results</h3>
                  <p className="text-orange-100 text-sm mb-4">Progress and insights</p>
                  <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50">
                    View Progress
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Market Insights */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Today's Key Insights</h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Market Trends</CardTitle>
                <CardDescription className="text-slate-400">
                  Latest developments in nuclear isotope economics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-white font-medium">Mo-99 Supply Stabilization</p>
                    <p className="text-xs text-slate-400">New production facilities coming online reducing supply risk by 23%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-white font-medium">Therapeutic Isotope Growth</p>
                    <p className="text-xs text-slate-400">Lu-177 market expanding 18% annually with new cancer treatment applications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-white font-medium">Cost Optimization</p>
                    <p className="text-xs text-slate-400">Advanced automation reducing production costs by 15-20%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Economic Indicators</CardTitle>
                <CardDescription className="text-slate-400">
                  Key performance metrics for the industry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Market Volatility Index</span>
                  <span className="text-sm font-medium text-green-400">Low (2.3)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Supply Chain Stability</span>
                  <span className="text-sm font-medium text-blue-400">High (8.7/10)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Investment Activity</span>
                  <span className="text-sm font-medium text-yellow-400">Active ($2.1B)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Regulatory Environment</span>
                  <span className="text-sm font-medium text-green-400">Stable</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
