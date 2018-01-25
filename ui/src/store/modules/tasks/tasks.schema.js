import { schema } from 'normalizr'

const taskEntity = new schema.Entity(
  'tasks',
  {},
  {
    processStrategy: (entity) => ({
      id: entity.id,
      description: entity.description,
      dueDate: entity.due_date,
      snoozedUntil: entity.snoozed_until || null,
      status: entity.status,
      type: entity.type
    })
  }
)

export default taskEntity