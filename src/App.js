import logo from './logo.svg';
import './App.css';
import MainBody from './components/home/MainBody';
import Nav from './components/Nav/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import SearchPage from './components/searchPage/SearchPage';

const Layout = ({isLogin,setIsLogin}) => {
  return (
    <div>
      <Nav isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Outlet/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      {/* <Nav></Nav>
      <MainBody/> */}
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<MainBody />} />
            <Route path='search' element={<SearchPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
