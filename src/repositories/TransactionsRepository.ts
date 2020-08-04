import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (balance, transaction) => {
        const newBalance = { ...balance };
        newBalance[transaction.type] += transaction.value;
        if (transaction.type === 'income') {
          newBalance.total += transaction.value;
        } else {
          newBalance.total -= transaction.value;
        }
        return newBalance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
