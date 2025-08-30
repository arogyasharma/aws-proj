import React, { useState } from 'react';
import { Upload, FileVideo, Type, Send } from 'lucide-react';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoCaption, setVideoCaption] = useState('');

  const handleTextPost = () => {
    console.log('Text post created:', textContent);
    // Reset form
    setTextContent('');
    alert('Text post created successfully!');
  };

  const handleVideoUpload = () => {
    console.log('Video upload:', { file: videoFile, caption: videoCaption });
    // Reset form
    setVideoFile(null);
    setVideoCaption('');
    alert('Video uploaded successfully!');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-dark-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-dark-200 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-dark-300">
            <h1 className="text-2xl font-bold text-white text-center">Create New Post</h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-dark-300">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'text'
                  ? 'text-blue-500 border-b-2 border-blue-500 bg-dark-300'
                  : 'text-gray-400 hover:text-white hover:bg-dark-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Type className="h-5 w-5" />
                <span>Text Post</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'video'
                  ? 'text-blue-500 border-b-2 border-blue-500 bg-dark-300'
                  : 'text-gray-400 hover:text-white hover:bg-dark-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FileVideo className="h-5 w-5" />
                <span>Video Upload</span>
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'text' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What's on your mind?
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Share your thoughts with the VibeShare community..."
                    rows={8}
                    className="w-full px-4 py-3 bg-dark-100 border border-dark-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <button
                  onClick={handleTextPost}
                  disabled={!textContent.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Post</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Video Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Video
                  </label>
                  <div className="border-2 border-dashed border-dark-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer flex flex-col items-center space-y-4"
                    >
                      <Upload className="h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">
                          {videoFile ? videoFile.name : 'Click to upload video'}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          MP4, WebM, or OGV (max 100MB)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Video Caption */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={videoCaption}
                    onChange={(e) => setVideoCaption(e.target.value)}
                    placeholder="Add a caption to your video..."
                    className="w-full px-4 py-3 bg-dark-100 border border-dark-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleVideoUpload}
                  disabled={!videoFile}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Video</span>
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