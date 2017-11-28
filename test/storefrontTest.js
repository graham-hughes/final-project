'use strict';

const StoreFront = artifacts.require("./StoreFront.sol");
const Presentoken = artifacts.require("./Presentoken.sol");

contract('storefrontTest', function(accounts) {
	let presentoken;
	let storefront;
	let ownerPresentoken;
	let ownerStorefront;
	const initSupply = 500;
	const initPrice = 1;

	beforeEach(async function() {
		ownerStorefront = accounts[0];
		storefront = await StoreFront.new(initSupply, initPrice, {from:  ownerStorefront});
		presentoken = Presentoken.at(await storefront.presentoken.call());
		ownerPresentoken = await presentoken.owner.call();
	});

	describe('--Create--', function() {
		it("Initial tokenPrice correct", async function() {
			let tokenPrice = await storefront.tokenPrice.call();

			assert.equal(tokenPrice, initPrice, "tokenPrice correct" );
		});
		it("Initial totalSupply correct", async function() {
			let totalSupply = await presentoken.totalSupply.call();

			assert.equal(totalSupply, initSupply, "totalSupply correct" );
		});
		it("Owner correct", async function() {
			let ownStf = await storefront.owner.call();

			assert.equal(ownStf, accounts[0], "StoreFront owner set correctly" );
			assert.equal(ownerPresentoken, storefront.address, "owner owns both contracts" );
		});
		it("Owner correct starting balance", async function() {
			let ownersTokens = await presentoken.balanceOf(ownerPresentoken);

		});
	});

	describe('--Purchase--', function() {
		it("Purchase works", async function() {
			await storefront.purchaseCoins(1, {from: accounts[1], value: 1});
			let tokensPurchased = await presentoken.balanceOf.call(accounts[1]);
			let ownersTokens = await presentoken.balanceOf.call(ownerPresentoken);

			// assert.equal(tokensPurchased.valueOf(), 1, "Purchaser received correct number tokens");
			assert.equal(ownersTokens.valueOf(), 499, "Owner reduced to correct number tokens");
		});
	});

	describe('--Withdraw--', function() {
		it("The owner can Withdraw funds", async function() {
			await storefront.purchaseCoins(1, {from: accounts[1], value: 1});
			let balanceBefore = await storefront.totalValue();
			await storefront.withdraw({from: ownerStorefront});
			let balanceAfter = await storefront.totalValue();

			assert.equal(balanceBefore.valueOf(), 1, "Correct initial balance");
			assert.equal(balanceAfter.valueOf(), 0, "Withdrew entire balance");
		});
	});
});
