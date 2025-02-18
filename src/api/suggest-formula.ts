
import { Request } from '@/types';
import { openai } from '@/lib/openai';

export async function POST(request: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, examples } = await request.json();

    // Construire le prompt pour l'IA
    const prompt = `Tu es un assistant spécialisé dans la création de formules logiques et mathématiques.
    Voici quelques exemples de descriptions et leurs formules correspondantes :
    ${examples.map((ex: { description: string; formula: string }) => 
      `Description: "${ex.description}" => Formule: "${ex.formula}"`
    ).join('\n')}
    
    À partir de ces exemples, génère la formule correspondant à cette description : "${query}"
    Retourne uniquement la formule, sans explications.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Tu es un assistant spécialisé dans la création de formules logiques et mathématiques.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const suggestedFormula = data.choices[0].message.content.trim();

    return new Response(
      JSON.stringify({ suggestedFormula }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in suggest-formula function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}
