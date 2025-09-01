import React, { useState } from 'react';
import { Upload, FileVideo, Type, Send, Image as ImageIcon, Sparkles } from 'lucide-react';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoCaption, setVideoCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageCaption, setImageCaption] = useState('');
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('files', imageFile);
      formData.append('caption', imageCaption);
      const response = await fetch('https://champion-normal-raven.ngrok-free.app/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setImageFile(null);
        setImageCaption('');
        alert('Image uploaded successfully!');
      } else {
        alert('Upload failed: ' + (await response.text()));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    }
  };

  const handleTextPost = () => {
    console.log('Text post created:', textContent);
    // Reset form
    setTextContent('');
    alert('Text post created successfully!');
  };

 const handleVideoUpload = async () => {
  try {
    const formData = new FormData();
    formData.append('files', videoFile);
    formData.append('caption', videoCaption);
    
    const response = await fetch('https://champion-normal-raven.ngrok-free.app/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    // Clear form after successful upload
    setVideoFile(null);
    setVideoCaption('');
    alert('Video uploaded successfully!');
  } catch (error) {
    console.error('Upload error:', error);
    alert('Failed to upload video. Please try again.');
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
                  disabled={!textContent.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100"
                >
                  <Send className="h-5 w-5" />
                  <span>Share Your Thoughts</span>
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
                  disabled={!videoFile}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Video</span>
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
                  disabled={!imageFile}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Image</span>
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
