import { ToastContainer } from 'react-toastify';
import { Footer, Header } from './components';
import { InterRoutes } from './routes/InterRoutes';
import { BrowserRouter } from 'react-router-dom';
import { OperativosProvider } from './context/OperativosProvider.tsx';

export const Interrapidisimo = () => {
    return (
        <OperativosProvider>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <div className='h-auto'>
                    <Header />
                    <main className='flex justify-center min-h-[calc(100vh-120px)]'>
                        <InterRoutes />
                    </main>
                    <Footer />
                    <ToastContainer
                        pauseOnFocusLoss={false}
                        pauseOnHover={false}
                    />
                </div>
            </BrowserRouter>
        </OperativosProvider>
    );
}
