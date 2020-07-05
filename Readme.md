# Description

I built this app for my wife's birthday during the lockdown.
I gathered wishes and photos from friends and relatives and added them to this app.
Each card is locked until the specified time. Once the card is unlocked, it can be pressed and the birthday wish is viewable. It also sends a local push notification when the card is unlocked.

Suggestion would be to get 20+ wishes so that you can span it across the whole day to keep her busy and guessing ;)

## Locked View

![Alt text](/locked-demo.gif?raw=true 'Locked View')

## Unlocked View

![Alt text](/unlocked-demo.gif?raw=true&height='300px' 'Locked View')

## Installation

### Android

- Clone the repository
- `yarn install`
- `cd android && ./gradlew assembleRelease`
- Download the apk from `<base-directory>/android/app/build/outputs/apk/release/app-release.apk`
- Transfer it to the android device and install
- You might have to enable install from unverified sources in case of android complains

### iOS

(might need an apple developer account)

- Clone the repository
- `yarn install`
- `cd ios && pod install`
- open the project in XCode
- Connect the ios device to mac and install on it
- It might complain about unverified source. So go to Settings -> General -> Device Management -> Trust the source

## Features:

- Configurable. Can be configured from `configurations.js` file.
- Local PNs enabled.
- Supports landscape and portrait orientation for images. But portrait preferable.
- Supports GIFs.
- Pull 2 refresh to check if time to unlock has passed.

## Configurations:

| Key         | Description                     | Example Value         | Required/Optional |
| ----------- | ------------------------------- | --------------------- | ----------------- |
| BIRTHDATE   | Birth date in YYYY-MM-DD format | '2020-07-05'          | required          |
| HEADER_TEXT | Header text                     | 'Happy Birthday Jill' | optional          |
| TIMEZONE    | Timezone of device              | '+05:30'              | required          |
| CARDS       | Array of cards                  | [{...}]               | required          |

### Card Object

| Key           | Description                                        | Example Value                                      | Required/Optional |
| ------------- | -------------------------------------------------- | -------------------------------------------------- | ----------------- |
| id            | unique identifier                                  | 1                                                  | required          |
| lockedImage   | path to the image when the card is locked          | require('./assets/locked/cake-1.gif')              | required          |
| unlockedImage | image when the card is unlocked                    | require('./assets/unlocked/tom.jpg')               | required          |
| unlockTime    | time when the card should unlock in 'HH:MM' format | '16:44'                                            | required          |
| name          | name of the person                                 | 'Tom'                                              | required          |
| wishes        | The actual message. Array of strings.              | ['Happy Birthday..!', '...', 'Some long message.'] | required          |

### Credits:

- [react-native-card-animated-modal](https://github.com/amagitechnologies/react-native-card-animated-modal)
