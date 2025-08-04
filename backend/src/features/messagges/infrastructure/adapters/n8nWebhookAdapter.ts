import axios from 'axios';

export const sendMessageToN8n = async (payload: {
  contenido: string;
  emisor: string;
  creadoPorId: string;
}) => {
  const url = 'https://primary-production-3577.up.railway.app/webhook/8493ca75-813c-403d-9570-2de1d0caf512';

  try {
    await axios.post(url, payload);
  } catch (error: any) {
    console.error('Error al enviar a n8n:', error.message);
    // Puedes decidir si lanzar el error o ignorarlo
  }
};
