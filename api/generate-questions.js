import OpenAI from 'openai'

function readBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

function fallbackQuestions(category = 'Frontend', difficulty = 'Medium') {
  return [
    {
      id: `ai-fallback-${Date.now()}-1`,
      category,
      difficulty,
      type: 'Technical',
      question: 'Explain a frontend performance issue you solved and the trade-offs behind your solution.',
      hints: ['State the bottleneck', 'Name the measurement tool', 'Explain the outcome'],
    },
  ]
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(400).json({ error: 'Missing OPENAI_API_KEY' })
  }

  const body = readBody(req)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You generate concise mock interview questions for frontend developer candidates. Return valid JSON only.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            instruction:
              'Create interview questions as an object with a questions array. Each item needs id, category, difficulty, type, question, and hints array.',
            category: body.category,
            difficulty: body.difficulty,
            type: body.type,
            count: body.count || 5,
          }),
        },
      ],
    })

    const parsed = JSON.parse(completion.choices[0].message.content)
    return res.status(200).json({ questions: parsed.questions || fallbackQuestions(body.category, body.difficulty) })
  } catch (error) {
    return res.status(500).json({
      error: 'OpenAI question generation failed',
      message: error.message,
      questions: fallbackQuestions(body.category, body.difficulty),
    })
  }
}
