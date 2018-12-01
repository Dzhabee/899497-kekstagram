'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var MIN_PICTURE = 1;
var MAX_PICTURE = 25;
var MIN_LIKE = 15;
var MAX_LIKE = 200;
var MIN_COMMENT_AVA = 1;
var MAX_COMMENT_AVA = 6;

// случайное число в диапозоне с - по
var getRndInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// случайное значение из массива
var getRndValue = function (arrayname) {
  var rendomIndex = Math.floor(Math.random() * arrayname.length);
  return arrayname[rendomIndex];
};

// случайное количество и случайные значения из одного массива записанные в другой
var getRndArray = function (fromarray) {
  var newArray = [];
  var count = getRndInteger(0, fromarray.length);

  for (var i = 0; i <= count; i++) {
    newArray.push(getRndValue(fromarray));
  }
  return newArray;
};

// конструктор для создания объектов (для цикла добавления данных в массив фогорафий пользователей)
function CreateObject(url, like, comment, description) {
  this.url = url;
  this.likes = like;
  this.comments = comment;
  this.description = description;
}

// получение массива данных пользовательских фотографий
var getUserTamplate = function () {
  var tamplates = [];
  for (var i = 0; i < MAX_PICTURE; i++) {
    tamplates.push(new CreateObject('photos/' + getRndInteger(MIN_PICTURE, MAX_PICTURE) + '.jpg', getRndInteger(MIN_LIKE, MAX_LIKE), getRndArray(comments), getRndValue(descriptions)));
  }
  return tamplates;
};

// Задание 2
var pictureBlock = document.querySelector('.pictures');
var userPictureTamplate = document.querySelector('#picture').content.querySelector('.picture');

var createUserPicture = function (picture) {
  var pictureElement = userPictureTamplate.cloneNode(true);
  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};

// Задание 3
var renderUserPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  var count = pictures.length;
  for (var i = 0; i < count; i++) {
    fragment.appendChild(createUserPicture(pictures[i]));
  }
  pictureBlock.appendChild(fragment);
};

renderUserPictures(getUserTamplate());

// Задание 4
var bigPicture = document.querySelector('.big-picture');
var closeBigEmg = document.querySelector('.big-picture__cancel');

pictureBlock.addEventListener('click', function () {
  bigPicture.classList.remove('hidden');

  var firstUserValue = getUserTamplate()[0];
  var blockImg = document.querySelector('.big-picture__img');
  blockImg.querySelector('img').src = firstUserValue.url;
  document.querySelector('.likes-count').textContent = firstUserValue.likes;
  document.querySelector('.comments-count').textContent = firstUserValue.comments.length;
  document.querySelector('.social__caption').textContent = firstUserValue.description;

  // добавление комментарий к открытой фотографии
  var createComment = function () {
    var socialComment = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    var count = firstUserValue.comments.length;

    for (var i = 0; i < count; i++) {
      var rndComment = document.createElement('li');
      rndComment.classList.add('social__comment');
      fragment.appendChild(rndComment); // Вопрос? Если я элемент li добавил во фрагмент, то потом когда я добавляю текст и изображение к тегу li то они также добавляются во фрагмент?
      var rndCommentImg = document.createElement('img');
      rndCommentImg.classList.add('social__picture');
      rndCommentImg.src = 'img/avatar-' + getRndInteger(MIN_COMMENT_AVA, MAX_COMMENT_AVA) + '.svg';
      rndCommentImg.alt = 'Аватар комментатора фотографии';
      rndComment.appendChild(rndCommentImg); // Вот это добавляется во фрагмент
      var rndCommentDsp = document.createElement('p');
      rndCommentDsp.classList.add('social__text');
      rndCommentDsp.textContent = firstUserValue.comments[i];
      rndComment.appendChild(rndCommentDsp); // Вот это добавляется во фрагмент
    }
    return socialComment.appendChild(fragment);
  };

  createComment();
});

closeBigEmg.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});


// Задание 5
document.querySelector('.social__comment-count').classList.add('.social__comment-count', 'visually-hidden');
document.querySelector('.comments-loader').classList.add('.comments-loader', 'visually-hidden');


// Новая домашка
var uploFile = document.querySelector('#upload-file');
var editEmg = document.querySelector('.img-upload__overlay');
var closeEmg = editEmg.querySelector('.img-upload__cancel');

uploFile.addEventListener('change', function () {
  editEmg.classList.remove('hidden');
});

closeEmg.addEventListener('click', function () {
  editEmg.classList.add('hidden');
});

closeEmg.addEventListener('click', function () {
  editEmg.classList.add('hidden');
});


var sliderElem = document.querySelector('.effect-level__line');
var thumbElem = sliderElem.querySelector('.effect-level__pin');
var depthElem = sliderElem.querySelector('.effect-level__depth');

thumbElem.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = evt.clientX;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    // Не понимаю как условие поставить чтобы пин не вываливался за div effect-level__depth. Дописываю еще условие И startCoords < depthElem.getBoundingClientRect().right, но оно не канает
    if (startCoords > depthElem.getBoundingClientRect().left) {
      thumbElem.style.left = (thumbElem.offsetLeft - shift) + 'px';
    }
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
