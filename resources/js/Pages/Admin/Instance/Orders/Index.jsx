import React from 'react'
import { router } from '@inertiajs/react'
import { InstanceAdminPanel } from '@/Layouts/instance/InstanceAdminPanel'

export default function Index({ orders, filters }) {

    const handleFilter = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)

        router.get('/admin/orders', {
            status: form.get('status'),
            date: form.get('date')
        })
    }

    const deleteOrder = (id) => {
        if (confirm('Delete this order?')) {
            router.delete(`/admin/orders/${id}`)
        }
    }

    return (
        <div>
            <h1>Orders</h1>

            <form onSubmit={handleFilter}>
                <select name="status" defaultValue={filters.status || ''}>
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                </select>

                <input type="date" name="date" defaultValue={filters.date || ''} />

                <button type="submit">Filter</button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>{order.created_at}</td>

                            <td>
                                <button onClick={() => router.get(`/admin/orders/${order.id}/edit`)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteOrder(order.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Index.Layout = page => <InstanceAdminPanel>{page}</InstanceAdminPanel>