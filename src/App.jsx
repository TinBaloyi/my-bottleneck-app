import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  Database, 
  Play, 
  Settings, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Upload, 
  Download,
  Eye,
  Activity,
  Zap,
  Clock,
  Target,
  Lock,
  User,
  LogOut,
  Shield
} from 'lucide-react';

const BottleneckDetectionSystem = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  // Mock user database (in real app, this would be handled by backend)
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'admin@company.com', password: 'admin123', role: 'Administrator' },
    { id: 2, name: 'Sarah Smith', email: 'manager@company.com', password: 'manager123', role: 'Manager' },
    { id: 3, name: 'Mike Johnson', email: 'analyst@company.com', password: 'analyst123', role: 'Analyst' }
  ];

  // Sample data for demonstrations
  const bottleneckData = [
    { station: 'Assembly Line A', severity: 85, impact: 'High', type: 'Resource Constraint' },
    { station: 'Quality Control', severity: 45, impact: 'Medium', type: 'Process Delay' },
    { station: 'Packaging', severity: 92, impact: 'Critical', type: 'Equipment Issue' },
    { station: 'Shipping Dock', severity: 38, impact: 'Low', type: 'Scheduling' }
  ];

  const performanceData = [
    { time: '08:00', throughput: 120, efficiency: 85 },
    { time: '10:00', throughput: 95, efficiency: 70 },
    { time: '12:00', throughput: 110, efficiency: 80 },
    { time: '14:00', throughput: 85, efficiency: 65 },
    { time: '16:00', throughput: 115, efficiency: 82 }
  ];

  const predictionData = [
    { name: 'Week 1', predicted: 3, actual: 2 },
    { name: 'Week 2', predicted: 5, actual: 4 },
    { name: 'Week 3', predicted: 2, actual: 3 },
    { name: 'Week 4', predicted: 6, actual: null }
  ];

  const pieData = [
    { name: 'Equipment Issues', value: 35, color: '#ff6b6b' },
    { name: 'Resource Constraints', value: 28, color: '#4ecdc4' },
    { name: 'Process Delays', value: 22, color: '#45b7d1' },
    { name: 'Scheduling', value: 15, color: '#96ceb4' }
  ];

  // Authentication functions
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    // Simulate API call delay
    setTimeout(() => {
      const foundUser = mockUsers.find(
        user => user.email === loginForm.email && user.password === loginForm.password
      );

      if (foundUser) {
        setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role });
        setIsAuthenticated(true);
        setLoginForm({ email: '', password: '' });
      } else {
        setAuthError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    if (signupForm.password !== signupForm.confirmPassword) {
      setAuthError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const existingUser = mockUsers.find(user => user.email === signupForm.email);
      
      if (existingUser) {
        setAuthError('Email already exists');
      } else {
        const newUser = {
          id: mockUsers.length + 1,
          name: signupForm.name,
          email: signupForm.email,
          role: 'Analyst'
        };
        setUser(newUser);
        setIsAuthenticated(true);
        setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  const runAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAnalysisResults({
        bottlenecksDetected: 4,
        criticalIssues: 1,
        efficiency: 76,
        recommendations: 3
      });
    }, 3000);
  };

  // Authentication Screen Component
  const AuthScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Zap className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Bottleneck Detection System</h1>
            <p className="text-gray-600 mt-2">Manufacturing & Logistics Analytics Platform</p>
          </div>

          <div className="flex mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 px-4 text-center rounded-l-lg transition-colors ${
                authMode === 'login' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 px-4 text-center rounded-r-lg transition-colors ${
                authMode === 'signup' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {authError}
            </div>
          )}

          {authMode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <User size={16} />
                    Create Account
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Demo Accounts:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Admin: admin@company.com / admin123</div>
              <div>Manager: manager@company.com / manager123</div>
              <div>Analyst: analyst@company.com / analyst123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const MetricCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Active Bottlenecks" 
          value="4" 
          icon={AlertTriangle} 
          color="#ff6b6b"
          subtitle="2 Critical, 1 High, 1 Medium"
        />
        <MetricCard 
          title="System Efficiency" 
          value="76%" 
          icon={Activity} 
          color="#4ecdc4"
          subtitle="↓ 8% from last week"
        />
        <MetricCard 
          title="Predictions Made" 
          value="12" 
          icon={TrendingUp} 
          color="#45b7d1"
          subtitle="Next 4 weeks forecast"
        />
        <MetricCard 
          title="Data Sources" 
          value="8" 
          icon={Database} 
          color="#96ceb4"
          subtitle="All systems connected"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="text-blue-600" />
            Bottleneck Severity Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bottleneckData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="station" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="severity" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="text-green-600" />
            Bottleneck Types Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="text-purple-600" />
          Real-time Performance Monitoring
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="throughput" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const DataManagementView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Database className="text-blue-600" />
          Data Source Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Manufacturing ERP System</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
              </div>
              <p className="text-sm text-gray-600">Last sync: 5 minutes ago</p>
              <p className="text-sm text-gray-600">Records: 1,247,892</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Logistics Database</h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
              </div>
              <p className="text-sm text-gray-600">Last sync: 2 minutes ago</p>
              <p className="text-sm text-gray-600">Records: 856,743</p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Quality Control System</h4>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Syncing</span>
              </div>
              <p className="text-sm text-gray-600">Last sync: 15 minutes ago</p>
              <p className="text-sm text-gray-600">Records: 432,156</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Data Pipeline Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Ingestion</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Cleaning</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature Engineering</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Processing</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Model Training</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Scheduled</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload size={16} />
                Import Data
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Settings size={16} />
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalysisView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Zap className="text-yellow-600" />
          AI-Powered Bottleneck Analysis
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-4">Analysis Configuration</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Manufacturing Workflow</option>
                  <option>Logistics Chain</option>
                  <option>Quality Control Process</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sensitivity Threshold</label>
                <input type="range" min="1" max="100" defaultValue="75" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>

              <button 
                onClick={runAnalysis}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Run Analysis
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Current Bottlenecks Detected</h4>
            <div className="space-y-3">
              {bottleneckData.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{item.station}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                      item.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                      item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Type: {item.type}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Severity</span>
                      <span>{item.severity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${item.severity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {analysisResults && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Analysis Complete!</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{analysisResults.bottlenecksDetected}</div>
                <div className="text-xs text-blue-800">Bottlenecks Found</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{analysisResults.criticalIssues}</div>
                <div className="text-xs text-red-800">Critical Issues</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{analysisResults.efficiency}%</div>
                <div className="text-xs text-green-800">Avg Efficiency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{analysisResults.recommendations}</div>
                <div className="text-xs text-purple-800">Recommendations</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prediction Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-green-600" />
          Bottleneck Predictions
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const ReportsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <BarChart3 className="text-blue-600" />
          Reports & Visualizations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <h4 className="font-medium mb-2">Weekly Bottleneck Summary</h4>
            <p className="text-sm text-gray-600 mb-3">Comprehensive analysis of bottlenecks detected this week</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                <Eye size={12} />
                View
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                <Download size={12} />
                Export
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <h4 className="font-medium mb-2">Predictive Analysis Report</h4>
            <p className="text-sm text-gray-600 mb-3">Future bottleneck predictions for next 4 weeks</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                <Eye size={12} />
                View
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                <Download size={12} />
                Export
              </button>
            </div>
          </div>

          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
            <h4 className="font-medium mb-2">Efficiency Optimization</h4>
            <p className="text-sm text-gray-600 mb-3">Recommendations for improving system efficiency</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                <Eye size={12} />
                View
              </button>
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                <Download size={12} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">Custom Dashboard Builder</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-medium mb-2">Available Widgets</h5>
              <div className="space-y-2">
                {[
                  'Bottleneck Severity Chart',
                  'Performance Timeline',
                  'Prediction Graph',
                  'KPI Metrics',
                  'Alert Panel',
                  'Export Tools'
                ].map((widget, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{widget}</span>
                    <button className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Add</button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2">Dashboard Preview</h5>
              <div className="border rounded-lg p-4 bg-gray-50 min-h-48 flex items-center justify-center">
                <p className="text-gray-500">Drag widgets here to build your custom dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // Main application after authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI-Powered Bottleneck Detection System</h1>
                <p className="text-sm text-gray-600">Manufacturing & Logistics Analytics Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                <User size={16} className="text-gray-600" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <span className="text-xs text-gray-500">({user.role})</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">System Online</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <TabButton 
            id="dashboard" 
            label="Dashboard" 
            icon={BarChart3} 
            isActive={activeTab === 'dashboard'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="data" 
            label="Data Management" 
            icon={Database} 
            isActive={activeTab === 'data'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="analysis" 
            label="Analysis & Detection" 
            icon={Zap} 
            isActive={activeTab === 'analysis'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="reports" 
            label="Reports & Visualization" 
            icon={BarChart3} 
            isActive={activeTab === 'reports'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'data' && <DataManagementView />}
          {activeTab === 'analysis' && <AnalysisView />}
          {activeTab === 'reports' && <ReportsView />}
        </div>
      </div>
    </div>
  );
};

export default BottleneckDetectionSystem;