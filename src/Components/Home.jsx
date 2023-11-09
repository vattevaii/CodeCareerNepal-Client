import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Loader from "./Loader";

function Home() {
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://codecareernepal.cyclic.app/api"
        );
        setAllListings(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching job listings");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="bg-light">
          <div className="container py-5">
            <div className="row h-100 align-items-center py-5">
              <div className="col-lg-6">
                <h1 className="display-4">Job Listings</h1>
                {/* <p className="lead text-muted mb-0">
                Explore the latest IT job openings.
              </p> */}
                <div className="lead text-muted mb-0">
                  <div className="typing-demo">Explore latest IT job openings.</div>
                </div>
                
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-about/illus.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="container py-5">
            <div className="row">
              {allListings.map((element) => (
                <div
                  key={element.companyName}
                  className="col-lg-4 col-md-6 mb-4"
                >
                  <div className="card p-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div className="icon">
                          <i className="bx bx-code-alt bx-rotate-180"></i>
                        </div>
                        <div className="ms-2 c-details">
                          <h6 className="mb-0">
                            {element.companyName.toUpperCase()}
                          </h6>
                          <span>1 day ago</span>
                        </div>
                      </div>
                      <div className="badge">
                        <span>Location</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="display-6">
                        Current Opening:{" "}
                        <span className="fw-bold">
                          {element.totalJobs.length}
                        </span>
                      </h3>
                    </div>
                    <div className="mt-4">
                      <a
                        href={`/${element.companyName}`}
                        className="btn btn-light px-5 rounded-pill shadow-sm custom-hover-effect"
                      >
                        More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
