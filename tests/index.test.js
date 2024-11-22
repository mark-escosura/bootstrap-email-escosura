/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { screen, getByText } = require('@testing-library/dom');
require('@testing-library/jest-dom');

describe('Email Template', () => {
  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, '../index.html'),
      'utf8'
    );
    document.body.innerHTML = html;
  });

  // Test Cases
  test('has a header with a title', () => {
    expect(
      screen.getByRole('heading', { name: /email template/i })
    ).toBeInTheDocument();
  });
});
