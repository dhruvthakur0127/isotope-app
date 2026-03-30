import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Clock, Zap, Atom } from "lucide-react";

interface ProductionMethod {
  id: string;
  name: string;
  type: "reactor" | "accelerator";
  description: string;
  capitalCost: number; // Million USD
  operatingCostPerYear: number; // Million USD/year
  capacityMBq: number; // MBq/year
  isotopes: string[];
  advantages: string[];
  disadvantages: string[];
}

const productionMethods: ProductionMethod[] = [
  {
    id: "research-reactor",
    name: "Research Reactor",
    type: "reactor",
    description: "Multi-purpose research reactor with neutron flux optimization for isotope production",
    capitalCost: 150,
    operatingCostPerYear: 25,
    capacityMBq: 500000,
    isotopes: ["Mo-99", "Lu-177", "I-131", "Sm-153"],
    advantages: [
      "Multiple isotope production simultaneously",
      "High neutron flux efficiency",
      "Established technology",
      "Lower operating costs per unit"
    ],
    disadvantages: [
      "High initial capital investment",
      "Complex regulatory requirements",
      "Long construction timeline",
      "Geographic limitations"
    ]
  },
  {
    id: "production-reactor",
    name: "Dedicated Production Reactor",
    type: "reactor",
    description: "Purpose-built reactor optimized specifically for isotope production",
    capitalCost: 300,
    operatingCostPerYear: 40,
    capacityMBq: 1200000,
    isotopes: ["Mo-99", "Lu-177", "I-131", "Sm-153", "Y-90"],
    advantages: [
      "Optimized for isotope production",
      "Very high capacity",
      "Multiple isotope capabilities",
      "Consistent supply reliability"
    ],
    disadvantages: [
      "Very high capital costs",
      "Single-purpose facility",
      "Long payback period",
      "Extensive regulatory oversight"
    ]
  },
  {
    id: "cyclotron",
    name: "Medical Cyclotron",
    type: "accelerator",
    description: "Compact cyclotron accelerator for regional isotope production",
    capitalCost: 15,
    operatingCostPerYear: 8,
    capacityMBq: 50000,
    isotopes: ["F-18", "C-11", "N-13", "Ga-68"],
    advantages: [
      "Lower capital investment",
      "Faster deployment",
      "Regional production capability",
      "Flexible operation"
    ],
    disadvantages: [
      "Limited isotope variety",
      "Higher per-unit costs",
      "Lower capacity",
      "Requires skilled operators"
    ]
  },
  {
    id: "linac",
    name: "Linear Accelerator",
    type: "accelerator",
    description: "High-energy linear accelerator for specialized isotope production",
    capitalCost: 80,
    operatingCostPerYear: 18,
    capacityMBq: 150000,
    isotopes: ["Mo-99", "F-18", "Tc-99m", "I-123"],
    advantages: [
      "No nuclear waste production",
      "Precise energy control",
      "On-demand production",
      "Reduced regulatory complexity"
    ],
    disadvantages: [
      "High energy consumption",
      "Complex maintenance",
      "Limited isotope selection",
      "Higher operating costs"
    ]
  }
];

export default function Comparison() {
  const [selectedMethods, setSelectedMethods] = useState<string[]>(["research-reactor", "cyclotron"]);
  const [demandLevel, setDemandLevel] = useState([100000]); // MBq/year
  const [timeHorizon, setTimeHorizon] = useState([10]); // years
  
  const calculateEconomics = (method: ProductionMethod) => {
    const demand = demandLevel[0];
    const years = timeHorizon[0];
    
    // Calculate capacity utilization
    const utilization = Math.min(demand / method.capacityMBq, 1);
    
    // Calculate costs
    const totalCapitalCost = method.capitalCost;
    const totalOperatingCost = method.operatingCostPerYear * years * utilization;
    const totalCost = totalCapitalCost + totalOperatingCost;
    
    // Calculate per-unit costs
    const costPerMBq = totalCost / (demand * years);
    const paybackPeriod = method.capitalCost / (method.operatingCostPerYear * utilization);
    
    return {
      utilization: utilization * 100,
      totalCost,
      costPerMBq,
      paybackPeriod,
      totalCapitalCost,
      totalOperatingCost
    };
  };

  const selectedMethodObjects = productionMethods.filter(m => selectedMethods.includes(m.id));

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
            <Calculator className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">Economic Comparison Tool</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Comparison Configuration
            </CardTitle>
            <CardDescription>
              Select production methods and parameters to compare economic viability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productionMethods.map(method => (
                <div key={method.id} className="relative">
                  <input
                    type="checkbox"
                    id={method.id}
                    checked={selectedMethods.includes(method.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMethods([...selectedMethods, method.id]);
                      } else {
                        setSelectedMethods(selectedMethods.filter(id => id !== method.id));
                      }
                    }}
                    className="sr-only"
                  />
                  <label
                    htmlFor={method.id}
                    className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMethods.includes(method.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={method.type === "reactor" ? "default" : "secondary"}>
                        {method.type}
                      </Badge>
                    </div>
                    <div className="font-medium text-sm">{method.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{method.description}</div>
                  </label>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Annual Demand: {demandLevel[0].toLocaleString()} MBq/year
                </label>
                <Slider
                  value={demandLevel}
                  onValueChange={setDemandLevel}
                  max={1000000}
                  min={10000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>10K MBq</span>
                  <span>1M MBq</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Time Horizon: {timeHorizon[0]} years
                </label>
                <Slider
                  value={timeHorizon}
                  onValueChange={setTimeHorizon}
                  max={25}
                  min={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5 years</span>
                  <span>25 years</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {selectedMethodObjects.length > 0 && (
          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Economic Summary</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="charts">Visual Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6">
              <div className="grid gap-6">
                {selectedMethodObjects.map(method => {
                  const economics = calculateEconomics(method);
                  return (
                    <Card key={method.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Atom className="h-5 w-5" />
                            {method.name}
                          </CardTitle>
                          <Badge variant={method.type === "reactor" ? "default" : "secondary"}>
                            {method.type}
                          </Badge>
                        </div>
                        <CardDescription>{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              ${economics.totalCost.toFixed(1)}M
                            </div>
                            <div className="text-sm text-gray-600">Total Cost</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              ${economics.costPerMBq.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">Cost per MBq</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {economics.utilization.toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600">Capacity Utilization</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">
                              {economics.paybackPeriod.toFixed(1)}y
                            </div>
                            <div className="text-sm text-gray-600">Payback Period</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-6">
              {selectedMethodObjects.map(method => {
                const economics = calculateEconomics(method);
                return (
                  <Card key={method.id}>
                    <CardHeader>
                      <CardTitle>{method.name} - Detailed Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Cost Breakdown
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Capital Cost:</span>
                              <span className="font-medium">${method.capitalCost}M</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Operating Cost ({timeHorizon[0]}y):</span>
                              <span className="font-medium">${economics.totalOperatingCost.toFixed(1)}M</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="font-semibold">Total Cost:</span>
                              <span className="font-semibold">${economics.totalCost.toFixed(1)}M</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Production Metrics
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Annual Capacity:</span>
                              <span className="font-medium">{method.capacityMBq.toLocaleString()} MBq</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Utilization Rate:</span>
                              <span className="font-medium">{economics.utilization.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cost Efficiency:</span>
                              <span className="font-medium">${economics.costPerMBq.toFixed(2)}/MBq</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-green-600">Advantages</h4>
                          <ul className="space-y-1 text-sm">
                            {method.advantages.map((advantage, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-red-600">Disadvantages</h4>
                          <ul className="space-y-1 text-sm">
                            {method.disadvantages.map((disadvantage, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{disadvantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Supported Isotopes</h4>
                        <div className="flex flex-wrap gap-2">
                          {method.isotopes.map(isotope => (
                            <Badge key={isotope} variant="outline">
                              {isotope}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Comparison Overview</CardTitle>
                  <CardDescription>
                    Visual comparison of key economic indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Cost Comparison Bar Chart */}
                    <div>
                      <h4 className="font-semibold mb-4">Total Cost Comparison</h4>
                      <div className="space-y-3">
                        {selectedMethodObjects.map(method => {
                          const economics = calculateEconomics(method);
                          const maxCost = Math.max(...selectedMethodObjects.map(m => calculateEconomics(m).totalCost));
                          const percentage = (economics.totalCost / maxCost) * 100;
                          
                          return (
                            <div key={method.id} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{method.name}</span>
                                <span className="text-sm text-gray-600">${economics.totalCost.toFixed(1)}M</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Cost per MBq Comparison */}
                    <div>
                      <h4 className="font-semibold mb-4">Cost Efficiency ($/MBq)</h4>
                      <div className="space-y-3">
                        {selectedMethodObjects.map(method => {
                          const economics = calculateEconomics(method);
                          const maxCostPerMBq = Math.max(...selectedMethodObjects.map(m => calculateEconomics(m).costPerMBq));
                          const percentage = (economics.costPerMBq / maxCostPerMBq) * 100;
                          
                          return (
                            <div key={method.id} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{method.name}</span>
                                <span className="text-sm text-gray-600">${economics.costPerMBq.toFixed(2)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link to="/results">
            <Button>
              View Detailed Results
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/quiz">
            <Button variant="outline">
              Take Knowledge Quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
