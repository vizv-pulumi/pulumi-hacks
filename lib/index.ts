import { execSync } from 'child_process'
import * as pulumi from '@pulumi/pulumi'

export const getOrganization = () => {
  const printStackCommand = `pulumi --stack='${pulumi.getStack()}' stack`
  const [organization] = execSync(printStackCommand)
    .toString()
    .match(/(?<=Owner: )[^\n]+/)!

  if (!organization)
    throw new Error(
      `command "${printStackCommand}" doesn't return the "Owner" field.`,
    )

  return organization
}
