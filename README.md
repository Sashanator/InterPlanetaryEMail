# InterPlanetaryEMail
## [ENG]

## Overview
InterPlanetaryEMail is an email service developed on the basis of two technologies for building distributed systems: blockchain and IPFS. This project is the result of an internship at Luleå University of Technology (Sweden).
Presentation for Swedish colleagues: https://www.canva.com/design/DAEoCDRQdFo/aDp-pCqPl8ToSZllgwHQ0Q/view?utm_content=DAEoCDRQdFo&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

## Features

- Ability to send / receive / filter emails
- Storing letters in a distributed blockchain database (Ethereum platform)
- Storage of files attached to the letter in IPFS
- Lack of registration (MetaMask extension required)
- Smart contracts are hosted on test networks: Ropsten, Kovan, Rinkeby

## Used Technologies
- Backend -- ASP.NET Core MVC 
- Frontend -- React.js
- Solidity v5.0.5
- Ethereum platform
- MetaMask Extension

## Usage
In order to use this project, you need to install the extension for Google Chrome - MetaMask. The web application runs on 3 test blockchain distributed networks, but you can also use the Ganache local network.
![Ganache](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r1.jpg)
When you enter the website, you will see a stylishly designed welcome window, as well as a small slideshow (consisting of 4 slides) with brief information about the project: what is it for, why certain technologies were used and what is the difference of this project in comparison with alternative ones.
![HomePage](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r2.jpg)
![Slide1](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r3.jpg)
![Slide2](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r4.jpg)
![Slide3](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r5.jpg)
![Slide4](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r6.jpg)

Next, you will be redirected to your mailbox, where new letters are received. At the bottom of the page, under the messages, you will see your account ID from the crypto wallet. It will be used as your "email address" for other users. On the left side of the screen you will find a pop-up menu from where you can navigate to "sent emails" or "emails filtered from a specific address".

![Inbox](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r7.jpg)
![Sent](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r8.jpg)

It is also worth noting that sending letters (ie adding a new record to the database -> creating a transaction) requires a "payment" in Ether. You can use the test currency on networks specially created for this purpose. The interface for composing a letter is very simple: you need to enter the recipient's address, subject and text of the letter, and, if desired, attach any files.

![Letter](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r9.jpg)

When you confirm the sending of the transaction and it has been processed, your letter will be delivered to the recipient, and you will see a window about successful sending.

![MessageSent](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r10.jpg)

## Author
- Alexander Ssorin – project developer – [Sashanator](https://github.com/Sashanator)

## Licence
- [MIT](https://choosealicense.com/licenses/mit/)
- Open-source project

## [RUS]

## Обзор
InterPlanetaryEMail -- сервис электронной почты, разработанный на основе двух технологий для построения распределённых систем: блокчейн и IPFS. Данный проект является результатом прохождения стажировки в Luleå University of Technology (Швеция).

## Особенности

- Возможность отправки / получения / фильтрации писем
- Хранение писем в распределённой базе данных блочейн (платформа Ethereum)
- Хранение прикрепляемых к письму файлов в IPFS
- Отсутствие регистрации (требуется расширение MetaMask)
- Смарт-контракты размещены на тестовых сетях: Ropsten, Kovan, Rinkeby

## Используемые технологии
- Backend -- ASP.NET Core MVC 
- Frontend -- React.js
- Solidity v5.0.5
- Ethereum platform
- MetaMask Extension

## Использование
Для того, чтобы воспользоваться данным проектом, вам потребуется установить расширение для Google Chrome -- MetaMask. Веб-приложение работает на 3-х тестовых распределённых сетях блокчейн, но вы также можете воспользоваться локальной сетью Ganache. 
![Ganache](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r1.jpg)
При заходе на веб-сайт вы увидите стильно-оформленное приветственное окно, а также небольшое слайд-шоу (состоящая из 4-х слайдов) с краткой информацией о проекте: для чего он, зачем были использованы определённые технологии и в чём особенность этого проекта в сравнении с альтернативными.
![HomePage](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r2.jpg)
![Slide1](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r3.jpg)
![Slide2](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r4.jpg)
![Slide3](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r5.jpg)
![Slide4](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r6.jpg)

Далее вы будете перенаправлены на ваш почтовый ящик, куда приходят новые письма. Внизу страницы, под письмами вы увидите идентификатор вашего аккаунта от крипто-кошелька. Именно он будет использоваться в качестве вашего "почтового адреса" для других пользователей. В левой части экрана вы обнаружите выдвигающее меню, откуда вы сможете переместиться в "отправленные письма" или "письма с фильтрацией от конкретного адреса". 

![Inbox](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r7.jpg)
![Sent](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r8.jpg)

Также стоит отметить, что для отправки писем (т.е. добавления новой записи в БД --> создания транзакции) требуется "оплата" в виде эфириума. Вы можете воспользоваться тестовой валютой на специально созданных для этих целей сетях. Интерфейс составления письма очень прост: вам нужно ввести адрес получателя, тема и текст письма, и при желании прикрепить какие-либо файлы. 

![Letter](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r9.jpg)

Когда вы подтвердите отправку транзакции и она будет обработана, ваше письмо будет доставлено получателю, а вы увидите окно об успешной отправке.

![MessageSent](https://github.com/Sashanator/InterPlanetaryEMail/blob/master/InterPlanetaryProject/wwwroot/images/r10.jpg)

## Автор
- Александр Ссорин – разработчик проекта – [Sashanator](https://github.com/Sashanator)

## Лицензия
- [MIT](https://choosealicense.com/licenses/mit/)
- Проект с открытым исходным кодом
