import headerButtons from '../header-buttons.html';

const addButtonsToPageContent = async () => {
  if (window.location.pathname != '/my/') {
    return Promise.reject();
  }
  if (document.querySelector('#page-content')!.clientWidth > 850) {
    const element = document.querySelector('#page-content');
    element!.innerHTML = headerButtons + element!.innerHTML;
  }
  onresize = () => checkButtons();
  return await Promise.resolve();
};

const checkButtons = () =>
  ((document.querySelector('#rmtButtons') as HTMLElement).style.display =
    document.querySelector('#page-content')!.clientWidth <= 850
      ? 'none'
      : 'flex');

export default addButtonsToPageContent;
