// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const num1 = 2
    const num2 = 3

    const result = simpleCalculator({ a: num1, b: num2, action: Action.Add })

    expect(result).toBe(5)
  });

  test('should subtract two numbers', () => {
    const num1 = 5
    const num2 = 3

    const result = simpleCalculator({ a: num1, b: num2, action: Action.Subtract })

    expect(result).toBe(2)
  });

  test('should multiply two numbers', () => {
    const num1 = 5
    const num2 = 3

    const result = simpleCalculator({ a: num1, b: num2, action: Action.Multiply })

    expect(result).toBe(15)
  });

  test('should divide two numbers', () => {
    const num1 = 6
    const num2 = 3

    const result = simpleCalculator({ a: num1, b: num2, action: Action.Divide })

    expect(result).toBe(2)
  });

  test('should exponentiate two numbers', () => {
    const num1 = 2
    const num2 = 3

    const result = simpleCalculator({ a: num1, b: num2, action: Action.Exponentiate })

    expect(result).toBe(8)
  });

  test('should return null for invalid action', () => {
    const num1 = 5
    const num2 = 3
    const testaction = 'run'
    const result = simpleCalculator({ a: num1, b: num2, action: testaction as Action })

    expect(result).toBe(null)
  });

  test('should return null for invalid arguments', () => {
    const num1 = 'a'
    const num2 = '/'

    const result = simpleCalculator({ a: num1, b: num2, action: Action.Add })

    expect(result).toBe(null)
  });
});
