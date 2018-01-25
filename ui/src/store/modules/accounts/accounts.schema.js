import { schema } from 'normalizr'

const accountEntity = new schema.Entity(
  'accounts',
  {},
  {
    idAttribute: 'number',
    processStrategy: (entity) => ({
      id: entity.number,
      companyName: entity.company_name
    })
  }
)

export default accountEntity