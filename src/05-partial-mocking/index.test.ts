// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');

  const mockedOne = jest.spyOn(originalModule, 'mockOne').mockImplementation(() => {});
  const mockedTwo = jest.spyOn(originalModule, 'mockTwo').mockImplementation(() => {});
  const mockedThree = jest.spyOn(originalModule, 'mockThree').mockImplementation(() => {});

  // Return the mocked module
  return {
    ...originalModule,
    mockOne: mockedOne,
    mockTwo: mockedTwo,
    mockThree: mockedThree
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    mockOne();
    mockTwo();
    mockThree();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
