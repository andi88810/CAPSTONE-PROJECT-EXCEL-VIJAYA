import React from 'react'
import { priceFormat } from '../utils'
import { useSelector } from 'react-redux'

const CartTotal = () => {
    const { cartTotal } = useSelector((state) => state.cartState)
    
    return (
        <div className='card bg-base-300'>
            <div className='card-body'>
                <p className='flex justify-between text-sm '>
                    <span className='font-bold font-w-2xl'>Total : {priceFormat(cartTotal)}</span>
                  
                </p>
               
                <p className='flex justify-between text-sm border-b pb-1 '>
                    <span className='font-bold font-w-2xl'>Shipping Cost : 0</span>
                   
                </p>
            </div>
        </div>
    )
}

export default CartTotal
