import { ImageWithFallback } from "./figma/ImageWithFallback";
import teamLogo from 'figma:asset/ef0778ad96b86dbbe0966332ad4b9c60466503b1.png';
import { TelegramIcon, VKIcon } from "./SocialIcons";

export function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 text-white py-8 px-4 shadow-2xl">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl translate-x-32 translate-y-32"></div>
      
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-500 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-75"></div>
            <ImageWithFallback 
              src={teamLogo} 
              alt="Team Logo" 
              className="relative w-16 h-16 rounded-full border-2 border-white/20 group-hover:border-amber-400/50 transition-all duration-300 transform group-hover:scale-110" 
            />
          </div>
          <div>
            <h1 className="text-4xl bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent mb-1 hover:from-amber-300 hover:to-red-300 transition-all duration-500">
              RISE
            </h1>
            <p className="text-blue-200 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent hover:from-amber-200 hover:to-red-200 transition-all duration-500">
              Киберспортивная команда
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-lg border border-white/20 hover:border-amber-400/50 transition-all duration-300">
              <p className="text-amber-200 font-medium">Мир Танков</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="https://t.me/Rise_MT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border border-white/20 hover:border-blue-300/50"
              title="Telegram канал команды"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <TelegramIcon className="relative w-5 h-5 text-white group-hover:text-blue-100 transition-colors duration-300" />
            </a>
            
            <a 
              href="https://vk.com/risemt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border border-white/20 hover:border-purple-300/50"
              title="ВКонтакте команды"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <VKIcon className="relative w-5 h-5 text-white group-hover:text-purple-100 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}