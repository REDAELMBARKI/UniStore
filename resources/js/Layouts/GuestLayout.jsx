import ApplicationLogo from '@/Components/ApplicationLogo';
import { store } from '@/store/store';
import { Link } from '@inertiajs/react';
import { Provider, useSelector } from 'react-redux';

export default function GuestLayoutMaster({ header, children }) {
     return <Provider store={store}>
                 <GuestLayout  {...{ header, children }} />
            </Provider> 
}

 function GuestLayout({header ,  children }) {
   const theme = useSelector((state) => state.theme) ; 

    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

             {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
