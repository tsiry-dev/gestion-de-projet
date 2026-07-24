import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxStoreProvider } from "react-redux"
import { type ReactNode } from "react"
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from "@app/store/store";

type AppProviderProps = {
    children: ReactNode;
}

const queryClient = new QueryClient();

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxStoreProvider store={store}>
       <BrowserRouter>
            {children}
       </BrowserRouter>
        <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{margin: '3px'}}
              toastOptions={{
                success: {
                  duration: 3000
                },
                error: {
                  duration: 3000
                },
                style: {
                  fontSize: '13px',
                  maxWidth: '500px',
                  backgroundColor: 'white',
                  color: 'gray'
                }
              }}
          />
        </ReduxStoreProvider>
         <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
