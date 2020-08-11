const commitTypes = require('./semantic-release/commitTypes.js');
const commitRules = require('./semantic-release/commitRules.js');

module.exports = {
  branches: ['master'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: commitRules,
        presetConfig: {
          types: commitTypes,
        },
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@google/semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: ['package.json'],
            from: '"version": ".*"',
            to: '"version": "${nextRelease.version}"',
          },
        ],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'android/app/build/outputs/apk/release/app-release.apk',
            label: 'Android APK',
          },
        ],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
      },
    ],
  ],
  tagFormat: '${version}',
};
