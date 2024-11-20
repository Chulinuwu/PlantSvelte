const AUTH = import.meta.env.VITE_BLYNK_AUTH_TOKEN;
const BASE_URL = `https://blynk.cloud/external/api/get?token=${AUTH}`;

export async function getVirtualPinData(pin: string) {
    const response = await fetch(`${BASE_URL}&${pin}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from Blynk');
    }
    const data = await response.json();
    return data;
  }