export default {
  name: "PrismFlow",
  slug: "prismflow-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0a0a0f"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.prismflow.app"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0a0a0f"
    },
    package: "com.prismflow.app"
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#0a0a0f",
        image: "./assets/splash.png",
        imageWidth: 200
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  scheme: "prismflow",
  extra: {
    revenueCatApiKeyIOS: process.env.REVENUECAT_API_KEY_IOS || "",
    revenueCatApiKeyAndroid: process.env.REVENUECAT_API_KEY_ANDROID || "",
    leaderboardApiUrl: process.env.LEADERBOARD_API_URL || "https://your-project.supabase.co",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    eas: {
      projectId: "1644b03b-e775-41c4-b25f-dae2adaba0cd"
    }
  }
};
