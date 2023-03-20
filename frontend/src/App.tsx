import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loading from "./components/Loading/index";
import { AuthRoute } from "./HOC/AuthRoute";
import { ROUTES } from "./routes";
const AuctionPage = lazy(() => import("./pages/Auction"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignUpPage = lazy(() => import("./pages/SignUp"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
          <Route
            path={ROUTES.SUB_HOME}
            element={<AuthRoute component={<AuctionPage />} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
