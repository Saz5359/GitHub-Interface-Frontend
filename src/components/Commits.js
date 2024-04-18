import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

//This component returns the last 5 commit descriptions
//user name and repo names are passed from each repo
function Commits({ name, repo }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(false);

  //get the results from the backend
  const getData = async () => {
    setIsLoading(true);
    fetch("/commits/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userName: name,
        repoName: repo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        //Remove button and show results
        setResult(true);
      })
      .catch((err) => {
        console.log("Error unsuccessful", err);
      });
  };

  return (
    <div>
      {!result ? (
        <Button onClick={getData} variant="dark">
          {isLoading ? <Spinner animation="border" /> : "Get latest 5 Commits"}
        </Button>
      ) : (
        <ListGroup>
          {data.slice(0, 5).map((data, i) => {
            return (
              <ListGroup.Item key={i}>
                {i + 1}. {data.commit.message}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}

export default Commits;
