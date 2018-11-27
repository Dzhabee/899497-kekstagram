'use strict';

var userComment = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var userDescription = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

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
  var count = getRndInteger(0, fromarray.length);
  var newArray = [];
  for (var i = 0; i <= count; i++) {
    newArray.push(getRndValue(fromarray));
  }
  return newArray;
};

// конструктор для создания объектов (для цикла добавления данных в массив фогорафий пользователей)
function ObjectCreate(url, likes, comments, description) {
  this.url = url;
  this.likes = likes;
  this.comments = comments;
  this.description = description;
}

// получение массива данных пользовательских фотографий
var userDataTamplate = [];
var getUserData = function (arrayname) {
  for (var i = 0; i < 25; i++) {
    arrayname.push(new ObjectCreate('photos/' + getRndInteger(1, 25) + '.jpg', getRndInteger(15, 200), getRndArray(userComment), getRndValue(userDescription)));
  }
};

getUserData(userDataTamplate);

// Задание 2
var picturesBlock = document.querySelector('.pictures');
var userPicturesTamplate = document.querySelector('#picture').content.querySelector('.picture');

var createUserPictures = function (picture) {
  var picturesElement = userPicturesTamplate.cloneNode(true);
  picturesElement.querySelector('img').src = picture.url;
  picturesElement.querySelector('img').alt = picture.description;
  picturesElement.querySelector('.picture__likes').textContent = picture.likes;
  picturesElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return picturesElement;
};

// Задание 3
var renderUserPictures = function (pictures) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(createUserPictures(pictures[i]));
  }
  picturesBlock.appendChild(fragment);
};

renderUserPictures(userDataTamplate);

// Задание 4
document.querySelector('.big-picture').classList.remove('hidden');

var blockImg = document.querySelector('.big-picture__img');
var imgBig = blockImg.querySelector('img').src = userDataTamplate[0].url;

document.querySelector('.likes-count').textContent = userDataTamplate[0].likes;
document.querySelector('.comments-count').textContent = userDataTamplate[0].comments.length;
document.querySelector('.social__caption').textContent = userDataTamplate[0].description;
document.querySelector('.social__picture').src = 'img/avatar-' + getRndInteger(1, 6) + '.svg';
document.querySelector('.social__text').textContent = userDataTamplate[0].comments;

// Задание 5
document.querySelector('.social__comment-count').classList.add('.social__comment-count', 'visually-hidden');
document.querySelector('.comments-loader').classList.add('.comments-loader', 'visually-hidden');
