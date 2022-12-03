

import Layout from "./layout";
import peticiones from "../http/peticiones";


const Home = () => {
  const elem_h= 
    <div>
      {Layout} 
      <h1>pagina principal</h1>
    </div>

    return elem_h;
  };
  
  export default Home;