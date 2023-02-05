import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from 'react-router-dom';

function App() {
  return (
    <>
      <div id="sidebar">
        <h1>Project Adagio</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/process-article`}>Process a new article</Link>
            </li>
            <li>
              <Link to={`/search-workflow`}>Search for an existing workflow</Link>
            </li>
            <li>
              <Link to={`/browse-workflows`}>Browse workflows</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );

}

export default App;

export async function loader() {
  return { };
}