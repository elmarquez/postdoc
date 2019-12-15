module.exports = {
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  testRegex: 'test/.*(spec|test).(ts|tsx|js)$',
  setupFiles: ['./internals/scripts/CheckBuiltsExist.js']
};
