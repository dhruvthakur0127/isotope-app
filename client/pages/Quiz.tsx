import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, QuizSubmission } from "@shared/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Atom } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the primary economic advantage of reactor-based isotope production compared to accelerator-based production?",
    options: [
      "Lower capital investment required",
      "Higher isotope purity achieved",
      "Ability to produce multiple isotopes simultaneously",
      "Faster production cycles"
    ],
    correct: 2,
    explanation: "Reactor-based production can produce multiple isotopes simultaneously using neutron capture, making it more economically efficient for certain applications.",
    category: "Production Methods"
  },
  {
    id: 2,
    question: "Which factor has the greatest impact on the lifecycle cost of isotope production facilities?",
    options: [
      "Initial construction costs",
      "Operating and maintenance costs",
      "Decommissioning costs",
      "Regulatory compliance costs"
    ],
    correct: 1,
    explanation: "Operating and maintenance costs typically represent 60-70% of total lifecycle costs for isotope production facilities due to their long operational periods.",
    category: "Cost Analysis"
  },
  {
    id: 3,
    question: "What economic principle best explains the market dynamics for medical isotopes?",
    options: [
      "Perfect competition with many suppliers",
      "Monopolistic competition with product differentiation",
      "Oligopoly with few major suppliers",
      "Pure monopoly with single supplier"
    ],
    correct: 2,
    explanation: "The medical isotope market is characterized by oligopoly due to high barriers to entry, specialized facilities, and few major global suppliers.",
    category: "Market Factors"
  },
  {
    id: 4,
    question: "Which cost component typically represents the largest portion of isotope production expenses?",
    options: [
      "Raw material costs",
      "Labor and personnel costs",
      "Energy and utilities",
      "Equipment depreciation"
    ],
    correct: 1,
    explanation: "Labor and personnel costs, including specialized technicians and safety personnel, typically account for 40-50% of production expenses.",
    category: "Cost Analysis"
  },
  {
    id: 5,
    question: "What is the most significant economic challenge facing the isotope production industry?",
    options: [
      "Fluctuating raw material prices",
      "Short half-life requiring rapid distribution",
      "Competition from alternative technologies",
      "Regulatory uncertainty"
    ],
    correct: 1,
    explanation: "Short half-lives of many isotopes require expensive rapid distribution networks and can lead to significant waste if not delivered quickly.",
    category: "Market Factors"
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isSavingResults, setIsSavingResults] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("nucleonomic_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: parseInt(value)
    });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      await completeQuiz();
    }
  };

  const completeQuiz = async () => {
    setQuizCompleted(true);

    if (user) {
      setIsSavingResults(true);
      try {
        const score = getScore();
        const timeSpent = Math.floor((Date.now() - startTime) / 1000); // in seconds

        // Calculate category scores
        const categoryScores: { [category: string]: { correct: number; total: number } } = {};
        questions.forEach((question, index) => {
          if (!categoryScores[question.category]) {
            categoryScores[question.category] = { correct: 0, total: 0 };
          }
          categoryScores[question.category].total++;
          if (selectedAnswers[index] === question.correct) {
            categoryScores[question.category].correct++;
          }
        });

        const quizSubmission: QuizSubmission = {
          quizId: "nuclear-economics-basic",
          score: score.correct,
          totalQuestions: score.total,
          timeSpent,
          categoryScores
        };

        const response = await fetch(`/api/users/${user.id}/quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizSubmission),
        });

        if (response.ok) {
          console.log('Quiz results saved successfully');
        }
      } catch (error) {
        console.error('Error saving quiz results:', error);
      } finally {
        setIsSavingResults(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResult(false);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const isAnswerSelected = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === questions[currentQuestion].correct;

  if (quizCompleted) {
    const score = getScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>
                You've completed the Nuclear Economics Quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">
                  {score.correct}/{score.total}
                </div>
                <div className="text-xl text-gray-600">
                  {score.percentage}% Correct
                </div>
                <Progress value={score.percentage} className="w-full" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Performance by Category:</h3>
                {["Production Methods", "Cost Analysis", "Market Factors"].map(category => {
                  const categoryQuestions = questions.filter(q => q.category === category);
                  const categoryCorrect = categoryQuestions.filter((q, index) => 
                    selectedAnswers[questions.indexOf(q)] === q.correct
                  ).length;
                  const categoryPercentage = Math.round((categoryCorrect / categoryQuestions.length) * 100);
                  
                  return (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category}</span>
                      <Badge variant={categoryPercentage >= 70 ? "default" : "secondary"}>
                        {categoryCorrect}/{categoryQuestions.length} ({categoryPercentage}%)
                      </Badge>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex gap-4 justify-center">
                  <Link to="/comparison">
                    <Button>
                      Try Economic Comparison
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/learn">
                    <Button variant="outline">
                      Review Content
                    </Button>
                  </Link>
                </div>
                <Link to="/" className="block">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-8 px-4">
      {/* Header */}
      <div className="container mx-auto max-w-4xl mb-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Atom className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-white">Nucleonomic Assessment</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Badge variant="outline">{question.category}</Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`}
                    disabled={showResult}
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className={`flex-1 cursor-pointer p-3 rounded-lg border transition-colors ${
                      showResult 
                        ? index === question.correct
                          ? "bg-green-50 border-green-200 text-green-800"
                          : selectedAnswers[currentQuestion] === index
                            ? "bg-red-50 border-red-200 text-red-800"
                            : "bg-gray-50 border-gray-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{option}</span>
                      {showResult && index === question.correct && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {showResult && selectedAnswers[currentQuestion] === index && index !== question.correct && (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showResult && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-1 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium mb-2">
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </div>
                      <p className="text-sm text-gray-700">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={!isAnswerSelected}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
