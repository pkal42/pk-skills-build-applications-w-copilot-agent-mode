/**
 * API utility for OctoFit Tracker
 * Handles Codespaces-aware URL building and data fetching
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (!codespaceName || codespaceName.trim() === '') {
    console.warn(
      'VITE_CODESPACE_NAME is not set. Using localhost fallback. ' +
      'Set VITE_CODESPACE_NAME in .env.local for Codespaces deployment.'
    );
    return 'http://localhost:8000/api';
  }
  return `https://${codespaceName}-8000.app.github.dev/api`;
};

export const fetchData = async (endpoint) => {
  try {
    const url = `${getApiBaseUrl()}/${endpoint}/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const body = await response.json();
    // Handle both paginated and array responses
    return body.data || body;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
};
