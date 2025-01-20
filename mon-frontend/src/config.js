const BASE_URL = "http://madebyqwerty.local";
const API_BASE_URL = `${BASE_URL}/wp-json/wp/v2`;
const API_CUSTOM_URL = `${BASE_URL}/wp-json/custom/v1`;

const config = {
    BASE_URL,
    API_BASE_URL,
    API_CUSTOM_URL,

    // 📌 Routes spécifiques à l'API WordPress
    API: {
        PAGES: `${API_BASE_URL}/pages`,
        POSTS: `${API_BASE_URL}/posts`,
        COMMENTS: `${API_BASE_URL}/comments`,
        MENUS: `${API_CUSTOM_URL}/menus`,
        SETTINGS: `${API_CUSTOM_URL}/settings`
    }
};

export default config;
