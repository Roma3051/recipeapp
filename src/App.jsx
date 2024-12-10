// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import { CartProvider } from './Components/CartContent';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

// import Recipes from './Components/Recipes';
// import RecipeDetails from './Components/RecipeDetails';
// import BasketResipe from './Components/BasketResipe';

// const queryClient = new QueryClient(); 

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <CartProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Recipes />} />
//             <Route path="/recipe/:id" element={<RecipeDetails />} />
//             <Route path="/basket" element={<BasketResipe />} />
//           </Routes>
//         </Router>
//       </CartProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './Components/CartContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

import Recipes from './Components/Recipes';
import RecipeDetails from './Components/RecipeDetails';
import BasketResipe from './Components/BasketResipe';

const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/basket" element={<BasketResipe />} />
          </Routes>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
