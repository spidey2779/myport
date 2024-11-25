import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import ProjectsAndSkills from "./pages/ProjectsAndSkills";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import MouseFollower from "./components/MouseFollower";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="projectsandskills" element={<ProjectsAndSkills />} />
        </Route>
        <Route path="/sample" element={<SampleLayout />}>
        </Route>
      </Routes>
    </Router>
  );
};

const Layout = () => {
  return (
    <>
      <MouseFollower />
      <Nav />
      <Outlet /> {/* This will render the nested routes */}
    </>
  );
};
const SampleLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
