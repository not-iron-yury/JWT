import axios from 'axios'

const getProducts = async (token) => {
  try {
    const res = await axios.get(
      `https://vue-jwt-d524c-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
    )
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export default getProducts
