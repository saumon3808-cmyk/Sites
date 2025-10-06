import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Construction, Package, Shirt, Coffee, MousePointer } from "lucide-react";

export function MerchSection() {
  const upcomingMerch = [
    {
      title: "Футболки команды",
      description: "Официальные футболки с логотипом Rise",
      icon: Shirt,
      status: "Скоро",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Игровые коврики",
      description: "Профессиональные коврики для мыши",
      icon: MousePointer,
      status: "В планах",
      gradient: "from-green-500 to-blue-500"
    },
    {
      title: "Кружки",
      description: "Термокружки с символикой команды",
      icon: Coffee,
      status: "В планах",
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Набор стикеров",
      description: "Коллекция стикеров с логотипом",
      icon: Package,
      status: "Скоро",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="relative text-center py-16 bg-gradient-to-br from-gray-900/50 via-blue-900/30 to-purple-900/50 rounded-3xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-amber-500/10 to-red-500/10 rounded-full blur-2xl translate-x-32 translate-y-32"></div>
        
        <div className="relative z-10">
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-30"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto border-4 border-white/20 group-hover:border-blue-400/50 transition-all duration-500 transform group-hover:scale-110">
              <Construction className="w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
          </div>
          
          <h3 className="text-4xl bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 hover:from-blue-300 hover:to-purple-300 transition-all duration-500">
            Магазин в разработке
          </h3>
          
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Мы работаем над созданием официального магазина мерча команды <span className="text-blue-400 font-medium">Rise</span>. 
            Скоро здесь появятся эксклюзивные товары с символикой нашей команды.
          </p>
          
          <div className="inline-block">
            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 text-lg px-6 py-3">
              Запуск планируется на январь 2025
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-4"></div>
          <h3 className="text-3xl bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Запланированные товары
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingMerch.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-purple-500/50 transform hover:scale-105 opacity-90 hover:opacity-100">
                {/* Декоративные элементы */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient}/20 group-hover:opacity-40 rounded-full blur-2xl transition-all duration-700 -translate-y-12 translate-x-12`}></div>
                
                <div className="relative p-6 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transform group-hover:scale-110 transition-all duration-500`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h4 className="text-gray-900 group-hover:text-white transition-colors duration-500 text-lg mb-3">
                    {item.title}
                  </h4>
                  
                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <Badge className={`bg-gradient-to-r ${item.gradient} text-white shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                    {item.status}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90 border border-blue-500/50 shadow-2xl backdrop-blur-sm">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500/20 to-red-500/20 rounded-full blur-2xl translate-x-16 translate-y-16"></div>
        
        <div className="relative p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-4"></div>
            <h4 className="text-2xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Хотите быть в курсе?
            </h4>
          </div>
          
          <p className="text-gray-200 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Подпишитесь на уведомления о запуске магазина и будьте первыми, кто узнает о новых товарах!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Ваш email" 
              className="flex-1 px-6 py-4 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-all duration-300"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl">
              Подписаться
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 hover:from-gray-900 hover:via-blue-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-blue-500/50 transform hover:scale-105">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
          <div className="relative p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-500">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h5 className="text-gray-900 group-hover:text-white transition-colors duration-500 text-lg mb-2">
              Быстрая доставка
            </h5>
            <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500">
              По всей России
            </p>
          </div>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50 hover:from-gray-900 hover:via-green-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-green-500/50 transform hover:scale-105">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
          <div className="relative p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-500">
              <Shirt className="w-8 h-8 text-white" />
            </div>
            <h5 className="text-gray-900 group-hover:text-white transition-colors duration-500 text-lg mb-2">
              Качественные материалы
            </h5>
            <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500">
              Проверенные поставщики
            </p>
          </div>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-purple-50 hover:from-gray-900 hover:via-purple-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-purple-500/50 transform hover:scale-105">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
          <div className="relative p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-500">
              <span className="text-2xl text-white">%</span>
            </div>
            <h5 className="text-gray-900 group-hover:text-white transition-colors duration-500 text-lg mb-2">
              Скидки участникам
            </h5>
            <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500">
              Специальные предложения для клана
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}