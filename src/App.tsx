import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ipcLink } from 'electron-trpc/renderer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppBar from './component/AppBar';
import Setting from './page/Setting';
import CreateJoinInfo from './page/CreateJoinInfo';
import ClearSettings from './page/ClearSettings';
import Template from './Template';

import { trpcReact } from './trpc';
import { ROUTER_PATHS } from './constants';
import CreatedResult from './page/CreatedResult';
import VRChatLogPathSetting from './page/setting/VRChatLogPathSetting';
import VRChatPhotoPathSetting from './page/setting/VRChatPhotoPathSetting';

const queryClient = new QueryClient();
const trpcClient = trpcReact.createClient({
  links: [ipcLink()]
});

function Router() {
  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Template>
          <HashRouter>
            <Routes>
              <Route path={ROUTER_PATHS.HOME} element={<CreateJoinInfo />} />
              <Route path={ROUTER_PATHS.CREATED_RESULT} element={<CreatedResult />} />
              <Route path={ROUTER_PATHS.SETTING} element={<Setting />} />
              <Route path={ROUTER_PATHS.SETTING_VRCHAT_LOG_PATH} element={<VRChatLogPathSetting />} />
              <Route path={ROUTER_PATHS.SETTING_VRCHAT_PHOTO_PATH} element={<VRChatPhotoPathSetting />} />
              <Route path={ROUTER_PATHS.CLEAR_SETTINGS} element={<ClearSettings />} />
            </Routes>
          </HashRouter>
        </Template>
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}

function App() {
  return (
    <div className="flex flex-col h-screen">
      {window.Main && <AppBar />}
      {window.Main && <Router />}
    </div>
  );
}

export default App;
