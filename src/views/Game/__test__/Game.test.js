import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { Game } from 'views';

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Selects Easy level Correctly', () => {
  const { getByTestId } = render(<Game />);
  fireEvent.click(getByTestId('select-level-Easy'));
});

it('Tries to Sink a Ship Correctly', () => {
  const { getByTestId } = render(<Game />);
  fireEvent.click(getByTestId('select-level-Easy'));
  fireEvent.click(getByTestId('col-user-0-0'));
});

it('Resets Game Correctly', () => {
  const { getByTestId } = render(<Game />);
  fireEvent.click(getByTestId('select-level-Easy'));
  fireEvent.click(getByTestId('col-user-0-0'));
  fireEvent.click(getByTestId('end-game'));
});

it('Matches Snapshot', () => {
  const tree = renderer.create(<Game />).toJSON();
  expect(tree).toMatchSnapshot();
});
