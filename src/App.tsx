import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const MainContainer = lazy(() => import("./components/MainContainer"));
const CaseStudy = lazy(() => import("./components/CaseStudy"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <BrowserRouter>
          <Suspense>
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/casestudy/:id" element={<CaseStudy />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LoadingProvider>
    </>
  );
};

export default App;
