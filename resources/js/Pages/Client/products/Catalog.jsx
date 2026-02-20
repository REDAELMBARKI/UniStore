import AuthenticatedLayoutMaster from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useSelector } from 'react-redux';

export default function Catalog({ products , params }) {
   const {colors , mode} = useSelector((state) => state.theme)
    return (
        <>
            <Head title="Welcome" />

                 <div style={{ background : colors.danger }}>
                     hello
                 </div>

        </>
    );
}

Catalog.layout = page => <AuthenticatedLayoutMaster>{page}</AuthenticatedLayoutMaster>