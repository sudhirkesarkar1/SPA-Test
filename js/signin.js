"use strict";

var userId = document.getElementById("user");
var passwordId = document.getElementById("password");
var statusId = document.getElementById("status");
var userFormId = document.getElementById('user-form');
var signupId = document.getElementById('signup');
var signupformId = document.getElementById('signup-form');

function clearForm(){
    userId.value = '';
    passwordId.value = '';
}

function clearSignupForm(){
    
    document.getElementById('suser').value='';
    document.getElementById('spassword').value='';
    document.getElementById('sconfpassword').value='';
    document.getElementById('semail').value='';
}


function validate(userInfo){
        let validate = true;
        let uname ;
        for(let user in userInfo){
            validate=!(isEmpty(userInfo[user]._id));
            validate=!(isEmpty(userInfo[user].password));
            validate=!(isEmpty(userInfo[user].email));
            validate=!(isEmpty(userInfo[user].username));
            uname = userInfo[user].username;
        }
        if(validate){
            userFormId.classList.add('hide');
            signupId.classList.add('hide');
            signupformId.classList.add('hide');
            // statusId.innerHTML = 'login successfully';
            console.log(uname);
            sessionStorage.setItem('user',uname );
            getSplitScreen();
            
         }else{
            statusId.innerHTML = 'try again'
         }
    
        
    
    //statusId.innerHTML  = userInfo.length>0 ? "done":"reenter";
    //userFormId.display = 'none';
    // console.log(userInfo);
    // for(let user in userInfo){
    //     console.log(userInfo[user]._id);
    
}

function submitFormValues(e){
    e.preventDefault();
    const user = userId.value;
    const password = passwordId.value;
    let data = JSON.stringify({'username':user,'password':password});
    var url = `https://splitwise-3e72.restdb.io/rest/userinfo?q=${data}`;
    
    console.log(data);
    console.log(url);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let userInfo=JSON.parse(this.responseText);
        validate(userInfo);
    }
    });

    xhr.open("GET", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
    clearForm();
}

function viewSignUpform(){
    userFormId.classList.add('hide');
    signupId.classList.add('hide');
    signupformId.classList.remove('hide');
}
function isEmpty(str){
    return (!str || 0 === str.length || !str.trim())
}

function passwordCheck(pass1,pass2){
    return( pass1 === pass2)
}

function ValidateEmail(email){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)){
        return true;
    }else{
        return false;
    }
}

function validateSignUpForm(){
    let user = document.getElementById('suser').value;
    let password = document.getElementById('spassword').value;
    let cnfpassword = document.getElementById('sconfpassword').value;
    let email = document.getElementById('semail').value;

    let invalidFields = isEmpty(user);
    invalidFields = isEmpty(password);
    invalidFields = isEmpty(cnfpassword);
    invalidFields = isEmpty(email);

    let validPassword = passwordCheck(password,cnfpassword);

    let ValideEmail = ValidateEmail(email);

    console.log(`${invalidFields},${validPassword},${ValideEmail}`);

    if(invalidFields || !validPassword || !ValideEmail){
        statusId.innerHTML = 'Please enter correct values';
        return false;
    }
    return true;
}

function createUser(){
    
    let user = document.getElementById('suser').value;
    let password = document.getElementById('spassword').value;
    let email = document.getElementById('semail').value;

        var data = JSON.stringify({
            "username": user,
            "email":email ,
            "password":password
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              console.log(this.responseText);
              clearSignupForm();
              let userInfo=[JSON.parse(this.responseText)];
              validate(userInfo);
            }
          });
          
          xhr.open("POST", "https://splitwise-3e72.restdb.io/rest/userinfo");
          xhr.setRequestHeader("content-type", "application/json");
          xhr.setRequestHeader("x-apikey", "5c3591fa66292476821c9dfd");
          xhr.setRequestHeader("cache-control", "no-cache");
          
          xhr.send(data);
    
}

function signUp(e){
    e.preventDefault();
    if(validateSignUpForm()){
        createUser();
    };
}

userFormId.addEventListener('submit',submitFormValues);
signupId.addEventListener('click',viewSignUpform);
signupformId.addEventListener('submit',signUp);

function getSession(){
    if( sessionStorage.getItem('user' )){
        
        userFormId.classList.add('hide');
        signupId.classList.add('hide');
        signupformId.classList.add('hide');
        getSplitScreen();
    }
}

window.onload = function() {
    getSession();
 
    // yourFunction(param1, param2);
};