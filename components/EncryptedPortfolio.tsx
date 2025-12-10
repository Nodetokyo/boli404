import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ArrowRight, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Project, EncryptionStatus } from '../types';

// DATA STRUCTURE FOR EASY REPLACEMENT
// To replace images in GitHub:
// 1. Upload your images to a 'public/works/[id]/' folder
// 2. Replace the URLs below with strings like: '/works/01/1.jpg'
const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: '東京大浮世絵展', 
    category: '3D', 
    // Thumb: /works/01/thumb.jpg
    imageUrl: 'https://images.unsplash.com/photo-1582234057962-421735741065?q=80&w=1000&auto=format&fit=crop', 
    isLocked: false,
    description: "丸ビルで行われたプロジェクションマッピングでは、3D制作部分を担当しました。",
    link: "https://www.youtube.com/watch?v=AXSEpvZ9G70&list=RDAXSEpvZ9G70&start_radio=1",
    galleryImages: [
      // Image 1: /works/01/1.jpg
      'https://images.unsplash.com/photo-1582234057962-421735741065?q=80&w=1200&auto=format&fit=crop',
      // Image 2: /works/01/2.jpg
      'https://images.unsplash.com/photo-1578989542981-d1026027a42c?q=80&w=1200&auto=format&fit=crop',
      // Image 3: /works/01/3.jpg
      'https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?q=80&w=1200&auto=format&fit=crop',
      // GIF 1: /works/01/4.gif
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmhmZHRhZnZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjeiVyM/giphy.gif',
      // GIF 2: /works/01/5.gif
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmhmZHRhZnZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlOaQcLJ2hHpYcw/giphy.gif'
    ]
  },
  { 
    id: '2', 
    title: '〈クレ・ド・ポー ボーテ〉POP UP', 
    category: '3D', 
    // Thumb: /works/02/thumb.jpg
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=1000&auto=format&fit=crop', 
    isLocked: false,
    description: "麻布台ヒルズで開催されたCPBイベントでは、インスタレーションの3D演出部分を担当しました。",
    galleryImages: [
      // Image 1: /works/02/1.jpg
      'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=1200&auto=format&fit=crop',
      // Image 2: /works/02/2.jpg
      'https://images.unsplash.com/photo-1616486029423-aaa478965c96?q=80&w=1200&auto=format&fit=crop',
      // GIF 1: /works/02/3.gif
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmhmZHRhZnZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6ZtpWvwnhf34Oj0A/giphy.gif'
    ]
  },
  { 
    id: '3', 
    title: 'Kenji Sakai 展示', 
    category: 'Installation', 
    // Thumb: /works/03/thumb.jpg
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000&auto=format&fit=crop', 
    isLocked: false,
    description: "Nomadic GalleryでのKenji Sakai氏個展では、インスタレーションのインストールおよびインタラクティブ演出部分を担当しました。",
    galleryImages: [
      // Image 1: /works/03/1.jpg
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1200&auto=format&fit=crop',
      // Image 2: /works/03/2.jpg
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  { 
    id: '4', 
    title: '万博インスタレーション', 
    category: 'Installation', 
    // Thumb: /works/04/thumb.jpg
    imageUrl: 'https://picsum.photos/600/400?random=10', 
    isLocked: true,
    description: "東北大学の研究プロジェクトでは、脳波インタラクション装置におけるビジュアル演出部分を担当しました。",
    galleryImages: [
       // Image 1: /works/04/1.jpg
       'https://picsum.photos/1200/800?random=101', 
       // Image 2: /works/04/2.jpg
       'https://picsum.photos/1200/800?random=102',
       // GIF 1: /works/04/3.gif
       'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmhmZHRhZnZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lFw057lAJQMwg0/giphy.gif'
    ]
  },
  { 
    id: '5', 
    title: 'イマーシブフォート', 
    category: '3D', 
    // Thumb: /works/05/thumb.jpg
    imageUrl: 'https://picsum.photos/600/400?random=11', 
    isLocked: true,
    description: "イマーシブフォートのリブランディングプロジェクトでは、ポスター用3Dタイポグラフィ部分を担当しました。",
    galleryImages: [
        // Image 1: /works/05/1.jpg
        'https://picsum.photos/1200/800?random=111'
    ]
  },
  { 
    id: '6', 
    title: 'QUALITY 1st', 
    category: '3D', 
    // Thumb: /works/06/thumb.jpg
    imageUrl: 'https://picsum.photos/600/400?random=12', 
    isLocked: true,
    description: "Quality 1stのプロモーションコンテンツでは、3D制作部分を担当しました。",
    galleryImages: [
        // Image 1: /works/06/1.jpg
        'https://picsum.photos/1200/800?random=121',
        // Image 2: /works/06/2.jpg
        'https://picsum.photos/1200/800?random=122',
        // Image 3: /works/06/3.jpg
        'https://picsum.photos/1200/800?random=123'
    ]
  },
  { 
    id: '7', 
    title: 'FENDI HOLIDAY', 
    category: '3D', 
    // Thumb: /works/07/thumb.jpg
    imageUrl: 'https://picsum.photos/600/400?random=13', 
    isLocked: true,
    description: "FENDI 2025 Holiday企画では、3Dアニメーション部分を担当しました。",
    galleryImages: [
        // Image 1: /works/07/1.jpg
        'https://picsum.photos/1200/800?random=131',
        // Image 2: /works/07/2.jpg
        'https://picsum.photos/1200/800?random=132',
        // GIF 1: /works/07/3.gif
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmhmZHRhZnZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRS5J6h07yVw7Cg/giphy.gif'
    ]
  },
  { 
    id: '8', 
    title: 'UFO x Zone', 
    category: '3D Printer', 
    // Thumb: /works/08/thumb.jpg
    imageUrl: 'https://picsum.photos/600/400?random=14', 
    isLocked: true,
    description: "UFOXZONEのプロジェクトでは、ランドタオルや3Dプリントなどの実体物制作部分を担当しました。",
    galleryImages: [
        // Image 1: /works/08/1.jpg
        'https://picsum.photos/1200/800?random=141',
        // Image 2: /works/08/2.jpg
        'https://picsum.photos/1200/800?random=142'
    ]
  },
  { 
    id: '9', 
    title: 'Baycurrent Year End Party 2025', 
    category: 'Visual', 
    // Thumb: /works/09/thumb.jpg
    imageUrl: 'https://picsum.photos/600/400?random=15', 
    isLocked: true,
    description: "Tokyo Domeで開催されたbaycurrentのYear End Partyでは、アーティスト演出におけるビジュアル演出部分を担当しました。",
    galleryImages: [
        // Image 1: /works/09/1.jpg
        'https://picsum.photos/1200/800?random=151',
        // Image 2: /works/09/2.jpg
        'https://picsum.photos/1200/800?random=152',
        // Image 3: /works/09/3.jpg
        'https://picsum.photos/1200/800?random=153',
        // GIF 1: /works/09/4.gif
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmhmZHRhZnZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6YWZ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKrEzvJbsF96MI0/giphy.gif'
    ]
  },
];

const EncryptedPortfolio: React.FC = () => {
  const [status, setStatus] = useState<EncryptionStatus>(EncryptionStatus.LOCKED);
  const [password, setPassword] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(EncryptionStatus.UNLOCKING);
    
    // Simulate verification delay
    setTimeout(() => {
      if (password.toLowerCase() === 'node' || password.toLowerCase() === 'node2024' || password === '4040') {
        setStatus(EncryptionStatus.UNLOCKED);
      } else {
        setStatus(EncryptionStatus.ERROR);
        setTimeout(() => setStatus(EncryptionStatus.LOCKED), 2000);
      }
    }, 1200);
  };

  const handleCardClick = (project: Project, isHidden: boolean) => {
    if (!isHidden) {
      setSelectedProject(project);
      setCurrentImageIndex(0); // Reset to first image
    }
  };

  const nextImage = () => {
    if (!selectedProject) return;
    const images = selectedProject.galleryImages || [selectedProject.imageUrl];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    const images = selectedProject.galleryImages || [selectedProject.imageUrl];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
      if (selectedProject) {
         if (e.key === 'ArrowRight') nextImage();
         if (e.key === 'ArrowLeft') prevImage();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject, currentImageIndex]);

  // Helper to get current images safely
  const currentGallery = selectedProject 
    ? (selectedProject.galleryImages || [selectedProject.imageUrl]) 
    : [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {PROJECTS.map((project) => {
          const isHidden = project.isLocked && status !== EncryptionStatus.UNLOCKED;

          return (
            <div 
              key={project.id} 
              onClick={() => handleCardClick(project, isHidden)}
              className={`group relative overflow-hidden bg-[#D1D4D9] border border-node-text/5 aspect-[4/3] shadow-sm transition-all duration-500
                ${!isHidden ? 'cursor-pointer hover:shadow-lg hover:border-node-text/30' : ''}`}
            >
              {/* Image Layer */}
              <div className={`w-full h-full transition-all duration-700 ease-in-out ${isHidden ? 'blur-md scale-105 opacity-20' : 'blur-0 scale-100 opacity-90 group-hover:scale-105 group-hover:opacity-100'}`}>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700"
                />
              </div>

              {/* Overlay Content */}
              <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity ${isHidden ? 'opacity-50' : 'bg-gradient-to-t from-[#E3E5E8] via-[#E3E5E8]/60 to-transparent opacity-100'}`}>
                 <span className="text-[9px] font-mono text-node-muted mb-2 uppercase tracking-widest">{project.category}</span>
                 <div className="flex items-center justify-between">
                   <h3 className="text-base font-light tracking-wide text-node-text">{project.title}</h3>
                   {project.isLocked && status === EncryptionStatus.LOCKED ? (
                     <Lock className="w-3 h-3 text-node-muted" />
                   ) : (
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-node-text -translate-x-2 group-hover:translate-x-0" />
                   )}
                 </div>
              </div>

              {/* Lock Overlay (Frosted Industrial Glass) */}
              {isHidden && (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#E3E5E8]/80 backdrop-blur-sm z-10 p-6"
                  onClick={(e) => e.stopPropagation()} // Prevent unlocking click from opening modal
                >
                   {status === EncryptionStatus.UNLOCKING ? (
                     <div className="animate-pulse font-mono text-[9px] tracking-widest text-node-text">DECRYPTING...</div>
                   ) : (
                      <div className="text-center w-full max-w-xs">
                          <Lock className="w-5 h-5 mx-auto mb-3 text-node-text/30" />
                          <p className="font-mono text-[9px] text-node-text/30 mb-3 tracking-wider">RESTRICTED</p>
                          <form onSubmit={handleUnlock} className="flex border-b border-node-text/10 focus-within:border-node-text/50 transition-colors">
                             <input 
                               type="password" 
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="KEY"
                               className="bg-transparent border-none outline-none text-node-text text-[10px] font-mono py-2 w-full placeholder:text-node-text/20"
                             />
                             <button type="submit" className="text-node-text/40 hover:text-node-text transition-colors">
                               <Unlock className="w-3 h-3" />
                             </button>
                          </form>
                          {status === EncryptionStatus.ERROR && (
                            <p className="text-red-600 font-mono text-[9px] mt-2 tracking-widest">DENIED</p>
                          )}
                      </div>
                   )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-node-bg/90 backdrop-blur-md transition-opacity" 
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative bg-[#E3E5E8] w-full max-w-7xl h-[90vh] shadow-2xl border border-node-text/10 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-node-text/5 bg-[#E3E5E8] shrink-0 z-20">
               <div>
                  <span className="text-[10px] font-mono text-node-muted uppercase tracking-widest block mb-1">{selectedProject.category}</span>
                  <h2 className="text-lg md:text-xl font-light text-node-text tracking-wide">{selectedProject.title}</h2>
               </div>
               <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-node-text/5 rounded-full transition-colors"
               >
                 <X className="w-5 h-5 text-node-text" />
               </button>
            </div>

            {/* Main Content - Flex Column to fill height without scrollbar */}
            <div className="flex-1 flex flex-col min-h-0 relative group/carousel">
               
               {/* Image Area - Flex-1 to take available space, object-contain for full visibility */}
               <div className="flex-1 relative bg-[#D1D4D9]/20 w-full flex items-center justify-center overflow-hidden">
                  <img 
                    key={currentImageIndex} 
                    src={currentGallery[currentImageIndex]} 
                    alt={`${selectedProject.title} - ${currentImageIndex}`} 
                    className="max-w-full max-h-full w-full h-full object-contain animate-in fade-in duration-300" 
                  />

                  {/* Navigation Arrows */}
                  {currentGallery.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-node-bg/10 hover:bg-node-bg/80 backdrop-blur-sm text-node-text border border-node-text/10 transition-all opacity-0 group-hover/carousel:opacity-100"
                      >
                         <ChevronLeft className="w-6 h-6" />
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-node-bg/10 hover:bg-node-bg/80 backdrop-blur-sm text-node-text border border-node-text/10 transition-all opacity-0 group-hover/carousel:opacity-100"
                      >
                         <ChevronRight className="w-6 h-6" />
                      </button>

                      {/* Counter */}
                      <div className="absolute bottom-4 right-4 bg-node-bg/80 backdrop-blur-md px-3 py-1 rounded-full border border-node-text/10 text-xs font-mono text-node-text opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                          {currentImageIndex + 1} / {currentGallery.length}
                      </div>
                    </>
                  )}
               </div>

               {/* Footer Description - Fixed height at bottom */}
               <div className="w-full bg-[#E3E5E8] border-t border-node-text/5 p-6 text-center shrink-0 z-20 flex flex-col items-center gap-4">
                  <p className="text-sm text-node-text/80 font-light max-w-4xl mx-auto leading-relaxed">
                    {selectedProject.description || "No description available."}
                  </p>
                  
                  {/* External Link */}
                  {selectedProject.link && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-node-muted border-b border-transparent hover:border-node-muted/50 transition-colors pb-0.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View External Media
                    </a>
                  )}
               </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EncryptedPortfolio;