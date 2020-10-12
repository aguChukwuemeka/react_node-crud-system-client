import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [views, setViews] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        await axios.get("/api/getAll/review").then((res) => {
          setMovieReviewList(res.data);
          // console.log(res.data)
        });
      } catch (ex) {
        console.error(ex);
      }
    }
    fetchData();
  });

  const handleSubmit = async () => {
    try {
      await axios
        .post("/api/insert", { movieName, movieReview: review })
        .then(() => {
          alert("Inserting went successfully");
        });
    } catch (err) {
      alert(err);
    }
  };

  const handleView = async (movie) => {
    try {
      await axios
        .get(`/api/get/single_movie/${movie}`)
        .then((res) => {
          setViews(res.data);
          // console.log(res.data)
        });
      } catch (ex) {
        console.error(ex);
      }
  };

  const handleEdit = (item) => {
    setEnableEdit(true);
    setNewReview({
      movieName: item.movieName,
      movieReview: item.movieReview
    });
  };

  const handleUpdate = async (movie) => {
    try {
      await axios
        .put("/api/update", { movieName, movieReview: review })
        .then(() => {
          console.log({ movieName, movieReview: review });
          alert("Updating went successfully");
      })
    } catch (ex) {
      console.error(ex);
    }    
  };

  const handleDelete = async (movie) => {
    try {
      await axios.delete(`/api/delete/${movie}`)
        .then(() => {
          alert("Deleting went successfully");
        });
    } catch (ex) {
      console.error(ex);
    }
  };
  
  const [view] =[...views]

  return (
    <div className="App">
      <h2 className="my-3">CRUD APPLICATION</h2>
      <div className="container  py-4">
        <h4 className="text-justify my-3 ml-2">
          {enableEdit ? "Update Your Data" : " Enter Your Data"}
        </h4>
        <a href="/" className="btn btn-dark float-right mb-4">Back</a>
        <form className="form">
          <div className="form-group mb-2">
            {enableEdit && <label>Note the name of the movie must match before you can edit the review</label>}
            <input
              type="text"
              className="form-control"
              onChange={(event) => setMovieName(event.target.value.toUpperCase())}
              placeholder={enableEdit ? newReview.movieName : "Movie name here..."}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              onChange={(event) => setReview(event.target.value)}
              placeholder={enableEdit ? newReview.movieReview : "Enter your review"}
            />
          </div>
          <button onClick={enableEdit ? handleUpdate : handleSubmit}
            className="btn btn-success mb-2">
            {enableEdit ? "Update" : "Submit"}
          </button>
        </form>
      </div>
        <div className="container">
          <div className="row my-3">
            {movieReviewList.map((list, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="card my-3">
                    <div className="card-body">
                      <h5 className="card-title">{list.movieName}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {list.movieReview}
                      </h6>
                      <p className="card-text">
                        Some quick bulk of the card's content.
                      </p>
                      <span className="inline">
                        <span className="btn btn-primary btn-sm"
                          onClick={() => handleView(list.movieName)}>View</span>

                        <span className="btn btn-info btn-sm mx-2"
                          onClick={() => handleEdit(list)}>Edit</span>

                        <span className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(list.movieName)}>Delete</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
          </div>
          <hr />
            <h4>View</h4>
            <div className="row">
            {view && 
              <div className="col-3" >
                  <div className="card my-3">
                    <div className="card-body">
                      <h5 className="card-title">{view.movieName}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {view.movieReview}
                      </h6>
                      <p className="card-text">
                        Some quick bulk of the card's content.
                      </p>
                      <span className="inline">
                        <span className="btn btn-primary btn-sm"
                          onClick={() => handleView(view.movieName)}>View</span>

                        <span className="btn btn-info btn-sm mx-2"
                          onClick={() => handleEdit(view)}>Edit</span>

                        <span className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(view.movieName)}>Delete</span>
                      </span>
                    </div>
                  </div>
                </div>
              
            }
            </div>        
        </div>  
    </div>
  );
}

export default App;
