// jest.config.cjs
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // важно: полное имя
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/"],
 moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // ✅ для CSS-модулей
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js' // если используешь картинки
  },
};
