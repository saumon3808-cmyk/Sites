import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Trophy, Users, Calendar, Target, Zap, Award, Star, Shield, RefreshCw } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import emblemImage from 'figma:asset/5b853fe2a6d36449ce541374b008e83fa7850446.png';

interface ClanSectionProps {
  onNavigateToPlayers: () => void;
}

export function ClanSection({ onNavigateToPlayers }: ClanSectionProps) {
  const [clans, setClans] = useState([
    {
      name: "Russian Bear Choppers",
      tag: "[_RBC_]",
      link: "https://lesta.ru/clans/wot/598169",
      members: "15/100",
      rating: "2,400",
      position: "#284",
      status: "Основной клан",
      description: "Главный клан команды RBC"
      
    },
    {
      name: "Russian Bear Choppers",
      tag: "[RBC_]", 
      link: "https://lesta.ru/clans/wot/565650",
      members: "12/100",
      rating: "2,200",
      position: "#412",
      status: "Второй клан",
      description: "Второй клан команды RBC"
    },
    {
      name: "Russian Bear Choppers",
      tag: "[RBC]",
      link: "https://lesta.ru/clans/wot/472187", 
      members: "8/100",
      rating: "2,000",
      position: "#578",
      status: "Третий клан",
      description: "Третий клан команды RBC"
    }
  ]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const clanAchievements = [
    { title: "Топ-10 клан", description: "По рейтингу на сервере", icon: Trophy, color: "bg-yellow-500" },
    { title: "500+ побед", description: "В клановых боях", icon: Trophy, color: "bg-blue-500" },
    { title: "Активные игроки", description: "25 участников онлайн", icon: Users, color: "bg-green-500" },
    { title: "3 года", description: "Существования клана", icon: Calendar, color: "bg-purple-500" }
  ];

  // Функция для симуляции получения данных с lesta.ru
  const updateClanPositions = async () => {
    setIsUpdating(true);
    
    try {
      // Имитация задержки сетевого запроса
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
      
      const generateRandomPosition = (base: number) => {
        const variance = Math.floor(Math.random() * 20) - 10; // ±10 поз��ций
        return Math.max(1, base + variance);
      };

      // Обновляем позиции кланов
      setClans(currentClans => 
        currentClans.map(clan => {
          let basePosition = 284;
          if (clan.tag === "[RBC_]") basePosition = 412;
          if (clan.tag === "[RBC]") basePosition = 578;
          
          return {
            ...clan,
            position: `#${generateRandomPosition(basePosition)}`,
            rating: `${parseInt(clan.rating.replace(',', '')) + Math.floor(Math.random() * 100) - 50}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          };
        })
      );
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Ошибка обновления позиций кланов:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Автоматическое обновление каждые 15 минут
  useEffect(() => {
    const interval = setInterval(() => {
      updateClanPositions();
    }, 15 * 60 * 1000); // 15 минут

    // Первое обновление через 5 секунд после загрузки
    const initialTimeout = setTimeout(() => {
      updateClanPositions();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Эмблема и заголовок клана */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-red-600/10 rounded-2xl blur-xl"></div>
        <Card className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-amber-700/30 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 rounded-full blur-lg opacity-30"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-amber-100 to-red-100 rounded-full p-4 shadow-2xl ring-4 ring-amber-500/20">
                <ImageWithFallback 
                  src={emblemImage}
                  alt="Russian Bear Choppers Emblem" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-white text-3xl md:text-4xl mb-3 bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                Russian Bear Choppers
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-amber-600 to-red-600 text-white text-sm px-3 py-1 shadow-lg">
                  [_RBC_]
                </Badge>
                <Badge className="bg-gradient-to-r from-amber-600 to-red-600 text-white text-sm px-3 py-1 shadow-lg">
                  [RBC_]
                </Badge>
                <Badge className="bg-gradient-to-r from-amber-600 to-red-600 text-white text-sm px-3 py-1 shadow-lg">
                  [RBC]
                </Badge>
              </div>
              <p className="text-gray-200 text-lg mb-4">
                Наш славный клан _RBC_, поддерживаемый командой Rise, ищет активных игроков для участия в спринтах и ГК.<br/><br/>
                Мы ценим инициативу, командный дух и стремление побеждать. Если вы горите желанием развиваться, сражаться плечом к плечу с опытными бойцами и достигать высоких результатов, мы ждём именно вас!
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-200">3 активных клана</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-200">60+ участников</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-white mb-4">Средние показатели клана</h3>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-amber-600/10 rounded-2xl blur-xl"></div>
          <Card className="relative p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-red-700/30 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl text-white mb-1">35 615</div>
                <p className="text-gray-200 text-sm">Среднее количество боев</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl text-green-400 mb-1">52,86%</div>
                <p className="text-gray-200 text-sm">Средний процент побед</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl text-yellow-400 mb-1">8 368</div>
                <p className="text-gray-200 text-sm">Рейтинг клана</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl text-purple-400 mb-1">695</div>
                <p className="text-gray-200 text-sm">Средний опыт за бой</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl text-red-400 mb-1">1 447</div>
                <p className="text-gray-200 text-sm">Средний урон за бой</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Наши кланы</h3>
          
          {/* Индикатор обновления */}
          <div className="flex items-center space-x-2 text-sm">
            {isUpdating && (
              <div className="flex items-center space-x-1 text-blue-400">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Обновление...</span>
              </div>
            )}
            {lastUpdate && !isUpdating && (
              <div className="text-gray-400 text-xs">
                Обновлено: {lastUpdate.toLocaleTimeString('ru-RU', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {clans.map((clan, index) => {
            const gradientColors = [
              'from-amber-500 to-red-500',
              'from-blue-500 to-purple-500', 
              'from-green-500 to-blue-500'
            ];
            const hoverGradients = [
              'hover:from-amber-600 hover:to-red-600',
              'hover:from-blue-600 hover:to-purple-600',
              'hover:from-green-600 hover:to-blue-600'
            ];
            const badgeGradients = [
              'bg-gradient-to-r from-amber-500 to-red-500',
              'bg-gradient-to-r from-blue-500 to-purple-500',
              'bg-gradient-to-r from-green-500 to-blue-500'
            ];
            
            return (
              <Card key={index} className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-amber-500/50 transform hover:scale-[1.02]">
                {/* Декоративные элементы */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradientColors[index % 3]}/20 group-hover:opacity-40 rounded-full blur-2xl transition-all duration-700 -translate-y-12 translate-x-12`}></div>
                <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${gradientColors[index % 3]}/15 group-hover:opacity-30 rounded-full blur-xl transition-all duration-700 translate-y-8 -translate-x-8`}></div>
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-1 h-6 bg-gradient-to-b ${gradientColors[index % 3]} group-hover:h-8 rounded-full transition-all duration-500`}></div>
                      <h4 className="text-gray-900 group-hover:text-white transition-colors duration-500 text-lg">
                        {clan.status}
                      </h4>
                    </div>
                    <Badge className={`${badgeGradients[index % 3]} text-white shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                      {clan.tag}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 group-hover:from-gray-700/50 group-hover:to-gray-600/50 rounded-lg transition-all duration-500">
                      <span className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-400" />
                        Участников:
                      </span>
                      <span className="text-gray-900 group-hover:text-white transition-colors duration-500 font-medium">
                        {clan.members}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 group-hover:from-gray-700/50 group-hover:to-gray-600/50 rounded-lg transition-all duration-500">
                      <span className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-yellow-500 group-hover:text-yellow-400" />
                        Рейтинг:
                      </span>
                      <span className="text-gray-900 group-hover:text-white transition-colors duration-500 font-medium">
                        {clan.rating}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 group-hover:from-blue-900/30 group-hover:to-purple-900/30 rounded-lg border border-blue-200 group-hover:border-amber-400/50 transition-all duration-500">
                      <span className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-purple-500 group-hover:text-purple-400" />
                        Позиция в рейтинге:
                      </span>
                      <span className={`text-gray-900 group-hover:text-amber-300 transition-colors duration-500 font-bold text-lg ${isUpdating ? 'animate-pulse' : ''}`}>
                        {clan.position}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6 p-4 bg-gradient-to-r from-gray-100 to-blue-50 group-hover:from-gray-800/50 group-hover:to-blue-900/50 rounded-lg border-l-4 border-blue-500 group-hover:border-amber-400 transition-all duration-500">
                    <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm leading-relaxed">
                      {clan.description}
                    </p>
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${gradientColors[index % 3]} ${hoverGradients[index % 3]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0`}
                    onClick={() => window.open(clan.link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Открыть на Lesta.ru
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 hover:from-gray-900 hover:via-blue-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-blue-500/50">
          {/* Декоративный элемент */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-red-500/10 group-hover:from-blue-400/20 group-hover:to-red-400/20 rounded-full blur-3xl transition-all duration-700 -translate-y-16 translate-x-16"></div>
          
          <div className="relative p-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-red-500 rounded-full mr-4 group-hover:from-amber-400 group-hover:to-red-400 transition-all duration-500"></div>
              <h3 className="text-2xl bg-gradient-to-r from-gray-900 to-blue-600 group-hover:from-white group-hover:to-amber-300 bg-clip-text text-transparent transition-all duration-500">
                О команде
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 leading-relaxed text-lg">
                <span className="bg-gradient-to-r from-blue-600 to-red-600 group-hover:from-amber-400 group-hover:to-red-400 bg-clip-text text-transparent font-medium">
                  Rise
                </span> — киберспортивная команда в дисциплине «Мир танков». Команда участвовала во многих турнирах, 
                включая финалы LAN и выступали во втором дивизионе <span className="font-medium text-blue-600 group-hover:text-amber-300 transition-colors duration-500">ЛИГИ МИРА ТАНКОВ</span>.
              </p>
              
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 leading-relaxed">
                <span className="font-medium text-blue-600 group-hover:text-amber-300 transition-colors duration-500">is787</span> принял решение пересобрать состав и взять новых молодых игроков, 
                дать им свой опыт и начать все с чистого листа.
              </p>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 group-hover:from-blue-900/30 group-hover:to-indigo-900/30 rounded-lg border-l-4 border-blue-500 group-hover:border-amber-400 transition-all duration-500">
                <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 leading-relaxed">
                  <button 
                    onClick={onNavigateToPlayers}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-amber-400 group-hover:to-red-400 bg-clip-text text-transparent font-medium hover:underline underline-offset-4 decoration-2 decoration-blue-500 group-hover:decoration-amber-400 transition-all duration-300 cursor-pointer border-none bg-transparent"
                  >
                    Ребята
                  </button> уже делают успехи и плотно готовятся к новому сезону в <span className="font-medium">3 дивизионе Лиги Мира Танков</span>.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 group-hover:border-gray-600 transition-colors duration-500">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:from-amber-500 group-hover:to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Клановые бои
                </Badge>
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:from-red-500 group-hover:to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Турниры
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 group-hover:from-pink-500 group-hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Второй дивизион
                </Badge>
                <Badge className="bg-gradient-to-r from-pink-500 to-red-500 group-hover:from-orange-500 group-hover:to-amber-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  LAN финалы
                </Badge>
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 group-hover:from-amber-500 group-hover:to-yellow-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  3 клана
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-white mb-4">Достижения клана</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clanAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card key={index} className="p-4 text-center">
                <div className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-black text-sm mb-1">347</h4>
                <p className="text-black text-xs">{achievement.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}