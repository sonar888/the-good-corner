
import './App.css'
import RecentAds from './components/RecentAds'
import { Route, Routes } from "react-router"
import Layout from './components/pages/Layout';
import About from './components/pages/AboutPage';
import AdDetails from './components/pages/AdDetailsPage';
import NewAdForm from './components/pages/NewAdForm';
import AdsInCategory from './components/AdsInCategory';
import NewCategoryForm from './components/pages/NewCategoryForm'
import NewTagForm from './components/pages/NewTagForm';




export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<RecentAds/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/ad/new' element={<NewAdForm/>}/>
          <Route path='/tags/new' element={<NewTagForm/>}/>
          <Route path='/categories/new' element={<NewCategoryForm/>}/>
          <Route path='/ad/:id' element={<AdDetails />}/>
          <Route path='/ads/category/?' element={<AdsInCategory/>}/>
        </Route>
      </Routes>
      
    </>
  );
}



