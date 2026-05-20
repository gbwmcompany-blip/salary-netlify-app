import { getStore } from '@netlify/blobs';

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

async function readJson(request) {
  try {
    const text = await request.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    return null;
  }
}

function checkPassword(body) {
  const required = process.env.DATA_PASSWORD || '';
  if (!required) return true;
  return body && body.password === required;
}

export default async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse(405, { success: false, message: 'Метод не разрешён' });
  }

  const body = await readJson(request);
  if (!body) return jsonResponse(400, { success: false, message: 'Некорректный JSON' });
  if (!checkPassword(body)) return jsonResponse(401, { success: false, message: 'Неверный пароль облака' });

  if (!body.employees || typeof body.employees !== 'object' || Array.isArray(body.employees)) {
    return jsonResponse(400, { success: false, message: 'Нет данных employees' });
  }

  const payload = {
    employees: body.employees,
    currentEmployee: typeof body.currentEmployee === 'string' ? body.currentEmployee : '',
    updatedAt: new Date().toISOString()
  };

  const store = getStore({ name: 'salary-app', consistency: 'strong' });
  await store.setJSON('main-backup', payload);

  return jsonResponse(200, {
    success: true,
    message: 'Данные сохранены в облаке Netlify',
    updatedAt: payload.updatedAt
  });
};
