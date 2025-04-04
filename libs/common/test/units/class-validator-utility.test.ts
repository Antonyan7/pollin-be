import 'reflect-metadata'
import {Type} from 'class-transformer'
import {IsNotEmpty, IsOptional, IsString, Length, ValidateNested} from 'class-validator'
import {validateModel} from '@libs/common/utils/class-validator-utility'

class ValidaionTestModelAddress {
  @IsString()
  @Length(2, 10)
  street: string

  @IsOptional()
  @IsString()
  unit?: string
}

class ValidaionTestModelItemMetadata {
  @IsString()
  @Length(2, 10)
  description: string
}

class ValidaionTestModelItem {
  @IsString()
  @Length(2, 10)
  name: string

  @ValidateNested()
  @Type(() => ValidaionTestModelItemMetadata)
  metadata: ValidaionTestModelItemMetadata
}

class ValidationTestModel {
  @IsString()
  @Length(2, 10, {message: 'First name length is wrong. Please review inputs'})
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @ValidateNested()
  @Type(() => ValidaionTestModelAddress)
  address: ValidaionTestModelAddress

  @ValidateNested({each: true})
  @Type(() => ValidaionTestModelItem)
  items: ValidaionTestModelItem[]
}

describe('Validate Schema with class validator utility', () => {
  test('should reutrn all messages based on class validator model validation and isValid should be false', async () => {
    const model = new ValidationTestModel()
    model.firstName = 'testname1234567890'
    model.lastName = ''
    model.address = new ValidaionTestModelAddress()
    model.address.street = 't'

    const item = new ValidaionTestModelItem()
    item.name = 'I'
    item.metadata = new ValidaionTestModelItemMetadata()
    item.metadata.description = 'd'
    model.items = [item]

    const result = await validateModel(model)

    expect(result.isValid).toBe(false)

    // should show custom message
    expect(
      result.errors.includes(
        'First name length is wrong. Please review inputs. Value: testname1234567890',
      ),
    ).toBe(true)

    // should include error on 3rd level
    expect(
      result.errors.includes('description must be longer than or equal to 2 characters. Value: d'),
    ).toBe(true)

    // should show 5 error based on test model
    expect(result.errors.length).toBe(5)
  })

  test('should return messages and isValid should be true', async () => {
    const model = new ValidaionTestModelItemMetadata()
    model.description = '1234'
    const result = await validateModel(model)

    expect(result.isValid).toBe(true)
    expect(result.errors.length).toBe(0)
  })
})
