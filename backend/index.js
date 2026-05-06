import { terms, badgeColors } from './data/terms.js';

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

function respond(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}

export const handler = async (event) => {
  // Support both API Gateway v1 (REST) and v2 (HTTP)
  const path = event.rawPath || event.path || '/';
  const method = (
    event.requestContext?.http?.method || event.httpMethod || 'GET'
  ).toUpperCase();
  const query = event.queryStringParameters || {};

  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (method !== 'GET') {
    return respond(405, { error: 'Method not allowed' });
  }

  if (path === '/api/health') {
    return respond(200, { status: 'ok' });
  }

  if (path === '/api/terms/categories') {
    const categories = ['All', ...new Set(terms.map((t) => t.cat))];
    return respond(200, { categories, badgeColors });
  }

  if (path === '/api/terms') {
    let result = terms;

    if (query.cat && query.cat !== 'All') {
      result = result.filter((t) => t.cat === query.cat);
    }

    if (query.search) {
      const q = query.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.detail.toLowerCase().includes(q)
      );
    }

    return respond(200, result);
  }

  return respond(404, { error: 'Not found' });
};
