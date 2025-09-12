import React, { useState, useRef } from 'react';
import { Upload, FileVideo, Type, Send, Image as ImageIcon, Sparkles, CheckCircle, X, Loader, Camera, Plus, ArrowLeft, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoCaption, setVideoCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageCaption, setImageCaption] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [step, setStep] = useState('upload'); // 'upload', 'edit', 'caption'
  
  // Upload progress and status states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState('');
  
  const fileInputRef = useRef(null);

  // Progress bar component
  const ProgressBar = ({ progress, type }) => {
    return (
      <div className="w-full bg-gray-700 rounded-full h-1">
        <div 
          className="h-1 bg-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  // Success/Error message component
  const StatusMessage = ({ status, message, onClose }) => {
    if (!status) return null;

    const isSuccess = status === 'success';
    const bgColor = isSuccess ? 'bg-green-600' : 'bg-red-600';
    const textColor = 'text-white';

    return (
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg`}>
        {isSuccess ? (
          <CheckCircle className="h-5 w-5 text-white" />
        ) : (
          <X className="h-5 w-5 text-white" />
        )}
        <span className={`text-sm font-medium ${textColor}`}>{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:opacity-70 transition-opacity ml-2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  };

  const clearStatus = () => {
    setUploadStatus(null);
    setStatusMessage('');
    setUploadProgress(0);
  };
  const handleImageUpload = async () => {
    if (!imageFile) return;
    
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 20;
        });
      }, 200);

      const formData = new FormData();
      formData.append('files', imageFile);
      formData.append('caption', imageCaption);
      
      const response = await fetch('https://champion-normal-raven.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        setImageFile(null);
        setImageCaption('');
        setUploadStatus('success');
        setStatusMessage('Image uploaded successfully! 🎉');
      } else {
        const errorText = await response.text();
        setUploadStatus('error');
        setStatusMessage(`Upload failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(0);
      setUploadStatus('error');
      setStatusMessage(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTextPost = async () => {
    if (!textContent.trim()) return;
    
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    try {
      // Simulate progress for text post
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 30;
        });
      }, 100);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      console.log('Text post created:', textContent);
      setTextContent('');
      setUploadStatus('success');
      setStatusMessage('Text post created successfully! 🎉');
    } catch (error) {
      console.error('Text post error:', error);
      setUploadProgress(0);
      setUploadStatus('error');
      setStatusMessage(`Failed to create post: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

 const handleVideoUpload = async () => {
    if (!videoFile) return;
    
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 300);

      const formData = new FormData();
      formData.append('files', videoFile);
      formData.append('caption', videoCaption);
      
      const response = await fetch('https://champion-normal-raven.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      // Clear form after successful upload
      setVideoFile(null);
      setVideoCaption('');
      setUploadStatus('success');
      setStatusMessage('Video uploaded successfully! ');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(0);
      setUploadStatus('error');
      setStatusMessage('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaPreview(event.target.result);
        setStep('caption');
      };
      
      if (activeTab === 'video') {
        setVideoFile(file);
        reader.readAsDataURL(file);
      } else if (activeTab === 'image') {
        setImageFile(file);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleBackToUpload = () => {
    setStep('upload');
    setMediaPreview(null);
    setImageFile(null);
    setVideoFile(null);
    setImageCaption('');
    setVideoCaption('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto bg-black">
        {/* Instagram-style Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {step === 'caption' ? (
            <button 
              onClick={handleBackToUpload}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          ) : (
            <div></div>
          )}
          
          <h1 className="text-white font-semibold text-lg">
            {step === 'upload' ? 'New Post' : 'New Post'}
          </h1>
          
          {step === 'caption' && (
            <button
              onClick={activeTab === 'image' ? handleImageUpload : handleVideoUpload}
              disabled={isUploading || (!imageFile && !videoFile)}
              className="text-blue-500 font-semibold hover:text-blue-400 transition-colors disabled:text-gray-500"
            >
              {isUploading ? 'Sharing...' : 'Share'}
            </button>
          )}
        </div>

        {/* Tab Navigation - Instagram Style */}
        {step === 'upload' && (
          <div className="flex bg-black border-b border-gray-800">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-3 text-center font-medium transition-all ${
                activeTab === 'image'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-500'
              }`}
            >
              GALLERY
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-3 text-center font-medium transition-all ${
                activeTab === 'video'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-500'
              }`}
            >
              VIDEO
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Status Message */}
          <StatusMessage 
            status={uploadStatus} 
            message={statusMessage} 
            onClose={clearStatus} 
          />
          
          {/* Progress Bar */}
          {isUploading && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">
                  {activeTab === 'video' ? 'Uploading video...' : 'Uploading image...'}
                </span>
                <span className="text-gray-400 text-sm">{Math.round(uploadProgress)}%</span>
              </div>
              <ProgressBar progress={uploadProgress} type={activeTab} />
            </div>
          )}

          {step === 'upload' ? (
            // Upload Step - Instagram Style
            <div className="relative h-96">
              {/* Upload Area */}
              <div 
                onClick={triggerFileInput}
                className="h-full bg-gray-900 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    {activeTab === 'image' ? 'Select photos to share' : 'Select videos to share'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {activeTab === 'image' ? 'You can select multiple photos' : 'You can upload one video at a time'}
                  </p>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept={activeTab === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
                className="hidden"
                multiple={activeTab === 'image'}
              />
            </div>
          ) : (
            // Caption Step - Instagram Style
            <div className="h-screen bg-black">
              {/* Media Preview */}
              <div className="h-96 bg-black flex items-center justify-center">
                {mediaPreview && activeTab === 'image' && (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                )}
                {mediaPreview && activeTab === 'video' && (
                  <video 
                    src={mediaPreview} 
                    className="max-h-full max-w-full object-contain"
                    controls
                  />
                )}
              </div>

              {/* Caption Input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <textarea
                      value={activeTab === 'image' ? imageCaption : videoCaption}
                      onChange={(e) => activeTab === 'image' ? setImageCaption(e.target.value) : setVideoCaption(e.target.value)}
                      placeholder="Write a caption..."
                      className="w-full bg-transparent text-white placeholder-gray-500 resize-none border-none outline-none text-sm"
                      rows={4}
                    />
                  </div>
                </div>
                
                {/* Post Interaction Preview */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Heart className="h-6 w-6 text-gray-400" />
                      <MessageCircle className="h-6 w-6 text-gray-400" />
                      <Send className="h-6 w-6 text-gray-400" />
                    </div>
                    <Bookmark className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="mt-2">
                    <p className="text-white text-sm font-semibold">0 likes</p>
                    {(imageCaption || videoCaption) && (
                      <p className="text-white text-sm mt-1">
                        <span className="font-semibold">username</span> {activeTab === 'image' ? imageCaption : videoCaption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
