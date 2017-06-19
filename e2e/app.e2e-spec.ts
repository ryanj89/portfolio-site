import { PortfolioSitePage } from './app.po';

describe('portfolio-site App', () => {
  let page: PortfolioSitePage;

  beforeEach(() => {
    page = new PortfolioSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
