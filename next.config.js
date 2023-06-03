module.exports = {
  // env 내용 추가
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'glitch-hackathon.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};
