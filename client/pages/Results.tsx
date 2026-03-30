import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Award, BookOpen, Calculator, Target, Download, Share } from "lucide-react";

interface UserProgress {
  quizScore: number;
  quizQuestions: number;
  learningProgress: number;
  comparisonsCompleted: number;
  timeSpent: number; // minutes
}

// Mock data - in a real app this would come from a backend
const mockProgress: UserProgress = {
  quizScore: 4,
  quizQuestions: 5,
  learningProgress: 75,
  comparisonsCompleted: 3,
  timeSpent: 45
};

const keyInsights = [
  {
    title: "Reactor vs Accelerator Economics",
    insight: "Reactor-based production shows 40-60% lower per-unit costs for high-volume isotope production, but requires 5-10x higher initial capital investment.",
    recommendation: "Choose reactor-based for established markets with consistent demand; accelerator-based for emerging markets or specialized isotopes.",
    confidence: "high"
  },
  {
    title: "Scale Economics Matter",
    insight: "Facility utilization above 70% significantly improves economic viability. Below 50% utilization, most projects become economically challenging.",
    recommendation: "Ensure market demand analysis supports minimum 70% capacity utilization before investment.",
    confidence: "high"
  },
  {
    title: "Operating Costs Dominate",
    insight: "Over a 20-year lifecycle, operating costs typically represent 60-70% of total project costs, with personnel costs being the largest component.",
    recommendation: "Focus on operational efficiency improvements and automation to reduce long-term costs.",
    confidence: "medium"
  },
  {
    title: "Geographic Proximity Value",
    insight: "For short half-life isotopes (F-18, C-11), transportation costs and logistics complexity can add 50-100% to final delivered cost.",
    recommendation: "Consider distributed regional production networks for short-lived isotopes rather than centralized facilities.",
    confidence: "high"
  }
];

const economicPrinciples = [
  {
    principle: "Economies of Scale",
    description: "Larger facilities achieve lower per-unit costs through fixed cost spreading and operational efficiencies.",
    application: "Centralized reactor facilities for stable isotopes like Mo-99 and Lu-177.",
    importance: "critical"
  },
  {
    principle: "Network Effects",
    description: "Multiple production sites create redundancy and reduce supply risk, increasing overall system value.",
    application: "Geographic distribution of cyclotron facilities for PET isotopes.",
    importance: "high"
  },
  {
    principle: "Learning Curve Benefits",
    description: "Operational costs decrease over time as experience and process optimization improve efficiency.",
    application: "Early facilities provide knowledge for subsequent installations.",
    importance: "medium"
  },
  {
    principle: "Option Value",
    description: "Flexible facilities that can produce multiple isotopes provide insurance against market changes.",
    application: "Multi-purpose research reactors vs. dedicated production facilities.",
    importance: "high"
  }
];

export default function Results() {
  const [progress, setProgress] = useState<UserProgress>(mockProgress);
  const [selectedInsight, setSelectedInsight] = useState(0);

  const getOverallScore = () => {
    const quizScore = (progress.quizScore / progress.quizQuestions) * 100;
    const learningScore = progress.learningProgress;
    const engagementScore = Math.min(progress.comparisonsCompleted * 20, 100);
    
    return Math.round((quizScore + learningScore + engagementScore) / 3);
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Expert", color: "text-green-600", bgColor: "bg-green-100" };
    if (score >= 75) return { level: "Advanced", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (score >= 60) return { level: "Intermediate", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Beginner", color: "text-gray-600", bgColor: "bg-gray-100" };
  };

  const overallScore = getOverallScore();
  const performance = getPerformanceLevel(overallScore);

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
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">Results & Conclusions</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Your Learning Performance
            </CardTitle>
            <CardDescription>
              Overall assessment of your understanding of nuclear isotope economics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${performance.color}`}>
                  {overallScore}%
                </div>
                <div className="text-sm text-gray-600 mb-2">Overall Score</div>
                <Badge className={`${performance.bgColor} ${performance.color} border-none`}>
                  {performance.level}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {progress.quizScore}/{progress.quizQuestions}
                </div>
                <div className="text-sm text-gray-600">Quiz Performance</div>
                <Progress value={(progress.quizScore / progress.quizQuestions) * 100} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {progress.learningProgress}%
                </div>
                <div className="text-sm text-gray-600">Content Completed</div>
                <Progress value={progress.learningProgress} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {progress.comparisonsCompleted}
                </div>
                <div className="text-sm text-gray-600">Comparisons Done</div>
                <div className="text-xs text-gray-500 mt-1">{progress.timeSpent} min spent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="principles">Economic Principles</TabsTrigger>
            <TabsTrigger value="conclusions">Final Conclusions</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Economic Insights from Your Analysis</CardTitle>
                <CardDescription>
                  Key findings about nuclear isotope production economics based on interactive analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {keyInsights.map((insight, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedInsight(index)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedInsight === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{insight.title}</span>
                          <Badge 
                            variant={insight.confidence === "high" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {insight.confidence} confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {insight.insight}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">{keyInsights[selectedInsight].title}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Finding:</h4>
                        <p className="text-sm text-gray-900">
                          {keyInsights[selectedInsight].insight}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendation:</h4>
                        <p className="text-sm text-gray-900">
                          {keyInsights[selectedInsight].recommendation}
                        </p>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <Badge 
                          variant={keyInsights[selectedInsight].confidence === "high" ? "default" : "secondary"}
                        >
                          {keyInsights[selectedInsight].confidence} confidence level
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="principles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Economic Principles in Nuclear Technology</CardTitle>
                <CardDescription>
                  Fundamental economic concepts applied to isotope production
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {economicPrinciples.map((principle, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-lg">{principle.principle}</h3>
                          <Badge 
                            variant={principle.importance === "critical" ? "destructive" : 
                                    principle.importance === "high" ? "default" : "secondary"}
                          >
                            {principle.importance}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                          {principle.description}
                        </p>
                        
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Practical Application:</h4>
                          <p className="text-blue-800 text-sm">
                            {principle.application}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conclusions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Strategic Conclusions</CardTitle>
                <CardDescription>
                  Summary of key economic advantages and strategic recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-green-700">
                      Advantages of Nuclear Isotope Production
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <div>
                          <span className="font-medium">High-Value Products:</span> Medical isotopes command premium pricing due to life-saving applications
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <div>
                          <span className="font-medium">Growing Market:</span> Aging population drives increasing demand for diagnostic and therapeutic isotopes
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <div>
                          <span className="font-medium">Technology Leadership:</span> Advanced nuclear facilities position nations as technology leaders
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <div>
                          <span className="font-medium">Strategic Independence:</span> Domestic production reduces reliance on imports for critical medical supplies
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-blue-700">
                      Strategic Recommendations
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">1.</span>
                        <div>
                          <span className="font-medium">Market-Driven Approach:</span> Align production capacity with demonstrated market demand
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">2.</span>
                        <div>
                          <span className="font-medium">Public-Private Partnerships:</span> Leverage government research infrastructure with private efficiency
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">3.</span>
                        <div>
                          <span className="font-medium">Regional Cooperation:</span> Share costs and risks through international collaboration
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">4.</span>
                        <div>
                          <span className="font-medium">Technology Innovation:</span> Invest in next-generation production methods for competitive advantage
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-lg mb-3 text-blue-900">
                    Key Economic Conclusion
                  </h3>
                  <p className="text-blue-800 leading-relaxed">
                    Nuclear isotope production facilities, while requiring significant initial investment, 
                    offer compelling long-term economics when properly sized for market demand. The combination 
                    of growing medical applications, premium pricing, and technological advantages creates 
                    opportunities for sustainable economic returns while providing critical healthcare infrastructure. 
                    Success depends on careful market analysis, appropriate technology selection, and strategic 
                    partnerships to manage risks and optimize utilization.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <Link to="/comparison">
            <Button variant="outline">
              <Calculator className="mr-2 h-4 w-4" />
              Run New Analysis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
