import type { Message } from '@prisma/client';
import axios from 'axios';

export const sendMessageToN8n = async (payload: Message) => {
    const urls = [
        'https://primary-production-3577.up.railway.app/webhook/8493ca75-813c-403d-9570-2de1d0caf512',
        'https://primary-production-3577.up.railway.app/webhook-test/8493ca75-813c-403d-9570-2de1d0caf512'
    ];

    for (const url of urls) {
        try {
            await axios.post(url, payload);
            console.log(`Mensaje enviado correctamente a ${url}`);
        } catch (error: any) {
            console.error(`Error al enviar a ${url}:`, error.message);
        }
    }
};
