/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { screen } = require('@testing-library/dom');
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

  // Test for external stylesheet and absence of inline styles
  test('Should use an external stylesheet and have no inline styles', () => {
    const linkTag = document.querySelector('link[rel="stylesheet"]');
    const body = document.querySelector('body');

    // Ensure an external stylesheet is linked
    expect(linkTag).toBeTruthy();
    expect(linkTag.getAttribute('href')).not.toBeNull();

    // Ensure there are no inline styles on the body or other elements
    expect(body.getAttribute('style')).toBeNull();

    // Check for other elements to confirm no inline styles
    const elementsWithInlineStyles = document.querySelectorAll('[style]');
    expect(elementsWithInlineStyles.length).toBe(0); // Should be zero inline styles
  });

  test('has a header with a title', () => {
    expect(
      screen.getByRole('heading', { name: /SendFlow/i })
    ).toBeInTheDocument();
  });

  test('Should use at least two unique Bootstrap components (buttons and lists)', () => {
    const buttons = document.querySelectorAll('.btn');
    const listItems = document.querySelectorAll('.list-group-item');

    expect(buttons.length).toBeGreaterThan(1);
    buttons.forEach((button) => {
      expect(button.classList).toContain('btn');
    });

    expect(listItems.length).toBeGreaterThan(0);

    listItems.forEach((listItem) => {
      expect(listItem.classList).toContain('list-group-item');
    });
  });
});
