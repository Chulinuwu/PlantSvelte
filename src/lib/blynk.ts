const AUTH = import.meta.env.VITE_BLYNK_AUTH_TOKEN;
const BASE_URL = `https://blynk.cloud/external/api`;

export async function getVirtualPinData(pin: string) {
  const response = await fetch(`${BASE_URL}/get?token=${AUTH}&${pin}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data from Blynk');
  }
  const data = await response.json();
  return data;
}

export async function setVirtualPinData(pin: string, value: number) {
  const response = await fetch(`${BASE_URL}/update?token=${AUTH}&${pin}=${value}`, {
    method: 'GET' // Blynk API uses GET for updates
  });
  if (!response.ok) {
    throw new Error('Failed to set data to Blynk');
  }
}