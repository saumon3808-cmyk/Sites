import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Star, Crown, Shield, Sword, Target, Users, Headphones, Settings, Heart, Calendar, Trophy, Gamepad2 } from "lucide-react";
import { TelegramIcon, VKIcon } from "./SocialIcons";

export function PlayersSection() {
  const playersData = {
    "Clown_Dracaris": {
      realName: "Даниил",
      age: 24,
      gameExperience: "с 2013 года",
      tournamentExperience: "1.5 года",
      favoriteTanks: ["Штурм Тигер", "ФВ4005", "ОБ-261"],
      favoriteMaps: ["Химки", "Утес"],
      dislikedMap: "Устричный Залив",
      dislikedTank: "Орсо",
      teamFocus: "Профессионализм, способность понимать и эффективно общаться, чтобы не возникало высокомерия и поддерживать позитивный моральный настрой. Всех игроков состава люблю и уважаю",
      teamQualities: "Отличное взаимодействие и соблюдение моральных норм. Да, иногда возникают трудности, но мы стараемся проявлять уважение к каждому игроку нашего состава. Если у кого-то возникают проблемы, мы всегда готовы помочь.",
      goals: "Да, мы много тренируемся и работаем над ошибками. У каждого игрока своя роль в команде."
    },
    "NlFRIL": {
      realName: "Никита",
      age: 19,
      gameExperience: "с 2016 года",
      tournamentExperience: "около 3-х лет",
      favoriteTanks: ["Орсо", "ИС-7"],
      favoriteMaps: ["Руинберг", "Химки", "Затерянный город"],
      dislikedMap: "Прохоровка",
      dislikedTank: "САУ",
      teamFocus: "На полное понимание и осознанность всего происходящего в команде, на отношения, выстроенные засчет взаимопонимания и уважения друг к другу. Любимчика выделить не могу, всех люблю и уважаю одинаково.",
      teamQualities: "Приятная атмосфера, никто не пытается кого-то загнобить, все прекрасно понимают зачем они здесь и почему. Сильным моментом выделил бы то, что мы понимаем как и сколько нужно работать, чтобы становится сильнее.",
      goals: "Конечно сможем, и в каком-то плане уже это сделали, осталось только выполнить поставленные задачи. Хороший капитан, знает свою задачу и неплохо с ней справляется. Из минусов отмечу что иногда верещит, если что-то пошло не так, а также частые проблемы с микрофоном. Из плюсов могу выделить хорошее доверие к своим ребятам, отличная работоспособность и полная осознанность того, что нужно делать, чтобы привести свою команду к успеху."
    },
    "lunch": {
      realName: "Паша",
      age: 18,
      gameExperience: "10 лет",
      tournamentExperience: "с рождения этих форматов",
      favoriteTanks: ["60 ТП"],
      favoriteMaps: ["Химмельсдорф", "Рудники", "Утес"],
      dislikedMap: "Прохоровка",
      dislikedTank: "Орсо, Арта",
      teamFocus: "Дисциплину, коммуникацию, хорошее знание аспектов игры. NIFRIL – Прикольный веселый парень, но любимчиков быть не может, поскольку интеллект каждого направлен на достижение одной цели.",
      teamQualities: "В этой команде я увидел, как по-настоящему выглядит здоровая и сильная команда. Меня впечатлила уникальная комбинация железной дисциплины, невероятного упорства и, что главное, — взаимного уважения. Здесь не боятся сложных целей, потому что каждый чувствует ответственность и поддержку со стороны команды. Это качественно новый для меня опыт. Команда Rise искренне восхищает, с какой внутренней дисциплиной и полной самоотдачей команда подходит к тренировкам. Это не просто «отбывание номера», а осознанная работа. И именно это, я уверен, — наш главный козырь для достижения любых целей.",
      goals: "Ребята уже полностью влились в свои роли и прекрасно справляются. Конечно, нам ещё многое предстоит отточить, но я вижу, с каким огнём в глазах команда смотрит вперёд. С такой верой в общее дело любые вершины нам по плечу. Главное — не сбавлять темп. Капитан — человек с характером: упорный, ответственный и с быстрой реакцией. Отрицательные стороны: Иногда бывает излишне строг. Та самая дисциплина может давить на некоторых игроков. Может быть резким в стрессовых ситуациях. Быстрое принятие решений иногда сопровождается эмоциональными всплесками."
    },
    "iNVooo": {
      realName: "Лев",
      age: 14,
      gameExperience: "Почти 3-й год",
      tournamentExperience: "1 год, до этого играл 15х15 формат с многими сильными полевыми получая опыт, после того как формат 15х15 умер я начал играть 7х7 формат и начал тренироват��ся.",
      favoriteTanks: ["EBR 105", "ИС-7", "ОБ.140", "Wilk"],
      favoriteMaps: ["Химмельсдорф"],
      dislikedMap: "В турнирном формате это Утес, а так это Хайвей",
      dislikedTank: "Все танки САУ",
      tournamentStart: "Приглашали в команды, я тренировался учился чему то но прям большого какого то опыта нету. Молодой еще все впереди, жалко что не могу играть в данный момент из-за своего возраста...",
      teamFocus: "Прошёл совсем небольшой промежуток времени, но уже можно заметить хорошее общение друг с другом. С самого начала могли быть какие-то проблемы в составе в общение и координации друг друга, но сейчас команда демонстрирует высокий моральный дух и отличную тренированность. Каждый день проводится разбор ошибок, что позволяет игрокам становиться сильнее и увереннее и не совершать своих ошибок повторно. Я надеюсь что эти ребята добьются многого в игре и будут показывать высокий уровень в команде RISE. Какого-то игрока лично я подметить не могу все по своему хороши. Мне лично все в каждом игроке нравится ❤",
      teamQualities: "Взаимодействие в команде может быть разным: ребята могут и посмеяться, и проявить серьёзность в зависимости от ситуации. В сложных моментах они умеют взят себя в руки, но иногда что-то идёт не так. Однако это пока только турниры 7х7 и тренировки, и у команды небольшой опыт. Думаю, скоро они смогут показать свой настоящий уровень, который сейчас видят только они сами, а другие игроки воспринимают совсем по другому т.к не видят много всего. Я рад что ребята По-своему хороши"
    },
    "PbI6A_XEK": {
      realName: "Сергей",
      age: 24,
      gameExperience: "10-11 лет",
      tournamentExperience: "6-7 лет абс формат 15х15 в топовых стаках/кланах, с 2017 формат 3х3, с 2023 формат 7х7",
      favoriteTanks: ["Jagdpanzer E-100"],
      favoriteMaps: ["Химмельсдорф"],
      dislikedMap: "Прохоровка",
      dislikedTank: "Концепты в натиске с расходками на 500",
      tournamentStart: "В 7х7 играю около 2 лет, за это время два раза был в шаге от 3 лиги, но команда не позволила воплотить мои амбиции, поэтому я оказался здесь",
      teamFocus: "Максимальный голос в боях, координация между игроками. Зачастую бои и выигрываются этим общением. Так же, важно принимать максимально правильные решения в трудных боях и моментах. Много встречал хороших игроков, которые в стрессовых и важных моментах боя совершали фатальные ошибки. Поэтому самым важным качеством для игрока считаю - стрессоустойчивость. Этого не хватает многим игрокам играющих формат 7х7. Не могу выделить любимого игрока в составе.",
      teamQualities: "Организованность, дисциплина, профессиональный подход к тренировкам. Эти моменты и выделил бы как сильные. Какие новые качества вы обнаружили в данном коллективе, которых раньше не замечали в других командах? Какие моменты внутри команды вы бы выделили как сильные? Организованн��сть, дисциплина, профессиональный подход к тренировкам.",
      goals: "Да, роли уже +- для каждого распределены, каждый вполне справляется с ними. Думаю задачи, которые мы планируем вполне реальны и осуществимы, нужно больше работать и успех неизбежен. Хороши�� крепкий капитан, благодаря ему в команде есть такая серьезная дисциплина, и отношение к делу, отрицательных сторон не вижу."
    },
    "is787": {
      realName: "Артем",
      age: 25,
      gameExperience: "с 2012 года",
      tournamentExperience: "с 2014-2015 года",
      favoriteTanks: ["Информация не указана"],
      favoriteMaps: ["Информация не указана"],
      dislikedMap: "Информация не указана",
      dislikedTank: "Информация не указана",
      teamFocus: "Первое, на что я бы обратил внимание новичков — это наша дисциплина и рабочий подход. Мы здесь не просто играем, мы работаем на результат. Важно сразу погрузиться в аналитику, быть открытым к критике и не бояться задавать вопросы. Что касается любимого игрока... Мне не положено иметь фаворитов. Ценю каждого за уникальный вклад. Но особенно я уважаю игроков с высоким игровым IQ — тех, кто не только ме��анически выполняет свою роль, но и постоянно думает над улучшением стратегии, помогает тиммейтам и берет на себя ответственность в ключевые моменты. У нас такие есть, и они задают тон всей команде.",
      teamQualities: "Раньше я часто сталкивался с тем, что команды работают как набор талантливых индивидов. Здесь же я с первого дня заметил естественную синергию. Ребята не просто играют вместе — они мыслят как одно целое. Это проявляется в мелочах: в том, как они быстро находят общий язык в дискуссиях, как без лишних слов страхуют друг друга в нестандартных ситуациях на карте. Самоорганизация  многие рутинные процессы, такие как разбор ошибок или совместный просмотр демо, ребята организуют сами, без моего прямого указания. Это бесценно. Здоровая атмосфера — проигрыши не вызывают ��стерик и поиска виноватых, а воспринимаются как источник новых данных для работы. А победы мотивируют еще больше.",
      goals: "Абсолютно уверен в этом. Выбор капитана был не случайным — этот человек, который обладает не только авторитетом, но и глубоким пониманием игры каждого члена команды. Мы уже провели несколько сессий по распределению ролей, где открыто обсуждали сильные и слабые стороны каждого. Задачи мы ставили вместе, и они абсолютно реалистичны. Это не просто «стать лучше», а конкретные цели, контролю карты и осв��ению новых стратегий на ближайшие турниры. Команда полностью доеряе�� апитану, а я со своей стороны обеспечиваю им создаю условия для работы. В целом, я вижу перед собой не просто группу талантливых ребят, а сплоченный механизм, который готов работать на результат. Моя задача — быть для них не только наставником, но и тем, кто направит их энергию в нужное русло."
    }
  };

  const mainTeam = [
    {
      id: 1,
      name: "Clown_Dracaris",
      role: "Капитан",
      status: "online",
      specialization: "Лидер команды",
      icon: Crown,
      rankColor: "text-yellow-400",
      isLeader: true
    },
    {
      id: 2,
      name: "NlFRIL",
      role: "Игрок",
      status: "online",
      specialization: "Основной состав",
      icon: Sword,
      rankColor: "text-blue-400"
    },
    {
      id: 3,
      name: "VSKirYsha",
      role: "Игрок",
      status: "offline",
      specialization: "Основной состав",
      icon: Shield,
      rankColor: "text-green-400"
    },
    {
      id: 4,
      name: "lunch",
      role: "Игрок",
      status: "online",
      specialization: "Основной состав",
      icon: Target,
      rankColor: "text-red-400"
    },
    {
      id: 5,
      name: "rolllz2",
      role: "Игрок",
      status: "online",
      specialization: "Основной состав",
      icon: Sword,
      rankColor: "text-purple-400"
    },
    {
      id: 6,
      name: "haiperock",
      role: "Игрок",
      status: "offline",
      specialization: "Основной состав",
      icon: Shield,
      rankColor: "text-cyan-400"
    },
    {
      id: 7,
      name: "Mabie",
      role: "Игрок",
      status: "online",
      specialization: "Основной состав",
      icon: Target,
      rankColor: "text-orange-400"
    },
    {
      id: 8,
      name: "PbI6A_XEK",
      role: "Игрок",
      status: "online",
      specialization: "Основной состав",
      icon: Star,
      rankColor: "text-pink-400"
    },
    {
      id: 9,
      name: "notreloaded",
      role: "Тренер",
      status: "online",
      specialization: "Тренерский состав",
      icon: Headphones,
      rankColor: "text-blue-400",
      isStaff: true
    }
  ];

  const staff = [
    {
      id: 10,
      name: "is787",
      role: "Менеджер",
      status: "online",
      description: "Менеджер команды",
      icon: Settings,
      rankColor: "text-yellow-400"
    },
    {
      id: 11,
      name: "iNVooo",
      role: "Менеджер²",
      status: "online",
      description: "Редактор групп VK и Telegram",
      note: "Из-за возраста нельзя игра��ь в лиге ближайшее время",
      icon: Users,
      rankColor: "text-purple-400"
    },
    {
      id: 12,
      name: "danyaalok",
      role: "Поддержка",
      status: "online",
      description: "Поддержка команды Rise, друг и просто хороший человек",
      icon: Star,
      rankColor: "text-green-400"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-green-500' : 'bg-gray-500';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Капитан': return 'bg-yellow-600';
      case 'Тренер': return 'bg-blue-600';
      case 'Менеджер': return 'bg-purple-600';
      case 'Менеджер²': return 'bg-purple-600';
      case 'Поддержка': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const renderPlayerModal = (player: any) => {
    const playerData = playersData[player.name as keyof typeof playersData];
    
    if (!playerData) {
      return (
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 border-blue-700/50 shadow-2xl">
          <DialogHeader className="pb-6 border-b border-blue-700/30">
            <DialogTitle className="text-white text-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              Профиль игрока
            </DialogTitle>
            <DialogDescription className="text-gray-200 text-lg">
              Информация о {player.name}
            </DialogDescription>
          </DialogHeader>
          <div className="p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-200 text-lg">Подробная информация пока недоступна</p>
            <p className="text-gray-300 text-sm mt-2">Скоро здесь появится больше информации об этом игроке</p>
          </div>
        </DialogContent>
      );
    }

    const isManager = player.role === 'Менеджер' || player.role === 'Менеджер²';
    const headerGradient = player.role === 'Капитан' 
      ? 'from-yellow-500 to-orange-500' 
      : isManager 
        ? 'from-purple-500 to-pink-500'
        : 'from-blue-500 to-cyan-500';

    return (
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 border-blue-700/50 shadow-2xl">
        <DialogHeader className="pb-8 border-b border-blue-700/30">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${headerGradient} rounded-full flex items-center justify-center shadow-lg`}>
              {player.role === 'Капитан' ? (
                <Crown className="w-8 h-8 text-white" />
              ) : isManager ? (
                <Settings className="w-8 h-8 text-white" />
              ) : (
                <Gamepad2 className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <DialogTitle className="text-white text-3xl mb-1">Немного о {player.name}</DialogTitle>
              <DialogDescription className="text-gray-300 text-lg">
                Подробная информация об участнике команды Rise
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-8 pt-6">
          {/* Основная информация */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <Card className="relative p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-blue-700/30 backdrop-blur-sm">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="relative">
                      <div className={`w-20 h-20 bg-gradient-to-r ${headerGradient} rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-500/20`}>
                        {player.role === 'Капитан' ? (
                          <Crown className="w-10 h-10 text-white" />
                        ) : isManager ? (
                          <Settings className="w-10 h-10 text-white" />
                        ) : (
                          <Gamepad2 className="w-10 h-10 text-white" />
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900"></div>
                    </div>
                    <div>
                      <h3 className="text-white text-2xl mb-2">{player.name}</h3>
                      <p className={`text-xl mb-2 ${player.role === 'Капитан' ? 'text-yellow-300' : isManager ? 'text-purple-300' : 'text-blue-300'}`}>
                        {playerData.realName}, {playerData.age} лет
                      </p>
                      <Badge className={`text-sm px-4 py-2 ${getRoleColor(player.role)} text-white shadow-lg`}>
                        {player.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 bg-blue-900/20 rounded-xl border border-blue-700/30">
                      <Calendar className="w-6 h-6 text-blue-400 mt-1" />
                      <div>
                        <p className="text-gray-300 text-lg mb-1">Игровой опыт</p>
                        <p className="text-white text-lg">{playerData.gameExperience}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-purple-900/20 rounded-xl border border-purple-700/30">
                      <Trophy className="w-6 h-6 text-purple-400 mt-1" />
                      <div>
                        <p className="text-gray-300 text-lg mb-1">Турнирный опыт</p>
                        <p className="text-white text-lg">{playerData.tournamentExperience}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Игровые предпочтения */}
                <div className="lg:pl-8 lg:border-l lg:border-blue-700/30">
                  <h5 className="text-white text-xl mb-6 flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-400" />
                    Игровые предпочтения
                  </h5>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-300 text-lg mb-3">Любимые танки:</p>
                      <div className="flex flex-wrap gap-2">
                        {playerData.favoriteTanks.map((tank, index) => (
                          <Badge key={index} variant="secondary" className="text-sm py-2 px-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-md">
                            {tank}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-300 text-lg mb-3">Любимые карты:</p>
                      <div className="flex flex-wrap gap-2">
                        {playerData.favoriteMaps.map((map, index) => (
                          <Badge key={index} variant="secondary" className="text-sm py-2 px-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 shadow-md">
                            {map}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-300 text-lg mb-3">Нелюбимые:</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm py-2 px-3 bg-gradient-to-r from-red-600 to-pink-600 text-white border-0 shadow-md">
                          {playerData.dislikedMap}
                        </Badge>
                        <Badge variant="secondary" className="text-sm py-2 px-3 bg-gradient-to-r from-red-600 to-pink-600 text-white border-0 shadow-md">
                          {playerData.dislikedTank}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Дополнительная информация */}
          {playerData.tournamentStart && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl"></div>
              <Card className="relative p-6 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-purple-700/30 backdrop-blur-sm">
                <h5 className="text-white text-xl mb-4 flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-purple-400" />
                  Как начинали играть турниры
                </h5>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {playerData.tournamentStart}
                </p>
              </Card>
            </div>
          )}

          {/* О команде */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-red-600/10 rounded-2xl blur-xl"></div>
            <Card className="relative p-6 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-pink-700/30 backdrop-blur-sm">
              <h5 className="text-white text-xl mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-400" />
                О команде и игроках
              </h5>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-700/30">
                  <p className="text-blue-300 text-lg mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Фокус на команде:
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {playerData.teamFocus}
                  </p>
                </div>

                <div className="p-4 bg-green-900/20 rounded-xl border border-green-700/30">
                  <p className="text-green-300 text-lg mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Качества коллектива:
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {playerData.teamQualities}
                  </p>
                </div>

                {playerData.goals && (
                  <div className="p-4 bg-yellow-900/20 rounded-xl border border-yellow-700/30">
                    <p className="text-yellow-300 text-lg mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Подход к целям:
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {playerData.goals}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    );
  };

  const renderPlayerCard = (player: any, isStaff = false) => {
    const Icon = player.icon;
    
    return (
      <Dialog key={player.id}>
        <DialogTrigger className="w-full text-left">
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-blue-500/50 transform hover:scale-105 cursor-pointer">
            {/* Декоративные элементы */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${player.rankColor.replace('text-', 'from-').replace('-400', '-500/20')} to-purple-500/20 group-hover:opacity-40 rounded-full blur-2xl transition-all duration-700 -translate-y-12 translate-x-12`}></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${player.rankColor.replace('text-', 'from-').replace('-400', '-500')} to-purple-500 group-hover:to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(player.status)} rounded-full border-3 border-white group-hover:border-gray-900 transition-colors duration-500`}></div>
                  </div>
                  <div>
                    <h4 className="text-gray-900 group-hover:text-white transition-colors duration-500 text-lg font-medium">
                      {player.name}
                    </h4>
                    <Badge className={`text-sm ${getRoleColor(player.role)} group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300 text-white`}>
                      {player.role}
                    </Badge>
                  </div>
                </div>
                {player.isLeader && (
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full p-2 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Star className="w-5 h-5 text-white fill-current" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-gray-100 to-blue-50 group-hover:from-gray-700/50 group-hover:to-blue-900/50 rounded-lg transition-all duration-500">
                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm mb-1">
                    {isStaff ? 'Роль:' : 'Специализация:'}
                  </p>
                  <p className="text-gray-900 group-hover:text-white transition-colors duration-500 text-sm font-medium">
                    {isStaff ? player.description : player.specialization}
                  </p>
                </div>
                {player.note && (
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-900/30 group-hover:to-purple-900/30 rounded-lg border border-blue-200 group-hover:border-purple-400/50 transition-all duration-500">
                    <p className="text-blue-700 group-hover:text-blue-300 transition-colors duration-500 text-sm leading-relaxed">
                      {player.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </DialogTrigger>
        {renderPlayerModal(player)}
      </Dialog>
    );
  };

  const onlineCount = [...mainTeam, ...staff].filter(p => p.status === 'online').length;
  const offlineCount = [...mainTeam, ...staff].filter(p => p.status === 'offline').length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-4"></div>
          <h3 className="text-3xl bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Состав команды Rise
          </h3>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-lg border border-green-500/30">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-green-300">Онлайн: {onlineCount}</span>
          </div>
          <div className="flex items-center p-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-sm rounded-lg border border-gray-500/30">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
            <span className="text-gray-300">Оффлайн: {offlineCount}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-4"></div>
          <h4 className="text-2xl bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
            🌟 Основной состав
          </h4>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mainTeam.map((player) => renderPlayerCard(player))}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-4"></div>
          <h4 className="text-2xl bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            🌟 Персонал
          </h4>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((player) => renderPlayerCard(player, true))}
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
                {mainTeam.length + staff.length}
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Всего участников
              </p>
            </div>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50 hover:from-gray-900 hover:via-green-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-green-500/50 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
            <div className="relative p-6 text-center">
              <div className="text-4xl bg-gradient-to-r from-green-500 to-emerald-500 group-hover:from-emerald-400 group-hover:to-green-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                {mainTeam.length}
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Основн���� состав
              </p>
            </div>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-yellow-50 hover:from-gray-900 hover:via-yellow-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-yellow-500/50 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
            <div className="relative p-6 text-center">
              <div className="text-4xl bg-gradient-to-r from-yellow-500 to-amber-500 group-hover:from-amber-400 group-hover:to-yellow-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                {staff.length}
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Персонал
              </p>
            </div>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-purple-50 hover:from-gray-900 hover:via-purple-900 hover:to-gray-900 transition-all duration-700 group shadow-xl hover:shadow-2xl border border-gray-200 hover:border-purple-500/50 transform hover:scale-105">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:opacity-40 rounded-full blur-xl transition-all duration-700 -translate-y-10 translate-x-10"></div>
            <div className="relative p-6 text-center">
              <div className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500 group-hover:from-pink-400 group-hover:to-purple-400 bg-clip-text text-transparent mb-2 transition-all duration-500">
                Новый
              </div>
              <p className="text-gray-700 group-hover:text-gray-200 transition-colors duration-500">
                Состав команды
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700">
        <div className="text-center">
          <h4 className="text-white mb-3">a new RISE story | История нового ВЗЛЕТА</h4>
          <p className="text-gray-300 mb-4">
            Команда Rise начинает новую главу с обновленным составом молодых и талантливых игроков, 
            готовых покорять новые высоты в мире киберспорта.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://t.me/Rise_MT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="Telegram канал команды"
            >
              <TelegramIcon className="w-5 h-5 text-white" />
            </a>
            <a 
              href="https://vk.com/risemt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="ВКонтакте команды"
            >
              <VKIcon className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}