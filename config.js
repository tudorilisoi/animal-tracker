'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/animal-tracker';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-animal-tracker';
exports.PORT = process.env.PORT || 8080;