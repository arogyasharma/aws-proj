import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserName } from '../utils/userUtils';

import { Upload, FileVideo, Type, Send, Image as ImageIcon, Sparkles, CheckCircle, X, Loader, Camera, Plus, ArrowLeft, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';

const UploadPage = () => {
  const { user } = useAuth(); // Add this line to get user from auth context
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
      // Use utility function to extract username
      const username = getUserName(user);
      console.log('DEBUG: User object:', user);
      console.log('DEBUG: User attributes:', user?.attributes);
      console.log('DEBUG: Sending username to Flask server for image upload:', username);
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
      formData.append('username', username); // Add username here
      
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
      // Use utility function to extract username
      const username = getUserName(user);
      console.log('DEBUG: Sending username to Flask server for video upload:', username);
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
       formData.append('username', username); // Add username here
      
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        {/* Username Test - remove after debugging */}
       
        {/* Instagram-style Header */}
  <div className="flex items-center justify-between p-5 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          {step === 'caption' ? (
            <button 
              onClick={handleBackToUpload}
              className="text-white hover:text-blue-400 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          ) : (
            <div></div>
          )}
          
          <h1 className="text-white font-bold text-xl tracking-wide drop-shadow">
            {step === 'upload' ? 'New Post' : 'New Post'}
          </h1>
          
          {step === 'caption' && (
            <button
              onClick={activeTab === 'image' ? handleImageUpload : handleVideoUpload}
              disabled={isUploading || (!imageFile && !videoFile)}
              className="px-4 py-1 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Sharing...' : 'Share'}
            </button>
          )}
        </div>

        {/* Tab Navigation - Instagram Style */}
        {step === 'upload' && (
          <div className="flex bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-3 text-center font-semibold transition-all tracking-wide ${
                activeTab === 'image'
                  ? 'text-white border-b-4 border-blue-500 bg-gradient-to-r from-blue-900/30 to-blue-700/10'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              GALLERY
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-3 text-center font-semibold transition-all tracking-wide ${
                activeTab === 'video'
                  ? 'text-white border-b-4 border-blue-500 bg-gradient-to-r from-blue-900/30 to-blue-700/10'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
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
            // Upload Step - Enhanced Style
            <div className="relative h-96 flex items-center justify-center">
              {/* Upload Area */}
              <div 
                onClick={triggerFileInput}
                className="h-80 w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center cursor-pointer hover:from-blue-900/40 hover:to-blue-800/30 transition-all rounded-xl border-2 border-dashed border-blue-700 shadow-inner"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="h-10 w-10 text-white drop-shadow" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2 drop-shadow">
                    {activeTab === 'image' ? 'Select photos to share' : 'Select videos to share'}
                  </h3>
                  <p className="text-gray-300 text-base">
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
            // Caption Step - Enhanced Style
            <div className="min-h-[32rem] bg-gradient-to-br from-black via-gray-900 to-gray-950 flex flex-col">
              {/* Media Preview */}
              <div className="h-80 bg-black flex items-center justify-center rounded-xl shadow-inner border border-gray-800 mt-4 mx-4">
                {mediaPreview && activeTab === 'image' && (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="max-h-72 max-w-full object-contain rounded-lg shadow-lg"
                  />
                )}
                {mediaPreview && activeTab === 'video' && (
                  <video 
                    src={mediaPreview} 
                    className="max-h-72 max-w-full object-contain rounded-lg shadow-lg"
                    controls
                  />
                )}
              </div>

              {/* Caption Input */}
              <div className="p-5 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 mt-4 mx-4 rounded-xl shadow">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0 shadow"></div>
                  <div className="flex-1">
                    <textarea
                      value={activeTab === 'image' ? imageCaption : videoCaption}
                      onChange={(e) => activeTab === 'image' ? setImageCaption(e.target.value) : setVideoCaption(e.target.value)}
                      placeholder="Write a caption..."
                      className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-none outline-none text-base font-medium"
                      rows={3}
                      maxLength={2200}
                    />
                  </div>
                </div>
                {/* Post Interaction Preview */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Heart className="h-6 w-6 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer" />
                      <MessageCircle className="h-6 w-6 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer" />
                      <Send className="h-6 w-6 text-gray-400 hover:text-green-400 transition-colors cursor-pointer" />
                    </div>
                    <Bookmark className="h-6 w-6 text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer" />
                  </div>
                  <div className="mt-2">
                    <p className="text-white text-sm font-semibold">0 likes</p>
                    {(imageCaption || videoCaption) && (
                      <p className="text-white text-base mt-1">
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
