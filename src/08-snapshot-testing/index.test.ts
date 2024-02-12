// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const list = generateLinkedList(['first',null])

    expect(list).toStrictEqual({
      value:'first',
      next:{
        value:null,
        next:null
      }
    })
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const list = generateLinkedList(['first','second'])

    expect(list).toMatchSnapshot()
  })
});
