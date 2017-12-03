# Blockchain for Developers: Presentalk

## Overview
Presentalk is a voice controlled presentation software that I've worked on with a team of other Berkeley students at the last two Calhacks.  
This project will expand Presentalk by integrating an appcoin required for uploading presentations and using the voice control service.

## Purpose
The current usage flow of Presentalk is as follows: user goes to home page, uploads presentation, is redirected to a viewer with their presentation, and is then able to control the presentation by voice.  
Commands include going to the:
* next slide
* previous slide
* specific slide numbers
* slide titles
* pictures within slides  

As well as requesting outside information to be overlaid over the presentation, including pictures and Wolfram Alpha requests.  
Consequently, Presentalk must make many external api calls for image tagging, Wolfram Alpha, etc that charge per request. To fund hosting, api usage, and further development, monetization must be put in place before making the service public.  
This project will implement a token based monetization system to solve the monetization problem without requiring intrusive advertising or subscriptions.

## Description
Presentalk will charge a token per presentation upload, and users will be charged a set amount of ether to purchase these tokens.  
This will require two smart contracts. One for the token contract itself, and the other for the sale of the tokens. This token will only implement a subset of erc20 functionalities, as it is intended to be used solely for Presentalk and not as a medium of exchange. Likewise, the token sale contract will resemble a store-front in functionality as the sale of the token is not intended to be limited.  
For the required frontend component, jquery and web3 will be used for purchasing tokens.

## Instructions
* Deploy StoreFront contract
* Replace contract and owner addresses in web3.js and corresponding inline script in index.html
* index.html has inline js that runs clientside and makes requests to the smart contracts using web3

## Credit:
* [coursetro](https://coursetro.com/posts/code/99/Interacting-with-a-Smart-Contract-through-Web3.js-(Tutorial)) for html and css starter