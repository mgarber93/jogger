import React from 'react';
import ReactDOM from 'react-dom';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import App from './App';
import configureStore from '../../redux/index';

describe('<App />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    const store = configureStore();
    shallow(<Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>);
  });
});
