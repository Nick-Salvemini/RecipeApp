const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
};

console.log("Configured API Base URL:", config.apiBaseUrl);

export default config