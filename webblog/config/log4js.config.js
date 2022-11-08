let path = require('path');
let ROOT = path.join(__dirname, '../');

module.exports = {
  appenders: {
    ConsoleLogAppender: {
      type: 'console',
    },
    FileLogAppender: {
      type: 'file',
      filename: path.join(ROOT, './log/system/system.log'),
      maxLogSize: 5000000,
      // 로그 로테이션의 갯수
      bakups: 10,
    },
    MultiFileLogAppender: {
      type: 'multiFile',
      base: path.join(ROOT, './log/application/'),
      // 로그를 분산 시키는 조건
      // 조합은 categoryName, pid, level
      // 상기 이외는 context map에서 검색
      property: 'key',
      // 로그파일명의 suffix 확장명
      extension: '.log',
    },
    DateRollingFileLogAppender: {
      type: 'dateFile',
      filename: path.join(ROOT, './log/access/access.log'),
      pattern: '-yyyyMMdd',
      // 최대 보관 일수
      numBackups: 30,
    },
  },
  categories: {
    default: {
      appenders: ['ConsoleLogAppender'],
      level: 'ALL',
    },
    system: {
      appenders: ['FileLogAppender'],
      level: 'ERROR',
    },
    application: {
      appenders: ['MultiFileLogAppender'],
      level: 'ERROR',
    },
    access: {
      appenders: ['DateRollingFileLogAppender'],
      level: 'INFO',
    },
  },
};
