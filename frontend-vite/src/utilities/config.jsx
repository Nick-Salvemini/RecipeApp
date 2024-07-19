const config = {
    apiBaseUrl: process.env.VITE_API_BASE_URL || "http://localhost:3000",
};

console.log("Configured API Base URL:", config.apiBaseUrl);

export default config