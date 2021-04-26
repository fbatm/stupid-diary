test('my-react test', () => {
  document.body.innerHTML = '<div id="root"></div>';

  require('../src/index');
  expect(document.body.innerHTML).toEqual('<div id="root"><h1>hello world</h1></div>');
})