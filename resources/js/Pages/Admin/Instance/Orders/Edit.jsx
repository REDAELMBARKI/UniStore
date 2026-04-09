import React from 'react'
import { router } from '@inertiajs/react'
import { InstanceAdminPanel } from '@/Layouts/instance/InstanceAdminPanel'

export default function Edit({ order }) {

    const submit = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        router.post(`/admin/orders/${order.id}`, {
            _method: 'put',
            status: form.get('status')
        })
    }

    return (
        <div>
            <h1>Edit Order #{order.id}</h1>

            <form onSubmit={submit}>
                <select name="status" defaultValue={order.status}>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                </select>

                <button type="submit">Update</button>
            </form>
        </div>
    )
}

Edit.Layout = page => <InstanceAdminPanel>{page}</InstanceAdminPanel>