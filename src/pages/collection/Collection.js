import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utils/axiosClient";
import "./Collection.scss";

function Collection() {
  const navigate = useNavigate();
  const params = useParams(); //parameters se hamarta categoryu id mil jayaga or ussid ko useEffect mai dal dunga
  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [products, setProducts] = useState([]); //products ka state

  const sortOptions = [
    {
      value: "Price - Low To High",
      sort: "price", //kis basis pe sort ho rha h
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  //jese hi category pe click kia, toh woh cheez ke products show ho
  async function fetchProducts() {
    //ddep level ki filtering kr rhe h hame aasa product lake do jo aasi
    //category se belongh krte h jinki key iske equal h
    //category ke andar key = params.categoryID
    const url = params.categoryId
      ? //populate=image mtlb sirf image.data
        `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    //jese hi data milta hi yaha dal doge or inko niche use kroge
    setProducts(response.data.data);
  }
  //? or : iska mtlb h ki agar categoryID h toh this will be url else url will be this
  //agr user aasa aa rha h toh he want to see everything (default category will be passed) and
  //when ti will click on sports, sports categoruy will be shown

  useEffect(() => {
    //check categoryID to whatever is coming from params
    //so params se koi categoryId aa rhi h toh woh update hojayaga
    setCategoryId(params.categoryId);
    //call API
    fetchProducts();
  }, [params, sortBy]); //so call fetchproducts jab sortBy or params change

  //jab bhi koi category click ho comics, TV sports toh navigate it to that category
  function updateCategory(e) {
    //category/posts, category/TV shows so we can navigate
    navigate(`/category/${e.target.value}`);
  }

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>
              India's largest collection of wall posters for your bedroom,
              living room, kids room, kitchen and posters & art prints at
              highest quality lowest price guaranteed.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                //yaha se hi sort hojayag so we dont have to make a function
                onChange={(e) => setSortBy(e.target.value)}
              >
                {/*sort krke har option mai jao or */}
                {sortOptions.map((item) => (
                  //ek option create kro
                  //if we don't pass key, then it will give the warning
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    value={item.attributes.key}
                    id={item.id}
                    onChange={updateCategory}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="products-box">
            {products.map((product) => (
              //products component load krdo with key as product.id or product hojayag product
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
