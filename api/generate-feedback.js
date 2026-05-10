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

function fallbackFeedback() {
  return {
    score: 82,
    verdict: 'Solid interview performance with clear improvement opportunities.',
    strengths: ['Clear communication', 'Good frontend fundamentals', 'Practical examples'],
    weaknesses: ['Needs more measurable impact', 'System design structure can improve', 'Ask more clarifying questions'],
    suggestions: ['Use the STAR format', 'State trade-offs explicitly', 'Close each answer with a short summary'],
    rubric: [
      { label: 'Technical depth', value: 82 },
      { label: 'Communication', value: 84 },
      { label: 'Problem solving', value: 78 },
      { label: 'Role fit', value: 83 },
    ],
  }
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
            'You are an interview coach for frontend developer candidates. Return valid JSON only.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            instruction:
              'Analyze this interview transcript. Return an object named feedback with score, verdict, strengths, weaknesses, suggestions, and rubric array with label/value.',
            transcript: body.transcript || '',
          }),
        },
      ],
    })

    const parsed = JSON.parse(completion.choices[0].message.content)
    return res.status(200).json({ feedback: parsed.feedback || fallbackFeedback() })
  } catch (error) {
    return res.status(500).json({
      error: 'OpenAI feedback generation failed',
      message: error.message,
      feedback: fallbackFeedback(),
    })
  }
}
