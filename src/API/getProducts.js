import axiosApiInstance from './interceptors'
import './interceptors'

const getProducts = async () => {
  try {
    const res = await axiosApiInstance.get(
      `https://vue-jwt-d524c-default-rtdb.europe-west1.firebasedatabase.app/products.json`,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default getProducts
