import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { Navigation } from "components";

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Navigation />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("Renders Navigation Correctly", () => {
  const { getByTestId } = render(
    <Router>
      <Navigation />
    </Router>
  );
  expect(getByTestId("sections-list")).toHaveTextContent("Home");
});

it("Matches Snapshot", () => {
  const tree = renderer
    .create(
      <Router>
        <Navigation />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
