
export const hosts = {
  host6210919553000: 'http://62.109.19.55:3000',
}

export const methods = {
  delete: 'DELETE',
  get: 'GET',
  post: 'POST',
  put: 'PUT',
}

export const validationErrors = {
  nameErrors: {
    noName: ['Type name', 'Введите имя'],
    shortName: ['Name is short', 'Имя слишком короткое'],
    longName: ['Name is long', 'Имя слишком длинное'],
  },
  surnameErrors: {
    noSurname: ['Type surname', 'Введите фамилию'],
    shortSurname: ['Surname is short', 'Фамилия слишком короткая'],
    longSurname: ['Surname is long', 'Фамилия слишком длинная'],
  },
  emailErrors: {
    noEmail: ['Type email', 'Введите почту'],
    wrongEmail: ['Wrong email', 'Почта неверна'],
  },
  passwordErrors: {
    noPassword: ['Type password', 'Введите пароль'],
    noPasswordCopy: ['Repeat password', 'Повторите пароль'],
    shortPassword: ['Password is short', 'Пароль слишком короткий'],
    longPassword: ['Password is long', 'Пароль слишком длинный'],
    noMatch: ['Passwords don\'t match', 'Пароли не совпадают'], 
  },
  titleErrors: {
    noTitle: ['Type title', 'Укажите название'],
    longTitle: ['Title is long', 'Название слишком длинное'],
  },
  descriptionError: {
    noDescription: ['Type description', 'Введите описание'],
  },
  typeError: {
    noType: ['Choose type', 'Выберите тип'],
  },
  roleError: {
    noRole: ['Choose role', 'Выберите статус'],
  }
}

export const validationRules = {
  nameLengthMin: 1,
  nameLengthMax: 20,
  surnameLengthMin: 1,
  surnameLengthMax: 20,
  emailRegExp: /^\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3}$/,
  passwordLengthMin: 6,
  passwordLengthMax: 20,
  titleLengthMax: 30,
}

export const roles = {
  teacher: 'teacher',
  student: 'student',
}

export const modalModes = {
  loading: 'loading',
  messsage: 'message',
  hidden: 'hidden',
}

export const languages = {
  lang: ['EN', 'RU'],
  name: ['Name', 'Имя'],
  surname: ['Surname', 'Фамилия'],
  role: ['Role', 'Статус'],
  email: ['E-mail', 'Электронная почта'],
  password: ['Password', 'Пароль'],
  passwordCopy: ['Password copy', 'Копия пароля'],
  typeName: ['Type your name', 'Введите Ваше имя'],
  typeSurname: ['Type your surname', 'Введите Вашу фамилию'],
  typeEmail: ['Type your e-mail', 'Введите Вашу почту'],
  typePassword: ['Type your password', 'Введите Ваш пароль'],
  chooseRole: ['Choose your role', 'Выберите Ваш статус'],
  repeatPassword: ['Repeat your password', 'Повторите Ваш пароль'],
  login: ['Login', 'Войти'],
  register: ['Register', 'Зарегистрироваться'],
  back: ['Back', 'Назад'],
  student: ['student', 'студент'],
  teacher: ['teacher', 'учитель'],
}

export function checkIfAllValid(array) {
  return array.every(item => item);
}

export function checkName(setIsContentValid, setContentError, lang, content) {

  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.nameErrors.noName[lang]);
  }
  else if (content.length < validationRules.nameLengthMin) {
    setIsContentValid(false);
    setContentError(validationErrors.nameErrors.shortName[lang]);
  }
  else if (content.length > validationRules.nameLengthMax) {
    setIsContentValid(false);
    setContentError(validationErrors.nameErrors.longName[lang]);
  }
  else setIsContentValid(true);
}

export function checkSurname(setIsContentValid, setContentError, lang, content) {

  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.surnameErrors.noSurname[lang]);
  }
  else if (content.length < validationRules.surnameLengthMin) {
    setIsContentValid(false);
    setContentError(validationErrors.surnameErrors.shortSurname[lang]);
  }
  else if (content.length > validationRules.surnameLengthMax) {
    setIsContentValid(false);
    setContentError(validationErrors.surnameErrors.longSurname[lang]);
  }
  else setIsContentValid(true);
}

export function checkEmail(setIsContentValid, setContentError, lang, content) {

  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.emailErrors.noEmail[lang]);
  }
  else if (!validationRules.emailRegExp.test(content)) {
    setIsContentValid(false);
    setContentError(validationErrors.emailErrors.wrongEmail[lang]);
  }
  else setIsContentValid(true);
}

export function checkPassword(setIsContentValid, setContentError, lang, content) {
  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.noPassword[lang]);
  }
  else if (content.length < validationRules.passwordLengthMin) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.shortPassword[lang]);
  }
  else if (content.length > validationRules.passwordLengthMax) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.longPassword[lang]);
  }
  else setIsContentValid(true);
}

export function checkPasswordCopy(setIsContentValid, setContentError, password, lang, content) {
  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.noPasswordCopy[lang]);
  }
  else if (content !== password) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.noMatch[lang]);
  }
  else setIsContentValid(true);
}

export function checkRole(setIsContentValid, setContentError, lang, content) {
  if (content === '') {
    setIsContentValid(false);
    setContentError(validationErrors.roleError.noRole[lang]);
  }
  else setIsContentValid(true);
  }

export function changeLanguage(language, setLanguage) {
  let temp = language;
  temp = (temp + 1) % languages.lang.length;
  setLanguage(temp);
  sessionStorage.setItem('lang', temp);
}