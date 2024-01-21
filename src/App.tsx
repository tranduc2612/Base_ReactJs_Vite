import { ReactElement } from "react";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "./routes"
// import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {PUBLIC_ROUTER.map((item, index) => {
            const Page = item.page;
            return <Route
              key={index}
              path={item.path}
              element={
                <Page />
              }
            />
          })}

          {PRIVATE_ROUTER.map((item, index) => {
            const Page = item.page;
            return <Route
              key={index}
              path={item.path}
              element={<Page />}
            />
          })}
          {/* <Route path="*" element={<>NotFound</>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
