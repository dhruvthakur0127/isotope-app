import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, DollarSign, BarChart3, Atom } from "lucide-react";

export default function GameTrading() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication
    const authState = localStorage.getItem("nucleonomic_auth");
    const userData = localStorage.getItem("nucleonomic_user");
    
    if (!authState || !userData) {
      navigate("/");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/welcome" className="flex items-center gap-2 text-gray-300 hover:text-cyan-400">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              <span className="font-semibold text-white">Isotope Trading Simulator</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Game Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Isotope Trading Simulator</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate the complex world of nuclear isotope trading. Predict market trends, 
            manage supply chains, and maximize your trading portfolio.
          </p>
        </div>

        {/* Game Interface Placeholder */}
        <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-500/30 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trading Interface
            </CardTitle>
            <CardDescription className="text-gray-300">
              Game code will be integrated here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Placeholder for game content */}
            <div className="bg-black/30 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-4">Market Loading...</h3>
              <p className="text-gray-400 mb-6">
                Your isotope trading simulator will appear here once the game code is integrated.
              </p>
              
              {/* Trading Stats Preview */}
              <div className="grid md:grid-cols-4 gap-4 mt-8">
                <div className="bg-cyan-900/30 rounded-lg p-4">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">$0</div>
                  <div className="text-sm text-gray-400">Portfolio Value</div>
                </div>
                <div className="bg-cyan-900/30 rounded-lg p-4">
                  <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0%</div>
                  <div className="text-sm text-gray-400">Daily P&L</div>
                </div>
                <div className="bg-cyan-900/30 rounded-lg p-4">
                  <BarChart3 className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-sm text-gray-400">Trades</div>
                </div>
                <div className="bg-cyan-900/30 rounded-lg p-4">
                  <Atom className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-sm text-gray-400">Isotopes</div>
                </div>
              </div>

              {/* Mock Market Data */}
              <div className="mt-8 bg-cyan-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Live Market Prices</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mo-99:</span>
                    <span className="text-green-400">$2,450/Ci ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tc-99m:</span>
                    <span className="text-red-400">$1,890/Ci ↘</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">F-18:</span>
                    <span className="text-green-400">$3,200/Ci ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lu-177:</span>
                    <span className="text-green-400">$8,750/Ci ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">I-131:</span>
                    <span className="text-yellow-400">$1,200/Ci →</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Y-90:</span>
                    <span className="text-green-400">$4,100/Ci ↗</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Instructions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Trading Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">📊 Market Analysis</h4>
                  <p className="text-gray-300 text-sm">
                    Study market trends, supply disruptions, and demand patterns to make informed trading decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">⚡ Real-time Trading</h4>
                  <p className="text-gray-300 text-sm">
                    Execute buy and sell orders based on live market data and breaking industry news.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">🔄 Portfolio Management</h4>
                  <p className="text-gray-300 text-sm">
                    Diversify your isotope portfolio across medical, industrial, and research applications.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">🎯 Risk Management</h4>
                  <p className="text-gray-300 text-sm">
                    Implement stop-loss orders and hedging strategies to protect your investments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
