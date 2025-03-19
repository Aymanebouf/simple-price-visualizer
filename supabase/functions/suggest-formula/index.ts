
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Clé API directe (temporairement codée en dur)
const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || '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';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, examples } = await req.json();

    console.log('Requête reçue:', { query, examples });

    if (!openAIApiKey) {
      console.error('La clé API OpenAI n\'est pas définie');
      throw new Error('La clé API OpenAI n\'est pas configurée dans les secrets Supabase');
    }

    const prompt = `Tu es un assistant spécialisé dans la création de formules logiques et mathématiques.
    Voici quelques exemples de descriptions et leurs formules correspondantes :
    ${examples.map((ex: { description: string; formula: string }) => 
      `Description: "${ex.description}" => Formule: "${ex.formula}"`
    ).join('\n')}
    
    À partir de ces exemples, génère la formule correspondant à cette description : "${query}"
    Retourne uniquement la formule, sans explications.`;

    console.log('Envoi de la requête à OpenAI avec la nouvelle clé API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur OpenAI:', errorData);
      throw new Error(`Erreur OpenAI: ${errorData.error?.message || 'Erreur inconnue'}`);
    }

    const data = await response.json();
    console.log('Réponse OpenAI reçue:', data);

    const suggestedFormula = data.choices[0].message.content.trim();

    return new Response(JSON.stringify({ suggestedFormula }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in suggest-formula function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
