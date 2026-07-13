import  AuthProvider  from "./AuthContext";
import { CartProvider } from "./CartContext";
// import GlobalUiProvider from "./GlobalUiContext";
import SearchProvider from "./SearchContext";


export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      {/* <GlobalUiProvider> */}
        <SearchProvider>
        <CartProvider>
          {children}
        </CartProvider>
        </SearchProvider>
      {/* </GlobalUiProvider> */}
    </AuthProvider>
  );
}