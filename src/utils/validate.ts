export const removeWhitespace = (text: string) => {
  const regex = /[\s]+/g;
  return text.replace(regex, '');
};

export const validateName = (name: string) => {
  const regex = /^[가-힣A-z]+$/;
  return regex.test(name);
};

export const validateEmail = (email: string) => {
  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-z])*\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return regex.test(password);
};

export const MAPPING_MESSAGE = {
  noValue: '빈 칸을 확인해주세요.',
  nameFormat: '유효한 이름을 입력해주세요.',
  emailDuplicate: '존재하는 이메일 주소입니다.',
  emailFormat: '유효한 이메일 주소를 입력해주세요.',
  pwFormat: '숫자, 영문, 특수문자 조합 8자 이상 입력해주세요.',
  pwMatching: '비밀번호가 일치하지 않습니다.',
};
