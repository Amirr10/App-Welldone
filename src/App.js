import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import Toolbar from './componenets/Toolbar'
// import Categories from './componenets/Categories';
import Toolbar from './componenets/Toolbar/Toolbar'
import AddCategory from './componenets/AddCategory'
import Categories from './componenets/Categories/Categories';

import Category from './componenets/Category'

function App() {

  return (
    <Router>
      <div className="App">
        <Toolbar />

        <Route path="/" exact component={Categories} />
        <Route path="/add" component={AddCategory} />
        <Route path="/category/:id" component={Category} />
      </div>
    </Router>
  )
}

export default App;
