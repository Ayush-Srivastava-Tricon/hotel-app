import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
private _container: any;


  
 alert(type: string, message: string, title?: string, options?: any) {
  if (!options) {
    options = {};
  }
  options = { ...this.defaults, ...options };

  if (!this._container) {
    this._container = document.createElement('ul');
    this._container.id = 'alerts';
    document.body.appendChild(this._container);
  }

  if (options.width) {
    this._container.style.width = options.width;
  }

  const alertElem = document.createElement('li');
  alertElem.classList.add('alert');
  alertElem.classList.add('alert-' + type);
  setTimeout(() => {
    alertElem.classList.add('open');
  }, 1);

  const innerElem = document.createElement('div');
  innerElem.classList.add('alert-block');
  alertElem.appendChild(innerElem);

  if (title) {
    const titleElem = document.createElement('div');
    titleElem.classList.add('alert-title');
    titleElem.innerHTML = title;
    innerElem.appendChild(titleElem);
  }

  if (message) {
    const messageElem = document.createElement('div');
    messageElem.classList.add('alert-message');
    messageElem.innerHTML = message;
    innerElem.appendChild(messageElem);
  }

  if (options.displayDuration > 0) {
    setTimeout(() => {
      leave();
    }, options.displayDuration);
  } else {
    innerElem.innerHTML += '<em>Click to Dismiss</em>';
  }

  alertElem.addEventListener('click', () => {
    leave();
  });

  const leave = () => {
    alertElem.classList.remove('open');
    alertElem.addEventListener('transitionend', () => {
      alertElem.remove();
    });
  };

  this._container.prepend(alertElem);
}

private defaults = {
  width: '',
  icon: '',
  displayDuration: 3000,
  pos: ''
};

}
