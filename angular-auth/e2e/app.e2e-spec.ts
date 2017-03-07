import { AngularAuthPage } from './app.po';

describe('angular-auth App', function() {
  let page: AngularAuthPage;

  beforeEach(() => {
    page = new AngularAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
