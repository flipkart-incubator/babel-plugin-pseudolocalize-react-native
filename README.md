![npm](https://img.shields.io/npm/v/babel-plugin-pseudolocalize-react-native?style=plastic)

A Babel Plugin to transform all Text nodes in React Native to their Pseudolocalized versions.

## What is Pseudolocalization?

Pseudolocalization (or pseudo-localization) is a software testing method used for testing internationalization aspects of software. Instead of translating the text of the software into a foreign language, as in the process of localization, the textual elements of an application are replaced with an altered version of the original language.

Example:

```Account Settings``` becomes	```[!!! Àççôûñţ Šéţţîñĝš !!!]```

Pseudo-localization allows engineering teams to continuously test their UI for localizability during their development sprints, because pseudo-localization becomes the default development language for the team.


To get an idea of what this plugin is for and what it tries to achieve please read the following docs - [Pseudo Localization FK](https://docs.google.com/presentation/d/1pBXuGIxwwIr-yA9U4ALgDM9yG4dZqF0-42eP6OhbgXg/edit?usp=sharing)


[Inspiration](https://netflixtechblog.com/pseudo-localization-netflix-12fff76fbcbe)
## Getting Started

    npm install --save-dev babel-plugin-pseudolocalize-react-native

## Usage

Add to `.babelrc` or `babel.config.js`

Note: You might need to clear the metro cache if the changes do not reflect after adding to babel config. Use `react-native start --reset-cache` to reset the metro bundler cache

# Plugin Options
    
- `extraLength`

The number by which you want to increase the length of string.
E.g - If string is `Babel` of length `5` and `extraLength` value is `0.8` then the transformed string length will be `5 + 5 * 0.8 = 9` and the transformed string will be `Babel!!!!`.

Default: 0.8
    
    
- `customLanguageMap`

The plugin provides a default language map inside `PhoneticConstants.js`. If you want to use your own Language Mapping for characters you can specify it using this option.

Default: `{"a":"â̬","b":"b̬̈","c":"ĉ̬","d":"d̬̈","e":"ê̬","f":"f̬̈","g":"ĝ̤","h":"ḧ̬","i":"î̬","j":"ĵ̤","k":"k̬̈","l":"l̬̈","m":"m̬̂","n":"n̬̂","o":"ô̬","p":"p̤̂","q":"q̤̂","r":"r̬̂","s":"ŝ̬","t":"ẗ̬","u":"û̬","v":"v̬̂","w":"ŵ̬","x":"x̬̂","y":"ŷ̤","z":"ẑ̬","A":"Ä̬","B":"B̬̈","C":"C̬̈","D":"D̬̈","E":"Ë̬","F":"F̬̈","G":"G̬̈","H":"Ḧ̬","I":"Ï̬","J":"J̬̈","K":"K̬̈","L":"L̬̈","M":"M̬̈","N":"N̬̈","O":"Ö̬","P":"P̬̈","Q":"Q̬̈","R":"R̬̈","S":"S̬̈","T":"T̬̈","U":"Ü̬","V":"V̬̈","X":"Ẍ̬","Y":"Ÿ̬","Z":"Z̬̈"}`

Sample

![Screenshot_1623167875](https://user-images.githubusercontent.com/8079189/133972504-0986ce6f-f581-4f89-a2af-a8d9021ec15c.png)


![Screenshot_1623167907](https://user-images.githubusercontent.com/8079189/133972542-47fd4f7a-b7c0-497c-8aa6-8b8d1f60089c.png)

