import  { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
// Sample image array - replace with your actual images
// const sampleImages = [
//   '/api/placeholder/800/600',
//   '/api/placeholder/800/600',
//   '/api/placeholder/800/600',
//   '/api/placeholder/800/600',
// ];

const AdminReturnItemImages=({images})=> {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isDownloading, setIsDownloading] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };


const handleDownload = () => {
    const imageUrl = images[currentIndex];
    
    // Create an anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    
    // Set a filename
    const filename = imageUrl.split('/').pop() || `image-${currentIndex + 1}.jpg`;
    
    // Set download attribute
    link.setAttribute('download', filename);
    
    // Fallback for some browsers
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Show Images
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
            >
              <X  size={24} />
            </button>
            
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>
              
              <button
                onClick={handleDownload}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity"
                title="Download Image"
              >
                <Download size={20} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-white' : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminReturnItemImages
