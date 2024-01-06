import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItems] = useState([]);

  const loadData = async () => {
    const response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsResponse = await response.json();

    setFoodItems(jsResponse[0]);
    setFoodCat(jsResponse[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
      <div><div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
   <div className="carousel-inner" id='carousel'>
     <div className='carousel-caption'  style={{zIndex:"10"}}>
     <div className="d-flex" style={{ justifyContent: "center" }} >
       <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
     </div>
     </div>
     <div className="carousel-item active">
       <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{maxWidth: '100%', maxHeight: '5%',filter: "brightness(100%)", objectFit:"fill"}} alt="..."/>
     </div>
     <div className="carousel-item">
       <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{maxWidth: '100%', maxHeight: '5%',filter: "brightness(100%)", objectFit:"fill"}} alt="..."/>
     </div>
     <div className="carousel-item">
       <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" style={{maxWidth: '100%', maxHeight: '5%',filter: "brightness(100%)", objectFit:"fill"}} alt="..."/>
     </div>
   </div>
   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Previous</span>
   </button>
   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
   </button>
 </div></div>
      </div>
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="mb-3">
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              <div className="row">
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filteritems) => (
                      <div
                        className="col-12 col-md-6 col-lg-3 mb-3"
                        key={filteritems._id}
                      >
                        <Card foodItem={filteritems} options={filteritems.options[0]} />
                      </div>
                    ))
                ) : (
                  <div key={`empty-${data._id}`}>No data exist</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div key="empty">No categories exist</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
