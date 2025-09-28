import './index.css';

import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import storeRedux from './store/store.ts';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')!).render(
    <Provider store={storeRedux}>
        <App />
    </Provider>
);
