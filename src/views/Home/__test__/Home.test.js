import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Home } from "views";

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Home />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders Welcome Message Correctly", () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("welcome")).toHaveTextContent(
    "Welcome to Battleship Game"
  );
});

it("Matches Snapshot", () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
