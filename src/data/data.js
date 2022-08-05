
export const hosts = {
  host6210919553000: 'http://62.109.19.55:8080',
}

export const methods = {
  delete: 'DELETE',
  get: 'GET',
  post: 'POST',
  put: 'PUT',
}

export const validationErrors = {
  nameErrors: {
    noName: 'Введите имя',
    shortName: 'Имя слишком короткое',
    longName: 'Имя слишком длинное',
  },
  surnameErrors: {
    noSurname: 'Введите фамилию',
    shortSurname: 'Фамилия слишком короткая',
    longSurname: 'Фамилия слишком длинная',
  },
  emailErrors: {
    noEmail: 'Введите почту',
    wrongEmail: 'Почта неверна',
  },
  passwordErrors: {
    noPassword: 'Введите пароль',
    noPasswordCopy: 'Повторите пароль',
    shortPassword: 'Пароль слишком короткий',
    longPassword: 'Пароль слишком длинный',
    noMatch: 'Пароли не совпадают', 
  },
  titleErrors: {
    noTitle: 'Укажите название',
    longTitle: 'Название слишком длинное',
  },
  descriptionError: {
    noDescription: 'Введите описание',
  },
  typeError: {
    noType: 'Выберите тип',
  },
  roleError: {
    noRole: 'Выберите статус',
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

export function checkIfAllValid(array) {
  return array.every(item => item);
}

export function checkName(setIsContentValid, setContentError, content) {

  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.nameErrors.noName);
  }
  else if (content.length < validationRules.nameLengthMin) {
    setIsContentValid(false);
    setContentError(validationErrors.nameErrors.shortName);
  }
  else if (content.length > validationRules.nameLengthMax) {
    setIsContentValid(false);
    setContentError(validationErrors.nameErrors.longName);
  }
  else setIsContentValid(true);
}

export function checkSurname(setIsContentValid, setContentError, content) {

  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.surnameErrors.noSurname);
  }
  else if (content.length < validationRules.surnameLengthMin) {
    setIsContentValid(false);
    setContentError(validationErrors.surnameErrors.shortSurname);
  }
  else if (content.length > validationRules.surnameLengthMax) {
    setIsContentValid(false);
    setContentError(validationErrors.surnameErrors.longSurname);
  }
  else setIsContentValid(true);
}

export function checkEmail(setIsContentValid, setContentError, content) {

  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.emailErrors.noEmail);
  }
  else if (!validationRules.emailRegExp.test(content)) {
    setIsContentValid(false);
    setContentError(validationErrors.emailErrors.wrongEmail);
  }
  else setIsContentValid(true);
}

export function checkPassword(setIsContentValid, setContentError, content) {
  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.noPassword);
  }
  else if (content.length < validationRules.passwordLengthMin) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.shortPassword);
  }
  else if (content.length > validationRules.passwordLengthMax) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.longPassword);
  }
  else setIsContentValid(true);
}

export function checkPasswordCopy(setIsContentValid, setContentError, password, content) {
  if (content.length === 0) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.noPasswordCopy);
  }
  else if (content !== password) {
    setIsContentValid(false);
    setContentError(validationErrors.passwordErrors.noMatch);
  }
  else setIsContentValid(true);
}

export function checkRole(setIsContentValid, setContentError, content) {
  if (content === '') {
    setIsContentValid(false);
    setContentError(validationErrors.roleError.noRole);
  }
  else setIsContentValid(true);
  }
