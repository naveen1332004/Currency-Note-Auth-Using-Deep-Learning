
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, fileName }) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center justify-center">
            <Image className="h-5 w-5 mr-2 text-blue-400" />
            {fileName}
          </h3>
        </div>
        <div className="relative max-w-md mx-auto">
          <img
            src={imageUrl}
            alt="Currency note preview"
            className="w-full h-auto rounded-lg shadow-lg border border-slate-600"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
