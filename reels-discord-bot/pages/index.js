import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('⏳ Processando...');

    const res = await fetch('/api/sendVideo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      setStatus('✅ Enviado com sucesso!');
    } else {
      setStatus('❌ Erro ao enviar.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#2C2F33',
      color: '#FFFFFF',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ color: '#7289DA' }}>Reels → Discord</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
        <input
          type="text"
          placeholder="Cole o link do Reels"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: 10,
            width: 400,
            borderRadius: 5,
            border: 'none',
            outline: 'none',
            backgroundColor: '#23272A',
            color: '#FFFFFF'
          }}
        />
        <button type="submit" style={{
          padding: '10px 20px',
          borderRadius: 5,
          border: 'none',
          backgroundColor: '#7289DA',
          color: '#FFFFFF',
          cursor: 'pointer'
        }}>
          Enviar
        </button>
      </form>
      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}
