import React from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Commits from "./Commits";

//This component displays 5 user repos and their details
//The component takes all repos from the searchBar and displays them below
function Repos({ repos, loadingTable }) {
  return (
    <>
      <br />
      <h2>Repos details:</h2>
      {loadingTable ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Repo Name</th>
              <th>Description</th>
              <th>Creation Date</th>
              <th>Last Commit Date</th>
              <th>Last 5 Commits</th>
            </tr>
          </thead>
          <tbody>
            {/*Slice is used to display the first 5 repos and a button to display the last 5 commits descriptions.*/}
            {repos.repo.slice(0, 5).map((repo, i) => {
              return (
                <tr key={i + "row"}>
                  <td key={i}>{i + 1}</td>
                  <td key={"id-" + repo.name}>{repo.name}</td>
                  <td key={repo.description}>{repo.description}</td>
                  <td key={repo.created_at}>{repo.created_at}</td>
                  <td key={repo.updated_at}>{repo.updated_at}</td>
                  <td key={repo.git_url + i}>
                    {/* Each repos name and user name is used to get the commits */}
                    <Commits name={repo.owner.login} repo={repo.name} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <br />
    </>
  );
}

export default Repos;
