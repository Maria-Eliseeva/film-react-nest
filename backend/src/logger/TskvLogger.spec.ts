import { describe, it, expect } from '@jest/globals';
import { TskvLogger } from './TskvLogger';

describe('TskvLogger', () => {
  it('should format message as tab-separated key=value pairs', () => {
    const logger = new TskvLogger() as any;

    const result = logger.formatMessage('log', 'Server started');

    expect(result).toBe('level=log\tmessage=Server started');
  });

  it('should include params', () => {
    const logger = new TskvLogger() as any;

    const result = logger.formatMessage('log', 'User created', 'UserService');

    expect(result).toBe('level=log\tmessage=User created\tparams=UserService');
  });

  it('should escape newline', () => {
    const logger = new TskvLogger() as any;

    const result = logger.formatMessage('log', 'Multiline\nmessage');

    expect(result).toBe('level=log\tmessage=Multiline\\nmessage');
  });
});
