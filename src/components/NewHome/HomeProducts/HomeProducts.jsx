import { useEffect, useState } from 'react'
import { makeApi } from '../../../api/callApi'
import styles from './HomeProducts.module.css'
import { useNavigate } from 'react-router'
import Primaryloader from '../../loaders/primaryloader'

const HomeProducts = () => {
  const [AllProductLoader, setAllProductLoader] = useState(false)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const fetchProduct = async () => {
    try {
      setAllProductLoader(true)
      // Fetch all categories
      const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET")
      const categories = categoriesResponse.data.categories

      if (categories.length > 0) {
        // Use the 5th category (index 4)
        const categoryId = categories[2]._id
        // Fetch products by category
        const response = await makeApi(
          `/api/get-all-products-by-category/${categoryId}`,
          "GET"
        )
        setProducts(response.data.products)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setAllProductLoader(false)
    }
  }
  useEffect(() => {
    fetchProduct()
    // fetchCart(setCartItems)
  }, [])
  console.log("All banner products" + products);

  return (
    <>
      {AllProductLoader ? (
        <div className="a_All_Product_loader">
          <div className={styles.loader}>
            <Primaryloader />
          </div>
        </div>
      ) : (


        <div className={styles.container}>
          {products.length > 0 && (
            <div className={styles.wrapper}>
              {products.slice(1, 6).map((item, index) => ( // Slice to show only the first 6 products
                <div className={styles.content} key={index}>
                  <div className={styles.imgContainer}>
                    <img src={item?.thumbnail} alt="" />
                  </div>
                  <button onClick={() => navigate(`/product/product-details/${item._id}`)}>
                    View More
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default HomeProducts
