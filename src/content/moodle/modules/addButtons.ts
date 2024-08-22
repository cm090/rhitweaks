import headerButtons from '../header-buttons.html';

const addButtonsToPageContent = async () => {
  if (window.location.pathname != '/my/') {
    return Promise.reject();
  }
  if (document.querySelector('#page-content')!.clientWidth > 850) {
    const element = document.querySelector('#page-content');
    if (element) {
      element.innerHTML = headerButtons + element.innerHTML;
    }
  }
  onresize = () => checkButtons();
  return await Promise.resolve();
};

const checkButtons = () => {
  const buttons = document.querySelector('#rmtButtons');
  const page = document.querySelector('#page-content');
  if (buttons && page) {
    (buttons as HTMLElement).style.display =
      page.clientWidth <= 850 ? 'none' : 'flex';
  }
};

export default addButtonsToPageContent;
