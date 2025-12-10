import React from 'react';
import HeroScene from './components/HeroScene';
import EncryptedPortfolio from './components/EncryptedPortfolio';
import { ArrowDown, Infinity as InfinityIcon } from 'lucide-react';

const App: React.FC = () => {
  const slogan = "where nodes meet, forms emerge.";
  const sloganJp = "点が結び、形が生まれる場所。";

  return (
    <main className="relative min-h-screen bg-node-bg text-node-text selection:bg-[#1F2937] selection:text-[#FFFFFF] font-sans">
      
      {/* Global Grain/Noise Overlay */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.4] bg-noise mix-blend-overlay"></div>

      {/* Header / Logo */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 text-node-text pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto w-fit">
          {/* Logo: Infinity with a line through it */}
          <div className="relative flex items-center justify-center w-6 h-4">
             <InfinityIcon className="w-5 h-5 text-node-text" strokeWidth={1.5} />
             <div className="absolute w-full h-[1px] bg-node-text rounded-full"></div>
          </div>
          <span className="text-lg font-bold tracking-tighter pl-2 text-node-text">node</span>
        </div>
      </header>

      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <HeroScene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-24 pointer-events-none">
        <div className="max-w-4xl pointer-events-auto mt-20">
          <h1 className="text-3xl md:text-5xl font-light tracking-tighter leading-tight mb-6 text-node-text">
            {slogan}
          </h1>
          <p className="text-sm md:text-base font-light text-node-muted tracking-wide mb-10">
            {sloganJp}
          </p>

          <div className="h-px w-12 bg-node-text/20 mb-10"></div>

          <div className="animate-bounce absolute bottom-12 left-6 md:left-24 opacity-60 text-node-text">
             <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* About & Services Section - Sticky Layout */}
      <section className="relative z-10 bg-[#E3E5E8]/90 backdrop-blur-xl border-t border-node-text/5">
        <div className="max-w-7xl mx-auto px-6 md:px-24 pt-20 pb-32 md:pt-24 md:pb-48">
          <div className="grid md:grid-cols-[240px_1fr] gap-12">
            
            {/* Sticky Title Column */}
            <div className="hidden md:block">
              <div className="sticky top-32">
                <h2 className="text-xl md:text-2xl font-light text-node-text">About us</h2>
              </div>
            </div>
            {/* Mobile Title */}
            <div className="md:hidden mb-8">
               <h2 className="text-xl font-light text-node-text">About us</h2>
            </div>

            {/* Scrollable Content Column */}
            <div className="space-y-24">
              
              {/* Description */}
              <div className="max-w-3xl">
                <p className="text-sm text-node-text/90 leading-loose font-light">
                  nodeは、3Dデザイナー、インダストリアルデザイナー、プログラマー、VJ、プロデューサーで構成されたクロスディシプリンなチームです。<br className="hidden md:block" />
                  デジタルとフィジカルのあいだにある「点」をつなぎ、体験として立ち上がる「形」をつくり出します。
                </p>
              </div>

              {/* Services Grid (Part of 'About us' section visually so title stays sticky) */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 border-t border-node-text/10 pt-12">
                <div className="space-y-4 group">
                  <h3 className="text-sm font-bold text-node-text border-b border-node-text/20 pb-2 group-hover:border-node-text transition-colors">
                    3Dモデリング・レンダリング
                  </h3>
                  <p className="text-xs md:text-sm text-node-text/80 leading-relaxed font-light">
                    静止画からアニメーションまで、造形や質感を丁寧に表現します。コンセプト段階から最終ビジュアルまで、一貫したクオリティで制作します。
                  </p>
                </div>

                <div className="space-y-4 group">
                  <h3 className="text-sm font-bold text-node-text border-b border-node-text/20 pb-2 group-hover:border-node-text transition-colors">
                    3Dプリント
                  </h3>
                  <p className="text-xs md:text-sm text-node-text/80 leading-relaxed font-light">
                    デジタルモデルを立体物として出力し、アイデアを触れられる形へ具現化します。試作、展示用モデル、小ロット制作まで対応可能です。
                  </p>
                </div>

                <div className="space-y-4 group">
                  <h3 className="text-sm font-bold text-node-text border-b border-node-text/20 pb-2 group-hover:border-node-text transition-colors">
                    VJ／インタラクティブ
                  </h3>
                  <p className="text-xs md:text-sm text-node-text/80 leading-relaxed font-light">
                    リアルタイムビジュアル、音楽との連動演出、空間インタラクションなど、デジタル表現を中心とした体験づくりを行います。
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Works / Portfolio - Sticky Layout */}
      <section className="relative z-10 bg-node-bg border-t border-node-text/5">
         <div className="max-w-7xl mx-auto px-6 md:px-24 py-32 md:py-48">
            <div className="grid md:grid-cols-[240px_1fr] gap-12">
               
               {/* Sticky Title Column */}
               <div className="hidden md:block">
                  <div className="sticky top-32">
                    <h2 className="text-xl md:text-2xl font-light text-node-text">Works</h2>
                  </div>
               </div>
               {/* Mobile Title */}
               <div className="md:hidden mb-8">
                   <h2 className="text-xl font-light text-node-text">Works</h2>
               </div>

               {/* Portfolio Grid */}
               <div className="w-full">
                  <EncryptedPortfolio />
               </div>

            </div>
         </div>
      </section>

      {/* Contact */}
      <section className="relative z-10 bg-[#E3E5E8] py-48 px-6 md:px-24 border-t border-node-text/5">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-8 text-node-text">
             Let's link the nodes.
           </h2>
           <a href="mailto:kanshin404@gmail.com" className="inline-block text-base md:text-lg text-node-text border-b border-node-text/20 hover:border-node-text pb-1 transition-colors font-light">
             kanshin404@gmail.com
           </a>
        </div>
      </section>

    </main>
  );
};

export default App;