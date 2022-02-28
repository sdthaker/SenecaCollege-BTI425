import SearchBar from './SearchBar';
import NavBar from './NavBar';
import Home from './Home';
import NotFound from './NotFound';
import SearchByCC from './SearchByCC';
import RecentCity from './RecentCity';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SearchByID from './SearchByID';
import 'bootstrap/dist/css/bootstrap.css';
import SimpleMap from './SimpleMap';

function App() {
  const [recentlyViewed, setRecentlyViewed] = useState(
    localStorage.getItem('recentlyViewed')
      ? JSON.parse(localStorage.getItem('recentlyViewed'))
      : []
  );

  const handleClick = (e, data) => {
    if (recentlyViewed.find((elem) => elem.id === data.id) === undefined) {
      if (recentlyViewed.length === 5) {
        recentlyViewed.pop();
      }
      setRecentlyViewed((recViewed) => [data, ...recViewed]);
    }
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  };

  return (
    <>
      <Router>
        <NavBar recentlyViewed={recentlyViewed} />
        <SearchBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route
            exact
            path='/search/:value'
            element={<SearchByCC handleClick={handleClick} />}
          />
          <Route
            exact
            path='/world'
            element={<SimpleMap recentlyViewed={recentlyViewed} />}
          />
          <Route
            exact
            path='/recent/:id'
            element={<RecentCity recentlyViewed={recentlyViewed} />}
          />
          <Route exact path='/id/:id' element={<SearchByID />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
