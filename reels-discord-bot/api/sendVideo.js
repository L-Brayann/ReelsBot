import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { url } = req.body;
  const webhookUrl = 'https://discord.com/api/webhooks/1384312627651416209/LikhOku5IkGTtgT_QNyKzpob8xB5-9iRpQfJ4xfus1juUcFMNpV8PDG8vD1cfTGsRZoV';

  try {
    const response = await fetch('https://saveig.app/api/ajaxSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'referer': 'https://saveig.app/',
      },
      body: JSON.stringify({
        q: url,
        t: 'media',
        lang: 'en',
      }),
    });

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return res.status(400).json({ error: 'Vídeo não encontrado' });
    }

    const videoUrl = data.data[0].url;

    const videoBuffer = await fetch(videoUrl).then(res => res.buffer());

    const form = new FormData();
    form.append('file', videoBuffer, 'video.mp4');
    form.append('content', '🎥 Novo Reels enviado!');

    await fetch(webhookUrl, {
      method: 'POST',
      body: form,
    });

    return res.status(200).json({ message: 'Enviado para o Discord!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao processar' });
  }
}
