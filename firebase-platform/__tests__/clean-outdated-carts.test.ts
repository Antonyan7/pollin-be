import {cleanOutdatedCartsHandler} from '@codebase/cache/handlers'
import {CartSeed} from '@seeds/firestore/cart-seed'
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')

let cartSeed: CartSeed

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const authUserId = 'cleanCartsCFUser'

const outDatedCartId = 'outDatedCartId'
const emptyUpdatedAtCartId = 'emptyUpdatedAtCartId'
const newCartId = 'newCartId'
const itemlessCartId = 'itemlessCartId'
const cartItemId = 'cartItemId'

const carts = [
  {
    id: outDatedCartId,
    authUserId,
    items: null,
    setupIntents: [{setupIntentId: 'setupIntentId', splitAmount: 1, idempotencyId: ''}],
  },
  {
    id: newCartId,
    authUserId,
  },
  {
    id: itemlessCartId,
    authUserId,
    items: null,
  },
  {
    id: emptyUpdatedAtCartId,
    authUserId,
    items: null,
  },
]

const outDatedCartItem = {
  id: cartItemId,
  updatedAt: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.addDays(new Date(), -10)),
}
const newCartItem = {
  id: cartItemId,
}
const emptyUpdatedAtCartItem = {
  id: cartItemId,
}

describe('Firebase Function: clean-outdated-carts', () => {
  beforeAll(async () => {
    cartSeed = new CartSeed()

    await cartSeed.createArray(carts)

    await cartSeed.addCartItem(outDatedCartId, outDatedCartItem)
    await cartSeed.addCartItem(newCartId, newCartItem)
    await cartSeed.addCartItem(emptyUpdatedAtCartId, newCartItem)
    await cartSeed.updateCartItem(emptyUpdatedAtCartId, emptyUpdatedAtCartItem)
  })

  test('should clean outdated carts and carts without items', async () => {
    await cleanOutdatedCartsHandler()

    //outdated
    const cartItems = await cartSeed.getCartItemsById(outDatedCartId)
    const cart = await cartSeed.getById(outDatedCartId)
    expect(cartItems.length).toBe(0)
    expect(cart).toBeFalsy()

    //normal
    const cartItems2 = await cartSeed.getCartItemsById(newCartId)
    const cart2 = await cartSeed.getById(newCartId)
    expect(cartItems2.length).toBe(1)
    expect(cart2.id).toBe(newCartId)

    //without items
    const cart3 = await cartSeed.getById(itemlessCartId)
    expect(cart3).toBeFalsy()
    //empty updatedAt field
    const cart4 = await cartSeed.getById(emptyUpdatedAtCartId)
    expect(cart4).toBeFalsy()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await cartSeed.deleteCartAndItemsByAuthUserId(authUserId)
  })
})
