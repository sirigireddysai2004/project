import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini if key is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with provided key, using heuristic engine:', err);
  }
}

// Heuristic fallback knowledge engine based on live FreshGuard state
function getHeuristicAnswer(query: string, context?: any): string {
  const q = query.toLowerCase();

  if (q.includes('why') && (q.includes('banana') || q.includes('discount'))) {
    return `Bananas are currently at Critical Spoilage Risk because Hyderabad Central has 80 units in stock with only 2 days of shelf life remaining, while average daily demand is only 25 units/day. Without intervention, 46–58 units will become waste within 48 hours. A 30% markdown increases price elasticity, raising expected sell-through to 91%, protecting ₹2,940 in revenue and preventing 8.4 kg of organic waste.`;
  }

  if (q.includes('waste') && (q.includes('most') || q.includes('likely') || q.includes('which product'))) {
    return `The top 5 products at highest waste risk today are:\n1. Bananas (Cavendish) — 82% risk (2 days shelf life, 80 units stock)\n2. Artisanal White Bread — 89% risk (1 day shelf life, 65 units stock)\n3. Vine Tomatoes — 78% risk (3 days shelf life, 150 units stock)\n4. Greek Yogurt 400g — 71% risk (3 days shelf life, 90 units stock)\n5. Fresh Strawberries — 68% risk (2 days shelf life, 45 units stock)\nImplementing recommended markdowns and transfers will recover 84% of these units.`;
  }

  if (q.includes('store') && (q.includes('need') || q.includes('transfer') || q.includes('banana'))) {
    return `Hyderabad North urgently requires 40 units of Bananas. It currently has only 35 units with high local sales velocity (42 units/day), facing stockout in < 20 hours. Meanwhile, Hyderabad Central has an overstock of 120 units with only 20 units/day demand. Transferring 40 units balances both stores to healthy stock levels and preserves ₹4,200 in revenue.`;
  }

  if (q.includes('hot') || q.includes('weather') || q.includes('heat')) {
    return `Under a Hot Weekend scenario, FreshGuard simulates:\n• Banana demand rises +28% (25 → 32 units/day)\n• Cold beverages demand rises +42%\n• Ice cream demand surges +37%\n• Leafy vegetables spoil 1.8x faster\nAI recommends shifting 20 additional bananas to Hyderabad North, boosting cold beverage replenishment by 40%, and executing immediate cold-chain verification.`;
  }

  if (q.includes('how much waste') || q.includes('prevent today') || q.includes('savings')) {
    return `Today FreshGuard AI has already identified 742 kg of preventable food waste across 4 stores, representing ₹2.84 Lakhs in protected grocery revenue. Executing the pending critical actions (Bananas 30% markdown, Tomato order reduction, and North transfer) will avoid an additional 92 kg of spoilage today.`;
  }

  if (q.includes('transfer') || q.includes('smart transfer')) {
    return `FreshGuard recommends 3 inter-store inventory redistributions:\n1. Bananas: 40 units from Hyderabad Central → Hyderabad North (avoids waste in Central, prevents stockout in North)\n2. Greek Yogurt: 25 units from Hyderabad South → Hyderabad East\n3. Fresh Paneer: 30 units from Hyderabad Central → Hyderabad South\nTotal transfer revenue protected: ₹12,850 with zero markdown penalty.`;
  }

  return `FreshGuard AI analyzed your inventory across Hyderabad Central, North, South, and East. Current fleet health is 84% optimal. Our 5 operational agents recommend applying active markdowns on near-expiry perishables (Bananas, Bread), routing 40 surplus banana units to Hyderabad North, and trimming tomorrow's inbound tomato purchase by 20 units to achieve zero organic landfill waste.`;
}

// API Routes
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `You are FreshGuard AI, an enterprise Zero-Waste Grocery Intelligence Assistant for supermarkets.
Your core mission: "Sell the right product, at the right store, at the right price, before it becomes waste."
Current Context:
- Supermarket chain: 4 stores in Hyderabad (Central, North, South, East).
- Today's avoided waste: 742 kg, Revenue protected: ₹2.84 Lakhs.
- Critical issue: Bananas at Hyderabad Central (80 units, 2 days remaining, 25/day demand). Recommend 30% markdown.
- Inter-store transfer: Hyderabad Central (excess bananas) to Hyderabad North (banana stockout risk). Recommend transferring 40 units.
- Tone: Professional, concise, commercial enterprise SaaS tone. No technical jargon, no hallucinated numbers outside the context. Answer accurately in 2-4 sentences.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}\nAdditional Live Store Context: ${JSON.stringify(context || {})}` }] }
          ],
        });

        const reply = response.text || getHeuristicAnswer(message, context);
        return res.json({ reply, source: 'gemini' });
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', geminiErr);
        const reply = getHeuristicAnswer(message, context);
        return res.json({ reply, source: 'heuristic-engine' });
      }
    }

    const reply = getHeuristicAnswer(message, context);
    return res.json({ reply, source: 'heuristic-engine' });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/run-analysis', async (req: Request, res: Response) => {
  // Simulate live agent execution
  const timestamp = new Date().toISOString();
  return res.json({
    status: 'success',
    timestamp,
    agentsExecuted: [
      { id: 'demand-forecast', status: 'completed', confidence: 0.94, latencyMs: 140 },
      { id: 'spoilage-prediction', status: 'completed', accuracy: 0.91, latencyMs: 210 },
      { id: 'pricing-agent', status: 'completed', optimalMarkdown: '30%', latencyMs: 180 },
      { id: 'inventory-transfer', status: 'completed', routesIdentified: 3, latencyMs: 260 },
      { id: 'inventory-optimization', status: 'completed', actionsRanked: 31, latencyMs: 310 }
    ],
    summary: 'FreshGuard AI analyzed 4 store nodes, 28 perishable SKUs, regional weather, and city footfall. 5 new optimization signals dispatched.'
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FreshGuard AI running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
