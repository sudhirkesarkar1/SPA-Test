"use strict"

var getUserBtn = document.getElementById('getUser');
var setUserBtn = document.getElementById('setUser');
// var delUser = document.getElementsById('delUser');

function getData(){ 
    var d= null;
    var data = JSON.stringify({
        "username": "xyz"
    });
    var url = `https://splitwise-3e72.restdb.io/rest/userinfo?q=${data}`;
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        console.log(this.responseText);
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("pgetost", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

 }

function setData(){
    var data = JSON.stringify({
        "username": "xyz",
        "email": "xyz@ii.m.cm",
        "password":"789456"
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("POST", "https://splitwise-3e72.restdb.io/rest/userinfo");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
      xhr.setRequestHeader("cache-control", "no-cache");
      
      xhr.send(data);
}

// function delUser

 getUserBtn.addEventListener("click",getData);
 setUserBtn.addEventListener("click",setData);
 delUser.addEventListener("click",delUser);