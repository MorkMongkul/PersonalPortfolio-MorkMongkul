import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />;
  }

  return (
    <Spline 
      scene="https://prod.spline.design/FqitOTG0tISxkVCk/scene.splinecode"
      className="w-full h-full"
    />
  );
} 