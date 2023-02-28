import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import ProcessArticle from './ProcessArticle';
import SearchWorkflow from './SearchWorkflow';
import BrowseWorkflows from './BrowseWorkflows';
import Article from './Article';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/process-article",
        element: <ProcessArticle />,
      },
      {
        path: "/search-workflow",
        element: <SearchWorkflow />,
      },
      {
        path: "/browse-workflows",
        element: <BrowseWorkflows />,
      },
      {
        path: "/browse/:articleId",
        element: <Article />,
      },
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
