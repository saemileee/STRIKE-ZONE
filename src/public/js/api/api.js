const BASE_URL = '/api/v1';

export async function fetchData(url) {
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function postData(url, body) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function patchData(url, body) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteData(url) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, { method: 'DELETE' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
