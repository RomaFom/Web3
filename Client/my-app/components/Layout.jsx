import React from "react";
import Menu from "./Menu";
import { Container } from "semantic-ui-react";
function Layout(props) {
  return (
    <Container>
      <Menu />
      {props.children}
    </Container>
  );
}

export default Layout;
