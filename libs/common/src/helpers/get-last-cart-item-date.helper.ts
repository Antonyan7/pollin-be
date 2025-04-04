import {CartItem} from '@libs/data-layer/apps/checkout/entities/fireorm/cart'

export const getLastCartItemDateHelper = async (
  cartRef: FirebaseFirestore.DocumentReference,
): Promise<Date> => {
  const docs = (await cartRef.collection('CartItems').orderBy('updatedAt', 'desc').limit(1).get())
    .docs

  if (!docs.length) {
    return null
  }

  const data = docs[0].data() as CartItem
  return data.updatedAt.toDate()
}
