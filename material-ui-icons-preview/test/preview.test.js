// test.js
import React from 'react';
import renderer from 'react-test-renderer';
import View from '../src';

test('preview test', () => {
  const component = renderer.create(<View/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});