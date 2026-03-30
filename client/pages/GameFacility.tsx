import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Factory, DollarSign, TrendingUp, Users } from "lucide-react";

export default function GameFacility() {
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/welcome" className="flex items-center gap-2 text-gray-300 hover:text-purple-400">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <Factory className="h-6 w-6 text-purple-400" />
              <span className="font-semibold text-white">Nuclear Facility Manager</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Game Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Factory className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Nuclear Facility Manager</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build, manage, and optimize your nuclear isotope production facility. 
            Make strategic decisions that impact global health and economics.
          </p>
        </div>

        {/* Game Interface Placeholder */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/30 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Game Interface
            </CardTitle>
            <CardDescription className="text-gray-300">
              Game code will be integrated here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Placeholder for game content */}
            <div className="bg-black/30 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🏭</div>
              <h3 className="text-xl font-bold text-white mb-4">Game Loading...</h3>
              <p className="text-gray-400 mb-6">
                Your nuclear facility management game will appear here once the game code is integrated.
              </p>
              
              {/* Game Stats Preview */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-purple-900/30 rounded-lg p-4">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">$0</div>
                  <div className="text-sm text-gray-400">Revenue</div>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4">
                  <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-sm text-gray-400">Efficiency</div>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-sm text-gray-400">Employees</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Instructions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">🏗️ Build Your Facility</h4>
                  <p className="text-gray-300 text-sm">
                    Start with basic infrastructure and gradually expand your nuclear isotope production capabilities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">💰 Manage Economics</h4>
                  <p className="text-gray-300 text-sm">
                    Balance production costs, market demand, and regulatory requirements to maximize profitability.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">🔬 Research & Development</h4>
                  <p className="text-gray-300 text-sm">
                    Invest in new technologies to improve efficiency and unlock advanced isotope production methods.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">🌍 Global Impact</h4>
                  <p className="text-gray-300 text-sm">
                    Your decisions affect global healthcare and energy markets. Compete with other players worldwide.
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
