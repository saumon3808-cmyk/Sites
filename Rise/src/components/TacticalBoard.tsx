import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Pen, 
  Eraser, 
  Square, 
  Circle, 
  ArrowRight, 
  Type, 
  Trash2, 
  Download, 
  Upload, 
  Undo2, 
  Redo2,
  Palette,
  MousePointer,
  Move,
  RotateCcw,
  MapPin
} from "lucide-react";
import tankSymbols from 'figma:asset/703f8ed0f142bd00b2c4545cd88d5b647c93b762.png';
import lightTankIcon from 'figma:asset/759770f541ebce92b372dfd605046576f741fd4d.png';

interface DrawingPoint {
  x: number;
  y: number;
}

interface DrawingAction {
  type: 'brush' | 'line' | 'rectangle' | 'circle' | 'arrow' | 'text' | 'tank-icon';
  points: DrawingPoint[];
  color: string;
  size: number;
  text?: string;
}

interface MapOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'city' | 'field' | 'desert' | 'ruins' | 'abbey';
}

export function TacticalBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<'select' | 'brush' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'arrow' | 'text' | 'tank-placement'>('brush');
  const [currentColor, setCurrentColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(3);
  const [actions, setActions] = useState<DrawingAction[]>([]);
  const [redoStack, setRedoStack] = useState<DrawingAction[]>([]);
  const [startPoint, setStartPoint] = useState<DrawingPoint | null>(null);
  const [tempCanvas, setTempCanvas] = useState<HTMLCanvasElement | null>(null);
  const [selectedMap, setSelectedMap] = useState<string>('none');
  const [selectedTankType, setSelectedTankType] = useState<string | null>(null);

  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#ffffff', '#000000', '#888888', '#ffa500', '#800080', '#008000'
  ];

  // Карты для турниров 7х7
  const maps: MapOption[] = [
    {
      id: 'none',
      name: 'Без карты',
      description: 'Чистый фон для схем',
      imageUrl: '',
      type: 'field'
    },
    {
      id: 'prokhorovka',
      name: 'Прохоровка',
      description: 'Открытая местность, поле боя',
      imageUrl: 'https://images.unsplash.com/photo-1754299394817-ff347e940645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG9mJTIwdGFua3MlMjBwcm9raG9yb3ZrYSUyMG1hcCUyMGJhdHRsZWZpZWxkfGVufDF8fHx8MTc1ODc0MzQxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'field'
    },
    {
      id: 'ruinberg',
      name: 'Рудники',
      description: 'Городские руины',
      imageUrl: 'https://images.unsplash.com/photo-1643796980977-c62d29741f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGVmaWVsZCUyMHRhbmslMjB3YXJmYXJlJTIwcnVpbmJlcmclMjBtYXB8ZW58MXx8fHwxNzU4NzQzNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'ruins'
    },
    {
      id: 'himmelsdorf',
      name: 'Химмельсдорф',
      description: 'Городская карта',
      imageUrl: 'https://images.unsplash.com/photo-1745248826151-13c4a47a6ae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1tZWxzZG9yZiUyMGNpdHklMjBydWlucyUyMHRhbmslMjBiYXR0bGV8ZW58MXx8fHwxNzU4NzQzNDE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'city'
    },
    {
      id: 'live_oaks',
      name: 'Лайв Окс',
      description: 'Американская пустыня',
      imageUrl: 'https://images.unsplash.com/photo-1657520809593-11101ddd6d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwb2FrcyUyMGFtZXJpY2FuJTIwZGVzZXJ0JTIwdGFuayUyMGNvbWJhdHxlbnwxfHx8fDE3NTg3NDM0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'desert'
    },
    {
      id: 'abbey',
      name: 'Монастырь',
      description: 'Руины монастыря',
      imageUrl: 'https://images.unsplash.com/photo-1754317659576-f66d7c1df71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYmJleSUyMG1vbmFzdGVyeSUyMHRhbmslMjB3YXJmYXJlJTIwcnVpbnN8ZW58MXx8fHwxNzU4NzQzNDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'abbey'
    },
    {
      id: 'malinovka',
      name: 'Малиновка',
      description: 'Открытая равнина',
      imageUrl: 'https://images.unsplash.com/photo-1674487522589-1333b39d4bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxpbm92a2ElMjB0YW5rJTIwYmF0dGxlJTIwZmllbGQlMjBwbGFpbnN8ZW58MXx8fHwxNzU4NzQzNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'field'
    }
  ];

  const tankIcons = [
    { 
      label: 'ЛТ', 
      color: '#00FF00',
      useCustomIcon: true, // Флаг для использования отдельной иконки
      description: 'Легкие танки'
    },
    { 
      label: 'СТ', 
      color: '#FFFF00',
      position: { x: 0, y: 70, width: 50, height: 50 }, // Координаты двойного ромба
      description: 'Средние танки'
    },
    { 
      label: 'ТТ', 
      color: '#FF0000',
      position: { x: 0, y: 140, width: 50, height: 50 }, // Координаты тройного ромба
      description: 'Тяжелые танки'
    },
    { 
      label: 'ПТ', 
      color: '#00FFFF',
      position: { x: 0, y: 210, width: 50, height: 50 }, // Координаты треугольника
      description: 'ПТ-САУ'
    },
    { 
      label: 'САУ', 
      color: '#FF00FF',
      position: { x: 0, y: 280, width: 50, height: 50 }, // Координаты квадрата
      description: 'Артиллерия'
    }
  ];

  // Инициализация canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размер canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Устанавливаем белый фон
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Создаем временный canvas для предварительного просмотра
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    setTempCanvas(tempCanvas);
  }, []);

  // Получение координат мыши относительно canvas
  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  // Загружаем изображения с символами танков и карт
  const [tankImage, setTankImage] = useState<HTMLImageElement | null>(null);
  const [lightTankImage, setLightTankImage] = useState<HTMLImageElement | null>(null);
  const [mapImages, setMapImages] = useState<{[key: string]: HTMLImageElement}>({});

  useEffect(() => {
    const img = new Image();
    img.onload = () => setTankImage(img);
    img.src = tankSymbols;

    const ltImg = new Image();
    ltImg.onload = () => setLightTankImage(ltImg);
    ltImg.src = lightTankIcon;

    // Загружаем изображения карт
    const loadMapImages = async () => {
      const imagePromises = maps.filter(map => map.imageUrl).map(map => {
        return new Promise<{id: string, image: HTMLImageElement}>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve({ id: map.id, image: img });
          img.src = map.imageUrl;
        });
      });

      const loadedImages = await Promise.all(imagePromises);
      const imageMap: {[key: string]: HTMLImageElement} = {};
      loadedImages.forEach(({ id, image }) => {
        imageMap[id] = image;
      });
      setMapImages(imageMap);
    };

    loadMapImages();
  }, []);

  // Рисование на canvas
  const draw = useCallback((ctx: CanvasRenderingContext2D, action: DrawingAction) => {
    ctx.strokeStyle = action.color;
    ctx.fillStyle = action.color;
    ctx.lineWidth = action.size;
    ctx.lineCap = 'round';

    switch (action.type) {
      case 'brush':
        if (action.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(action.points[0].x, action.points[0].y);
          for (let i = 1; i < action.points.length; i++) {
            ctx.lineTo(action.points[i].x, action.points[i].y);
          }
          ctx.stroke();
        }
        break;

      case 'line':
        if (action.points.length === 2) {
          ctx.beginPath();
          ctx.moveTo(action.points[0].x, action.points[0].y);
          ctx.lineTo(action.points[1].x, action.points[1].y);
          ctx.stroke();
        }
        break;

      case 'rectangle':
        if (action.points.length === 2) {
          const width = action.points[1].x - action.points[0].x;
          const height = action.points[1].y - action.points[0].y;
          ctx.strokeRect(action.points[0].x, action.points[0].y, width, height);
        }
        break;

      case 'circle':
        if (action.points.length === 2) {
          const radius = Math.sqrt(
            Math.pow(action.points[1].x - action.points[0].x, 2) +
            Math.pow(action.points[1].y - action.points[0].y, 2)
          );
          ctx.beginPath();
          ctx.arc(action.points[0].x, action.points[0].y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;

      case 'arrow':
        if (action.points.length === 2) {
          const start = action.points[0];
          const end = action.points[1];
          
          // Рисуем линию
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();

          // Рисуем наконечник стрелки
          const angle = Math.atan2(end.y - start.y, end.x - start.x);
          const arrowLength = 15;
          const arrowAngle = Math.PI / 6;

          ctx.beginPath();
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(
            end.x - arrowLength * Math.cos(angle - arrowAngle),
            end.y - arrowLength * Math.sin(angle - arrowAngle)
          );
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(
            end.x - arrowLength * Math.cos(angle + arrowAngle),
            end.y - arrowLength * Math.sin(angle + arrowAngle)
          );
          ctx.stroke();
        }
        break;

      case 'text':
        if (action.points.length === 1 && action.text) {
          ctx.font = `${action.size * 6}px Arial`;
          ctx.fillText(action.text, action.points[0].x, action.points[0].y);
        }
        break;

      case 'tank-icon':
        if (action.points.length === 1 && action.text) {
          const tankIcon = tankIcons.find(tank => tank.label === action.text);
          if (tankIcon) {
            // Сохраняем текущее состояние контекста
            ctx.save();
            
            // Для ЛТ используем отдельную иконку
            if (tankIcon.label === 'ЛТ' && lightTankImage) {
              // Применяем зеленый цветовой фильтр для ЛТ
              ctx.filter = `hue-rotate(120deg) saturate(1.5) brightness(1.2)`;
              
              // Рисуем полную иконку легкого танка
              ctx.drawImage(
                lightTankImage,
                action.points[0].x, action.points[0].y, action.size, action.size
              );
            } else if (tankImage && tankIcon.position) {
              // Применяем цветовой фильтр для других типов
              ctx.filter = `hue-rotate(${
                tankIcon.label === 'СТ' ? '60deg' : 
                tankIcon.label === 'ТТ' ? '0deg' : 
                tankIcon.label === 'ПТ' ? '180deg' : 
                '270deg'
              })`;
              
              // Рисуем соответствующую часть изображения с символами танков
              ctx.drawImage(
                tankImage,
                tankIcon.position.x, tankIcon.position.y, tankIcon.position.width, tankIcon.position.height,
                action.points[0].x, action.points[0].y, action.size, action.size
              );
            }
            
            // Восстанавливаем состояние контекста
            ctx.restore();
          }
        }
        break;
    }
  }, []);

  // Перерисовка всего canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очищаем canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем фон карты если выбрана
    if (selectedMap !== 'none' && mapImages[selectedMap]) {
      ctx.save();
      ctx.globalAlpha = 0.4; // Делаем карту полупрозрачной
      ctx.drawImage(mapImages[selectedMap], 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // Рисуем сетку
    ctx.strokeStyle = selectedMap !== 'none' ? '#666666' : '#333333';
    ctx.lineWidth = 1;
    const gridSize = 20;
    
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Рисуем все действия
    actions.forEach(action => {
      draw(ctx, action);
    });
  }, [actions, draw, tankImage, lightTankImage, selectedMap, mapImages]);

  // Обновляем canvas при изменении действий
  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Обработчики событий мыши
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getMousePos(e);
    setStartPoint(point);
    setIsDrawing(true);

    if (currentTool === 'brush') {
      const newAction: DrawingAction = {
        type: 'brush',
        points: [point],
        color: currentColor,
        size: brushSize
      };
      setActions(prev => [...prev, newAction]);
      setRedoStack([]);
    } else if (currentTool === 'text') {
      const text = prompt('Введите текст:');
      if (text) {
        const newAction: DrawingAction = {
          type: 'text',
          points: [point],
          color: currentColor,
          size: brushSize,
          text
        };
        setActions(prev => [...prev, newAction]);
        setRedoStack([]);
      }
    } else if (currentTool === 'tank-placement' && selectedTankType) {
      // Размещаем танк в месте клика
      const newAction: DrawingAction = {
        type: 'tank-icon',
        points: [point],
        color: currentColor,
        size: 40, // Размер иконки танка
        text: selectedTankType
      };
      setActions(prev => [...prev, newAction]);
      setRedoStack([]);
      setIsDrawing(false); // Не активируем режим рисования для танков
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint) return;

    const point = getMousePos(e);

    if (currentTool === 'brush') {
      setActions(prev => {
        const newActions = [...prev];
        const lastAction = newActions[newActions.length - 1];
        if (lastAction && lastAction.type === 'brush') {
          lastAction.points.push(point);
        }
        return newActions;
      });
    } else if (['line', 'rectangle', 'circle', 'arrow'].includes(currentTool)) {
      // Показываем предварительный просмотр
      const canvas = canvasRef.current;
      const tempCanvasElement = tempCanvas;
      if (!canvas || !tempCanvasElement) return;

      const ctx = canvas.getContext('2d');
      const tempCtx = tempCanvasElement.getContext('2d');
      if (!ctx || !tempCtx) return;

      // Копируем основной canvas во временный
      tempCtx.clearRect(0, 0, tempCanvasElement.width, tempCanvasElement.height);
      tempCtx.drawImage(canvas, 0, 0);

      // Рисуем предварительный просмотр
      const previewAction: DrawingAction = {
        type: currentTool as any,
        points: [startPoint, point],
        color: currentColor,
        size: brushSize
      };
      draw(ctx, previewAction);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint) return;

    const point = getMousePos(e);

    if (['line', 'rectangle', 'circle', 'arrow'].includes(currentTool)) {
      const newAction: DrawingAction = {
        type: currentTool as any,
        points: [startPoint, point],
        color: currentColor,
        size: brushSize
      };
      setActions(prev => [...prev, newAction]);
      setRedoStack([]);
    }

    setIsDrawing(false);
    setStartPoint(null);
  };

  // Функции управления
  const clearCanvas = () => {
    setActions([]);
    setRedoStack([]);
  };

  const undo = () => {
    if (actions.length > 0) {
      const lastAction = actions[actions.length - 1];
      setRedoStack(prev => [...prev, lastAction]);
      setActions(prev => prev.slice(0, -1));
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const actionToRedo = redoStack[redoStack.length - 1];
      setActions(prev => [...prev, actionToRedo]);
      setRedoStack(prev => prev.slice(0, -1));
    }
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `tactical-plan-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const addTankIcon = (tankType: string) => {
    // Активируем режим размещения танков
    setCurrentTool('tank-placement');
    setSelectedTankType(tankType);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-red-400 to-orange-500 rounded-full mr-4"></div>
        <h3 className="text-3xl bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
          Тактический планшет
        </h3>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Панель инструментов */}
        <Card className="lg:col-span-1 p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-600/50 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Инструменты рисования */}
            <div>
              <h4 className="text-white text-lg mb-4 flex items-center">
                <Pen className="w-5 h-5 mr-2 text-blue-400" />
                Инструменты
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { tool: 'select', icon: MousePointer, label: 'Выбор' },
                  { tool: 'brush', icon: Pen, label: 'Кисть' },
                  { tool: 'eraser', icon: Eraser, label: 'Ластик' },
                  { tool: 'line', icon: Move, label: 'Линия' },
                  { tool: 'rectangle', icon: Square, label: 'Прямоугольник' },
                  { tool: 'circle', icon: Circle, label: 'Круг' },
                  { tool: 'arrow', icon: ArrowRight, label: 'Стрелка' },
                  { tool: 'text', icon: Type, label: 'Текст' }
                ].map(({ tool, icon: Icon, label }) => (
                  <Button
                    key={tool}
                    variant={currentTool === tool ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCurrentTool(tool as any);
                      setSelectedTankType(null); // Сбрасываем выбранный тип танка
                    }}
                    className={`flex flex-col items-center p-2 h-auto ${
                      currentTool === tool 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-xs">{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-600/50" />

            {/* Цвета */}
            <div>
              <h4 className="text-white text-lg mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-green-400" />
                Цвета
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      currentColor === color ? 'border-white' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="mt-3">
                <label className="text-gray-300 text-sm">Размер кисти:</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full mt-1"
                />
                <Badge variant="outline" className="mt-1 text-xs">
                  {brushSize}px
                </Badge>
              </div>
            </div>

            <Separator className="bg-gray-600/50" />

            {/* Иконки танков */}
            <div>
              <h4 className="text-white text-lg mb-4 flex items-center">
                <Square className="w-5 h-5 mr-2 text-red-400" />
                Типы техники
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {tankIcons.map((tank, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => addTankIcon(tank.label)}
                    className={`p-3 h-16 flex items-center gap-3 group relative overflow-hidden justify-start transition-all duration-300 ${
                      currentTool === 'tank-placement' && selectedTankType === tank.label
                        ? 'bg-gradient-to-r from-blue-600/50 to-purple-600/50 border-blue-400/70 text-blue-200 scale-105'
                        : 'bg-gray-700/50 hover:bg-gray-600/50 text-white border-gray-600/50 hover:scale-105'
                    }`}
                    title={`${tank.label} - ${tank.description}${currentTool === 'tank-placement' && selectedTankType === tank.label ? ' (АКТИВЕН - кликните на карту)' : ''}`}
                  >
                    {/* Иконка танка из изображения */}
                    <div 
                      className="w-8 h-8 bg-cover bg-center transition-all duration-300 group-hover:scale-110 relative flex-shrink-0"
                      style={{
                        backgroundImage: tank.label === 'ЛТ' ? `url(${lightTankIcon})` : `url(${tankSymbols})`,
                        backgroundPosition: tank.label === 'ЛТ' ? 'center' : `0px -${tank.position?.y || 0}px`,
                        backgroundSize: tank.label === 'ЛТ' ? 'contain' : '50px auto',
                        filter: tank.label === 'ЛТ' ? 
                          'hue-rotate(120deg) saturate(1.5) brightness(1.2)' : 
                          `hue-rotate(${tank.label === 'СТ' ? '60deg' : tank.label === 'ТТ' ? '0deg' : tank.label === 'ПТ' ? '180deg' : '270deg'})`
                      }}
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-white group-hover:text-white transition-colors duration-300">
                        {tank.label}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {tank.description}
                      </span>
                    </div>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded"
                      style={{ backgroundColor: tank.color }}
                    ></div>
                  </Button>
                ))}
              </div>
              
              {/* Индикатор режима размещения танков */}
              {currentTool === 'tank-placement' && selectedTankType && (
                <div className="mt-4 p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 text-sm font-medium">
                      Режим размещения: {selectedTankType}
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/80 mb-2">
                    Кликните на карту для размещения танка
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentTool('brush');
                      setSelectedTankType(null);
                    }}
                    className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/50"
                  >
                    <RotateCcw className="w-3 h-3 mr-2" />
                    Отменить
                  </Button>
                </div>
              )}

            </div>

            <Separator className="bg-gray-600/50" />

            {/* Управление */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={actions.length === 0}
                  className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Очистить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveCanvas}
                className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-300 border-green-500/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </Card>

        {/* Canvas для рисования */}
        <Card className="lg:col-span-4 p-6 bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-600/50 backdrop-blur-sm">
          {/* Панель выбора карт */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h4 className="text-white font-medium">Выбор карты:</h4>
              </div>
              <div className="text-sm text-gray-300">
                Текущая карта: <span className="text-blue-400 font-medium">
                  {maps.find(m => m.id === selectedMap)?.name || 'Неизвестно'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {maps.map((map) => (
                <Button
                  key={map.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMap(map.id)}
                  className={`p-2 h-auto flex flex-col items-center gap-2 group relative overflow-hidden transition-all duration-300 ${
                    selectedMap === map.id 
                      ? 'bg-blue-600/30 border-blue-400/70 text-blue-200 scale-105' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50 text-white border-gray-600/50 hover:scale-105'
                  }`}
                  title={map.description}
                >
                  {map.id !== 'none' ? (
                    <div 
                      className="w-12 h-8 bg-cover bg-center rounded transition-all duration-300 group-hover:scale-110 flex-shrink-0 border border-gray-500/50"
                      style={{
                        backgroundImage: `url(${map.imageUrl})`,
                      }}
                    />
                  ) : (
                    <div className="w-12 h-8 bg-gray-800 border border-gray-500/50 rounded flex items-center justify-center flex-shrink-0">
                      <Square className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                  <span className="text-xs font-medium transition-colors duration-300 text-center leading-tight">
                    {map.name}
                  </span>
                  {selectedMap === map.id && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              className={`w-full h-[600px] border border-gray-600/50 rounded-lg bg-gray-900 ${
                currentTool === 'tank-placement' ? 'cursor-pointer' : 'cursor-crosshair'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => setIsDrawing(false)}
            />
            <div className="absolute bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-2">
              <Badge variant="outline" className={`text-xs ${currentTool === 'tank-placement' ? 'bg-blue-600/30 border-blue-400/50 text-blue-200' : ''}`}>
                {currentTool === 'brush' && 'Кисть'}
                {currentTool === 'eraser' && 'Ластик'}
                {currentTool === 'line' && 'Линия'}
                {currentTool === 'rectangle' && 'Прямоугольник'}
                {currentTool === 'circle' && 'Круг'}
                {currentTool === 'arrow' && 'Стрелка'}
                {currentTool === 'text' && 'Текст'}
                {currentTool === 'select' && 'Выбор'}
                {currentTool === 'tank-placement' && selectedTankType && `Размещение: ${selectedTankType}`}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Инструкции */}
      <Card className="p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/50">
        <h4 className="text-white text-lg mb-3 flex items-center">
          <Type className="w-5 h-5 mr-2 text-blue-400" />
          Как пользоваться
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-gray-300 text-sm">
          <div>
            <h5 className="text-white mb-2">Основные функции:</h5>
            <ul className="space-y-1">
              <li>• Выберите карту из панели сверху</li>
              <li>• Кликните на тип техники для размещения</li>
              <li>• Кликните на карту для установки танка</li>
              <li>• Используйте инструменты для тактических линий</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white mb-2">Типы техники:</h5>
            <ul className="space-y-1">
              <li>• <span style={{color: '#00FF00'}}>◊</span> ЛТ - Легкие танки</li>
              <li>• <span style={{color: '#FFFF00'}}>◊◊</span> СТ - Средние танки</li>
              <li>• <span style={{color: '#FF0000'}}>◊◊◊</span> ТТ - Тяжелые танки</li>
              <li>• <span style={{color: '#00FFFF'}}>▼</span> ПТ - ПТ-САУ</li>
              <li>• <span style={{color: '#FF00FF'}}>■</span> САУ - Артиллерия</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white mb-2">Карты турниров 7х7:</h5>
            <ul className="space-y-1">
              <li>• <span className="text-green-400">Прохоровка</span> - Открытая равнина</li>
              <li>• <span className="text-orange-400">Рудники</span> - Городские руины</li>
              <li>• <span className="text-blue-400">Химмельсдорф</span> - Городская карта</li>
              <li>• <span className="text-yellow-400">Лайв Окс</span> - Пустыня</li>
              <li>• <span className="text-purple-400">Монастырь</span> - Горная карта</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}