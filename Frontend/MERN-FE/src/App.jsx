import React from 'react';
import Sidebar from './Components/Sidebar.jsx';
import Header from './Components/Header.jsx';
import AllRoutes from './Routes/AllRoutes.jsx';

function App() {
  return (
    <div className="flex h-screen bg-white dark:bg-black">
      <Header />
      <Sidebar />
      <main className="flex-1 mt-20 sm:ml-80 overflow-y-auto border-t sm:border-l sm:rounded-xl border-gray-500   bg-gray-100 dark:bg-black dark:text-white">
        {/* Your main content goes here */}
        <div className="p-8">
          <h1 className="text-2xl font-bold">Main Content Area</h1>
          <AllRoutes/>
        </div>
      </main>
    </div>
  );
}

export default App;
