const _ = require('lodash');

const data = [];

function add (name, content) { 
    data.push({ name: name, content: content, id:data.length }); //R: lo hicimos igual :) 
}
  function list () { //devuelve una Lista con todos los tweets
    return _.cloneDeep(data); //R: cloneDeep es un metodo que clona y copia. Quiero trabajar con una copia de la data por las dudas.
    //NO QUEREMOS MUTAR la data origial. 
    //clone - solo guarda una copia del array pero deja las referencias originales. cloneDeep sirve para clonar lo que está dentro.
  }   
  function find (properties) {
    return _.cloneDeep(_.filter(data, properties));
  }
  module.exports = { add: add, list: list, find: find };

  //Solo exporto las tres funciones (add, list y find) - la variable data no la exporto.

  //Seeding de data para armar la db de tweets:

  const randArrayEl = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  const getFakeName = function() {
    const fakeFirsts = ['Toni', 'Guille', 'Santi', 'Facu', 'Alan', 'Pinki', 'Tincho', 'Solano', 'R2D2'];
    const fakeLasts = ['Scanlan', 'Aszyn', 'Tralice', 'Velasco', 'Sainz', 'Palacio', 'Palacios', 'Lidueña', 'Fisicaro', 'Ecma'];
    return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
  };
  const getFakeTweet = function() {
    const awesome_adj = ['increible', 'emocionante', 'increible', 'gracioso', 'dulce', 'cool',  'sorprendente', 'impresionante'];
    return "Plataforma 5 es " + randArrayEl(awesome_adj) + "! Los profesores simplemente son " + randArrayEl(awesome_adj) + ". #P5Love #codedreams";
  };

  for (let i = 0; i < 10; i++) {
    module.exports.add( getFakeName(), getFakeTweet() );
  }

  console.log(data)