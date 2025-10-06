import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Header } from "./components/Header";
import { ClanSection } from "./components/ClanSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { PlayersSection } from "./components/PlayersSection";
import { MerchSection } from "./components/MerchSection";
import { TacticalBoard } from "./components/TacticalBoard";
import {
  Users,
  Trophy,
  Medal,
  ShoppingBag,
  Map,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("clan");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-gradient-to-r from-gray-800/90 via-gray-900/90 to-gray-800/90 border border-gray-600/50 backdrop-blur-sm rounded-2xl shadow-2xl p-1">
            <TabsTrigger
              value="clan"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-[14px] transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-gray-300 hover:text-white hover:bg-gray-700/50 min-h-[56px]"
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Клан</span>
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-[14px] transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-gray-300 hover:text-white hover:bg-gray-700/50 min-h-[56px]"
            >
              <Trophy className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Достижения</span>
            </TabsTrigger>
            <TabsTrigger
              value="players"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-[14px] transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-gray-300 hover:text-white hover:bg-gray-700/50 min-h-[56px]"
            >
              <Medal className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Игроки</span>
            </TabsTrigger>
            <TabsTrigger
              value="merch"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-[14px] transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-gray-300 hover:text-white hover:bg-gray-700/50 min-h-[56px]"
            >
              <ShoppingBag className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Мерч</span>
            </TabsTrigger>
            <TabsTrigger
              value="tactical"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-[14px] transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 text-gray-300 hover:text-white hover:bg-gray-700/50 min-h-[56px]"
            >
              <Map className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Тактика</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clan" className="space-y-6">
            <ClanSection onNavigateToPlayers={() => setActiveTab("players")} />
          </TabsContent>

          <TabsContent
            value="achievements"
            className="space-y-6"
          >
            <AchievementsSection />
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            <PlayersSection />
          </TabsContent>

          <TabsContent value="merch" className="space-y-6">
            <MerchSection />
          </TabsContent>

          <TabsContent value="tactical" className="space-y-6">
            <TacticalBoard />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="relative bg-gradient-to-r from-gray-900 via-blue-900/50 to-gray-900 border-t border-gray-700/50 py-8 mt-16 overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-48"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-4">
            <p className="text-gray-200 text-lg bg-gradient-to-r from-gray-200 to-blue-300 bg-clip-text text-transparent">
              © 2025 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">RISE Team</span>. Все права защищены.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-700/50">
            <p className="text-gray-400 text-sm">
              Мир танков - онлайн игра компании <span className="text-blue-400">Lesta Games</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}