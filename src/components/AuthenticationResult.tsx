
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';

interface AuthResult {
  isAuthentic: boolean;
  confidence: number;
  details: string[];
  analysisTime: number;
}

interface AuthenticationResultProps {
  result: AuthResult;
}

const AuthenticationResult: React.FC<AuthenticationResultProps> = ({ result }) => {
  const { isAuthentic, confidence, details, analysisTime } = result;

  const getStatusColor = () => {
    if (confidence >= 80) return isAuthentic ? 'text-green-400' : 'text-red-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getStatusIcon = () => {
    if (confidence >= 80) {
      return isAuthentic ? (
        <CheckCircle className="h-8 w-8 text-green-400" />
      ) : (
        <AlertTriangle className="h-8 w-8 text-red-400" />
      );
    }
    return <Info className="h-8 w-8 text-yellow-400" />;
  };

  const getStatusText = () => {
    if (confidence >= 80) {
      return isAuthentic ? 'AUTHENTIC' : 'COUNTERFEIT DETECTED';
    }
    return 'REQUIRES MANUAL VERIFICATION';
  };

  const getProgressColor = () => {
    if (confidence >= 80) return isAuthentic ? 'bg-green-500' : 'bg-red-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center space-x-3">
          {getStatusIcon()}
          <span className={`text-2xl font-bold ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Confidence Score */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">Confidence Score</span>
            <span className={`text-lg font-bold ${getStatusColor()}`}>
              {confidence.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={confidence} 
              className="h-3 bg-slate-700"
            />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* Analysis Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Analysis Details
          </h4>
          <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
            {details.map((detail, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-slate-300">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Time */}
        <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm">
          <Clock className="h-4 w-4" />
          <span>Analysis completed in {analysisTime.toFixed(2)}s</span>
        </div>

        {/* Security Notice */}
        <div className="bg-slate-900/30 border border-slate-600 rounded-lg p-4">
          <p className="text-xs text-slate-400 text-center">
            This analysis is for educational purposes. For official currency verification, 
            consult authorized financial institutions or use certified detection equipment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthenticationResult;
