import { PictionaryPage } from './app.po';

describe('pictionary App', () => {
  let page: PictionaryPage;

  beforeEach(() => {
    page = new PictionaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
