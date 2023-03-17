import React from "react";
import "./styles.css";
import { Container } from "reactstrap";

function Greeting(props) {
  const { name, userId } = props;

  return (
    <div>
      <Container>
        <div>
          <br></br>

          <br></br>
          <h1 className="doctitle">Welcome {name}</h1>
          <hr className="my-4"></hr>
          <p>user id: {userId}</p>
        </div>
      </Container>
    </div>
  );
}

export default Greeting;
