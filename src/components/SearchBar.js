import { React } from "react";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Details from "./Details";
import Repos from "./Repos";

function SearchBar() {
  const [searchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [backEndErrors, setBackEndErrors] = useState(false);

  //This variable serves as a placeholder because the user repo details are undefined when the app
  //Starts when there is no data
  //This is a placeholder until a user searches for a repo
  const placeHolders = {
    account: {
      avatar_url: "",
      name: "",
      created_at: "",
      bio: "",
      public_repos: "",
      followers: "",
      following: "",
    },
    repo: [
      {
        name: "",
        description: "",
        created_at: "",
        updated_at: "",
        git_url: "",
      },
    ],
  };

  const [result, setResult] = useState(placeHolders);

  //the data is requested when the search button is clicked
  //the async function fetches the data and stores the result in the variable 'result'
  async function getData(e) {
    e.preventDefault();
    //if the input box is empty when search button is clicked
    //the user is asked to write an account else the account searched
    if (searchWord === "") {
      setErrors(true);
    } else {
      setErrors(false);
      setLoading(true);
      fetch(`/api/${searchWord}`, { mode: "no-cors" })
        .then((response) => response.json())
        .then((data) => {
          //if the account entered by the user is not found then the user is alerted
          //else the results are displayed
          if (data.account.message === "Not Found") {
            setResult(placeHolders);
            setBackEndErrors(true);
            setDisplayResults(false);
          } else {
            setBackEndErrors(false);
            setResult(data);
            setDisplayResults(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error unsuccessful", err);
        });
    }
  }

  return (
    <>
      {/*Search Bar*/}
      <div className="container">
        {errors && (
          <p style={{ color: "red", fontSize: "15px" }}>
            Enter a GitHub Account User Name!
          </p>
        )}
        <input
          type="text"
          className="textbox"
          placeholder="Enter your Github User Name..."
          onChange={(e) => setSearchWord(e.target.value)}
        />
        {loading ? (
          <button className="search-btn">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {""}
            Loading
          </button>
        ) : (
          <button className="search-btn" onClick={getData}>
            Search
          </button>
        )}
      </div>

      <br />
      {backEndErrors && (
        <p style={{ color: "red", fontSize: "17px" }}>User Not Found!</p>
      )}

      {displayResults && <Details results={result} loading={loading} />}
      <br />
      {displayResults && <Repos repos={result} loadingTable={loading} />}
    </>
  );
}

export default SearchBar;
