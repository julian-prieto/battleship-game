import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { LevelSelector } from 'components';

const handleSelectDifficulty = jest.fn();

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LevelSelector onSelectDifficulty={handleSelectDifficulty} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders Select Level Button Correctly', () => {
  const { getByTestId } = render(
    <LevelSelector onSelectDifficulty={handleSelectDifficulty} />,
  );
  expect(getByTestId('select-level-Medium')).toHaveTextContent('Medium');
});

it('Button onClick fires correctly', () => {
  const { getByTestId } = render(
    <LevelSelector onSelectDifficulty={handleSelectDifficulty} />,
  );
  fireEvent.click(getByTestId('select-level-Medium'));
  expect(handleSelectDifficulty).toHaveBeenCalledTimes(1);
});

it('Matches Snapshot', () => {
  const tree = renderer
    .create(<LevelSelector onSelectDifficulty={handleSelectDifficulty} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
