
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Shield, AlertTriangle, CheckCircle, Camera } from 'lucide-react';
import { toast } from 'sonner';
import AuthenticationResult from './AuthenticationResult';
import ImagePreview from './ImagePreview';
import { authenticateCurrency } from '../utils/currencyAuth';

interface AuthResult {
  isAuthentic: boolean;
  confidence: number;
  details: string[];
  analysisTime: number;
}

const CurrencyAuthenticator = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AuthResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setSelectedImage(file);
      setResult(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast.success('Image uploaded successfully');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setResult(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast.success('Image uploaded successfully');
    } else {
      toast.error('Please drop a valid image file');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const authResult = await authenticateCurrency(selectedImage);
      setResult(authResult);
      
      if (authResult.isAuthentic) {
        toast.success('Analysis complete - Note appears authentic');
      } else {
        toast.error('Analysis complete - Potential counterfeit detected');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upload Section */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8">
          <div
            className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center space-y-4">
              <Upload className="h-16 w-16 text-slate-400" />
              <div>
                <p className="text-xl font-semibold text-white mb-2">
                  Upload Currency Note
                </p>
                <p className="text-slate-400">
                  Drag and drop an image or click to browse
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Image Preview */}
      {imagePreview && (
        <ImagePreview 
          imageUrl={imagePreview} 
          fileName={selectedImage?.name || 'Currency Note'} 
        />
      )}

      {/* Analysis Controls */}
      {selectedImage && (
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-2" />
                Authenticate Note
              </>
            )}
          </Button>
          
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-3"
          >
            Reset
          </Button>
        </div>
      )}

      {/* Results */}
      {result && <AuthenticationResult result={result} />}

      {/* Info Section */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Camera className="h-8 w-8 text-blue-400" />
              <h3 className="font-semibold text-white">High Resolution</h3>
              <p className="text-sm text-slate-400">
                Analyzes micro-features and security elements
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-emerald-400" />
              <h3 className="font-semibold text-white">Deep Learning</h3>
              <p className="text-sm text-slate-400">
                Advanced neural networks for accurate detection
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <h3 className="font-semibold text-white">Real-time Analysis</h3>
              <p className="text-sm text-slate-400">
                Instant results with confidence scoring
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyAuthenticator;
