
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

    // Amélioration du prompt pour mieux guider l'IA vers le résultat attendu
    const prompt = `Tu es un assistant spécialisé dans la création de formules logiques et mathématiques pour un logiciel de tarification.
    
    Voici quelques exemples de descriptions et leurs formules correspondantes :
    ${examples.map((ex: { description: string; formula: string }) => 
      `Description: "${ex.description}" => Formule: "${ex.formula}"`
    ).join('\n')}
    
    Pour la description suivante : "${query}"
    
    Génère une formule précise qui utilise la syntaxe suivante:
    - Utilise {P:NomParametre} pour les paramètres
    - Pour les conditions: IF condition THEN résultat
    - Pour les opérations arithmétiques: +, -, ×, ÷
    - Pour les comparaisons: >, <, >=, <=, =, <>
    - Pour les opérateurs logiques: AND, OR
    
    Par exemple:
    - Pour "si le poids dépasse 100kg le prix augmente de 10%" => "IF {P:PoidsPrestation} > 100 THEN {P:PrixPrestation} × 1.1"
    - Pour "si volume supérieur à 2m3 et poids inférieur à 500kg" => "{P:VolumePrestation} > 2 AND {P:PoidsPrestation} < 500"
    
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
          { role: 'system', content: 'Tu es un assistant spécialisé dans la création de formules logiques et mathématiques pour logiciels de tarification.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2, // Réduit pour des réponses plus cohérentes
        max_tokens: 200,  // Augmenté pour des formules plus complètes
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
    
    if (!suggestedFormula) {
      throw new Error('Aucune formule n\'a été générée par OpenAI');
    }

    return new Response(JSON.stringify({ suggestedFormula }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in suggest-formula function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      suggestedFormula: null 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
