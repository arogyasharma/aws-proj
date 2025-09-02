import React, { useState } from 'react';
import { Upload, FileVideo, Type, Send, Image as ImageIcon, Sparkles, CheckCircle, X, Loader } from 'lucide-react';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoCaption, setVideoCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageCaption, setImageCaption] = useState('');
  
  // Upload progress and status states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState('');

  // Progress bar component
  const ProgressBar = ({ progress, type }) => {
    const colorClasses = {
      text: 'from-blue-500 to-blue-600',
      video: 'from-purple-500 to-pink-500',
      image: 'from-green-500 to-teal-500'
    };

    return (
      <div className="w-full bg-dark-300/50 rounded-full h-3 mb-4">
        <div 
          className={`h-3 bg-gradient-to-r ${colorClasses[type]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  // Success/Error message component
  const StatusMessage = ({ status, message, onClose }) => {
    if (!status) return null;

    const isSuccess = status === 'success';
    const bgColor = isSuccess ? 'from-green-500/20 to-emerald-500/20' : 'from-red-500/20 to-rose-500/20';
    const borderColor = isSuccess ? 'border-green-500/30' : 'border-red-500/30';
    const textColor = isSuccess ? 'text-green-300' : 'text-red-300';
    const iconColor = isSuccess ? 'text-green-400' : 'text-red-400';

    return (
      <div className={`p-4 rounded-2xl border-2 ${borderColor} bg-gradient-to-r ${bgColor} mb-6 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          {isSuccess ? (
            <CheckCircle className={`h-6 w-6 ${iconColor}`} />
          ) : (
            <X className={`h-6 w-6 ${iconColor}`} />
          )}
          <span className={`font-semibold ${textColor}`}>{message}</span>
        </div>
        <button
          onClick={onClose}
          className={`${iconColor} hover:opacity-70 transition-opacity`}
        >
          <X className="h-5 w-5" />
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
      setStatusMessage('Video uploaded successfully! 🎉');
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
      if (activeTab === 'video') {
        setVideoFile(file);
      } else if (activeTab === 'image') {
        setImageFile(file);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-teal-900/20 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gradient-to-br from-dark-200 to-dark-300 rounded-2xl shadow-2xl overflow-hidden border border-dark-400/30 backdrop-blur-sm">
          {/* Header */}
          <div className="p-6 border-b border-dark-300/50 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
            <div className="flex items-center justify-center space-x-3">
              <Sparkles className="h-7 w-7 text-blue-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Create New Post
              </h1>
              <Sparkles className="h-7 w-7 text-purple-400" />
            </div>
            <p className="text-gray-400 text-center mt-2">Share your thoughts with the world</p>
          </div>

           
          <div className="flex border-b border-dark-300/50 bg-dark-100/20">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'text'
                  ? 'text-blue-400 border-b-3 border-blue-500 bg-gradient-to-t from-blue-500/10 to-transparent shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-dark-300/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Type className="h-5 w-5" />
                <span>Text Post</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'video'
                  ? 'text-purple-400 border-b-3 border-purple-500 bg-gradient-to-t from-purple-500/10 to-transparent shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-dark-300/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FileVideo className="h-5 w-5" />
                <span>Video Upload</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-5 px-6 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'image'
                  ? 'text-green-400 border-b-3 border-green-500 bg-gradient-to-t from-green-500/10 to-transparent shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-dark-300/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <ImageIcon className="h-5 w-5" />
                <span>Image Upload</span>
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Status Message */}
            <StatusMessage 
              status={uploadStatus} 
              message={statusMessage} 
              onClose={clearStatus} 
            />
            
            {/* Progress Bar */}
            {isUploading && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">
                    {activeTab === 'text' ? 'Creating post...' : 
                     activeTab === 'video' ? 'Uploading video...' : 
                     'Uploading image...'}
                  </span>
                  <span className="text-gray-400">{Math.round(uploadProgress)}%</span>
                </div>
                <ProgressBar progress={uploadProgress} type={activeTab} />
              </div>
            )}

            {activeTab === 'text' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-blue-300 mb-3 flex items-center space-x-2">
                    <Type className="h-4 w-4" />
                    <span>What's on your mind?</span>
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Share your thoughts with the Sportech community..."
                    rows={10}
                    className="w-full px-6 py-4 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 resize-none transition-all duration-300 hover:border-blue-500/30 shadow-inner"
                  />
                </div>
                <button
                  onClick={handleTextPost}
                  disabled={!textContent.trim() || isUploading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100"
                >
                  {isUploading && activeTab === 'text' ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span>
                    {isUploading && activeTab === 'text' ? 'Creating...' : 'Share Your Thoughts'}
                  </span>
                </button>
              </div>
            ) : activeTab === 'video' ? (
              <div className="space-y-6">
                {/* Video Upload Area */}
                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-3 flex items-center space-x-2">
                    <FileVideo className="h-4 w-4" />
                    <span>Upload Video</span>
                  </label>
                  <div className="border-3 border-dashed border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-pink-900/10 rounded-2xl p-12 text-center hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer flex flex-col items-center space-y-6 transition-all duration-300 hover:scale-105"
                    >
                      <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
                        <Upload className="h-16 w-16 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {videoFile ? videoFile.name : 'Click to upload video'}
                        </p>
                        <p className="text-purple-300 text-sm mt-2">
                          MP4, WebM, or OGV (max 100MB)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Video Caption */}
                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-3 flex items-center space-x-2">
                    <Type className="h-4 w-4" />
                    <span>Caption</span>
                  </label>
                  <input
                    type="text"
                    value={videoCaption}
                    onChange={(e) => setVideoCaption(e.target.value)}
                    placeholder="Add a caption to your video..."
                    className="w-full px-6 py-4 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-500/30 shadow-inner"
                  />
                </div>

                <button
                  onClick={handleVideoUpload}
                  disabled={!videoFile || isUploading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100"
                >
                  {isUploading && activeTab === 'video' ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}
                  <span>
                    {isUploading && activeTab === 'video' ? 'Uploading...' : 'Upload Video'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Image Upload Area */}
                <div>
                  <label className="block text-sm font-semibold text-green-300 mb-3 flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Upload Image</span>
                  </label>
                  <div className="border-3 border-dashed border-green-500/30 bg-gradient-to-br from-green-900/10 to-teal-900/10 rounded-2xl p-12 text-center hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-6 transition-all duration-300 hover:scale-105"
                    >
                      <div className="p-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full">
                        <Upload className="h-16 w-16 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {imageFile ? imageFile.name : 'Click to upload image'}
                        </p>
                        <p className="text-green-300 text-sm mt-2">
                          JPG, PNG, GIF (max 10MB)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Image Caption */}
                <div>
                  <label className="block text-sm font-semibold text-green-300 mb-3 flex items-center space-x-2">
                    <Type className="h-4 w-4" />
                    <span>Caption</span>
                  </label>
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="Add a caption to your image..."
                    className="w-full px-6 py-4 bg-gradient-to-br from-dark-100 to-dark-200 border-2 border-dark-300/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300 hover:border-green-500/30 shadow-inner"
                  />
                </div>

                <button
                  onClick={handleImageUpload}
                  disabled={!imageFile || isUploading}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100"
                >
                  {isUploading && activeTab === 'image' ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}
                  <span>
                    {isUploading && activeTab === 'image' ? 'Uploading...' : 'Upload Image'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
