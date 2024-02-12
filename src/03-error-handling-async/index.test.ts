// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';

    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', async() => {
    const msg = 'invalid'

    await expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', async() => {

   await expect(throwError).toThrow(Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', async() => {
    await expect(throwCustomError).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
