var error = {
    notValidValue: {
      errorCode: 1,
      errorText: "Не верный формат"
    },
    oldUser: {
      errorCode: 2,
      errorText: "Пользователь с таким Email уже существует"
    },
    incorrectPassword: {
      errorCode: 3,
      errorText: "Неправильный Email/пароль"
    }
  } // переменная для хранения состояния авторизованного пользователя
  // при успешной авторизации должен содержать объект с пользовательскими данными
  // при signOut должен становиться null
var authUserData = null;

var userDatabase = []; // массив с зарегистрированными пользователями

function register(email, password) {
  // ваш код
  // проверка на валидность email, пароля (6 символов, начинается с большой буквы, должен содержать как минимум 1 цифру)
  // проверка нового пользователя в userDatabase
  if (validator(email).isEmail().validate() && validator(password).isPassword().validate()) {
    for (let i = 0; i < userDatabase.length; i++) {
      if (userDatabase[i].email === email) {
        return error.oldUser;
      }
    }
    let newUser = {
      email: email,
      password: password
    };
    userDatabase.push(newUser);
    return newUser;
  } else {
    return error.notValidValue;
  }

}

function signIn(email, password) {
  // ваш код
  // проверка на валидность email, пароля (6 символов, начинается с большой буквы)
  // проверка наличия пользователя в userDatabase
  // заполнение authUserData
  if (validator(email).isEmail().validate() && validator(password).isPassword().validate()) {
    let tempUser = userDatabase.find(user => user.email === email && user.password === password);
    if (tempUser !== undefined) {
      return tempUser;
    }
    return error.incorrectPassword;
  } else {
    return error.notValidValue;
  }

}

function signOut() {
  // ваш код
  authUserData = null;
}

function resetPassword(email, oldPassword, newPassword) {
  // функция восстановления пароля
  // должна изменять пароль пользователя если старый пароль введен верно и новый пароль соответствует правилам формата пароля
  userDatabase.forEach(function(item) {
    if (item.email === email && item.password === oldPassword) {
      item.password = newPassword;
      return true;
    }
  });
}

function isAuth() {
  // функция возвращает true если пользователь авторизован, false если нет
  if (authUserData !== null) {
    return true;
  } else {
    return false;
  }
}


function validator(_value) {
  return {
    value: _value,
    isValid: null,
    validate: function() {
      return this.isValid;
    },
    min: function(value) {
      this.isValid = this.value > value;
      return this;
    },
    max: function(value) {
      this.isValid = this.value < value;
      return this;
    },
    minLength: function(value) {
      this.isValid = this.value.length > value;
      return this;
    },
    maxLength: function(value) {
      this.isValid = this.value.length < value;
      return this;
    },
    equal: function(value) {
      this.isValid = this.value.toString() === value.toString();
      return this;
    },
    isString: function() {
      this.isValid = typeof this.value === "string";
      return this;
    },
    isArray: function() {
      this.isValid = Array.isArray(this.value);
      return this;
    },
    isNumber: function() {
      this.isValid = typeof this.value === "number";
      return this;
    },
    isEmail: function() {
      let result = this.value.match(/\w*@\w*\.\w*/);
      if (result != null) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      return this;
    },
    isFloat: function() {
      if (!isNaN(parseFloat(this.value))) {
        let stringNumber = this.value.toString();
        let isFloat = stringNumber.indexOf(".");
        if (isFloat !== -1) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
      } else {
        this.isValid = false;

      }
      return this;
    },
    isDate: function() {
      let result = this.value.match(/\d{2}\.\d{2}\.\d{4}/);
      if (result != null) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      return this;
    },
    isPassword: function() {
      if (this.value.match(/\d/) == null) {
        this.isValid = false;
        return this;
      }
      if (this.value.length < 6) {
        this.isValid = false;
        return this;
      }
      if (this.value.match(/^[A-Z]/) == null) {
        this.isValid = false;
        return this;
      }
      this.isValid = true;
      return this;
    }
  };
}