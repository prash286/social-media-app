import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import NewsFeed from "./pages/NewsFeed";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="newsfeed" />} />
            <Route path="newsfeed" element={<NewsFeed />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        containerStyle={{ margin: 8 }}
        gutter={12}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "gray",
            color: "white",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
