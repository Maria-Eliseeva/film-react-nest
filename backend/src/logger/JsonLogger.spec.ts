import { describe, it, expect } from '@jest/globals';
import { JsonLogger } from './JsonLogger';

describe('JsonLogger', () => {
  it('should format message as JSON with level, message and optionalParams', () => {
    const logger = new JsonLogger() as any;

    const result = logger.formatMessage('log', 'Server started');

    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: 'Server started',
        optionalParams: [],
      }),
    );
  });

  it('should include optional params in the formatted JSON', () => {
    const logger = new JsonLogger() as any;

    const result = logger.formatMessage('log', 'User created', 'UserService');

    expect(result).toBe(
      JSON.stringify({
        level: 'log',
        message: 'User created',
        optionalParams: ['UserService'],
      }),
    );
  });
});
