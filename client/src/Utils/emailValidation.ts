function emailValidation(inputValue: string) {
  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
  if (emailRegex.test(inputValue)) {
    return true;
  } else {
    return false;
  }
}

export default emailValidation;
