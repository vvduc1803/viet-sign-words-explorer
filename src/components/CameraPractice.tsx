
import React, { useRef, useEffect, useState } from 'react';
import { Camera, StopCircle, Play, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { VocabularyItem } from '../data/vocabulary';
import VideoPlayer from './VideoPlayer';

interface CameraPracticeProps {
  word: VocabularyItem;
  onComplete: (score: number) => void;
  onClose: () => void;
}

const CameraPractice: React.FC<CameraPracticeProps> = ({ word, onComplete, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.');
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          startRecording();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    
    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration(prev => {
        if (prev >= 5) { // Tự động dừng sau 5 giây
          stopRecording();
          return prev;
        }
        return prev + 0.1;
      });
    }, 100);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    analyzeGesture();
  };

  const analyzeGesture = async () => {
    setIsAnalyzing(true);
    
    // Mô phỏng phân tích cử chỉ với TensorFlow.js/MediaPipe
    // Trong thực tế, đây sẽ là nơi tích hợp với model AI để nhận diện cử chỉ
    setTimeout(() => {
      // Tạo điểm số ngẫu nhiên từ 60-95 để mô phỏng
      const mockScore = Math.floor(Math.random() * 36) + 60;
      setScore(mockScore);
      setIsAnalyzing(false);
      onComplete(mockScore);
    }, 2000);
  };

  const resetPractice = () => {
    setScore(null);
    setRecordingDuration(0);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 85) return 'Xuất sắc! 🎉';
    if (score >= 70) return 'Tốt! 👏';
    if (score >= 55) return 'Khá! 👍';
    return 'Cần cố gắng thêm! 💪';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Thực hành: {word.word}</h2>
            <p className="text-education-blue font-medium mt-1">Thực hiện ngôn ngữ ký hiệu</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <StopCircle className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Camera Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-education-blue" />
                Camera thực hành
              </h3>
              
              <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ display: 'none' }}
                />
                
                {/* Countdown Overlay */}
                {countdown && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-6xl font-bold text-white animate-bounce">
                      {countdown}
                    </div>
                  </div>
                )}

                {/* Recording Indicator */}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">
                      Đang ghi {recordingDuration.toFixed(1)}s
                    </span>
                  </div>
                )}

                {/* Analysis Overlay */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                      <p>Đang phân tích cử chỉ...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Controls */}
              <div className="flex justify-center space-x-4">
                {!stream ? (
                  <button
                    onClick={startCamera}
                    className="btn-primary flex items-center"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Bật Camera
                  </button>
                ) : !isRecording && !isAnalyzing && score === null ? (
                  <button
                    onClick={startCountdown}
                    className="btn-primary flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Bắt đầu ghi
                  </button>
                ) : isRecording ? (
                  <button
                    onClick={stopRecording}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300 flex items-center"
                  >
                    <StopCircle className="w-4 h-4 mr-2" />
                    Dừng ghi
                  </button>
                ) : null}

                {score !== null && (
                  <button
                    onClick={resetPractice}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 flex items-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Thử lại
                  </button>
                )}
              </div>
            </div>

            {/* Reference Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <Play className="w-5 h-5 mr-2 text-education-green" />
                Video mẫu
              </h3>
              
              <VideoPlayer
                src={word.sign_language_video}
                title={`Ngôn ngữ ký hiệu: ${word.word}`}
                className="aspect-video"
              />

              {/* Instructions */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">Hướng dẫn:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>1. Xem video mẫu để học cử chỉ</li>
                  <li>2. Bật camera và đặt tay trong khung hình</li>
                  <li>3. Nhấn "Bắt đầu ghi" và thực hiện cử chỉ</li>
                  <li>4. Hệ thống sẽ phân tích và chấm điểm</li>
                </ul>
              </div>

              {/* Score Display */}
              {score !== null && (
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
                  <div className="mb-4">
                    {score >= 70 ? (
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    ) : (
                      <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto" />
                    )}
                  </div>
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                    {score}/100
                  </div>
                  <p className={`text-lg font-medium ${getScoreColor(score)}`}>
                    {getScoreMessage(score)}
                  </p>
                  
                  {score < 70 && (
                    <p className="text-sm text-gray-600 mt-2">
                      Hãy xem lại video mẫu và thử lại!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraPractice;
