import { PaymentsService } from '@algomart/shared/services'
import { DependencyResolver } from '@algomart/shared/utils'
import { Model } from 'objection'
import pino from 'pino'

export async function updatePaymentStatusesTask(
  registry: DependencyResolver,
  logger: pino.Logger<unknown>
) {
  const log = logger.child({ task: 'update-payment-statuses' })
  const payments = registry.get<PaymentsService>(PaymentsService.name)
  const trx = await Model.startTransaction()
  try {
    const updatedPayments = await payments.updatePaymentStatuses(trx)
    log.info('updated %d payment statuses', updatedPayments)
    await trx.commit()
  } catch (error) {
    await trx.rollback()
    log.error(error as Error, 'failed to update payment statuses')
  }
}
