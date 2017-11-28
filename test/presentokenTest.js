'use strict';

const Presentoken = artifacts.require("./Presentoken.sol");

contract('tokenTest', function(accounts) {
	// Variables
	let presentoken;
	let owner;
	let ownerBalance;
	let total;
	const init = 500;

	beforeEach(async function() {
		owner = accounts[0];
		presentoken = await Presentoken.new(init, {from: owner});
		ownerBalance = await presentoken.balanceOf(owner);
		total = await presentoken.totalSupply.call();
	});

	describe('--Create--', function() {
		it("Initially 500 presentoken total", async function() {
			assert.equal(total, init, "Correct supply");
		});
		it("Creator holds initial 500 tokens", async function() {
			assert.equal(ownerBalance, init, "Correct balance");
		});
	});
	describe('--Transfer--', function() {
		it("Transferring from owner works", async function() {
			await presentoken.transfer(accounts[1], 100, { from: owner} );
			let receiverBalance = await presentoken.balanceOf(accounts[1]);
			ownerBalance = await presentoken.balanceOf(owner);

			assert.equal(receiverBalance.valueOf(), 100, "receiverBalance correct");
			assert.equal(ownerBalance.valueOf(), 400, "ownerBalance correct");
		});
	});
	describe('--Burn--', function() {
		it("Owner can burn", async function() {
			await presentoken.burn(100, { from: owner} );
			total = await presentoken.totalSupply.call();
			ownerBalance = await presentoken.balanceOf(owner);

			assert.equal(total.valueOf(), 400, "total correct");
			assert.equal(ownerBalance.valueOf(), 400, "ownerBalance correct");
		});
	});
	describe('--Mint--', function() {
		it("Owner can mint", async function() {
			await presentoken.mint(100, { from: owner} );
			total = await presentoken.totalSupply.call();
			ownerBalance = await presentoken.balanceOf(owner);

			assert.equal(total.valueOf(), 600, "total correct");
			assert.equal(ownerBalance.valueOf(), 600, "ownerBalance correct");
		});
	});
});
