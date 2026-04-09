import React from 'react'
import { router } from '@inertiajs/react'

export default function Checkout() {

    const submit = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        router.post('/checkout', {
            name: form.get('name'),
            phone: form.get('phone'),
            city: form.get('city'),
            address: form.get('address'),
        })
    }

    return (
        <div>
            <h1>Shipping Information</h1>

            <form onSubmit={submit}>
                <input name="name" placeholder="Full Name" required />
                <input name="phone" placeholder="Phone" required />
                <input name="city" placeholder="City" required />
                <textarea name="address" placeholder="Address" required />

                <button type="submit">Confirm Order</button>
            </form>
        </div>
    )
}