import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Medal, Target, Zap, Crown, Star } from "lucide-react";

export function AchievementsSection() {
  const majorAchievements = [
    {
      title: "IX Спринт - Топ-19!",
      description: "Ура! Завершился IX спринт 🎉\n\nПодведены итоги!\n— Наша команда Rise активно принимала участие на IX спринте, представляя наш славный клан «_RBC_».\n\n💪 Итоги:\n— Мы вошли в топ-19, блестяще справившись со всеми задачами!\n\n🤝 Спасибо всем соперникам за хорошие бои!\n— Отдельное спасибо каждому участнику",
      date: "Январь 2025",
      icon: Medal,
      rarity: "legendary",
      isSpecial: true
    },
    {
      title: "Непобедимые",
      description: "15 побед подряд в клановых боях",
      date: "Ноябрь 2024",
      icon: Trophy,
      rarity: "epic"
    },
    {
      title: "Мастера тактики",
      description: "Идеальная координация в 10 боях",
      date: "Октябрь 2024",
      icon: Target,
      rarity: "rare"
    }
  ];

  const recentAchievements = [
    { title: "Победители недели", description: "Лучший клан недели", icon: Medal },
    { title: "Быстрая атака", description: "Победа за 3 минуты", icon: Zap },
    { title: "Командная работа", description: "0 потерь в бою", icon: Star },
    { title: "Снайперы", description: "90% попаданий команды", icon: Target },
    { title: "Оборона", description: "Успешная защита базы", icon: Trophy },
    { title: "Разведка", description: "Обнаружение всех врагов", icon: Star }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-amber-500 to-orange-500';
      case 'epic': return 'from-purple-400 via-pink-500 to-red-500';
      case 'rare': return 'from-blue-400 via-cyan-500 to-teal-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/50 hover:border-amber-400/70';
      case 'epic': return 'border-purple-400/50 hover:border-pink-400/70';
      case 'rare': return 'border-blue-400/50 hover:border-cyan-400/70';
      default: return 'border-gray-400/50';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-4"></div>
          <h3 className="text-3xl bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
            Главные достижения
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {majorAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const isSpecial = achievement.isSpecial;
            return (
              <Card key={index} className={`relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border ${getRarityBorder(achievement.rarity)} transform hover:scale-[1.02] ${isSpecial ? 'md:col-span-3 lg:col-span-2' : ''}`}>
                {/* Декоративные элементы */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getRarityColor(achievement.rarity)}/20 group-hover:opacity-40 rounded-full blur-3xl transition-all duration-700 -translate-y-16 translate-x-16`}></div>
                <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${getRarityColor(achievement.rarity)}/15 group-hover:opacity-30 rounded-full blur-xl transition-all duration-700 translate-y-10 -translate-x-10`}></div>
                
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    <Badge className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                      {achievement.date}
                    </Badge>
                  </div>
                  
                  <h4 className="text-2xl text-gray-900 group-hover:text-white transition-colors duration-500 mb-4">
                    {achievement.title}
                  </h4>
                  
                  {isSpecial ? (
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 group-hover:from-yellow-900/30 group-hover:to-orange-900/30 rounded-lg border-l-4 border-yellow-500 group-hover:border-amber-400 transition-all duration-500 mb-4">
                      <div className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 text-sm leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                        {achievement.description}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gradient-to-r from-gray-100 to-blue-50 group-hover:from-gray-800/50 group-hover:to-blue-900/50 rounded-lg border-l-4 border-blue-500 group-hover:border-cyan-400 transition-all duration-500">
                      <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-4"></div>
          <h3 className="text-3xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Недавние достижения
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const gradients = [
              'from-blue-500 to-purple-500',
              'from-purple-500 to-pink-500',
              'from-pink-500 to-red-500',
              'from-red-500 to-orange-500',
              'from-orange-500 to-yellow-500',
              'from-yellow-500 to-green-500'
            ];
            return (
              <Card key={index} className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900 transition-all duration-500 group shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-400/50 transform hover:scale-105">
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${gradients[index % 6]}/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-500 -translate-y-8 translate-x-8`}></div>
                
                <div className="relative p-4 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % 6]} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="text-gray-900 group-hover:text-white transition-colors duration-500 text-sm mb-2">
                    {achievement.title}
                  </h5>
                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-xs leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-4"></div>
          <h3 className="text-3xl bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
            Статистика команды
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 hover:from-gray-900 hover:via-blue-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-blue-500/50 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
            <div className="relative p-6 text-center">
              <div className="text-4xl bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:from-cyan-400 group-hover:to-blue-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                847
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Всего побед
              </p>
            </div>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50 hover:from-gray-900 hover:via-green-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-green-500/50 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
            <div className="relative p-6 text-center">
              <div className="text-4xl bg-gradient-to-r from-green-500 to-emerald-500 group-hover:from-emerald-400 group-hover:to-green-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                73%
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Процент побед
              </p>
            </div>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-yellow-50 hover:from-gray-900 hover:via-yellow-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-yellow-500/50 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
            <div className="relative p-6 text-center">
              <div className="text-4xl bg-gradient-to-r from-yellow-500 to-amber-500 group-hover:from-amber-400 group-hover:to-yellow-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                156
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Достижений
              </p>
            </div>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-purple-50 hover:from-gray-900 hover:via-purple-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-purple-500/50 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
            <div className="relative p-6 text-center">
              <div className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500 group-hover:from-pink-400 group-hover:to-purple-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                2,847
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Рейтинг
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}