import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "@fontsource/space-mono";

//This component displays the user account details
//All user details are taken from the searchBar and are displayed below
function Details({ results, loading }) {
  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          <div className="userDemographicsContainer">
            <img
              src={results.account.avatar_url}
              alt={results.account.avatar_url}
              className="userPhoto"
            />
            <div className="userDataBox">
              <a className="userName">{results.account.name}</a>
              <a className="userID"></a>
              <a className="userJoinedData">
                Joined: {results.account.created_at}
              </a>
            </div>
          </div>
          <p className="userAboutMe">{results.account.bio}</p>
          <div className="userGithubDataBox">
            <div className="gitDataTitle">
              Repos
              <a className="number">{results.account.public_repos}</a>
            </div>
            <div className="gitDataTitle">
              Followers
              <a className="number">{results.account.followers}</a>
            </div>
            <div className="gitDataTitle">
              Following
              <a className="number">{results.account.following}</a>
            </div>
          </div>
        </div>
      )}
      <br />
    </div>
  );
}

export default Details;
