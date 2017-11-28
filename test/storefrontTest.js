'use strict';

const StoreFront = artifacts.require("./StoreFront.sol");
const Presentoken = artifacts.require("./Presentoken.sol");

contract('storefrontTest', function(accounts) {
	let presentoken;
	let storefront;
	let owner;
	const initSupply = 500;
	const initPrice = 1;

	beforeEach(async function() {
		owner = accounts[0];
		storefront = await StoreFront.new(initSupply, initPrice, {from:  owner});
		presentoken = await storefront.presentoken.call();
	});

	describe('--Create--', function() {
		it("Initial tokenPrice correct", async function() {
			let tokenPrice = await storefront.tokenPrice.call();

			assert.equal(tokenPrice, initPrice, "tokenPrice correct" );
		});
		it("Initial totalSupply correct", async function() {
			let totalSupply = await storefront.presentoken.totalSupply.call();

			assert.equal(totalSupply, initSupply, "totalSupply correct" );
		});
	});

	describe('--Purchase--', function() {
		it("Purchase works", async function() {
			await storefront.purchaseCoins(1, {from: accounts[1], value: 1});
			let tokensPurchased = await presentoken.balanceOf(accounts[1]);
			let ownersTokens = await presentoken.balanceOf(owner);

			assert.equal(tokensPurchased, 1, "Purchaser received correct number tokens");
			assert.equal(tokensPurchased, initSupply - 1, "Owner reduced to correct number tokens");
		});
	});

	describe('--Withdraw--', function() {
		it("The owner can Withdraw funds", async function() {
			await storefront.purchaseCoins(1, {from: accounts[1], value: 1});
			let success = await storefront.withdraw({from: owner});

			assert.equal(success.valueOf(), true, "Crowdsale starts with zero tokens");
		});
	});
});
