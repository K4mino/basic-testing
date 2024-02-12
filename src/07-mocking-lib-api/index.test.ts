// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index'; 

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    // Write your test here
    const path = 'users'
    const url = 'https://jsonplaceholder.typicode.com'
    const spy = jest.spyOn(axios,'create')
    await throttledGetDataFromApi(path);

    expect(spy).toBeCalledWith({ baseURL: url });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const path = 'users'
    const spy = jest.spyOn(axios.create(),'get')
    await throttledGetDataFromApi(path);

    expect(spy).toBeCalledWith(path)
  });

  test('should return response data', async () => {
    // Write your test here
    const response = await throttledGetDataFromApi('users')

    expect(response).toBe('response')
  });
});
