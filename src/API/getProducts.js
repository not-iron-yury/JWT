import axios from 'axios'
import './interceptor'

const getProducts = async () => {
  try {
    const res = await axios.get(
      `https://vue-jwt-d524c-default-rtdb.europe-west1.firebasedatabase.app/products.json`,
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default getProducts
