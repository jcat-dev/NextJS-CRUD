export function getPassword(): string {
  let password: string = ""

  while (password.length < 10) {
    const letter = getRandomLetter()

    if (letter) {
      password = password.concat(letter)
    }
  }

  return password
}

function getRandomLetter() {
  const randomNumber = Math.round(Math.random() * (122 - 48) + 48)

  const numberCondition = randomNumber >= 48 && randomNumber <= 57
  const uppercaseLetter = randomNumber >= 65 && randomNumber <= 90
  const lowercaseLetter = randomNumber >= 97 && randomNumber <= 122

  if (uppercaseLetter || lowercaseLetter) {
    return String.fromCharCode(randomNumber)
  }

  if (numberCondition) {
    return randomNumber.toString()
  }
}