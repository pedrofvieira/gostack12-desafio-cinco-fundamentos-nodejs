import Transaction from '../models/Transaction';

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    const somaIn = this.transactions.reduce((total, next) => {
      return next.type === 'income' ? total + next.value : total;
    }, 0);

    const somaOut = this.transactions.reduce((total, next) => {
      return next.type === 'outcome' ? total + next.value : total;
    }, 0);

    const balance = {
      income: somaIn,
      outcome: somaOut,
      total: somaIn - somaOut,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
