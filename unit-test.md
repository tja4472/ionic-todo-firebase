With thanks to https://github.com/lathonez/clicker

### package.json
``` json
    "@angular/cli": "1.0.0",
    "@angular/router": "4.0.2",
    "@types/jasmine": "2.5.47",
    "@types/node": "7.0.12",
    "jasmine-core": "2.5.2",
    "jasmine-spec-reporter": "3.3.0",
    "karma": "1.6.0",
    "karma-chrome-launcher": "2.0.0",
    "karma-cli": "1.0.1",
    "karma-coverage-istanbul-reporter": "1.1.0",
    "karma-jasmine": "1.1.0",
    "karma-jasmine-html-reporter": "0.2.2",
```
### root
```
.angular-cli.json
karma.conf.js
tsconfig.ng-cli.json
```
### src
```
mocks.ts
polyfills.ts
test.ts
tsconfig.spec.json
```
### tsconfig.json
``` json
  "exclude": [
    "node_modules",
    "src/test.ts",
    "**/*.spec.ts"
  ],
```
### package.json
``` json
  "scripts": {
    ...
    "test-coverage": "ng test --code-coverage",
    "test": "ng test"
  },
```