import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './app.less';
import { Playground } from './playground';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
    <Playground />
  </React.Fragment>
  // <React.StrictMode>
  //   <Playground />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
