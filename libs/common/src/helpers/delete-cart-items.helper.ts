import {FirestoreBatch} from '@libs/data-layer/wrappers'

export const deleteCartAndItemsHelper = async (
  batch: FirestoreBatch,
  cartRef: FirebaseFirestore.DocumentReference,
): Promise<void> => {
  const cartItems = await cartRef.collection('CartItems').listDocuments()
  cartItems.forEach((cartItem) => batch.delete(cartItem))

  batch.delete(cartRef)
}
