const BASE_URL = process.env.REACT_APP_API_URL || '';

export const api = {
  getTerms: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.cat && filters.cat !== 'All') params.append('cat', filters.cat);
    if (filters.search) params.append('search', filters.search);

    const res = await fetch(`${BASE_URL}/api/terms?${params}`);
    if (!res.ok) throw new Error('Failed to fetch terms');
    return res.json();
  },

  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/api/terms/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  health: async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    return res.json();
  },
};
