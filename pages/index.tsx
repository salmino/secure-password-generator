import React from 'react';
import crypto from 'crypto';
import { Analytics } from '@vercel/analytics/react';

function copyToClipboard(password: string, setPassword: { (value: React.SetStateAction<string>): void; (arg0: string): void; }, textAnimation: string, setTextAnimation: { (value: React.SetStateAction<string>): void; (arg0: string): void; }) {
  navigator.clipboard.writeText(password);
  setPassword('');
  setTextAnimation('Copied to clipboard');
  setTimeout(() => setTextAnimation(''), 3000);
}

function SecurePasswordGenerator(): JSX.Element {
  const [password, setPassword] = React.useState('');
  const [textAnimation, setTextAnimation] = React.useState('');
  function generatePassword() {
    const tempPasword = crypto.randomBytes(9);
    const passwordString = tempPasword.toString('hex');
    const passwordLetters = passwordString.replace(/[^a-z]/g, (c) => {
      return String.fromCharCode((c.charCodeAt(0) % 26) + 97);
    });

    const index = 6;

    function getRandomIndexes(): [number, number] {
      // Generate the first index
      const randomIndexOne = Math.floor(Math.random() * index);

      // Generate the second index
      let randomIndexTwo = Math.floor(Math.random() * index);

      // Avoid selecting the same index for both
      while (randomIndexOne === randomIndexTwo) {
        randomIndexTwo = Math.floor(Math.random() * index);
      }

      return [randomIndexOne, randomIndexTwo];
    }

    // Get two random indexes
    const [randomIndexOne, randomIndexTwo] = getRandomIndexes();

    // Split the password string into three parts, each 6 characters long
    const firstPart = passwordLetters.substring(index - index, index);
    const secondPart = passwordLetters.substring(index, index + index);
    const thirdPart = passwordLetters.substring(index + index);

    // Upper case letter based on firstPartIndex
    const upperCase1 = firstPart[randomIndexOne].toUpperCase();

    const modifiedFirstPart =
      firstPart.substring(0, randomIndexOne) +
      upperCase1 +
      firstPart.substring(randomIndexOne + 1);

    const modifiedSecondPart =
      secondPart.substring(0, randomIndexTwo) +
      randomIndexTwo +
      secondPart.substring(randomIndexTwo + 1);

    const passwordParts = [modifiedFirstPart, modifiedSecondPart, thirdPart];
    const shuffledPasswordParts = passwordParts.sort(() => Math.random() - 0.5);
    const password = shuffledPasswordParts.join('-');
    setPassword(password);
    return password;
  }

  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <h1 className="text-xl font-bold">Secure Password Generator</h1>
      <input
        className="border rounded p-2 mt-2"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size={22} />
      <button className="border rounded p-2 mt-2" onClick={generatePassword}>
        Generate Password
      </button>
      <button className="border rounded p-2 mt-2" onClick={() => copyToClipboard(password, setPassword, textAnimation, setTextAnimation)}>
        Copy Password
      </button>
      {textAnimation && (
        <p className="text-center mt-2" style={{ color: 'green' }}>
          {textAnimation}
        </p>
      )}
      <Analytics />
    </div>
  );
}



export default SecurePasswordGenerator
