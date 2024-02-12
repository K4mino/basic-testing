// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError,SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);

    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);

    expect(() => account.withdraw(200)).toThrowError(
      new InsufficientFundsError(account.getBalance())
    )
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const account2 = getBankAccount(200);
    expect(() => account.transfer(200, account2)).toThrowError(InsufficientFundsError)
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(100, account)).toThrowError(new TransferFailedError())
  });

  test('should deposit money', () => {
    const account = getBankAccount(100)

    expect(account.deposit(100)).toBe(account);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100)

    expect(account.withdraw(100)).toBe(account);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const account2 = getBankAccount(200);

    expect(account.transfer(50, account2)).toBe(account);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(20);
    const balance = await account.fetchBalance()

   expect(typeof balance).toBe('number');
  })

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(balance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    //const balance = await account.fetchBalance();
    const balance = await account.synchronizeBalance();
    await expect(balance).rejects.toThrow(SynchronizationFailedError); 
  })
});
