# AdiNox Authenticator

[![GitHub Repo](https://img.shields.io/github/stars/Adilmunawar/adinox?style=social)](https://github.com/Adilmunawar/adinox)
[![Issues](https://img.shields.io/github/issues/Adilmunawar/adinox)](https://github.com/Adilmunawar/adinox/issues)
[![Forks](https://img.shields.io/github/forks/Adilmunawar/adinox?style=social)](https://github.com/Adilmunawar/adinox)
[![License](https://img.shields.io/github/license/Adilmunawar/adinox)](https://github.com/Adilmunawar/adinox/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](code_of_conduct.md)

<p align="center">
  <img src="https://github.com/Adilmunawar/adinox/blob/main/Pink%20Minimalist%20Shield%20a%20Logo.png" alt="AdiNox Logo" width="200">
</p>

## Description

AdiNox is a robust and user-friendly authenticator application designed to provide secure two-factor authentication (2FA) for your online accounts.  It implements the Time-based One-Time Password (TOTP) and HMAC-based One-Time Password (HOTP) algorithms, offering a reliable alternative to traditional SMS-based authentication.  AdiNox aims to provide a seamless and secure experience, similar to other leading authenticator apps, with a focus on user privacy and control.

This project was created with the goal of providing a secure, open-source authentication solution.  We believe in giving users control over their security and data.

## Working Diagram

<p align="center">
  <img src="https://github.com/Adilmunawar/adinox/blob/main/public/lovable-uploads/diagram%20(2).png">
</p>

## Backend Flow

<p align="center">
  <img src="https://github.com/Adilmunawar/adinox/blob/main/public/lovable-uploads/AdiNox%20Backend%20Working%20functionality.png">
</p>

## Features

AdiNox includes a comprehensive set of features:

* **TOTP and HOTP Support:** Generates time-based (TOTP) and counter-based (HOTP) one-time passwords.
* **User-Friendly Interface:** Intuitive design for easy setup and use.
* **QR Code Scanning:** Quickly add accounts by scanning QR codes.
* **Manual Entry:** Option to manually enter account details (secret key, etc.).
* **Account Management:**
    * Add, edit, and delete accounts.
    * Organize accounts with custom names.
* **Secure Storage:** Securely stores secrets locally.
* **Cross-Platform Compatibility:** Designed to work on multiple platforms. (Specify which ones in your main README)
* **Backup and Restore:** (If implemented)  Options to back up and restore your accounts.  Specify details.
* **Dark Mode:** (If implemented) Support for a dark theme for better usability in low-light conditions.
* **Open Source:** The code is open-source, allowing for community review and contribution.
* **Free:** AdiNox is free to use.
* **Localization:** (If implemented) Support for multiple languages.
* **Search Functionality:** Quickly find accounts.
* **Biometric Authentication:** (If implemented) Unlock the app using biometrics.

## How it Works

AdiNox works by generating one-time passwords (OTPs) that change either at specific time intervals (TOTP) or after a certain number of uses (HOTP).  These OTPs, in combination with your regular password, provide an extra layer of security, making it much harder for unauthorized users to access your accounts.

1.  **Account Setup:** When you enable 2FA for an online account, the service provides a secret key (often as a QR code).
2.  **Key Storage:** You add this secret key to AdiNox, either by scanning the QR code or entering it manually.
3.  **OTP Generation:** AdiNox uses the secret key and the current time (for TOTP) or a counter (for HOTP) to generate a unique OTP.
4.  **Authentication:** When you log in to the online service, you enter your password and the current OTP displayed by AdiNox.
5.  **Verification:** The online service verifies the OTP, and if it's correct, you're granted access.

## Contributing

We welcome contributions to AdiNox!  Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.  Here are some ways you can contribute:

* **Code Contributions:** Submit bug fixes, new features, or performance improvements.
* **Documentation:** Help improve the documentation.
* **Translations:** Help translate AdiNox into other languages.
* **Testing:** Help test new features and find bugs.
* **Design:** Contribute to the design of the application.
* **Bug Reports:** Report any issues you find.
* **Feature Requests:** Suggest new features.

## Security

- **Secure Backend Storage:** All secret keys for two-factor authentication (2FA) are securely saved on our backend, protected by a multilayer security protocol. This includes strong encryption at rest and in transit, restricted access controls, and regular security audits to prevent unauthorized access.
- **Encryption:** Your secrets are always encrypted, ensuring that only you (and not even our team) can access your 2FA keys.
- **Multilayer Security:** We implement multiple security layers such as network firewalls, database encryption, secure authentication, and regular vulnerability assessments.
- **Vulnerability Reporting:** To report security vulnerabilities, please email [AdilMunawarX@gmail.com](mailto:AdilMunawarX@gmail.com).

---

## FAQ

**Q: Where are my 2FA secret keys stored?**  
A: All your 2FA secret keys are securely stored on our backend using a multilayer security protocol, including strong encryption and strict access controls.

**Q: How does AdiNox keep my 2FA secrets safe?**  
A: AdiNox uses a secure backend with multiple layers of protection—your secret keys are encrypted and protected by network security, restricted permissions, and regular security reviews.

**Q: Can anyone at AdiNox access my secret keys?**  
A: No, all secrets are stored encrypted and are inaccessible even to our team.

**Q: What happens if your backend is compromised?**  
A: Even in the unlikely event of a breach, your 2FA secrets remain protected by encryption and other security controls, minimizing any risk of exposure.

## Get Started Today!
Download AdiNox
Scan your account QR codes or enter secrets manually
Enjoy secure, private, and hassle-free two-factor authentication!
Contribute, audit, or just use AdiNox to protect your digital life—securely and privately.
## Contact

* **Email:** adilfromavengers@gmail.com
* **Instagram:** AdilMunawarX
* **X:** AdilMunawarX
