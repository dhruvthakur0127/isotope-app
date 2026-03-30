import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Atom, Calculator, TrendingUp, Lightbulb, Users, Globe } from "lucide-react";

const learningModules = [
  {
    id: "fundamentals",
    title: "Nuclear Technology Fundamentals",
    icon: Atom,
    description: "Understanding the basic principles of nuclear isotope production",
    sections: [
      {
        title: "What are Nuclear Isotopes?",
        content: `Nuclear isotopes are variants of chemical elements that have the same number of protons but different numbers of neutrons. In medical and industrial applications, specific isotopes are valuable for their unique properties:

• **Medical Isotopes**: Used for diagnosis (imaging) and therapy (treatment)
• **Industrial Isotopes**: Used for sterilization, material testing, and research
• **Research Isotopes**: Used for scientific studies and drug development

The economic value of isotopes comes from their specialized applications and the complex infrastructure required for their production.`
      },
      {
        title: "Production Methods Overview",
        content: `There are two primary methods for producing nuclear isotopes:

**Reactor-Based Production:**
• Uses nuclear reactors with neutron bombardment
• Suitable for neutron-rich isotopes
• Can produce multiple isotopes simultaneously
• Requires uranium fuel and complex reactor systems

**Accelerator-Based Production:**
• Uses particle accelerators to bombard target materials
• Suitable for proton-rich isotopes
• More targeted, single-isotope production
• No nuclear fuel required, but high energy consumption`
      },
      {
        title: "Key Economic Drivers",
        content: `Several factors drive the economics of isotope production:

• **Demand**: Growing medical applications drive market growth
• **Supply Chain**: Short half-lives require rapid, expensive distribution
• **Infrastructure**: High capital costs for production facilities
• **Regulatory**: Extensive licensing and safety requirements
• **Competition**: Limited number of global suppliers
• **Technology**: Ongoing improvements in production efficiency`
      }
    ]
  },
  {
    id: "economics",
    title: "Economic Analysis Framework",
    icon: Calculator,
    description: "Understanding cost structures and economic evaluation methods",
    sections: [
      {
        title: "Cost Structure Analysis",
        content: `Understanding the cost components is crucial for economic evaluation:

**Capital Costs (CAPEX):**
• Facility construction and equipment: 60-70% of total CAPEX
• Licensing and regulatory compliance: 15-20%
• Contingency and project management: 10-15%

**Operating Costs (OPEX):**
• Personnel (skilled technicians, safety staff): 40-50%
• Raw materials and consumables: 20-25%
• Energy and utilities: 15-20%
• Maintenance and spare parts: 10-15%
• Waste management and disposal: 5-10%`
      },
      {
        title: "Economic Evaluation Metrics",
        content: `Key metrics for evaluating isotope production economics:

**Net Present Value (NPV):**
• Accounts for time value of money
• Considers entire project lifecycle
• Critical for investment decisions

**Internal Rate of Return (IRR):**
• Measures project profitability
• Compares different investment options
• Typically requires >15% for nuclear projects

**Payback Period:**
• Time to recover initial investment
• Simple but important metric
• Shorter periods reduce risk

**Levelized Cost of Production:**
• Total lifecycle cost per unit produced
• Enables comparison between technologies
• Includes all capital and operating costs`
      },
      {
        title: "Market Dynamics",
        content: `The isotope market has unique characteristics:

**Supply Side:**
• High barriers to entry (capital, regulation)
• Few major global suppliers
• Long lead times for new facilities
• Technology constraints

**Demand Side:**
• Inelastic demand (medical necessity)
• Growing market (aging population)
• Quality requirements (purity, timing)
• Geographic distribution needs

**Market Structure:**
• Oligopoly with price leadership
• Government involvement (research reactors)
• International trade considerations
• Strategic reserve requirements`
      }
    ]
  },
  {
    id: "case-studies",
    title: "Real-World Case Studies",
    icon: TrendingUp,
    description: "Examining successful isotope production projects and their economics",
    sections: [
      {
        title: "Mo-99 Production Economics",
        content: `Molybdenum-99 is the most widely used medical isotope globally:

**Market Context:**
• Global demand: ~15,000 6-day Ci/week
• Medical use: 40+ million procedures annually
• Supply concentration: 5 reactors supply 95% globally

**Economic Characteristics:**
• High value: $2,000-4,000 per Ci
• Short half-life: 66 hours (rapid decay)
• Complex processing required
• Expensive transportation

**Case Study: ANSTO Mo-99 Facility (Australia)**
• Investment: $168M AUD
• Capacity: 25% of global supply
• Technology: Research reactor-based
• Economic outcome: Profitable within 5 years
• Key success factors: Government support, established reactor`
      },
      {
        title: "F-18 PET Isotope Production",
        content: `Fluorine-18 for PET imaging represents regional production economics:

**Market Context:**
• Half-life: 110 minutes (very short)
• Use: PET/CT imaging procedures
• Distribution: Regional production required

**Economic Model:**
• Cyclotron-based production: $3-5M investment
• Operating costs: $1-2M annually
• Service radius: 2-4 hour drive time
• Revenue model: Per-dose pricing

**Success Factors:**
• Geographic proximity to hospitals
• Reliable daily production schedules
• Quality assurance systems
• Rapid distribution logistics
• Partnership with medical centers`
      },
      {
        title: "Lu-177 Therapy Isotope Economics",
        content: `Lutetium-177 represents the growing therapeutic isotope market:

**Market Growth:**
• Emerging therapy market
• High-value applications ($10,000+ per treatment)
• Limited global supply capacity

**Production Economics:**
• Reactor-based production preferred
• High specific activity required
• Complex chemical processing
• Specialized handling requirements

**Investment Considerations:**
• Long development timelines (5-7 years)
• High regulatory barriers
• Specialized expertise required
• Potential for high returns
• Growing market demand`
      }
    ]
  },
  {
    id: "future",
    title: "Future Trends & Opportunities",
    icon: Lightbulb,
    description: "Emerging technologies and market opportunities in isotope production",
    sections: [
      {
        title: "Technology Innovations",
        content: `Emerging technologies are changing isotope production economics:

**Advanced Reactor Designs:**
• Small Modular Reactors (SMRs) for isotope production
• Lower capital costs and faster deployment
• Improved safety systems
• Flexible operation modes

**Alternative Production Methods:**
• Electron accelerators for Mo-99 production
• Generator systems for on-demand production
• Hybrid reactor-accelerator systems
• Improved target design and processing

**Automation and AI:**
• Automated production processes
• Predictive maintenance systems
• Quality control automation
• Supply chain optimization`
      },
      {
        title: "Market Opportunities",
        content: `Several trends are creating new market opportunities:

**Therapeutic Applications:**
• Targeted radiotherapy growth
• Personalized medicine expansion
• New isotope discovery
• Combination therapies

**Geographic Expansion:**
• Emerging market demand growth
• Regional production development
• Technology transfer opportunities
• South-South cooperation

**Supply Chain Innovation:**
• Distributed production networks
• Advanced logistics systems
• Real-time tracking and monitoring
• Inventory optimization`
      },
      {
        title: "Economic Implications",
        content: `Future trends will impact isotope production economics:

**Cost Reductions:**
• Technology improvements reducing CAPEX
• Automation reducing OPEX
• Improved yields increasing efficiency
• Standardization reducing complexity

**New Business Models:**
• Service-based pricing models
• Public-private partnerships
• International cooperation frameworks
• Risk-sharing mechanisms

**Investment Considerations:**
• Earlier stage technology risks
• Regulatory pathway uncertainties
• Market adoption timelines
• Competitive positioning strategies`
      }
    ]
  }
];

export default function Learn() {
  const [activeModule, setActiveModule] = useState("fundamentals");
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});

  const markSectionComplete = (moduleId: string, sectionIndex: number) => {
    const key = `${moduleId}-${sectionIndex}`;
    setProgress(prev => ({ ...prev, [key]: true }));
  };

  const getSectionProgress = (moduleId: string, sectionIndex: number) => {
    const key = `${moduleId}-${sectionIndex}`;
    return progress[key] || false;
  };

  const getModuleProgress = (moduleId: string) => {
    const module = learningModules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completedSections = module.sections.filter((_, index) => 
      getSectionProgress(moduleId, index)
    ).length;
    
    return Math.round((completedSections / module.sections.length) * 100);
  };

  const currentModule = learningModules.find(m => m.id === activeModule)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Header */}
      <div className="container mx-auto max-w-6xl mb-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">Educational Content</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Module Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Learning Modules</CardTitle>
                <CardDescription>
                  Complete all sections to master nuclear economics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningModules.map(module => {
                  const Icon = module.icon;
                  const progress = getModuleProgress(module.id);
                  
                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        activeModule === module.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-1 ${
                          activeModule === module.id ? "text-blue-600" : "text-gray-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{module.title}</div>
                          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {module.description}
                          </div>
                          {progress > 0 && (
                            <div className="mt-2">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-blue-600 h-1 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500">{progress}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <currentModule.icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle>{currentModule.title}</CardTitle>
                      <CardDescription>{currentModule.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {getModuleProgress(activeModule)}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {currentModule.sections.map((section, index) => {
                    const isComplete = getSectionProgress(activeModule, index);
                    
                    return (
                      <AccordionItem key={index} value={`section-${index}`} className="border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3 w-full">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              isComplete 
                                ? "border-green-500 bg-green-500 text-white" 
                                : "border-gray-300"
                            }`}>
                              {isComplete ? "✓" : index + 1}
                            </div>
                            <span className="text-left font-medium">{section.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="prose prose-sm max-w-none">
                            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                              {section.content}
                            </div>
                          </div>
                          <div className="mt-6 pt-4 border-t">
                            <Button
                              onClick={() => markSectionComplete(activeModule, index)}
                              disabled={isComplete}
                              variant={isComplete ? "outline" : "default"}
                              size="sm"
                            >
                              {isComplete ? "Completed" : "Mark as Complete"}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
              <Link to="/quiz">
                <Button>
                  Test Your Knowledge
                  <Atom className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/comparison">
                <Button variant="outline">
                  Economic Comparison Tool
                  <Calculator className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
