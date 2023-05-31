import dqlToZod from '../src/index'
import fs from 'fs'

const schema = `MembershipFee.amount: float .
MembershipFee.date: string .
MembershipFee.space: uid .
Newsletter.content: string .
Newsletter.space: uid .
Newsletter.title: string .
Space.category: string .
Space.description: string .
Space.location: string .
Space.members: [uid] .
Space.membershipFees: [uid] .
Space.name: string .
Space.newsletters: [uid] .
Space.recurringTime: string .
User.email: string @index(exact) @upsert .
User.name: string .
User.password: string .
User.spaces: [uid] .
dgraph.drop.op: string .
dgraph.graphql.p_query: string @index(sha256) .
dgraph.graphql.schema: string .
dgraph.graphql.xid: string @index(exact) @upsert .
email: string .
id: string .
name: string .
password: string .
type MembershipFee {
	MembershipFee.amount
	MembershipFee.date
	MembershipFee.space
}
type Newsletter {
	Newsletter.title
	Newsletter.content
	Newsletter.space
}
type Space {
	Space.name
	Space.description
	Space.category
	Space.location
	Space.recurringTime
	Space.members
	Space.newsletters
	Space.membershipFees
}
type User {
	User.name
	User.email
	User.password
	User.spaces
}
type dgraph.graphql {
	dgraph.graphql.schema
	dgraph.graphql.xid
}
type dgraph.graphql.persisted_query {
	dgraph.graphql.p_query
}
type dgraph.type.Group {

}
type dgraph.type.Rule {

}
type dgraph.type.User {

}`

//should write zod Schemas and types to the file system in the specified path and delete the file after the test

describe('dqlToZod', () => {

afterAll(() => {
    fs.unlinkSync('tests/zodSchemasAndTypesTest.ts')
    })

  it('should write zod Schemas and types to the file system in the specified path', () => {

	dqlToZod(schema, 'tests/zodSchemasAndTypesTest.ts')

    expect(fs.existsSync('tests/zodSchemasAndTypesTest.ts')).toBe(true)
  })

  it('should have generated correct zod Schemas and types', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MembershipFee, Newsletter, Space, User } = require('./zodSchemasAndTypesTest.ts');
})
})
