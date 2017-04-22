import { MyNewAppPage } from './app.po';

describe('my-new-app App', () => {
  let page: MyNewAppPage;

  beforeEach(() => {
    page = new MyNewAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
