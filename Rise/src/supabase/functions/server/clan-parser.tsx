import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Интерфейс для данных клана
interface ClanData {
  tag: string;
  link: string;
  position: string;
  rating: string;
  members: string;
  lastUpdated: Date;
}

// Функция для парсинга данных клана с lesta.ru
async function parseClanData(url: string): Promise<Partial<ClanData>> {
  try {
    // В реальной реализации здесь был бы HTTP запрос к lesta.ru
    // const response = await fetch(url);
    // const html = await response.text();
    // 
    // Парсинг HTML с помощью DOMParser или cheerio:
    // - извлечение позиции в рейтинге
    // - извлечение актуального рейтинга
    // - извлечение количества участников
    
    // Пример парсинга (псевдокод):
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(html, 'text/html');
    // const position = doc.querySelector('.clan-position')?.textContent;
    // const rating = doc.querySelector('.clan-rating')?.textContent;
    // const members = doc.querySelector('.clan-members')?.textContent;
    
    // Временно возвращаем mock данные
    const mockData = {
      position: `#${Math.floor(Math.random() * 1000) + 100}`,
      rating: `${2000 + Math.floor(Math.random() * 500)}`,
      members: `${Math.floor(Math.random() * 20) + 5}/100`,
      lastUpdated: new Date()
    };
    
    return mockData;
  } catch (error) {
    console.error(`Ошибка парсинга данных для ${url}:`, error);
    throw new Error(`Не удалось получить данные с ${url}`);
  }
}

// Роут для обновления данных всех кланов
app.post('/make-server-f9a5a1a1/update-clans', async (c) => {
  try {
    const clanLinks = [
      { tag: "[_RBC_]", link: "https://lesta.ru/clans/wot/598169" },
      { tag: "[RBC_]", link: "https://lesta.ru/clans/wot/565650" },
      { tag: "[RBC]", link: "https://lesta.ru/clans/wot/472187" }
    ];

    const updatedClans: ClanData[] = [];

    for (const clan of clanLinks) {
      try {
        const parsedData = await parseClanData(clan.link);
        const clanData: ClanData = {
          tag: clan.tag,
          link: clan.link,
          position: parsedData.position || '#0',
          rating: parsedData.rating || '0',
          members: parsedData.members || '0/100',
          lastUpdated: new Date()
        };
        
        updatedClans.push(clanData);
        
        // Сохраняем данные в KV store
        await kv.set(`clan_data_${clan.tag}`, clanData);
        
      } catch (error) {
        console.error(`Ошибка обновления данных для клана ${clan.tag}:`, error);
        // Продолжаем обработку других кланов даже если один не удался
      }
    }

    // Сохраняем время последнего обновления
    await kv.set('clans_last_update', new Date().toISOString());

    return c.json({
      success: true,
      data: updatedClans,
      message: `Обновлены данные для ${updatedClans.length} кланов`
    });

  } catch (error) {
    console.error('Ошибка при обновлении данных кланов:', error);
    return c.json({
      success: false,
      error: 'Ошибка обновления данных кланов'
    }, 500);
  }
});

// Роут для получения актуальных данных кланов
app.get('/make-server-f9a5a1a1/clans', async (c) => {
  try {
    const clanTags = ["[_RBC_]", "[RBC_]", "[RBC]"];
    const clansData = [];

    for (const tag of clanTags) {
      const clanData = await kv.get(`clan_data_${tag}`);
      if (clanData) {
        clansData.push(clanData);
      }
    }

    const lastUpdate = await kv.get('clans_last_update');

    return c.json({
      success: true,
      data: clansData,
      lastUpdate: lastUpdate
    });

  } catch (error) {
    console.error('Ошибка получения данных кланов:', error);
    return c.json({
      success: false,
      error: 'Ошибка получения данных кланов'
    }, 500);
  }
});

// Роут для принудительного обновления данных конкретного клана
app.post('/make-server-f9a5a1a1/update-clan/:tag', async (c) => {
  try {
    const tag = c.req.param('tag');
    
    const clanLinks: Record<string, string> = {
      "[_RBC_]": "https://lesta.ru/clans/wot/598169",
      "[RBC_]": "https://lesta.ru/clans/wot/565650", 
      "[RBC]": "https://lesta.ru/clans/wot/472187"
    };

    const link = clanLinks[tag];
    if (!link) {
      return c.json({
        success: false,
        error: 'Неизвестный тег клана'
      }, 400);
    }

    const parsedData = await parseClanData(link);
    const clanData: ClanData = {
      tag: tag,
      link: link,
      position: parsedData.position || '#0',
      rating: parsedData.rating || '0',
      members: parsedData.members || '0/100',
      lastUpdated: new Date()
    };

    await kv.set(`clan_data_${tag}`, clanData);

    return c.json({
      success: true,
      data: clanData,
      message: `Данные клана ${tag} обновлены`
    });

  } catch (error) {
    console.error(`Ошибка обновления данных клана:`, error);
    return c.json({
      success: false,
      error: 'Ошибка обновления данных клана'
    }, 500);
  }
});

Deno.serve(app.fetch);