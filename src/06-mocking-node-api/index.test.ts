// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const func = jest.fn();
    doStuffByTimeout(func, 500);
    expect(setTimeout).toBeCalledWith(func, 500);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const func = jest.fn();
    doStuffByTimeout(func, 500);
    expect(func).not.toBeCalled();

    jest.advanceTimersByTime(500)
    expect(func).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const func = jest.fn();
    doStuffByInterval(func, 500);

    expect(setInterval).toBeCalledWith(func, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const func = jest.fn();
    doStuffByInterval(func, 500);

    expect(func).not.toBeCalled();

    jest.runOnlyPendingTimers()

    expect(func).toBeCalledTimes(1);

    jest.runOnlyPendingTimers()

    expect(func).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously('file.txt');

    expect(spy).toBeCalledWith(__dirname,'file.txt');
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const content = await readFileAsynchronously('file.txt');

    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('file content');
    const content = await readFileAsynchronously('file.txt');

    expect(typeof content).toBe('string');
  });
});
