// Retorna o valor de um cookie pelo nome
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
          return decodeURIComponent(cookieValue);
      }
  }
  return null;
}

//////////////ADD TO CART
export const addItemToCart = async (productContextValue, addToCart, orderForm, setOrderForm) => {
  const item = [
    {
      aditionalInfo: {
        brandName: productContextValue.product.brand,
        __typename: 'ItemAdditionalInfo',
      },
      availability: productContextValue.selectedItem.sellers[0].commertialOffer.AvailableQuantity > 0 ? true : false,
      id: productContextValue.selectedItem.itemId,
      imageUrls: {
        at1x: productContextValue.selectedItem.images[0].imageUrl,
        __typename: 'ImageUrls',
      },
      listPrice: productContextValue.selectedItem.sellers[0].commertialOffer.ListPrice,
      measurementUnit: productContextValue.selectedItem.measurementUnit,
      name: productContextValue.selectedItem.name,
      price: productContextValue.selectedItem.sellers[0].commertialOffer.Price,
      productId: productContextValue.product.productId,
      quantity: 1,
      seller: getCookie("regionId") || productContextValue.selectedItem.sellers[0].sellerId,
      sellingPrice: productContextValue.selectedItem.sellers[0].commertialOffer.PriceWithoutDiscount,
      skuName: productContextValue.selectedItem.name,
      unitMultiplier: productContextValue.selectedItem.unitMultiplier,
      uniqueId: productContextValue.selectedItem.itemId,
      isGift: false,
      __typename: 'Item'
    }
  ]

  //setOrderForm
  orderForm.items = [
    ...orderForm.items,
    item[0]
  ]
  setOrderForm(orderForm)

  //console.log("ORDERFORM UPDATED ----> ", orderForm)

  await addToCart(item)

}

export const getSkubyId = async (productId) => {

  try{

    const data = await fetch(`/api/catalog_system/pub/products/search?fq=productId:${productId}`)

    if (!data.ok) {
      throw new Error('Erro de rede ao tentar buscar os dados.');
    }

    const skuData = await data.json();

    //console.log("skuData --> ", skuData);

    const { items } = skuData[0]
    return items
    
  } catch (error) {
    console.error("Error to get skus: ", error)
  }

}