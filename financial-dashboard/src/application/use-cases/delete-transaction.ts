// Caso de uso: eliminar una transacción por ID

import type { ITransactionRepository } from '@/domain/repositories/transaction-repository';

export class DeleteTransactionUseCase {
  constructor(private readonly repository: ITransactionRepository) {}

  async execute(id: string): Promise<void> {
    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw new Error(`Transacción con id "${id}" no encontrada`);
    }

    await this.repository.delete(id);
  }
}
