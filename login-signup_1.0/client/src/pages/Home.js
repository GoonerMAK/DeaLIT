import { useEffect }from 'react'
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components

import ProducttForm from '../components/ProductForm'

const Home = () => {
  // const {workouts, dispatch} = useProductsContext()
  const {user} = useAuthContext()

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     const response = await fetch('/api/workouts', {
  //       headers: {'Authorization': `Bearer ${user.token}`},
  //     })
  //     const json = await response.json()

  //     if (response.ok) {
  //       dispatch({type: 'SET_WORKOUTS', payload: json})
  //     }
  //   }

  //   if (user) {
  //     fetchWorkouts()
  //   }
  // }, [dispatch, user])

  return (
    <div className="home">
      {/* <div className="workouts">
        {workouts && workouts.map((workout) => (
          <productDetails key={workout._id} workout={workout} />
        ))}
      </div> */}
      <ProducttForm />
    </div>
  )
}

export default Home