// src/app/api/generate/route.ts
import { NextResponse } from 'next/server'
import { fal } from '@fal-ai/client'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const result = await fal.subscribe('fal-ai/flux/schnell', {
      input: {
        prompt: prompt,
      },
      logs: true,
      onQueueUpdate: update => {
        if (update.status === 'IN_PROGRESS') {
          update.logs.map(log => log.message).forEach(console.log)
        }
      },
    })

    return NextResponse.json({
      imageUrl: result.data.images[0].url,
      requestId: result.requestId,
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
