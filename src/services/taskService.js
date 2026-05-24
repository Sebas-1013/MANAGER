const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/tasks';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('No fue posible completar la petición');
  }

  return response.status === 204 ? null : response.json();
}

export function getTasks() {
  return request(API_URL);
}

export function createTask(task) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export function updateTask(id, task) {
  return request(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(task),
  });
}

export function deleteTask(id) {
  return request(`${API_URL}/${id}`, { method: 'DELETE' });
}
