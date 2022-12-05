import React from 'react';
import crypto from 'crypto';

function copyToClipboard(password, setPassword, textAnimation, setTextAnimation) {
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

    // Split the password string into three parts, each 6 characters long
    const firstPart = passwordLetters.substring(0, 6);
    const secondPart = passwordLetters.substring(6, 12);
    const thirdPart = passwordLetters.substring(12);

    // Select firstPart, secondPart, or thirdPart randomly
    const selectedPart1 = Math.floor(Math.random() * 3);
    
    // Random index for firstPart
    const firstPartIndex = Math.floor(Math.random() * firstPart.length);

    // Upper case letter based on firstPartIndex
    const upperCase1 = firstPart[firstPartIndex].toUpperCase();

    // Random index for secondPart
    const secondPartIndex = Math.floor(Math.random() * secondPart.length);

    // Upper case letter based on secondPartIndex
    const upperCase2 = secondPart[secondPartIndex].toUpperCase();

    // Random index for thirdPart
    const thirdPartIndex = Math.floor(Math.random() * secondPart.length);

    // Upper case letter based on thirdPartIndex
    const upperCase3 = thirdPart[thirdPartIndex].toUpperCase();
    
    // Bucket for the first modified password
    let modifiedPart1 = '';

    // Select the first part of the password
    switch (selectedPart1) {
      case 0:
        // Code to be executed if selectedPart1 has a value of 0
        modifiedPart1 = 
          firstPart.substring(0, firstPartIndex) + 
          upperCase1 + 
          firstPart.substring(firstPartIndex + 1);
          //console.log(modifiedPart1);
        break;
      case 1:
        // Code to be executed if selectedPart1 has a value of 1
        modifiedPart1 = 
          secondPart.substring(0, secondPartIndex) + 
          upperCase2 + 
          secondPart.substring(secondPartIndex + 1);
          //console.log(modifiedPart1);
        break;
      case 2:
        // Code to be executed if selectedPart1 has a value of 2
          modifiedPart1 = 
          thirdPart.substring(0, thirdPartIndex) + 
          upperCase3 + 
          thirdPart.substring(thirdPartIndex + 1);
          //console.log(modifiedPart1);
        break;
      default:
        // Code to be executed if selectedPart1 has a value other than 0, 1, or 2
        break;
    }

    // Select the second part of the password
    let selectedPart2 = Math.floor(Math.random() * 3);

    // Avoid selecting the same part already selected for the first part
    while (selectedPart2 === selectedPart1) {
      selectedPart2 = Math.floor(Math.random() * 3);
    }

    // Bucket for the second modified password
    let modifiedPart2 = '';
    
    switch (selectedPart2) {
      case 0:
        modifiedPart2 = 
          firstPart.substring(0, firstPartIndex) + 
          firstPartIndex + 
          firstPart.substring(firstPartIndex + 1);
          //console.log(modifiedPart2);
      break;
      case 1:
        modifiedPart2 = 
          secondPart.substring(0, secondPartIndex) + 
          secondPartIndex + 
          secondPart.substring(secondPartIndex + 1);
          //console.log(modifiedPart2);
        break;
      case 2:
        modifiedPart2 = 
          thirdPart.substring(0, thirdPartIndex) + 
          thirdPartIndex + 
          thirdPart.substring(thirdPartIndex + 1);
          //console.log(modifiedPart2);
        break;
      default:
        break;
    }
    const passwordParts = [modifiedPart1, modifiedPart2, thirdPart];
    const shuffledPasswordParts = passwordParts.sort(() => Math.random() - 0.5);
    const password = shuffledPasswordParts.join('-');
    // console.log(😎);
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
    </div>
  );
}



export default SecurePasswordGenerator
