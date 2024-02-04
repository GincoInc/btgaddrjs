/***
 * @license
 * https://github.com/ealmansi/btgaddrjs
 * Copyright (c) 2018-2020 Emilio Almansi
 * Distributed under the MIT software license, see the accompanying
 * file LICENSE or http://www.opensource.org/licenses/mit-license.php.
 */

var assert = require("chai").assert;
var btgaddr = require("..");

describe("btgaddr", function () {
  var LEGACY_MAINNET_P2PKH_ADDRESSES = [
    "1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR",
    "185K5yAfcrARrHjNVt4iAUHtkYqcogF4km",
    "1EUrmffDt4SQQkGVfmDTyFcp57PuByeadW",
    "1H6YWsFBxvDx6Ce9dyUFZvjG29npxQpBpR",
    "15z9kQvBaZmTGRTRbP3K1VBM3BQvRsj4U4",
    "1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke",
    "13WamBttqMB9AHNovKBCeLFGC5sbN4iZkh",
    "17Sa1fdVXh2NVgcn5xoWzTLGNivg9gUDQ7",
    "1tQ2P2q5cVERY8AkGD4K8RGc6NmZQVTKN",
    "1FJSGaq7Wip2ADSJboxMXniPhnYM8ym5Ri",
    "1GxjvJnjF6t29gDnX4jF3u25u5JRqANYPV",
    "1N7gqB2GtgJG8ap3uwRoKyrcrrSTa4qfXu",
    "1JG6fXqEiu9H2fktGxqpFfGGLdy6ie7QgY",
    "14ipzRgYAbSZUnmeRNhhrPMQ8XQrzGg4wo",
    "185FScTRCtVXRoy5gSDbuLnnQaQWqCK4A1",
    "1NPRQpCNaeVvZLYw6Z3Y1XkKxLt9BrFTn5",
    "1Pa8bRApFwCZ8rkgCJh9mfUmj4XJMUYdom",
    "13HmTnwyKacGJCt2WseTReCeEAtG5ZAyci",
    "1Mdob5JY1yuwoj6y76Vf3AQpoqUH5Aft8z",
    "1D8zGeRj3Vkns6VwKxwNoW2mDsxF25w2Zy",
  ];

  var LEGACY_MAINNET_P2SH_ADDRESSES = [
    "3BqVJRg7Jf94yJSvj2zxaPFAEYh3MAyyw9",
    "38mL1Wf7AkUowTRocyjJb6epu58LSafEYf",
    "3FAshD9fRxknVuxvnrt4PsykDdgckmK7xD",
    "3HnZSQjdWpYLBNLam58qzZ6CAg5YXBddBW",
    "36gAfxQd8U5qMb9riUhuS7YHBhhdvjr8u1",
    "3Pi44EVA7XxpAgRauw1Hpuo7TYdhd7WMon",
    "34CbgjPLPFVXFT5F3Qqo4xcCLcAJwvkM85",
    "388awD7w5bLkarKDD4U7R5hCXFDPmHuWW7",
    "32aQwvXGdWocWhpbsMsejknCkcfVB4ivTM",
    "3FzTC8KZ4d8QFP8jiucwxR5KrJq4bcevn7",
    "3HekqrHAo1CQEqvDeAPqUXP23bb9Sf9WoA",
    "3NohkiWiSaceDkWV336PkcDZ1NjBBWBewT",
    "3Jx7b5KgGoTf7qTKQ4WQgHdCVAFpCKiqsB",
    "35QquyAyiVkwZxU5YUNJH1iLH3haZ5TEfC",
    "38mGN9wrknouWyfWoXtCKy9iZ6hEMRGsyp",
    "3P5SLMgp8YpJeWFNDei8SA7G6sArkNKQKL",
    "3QG9WxfFoqWwE2T7KQMkCHqhsap1waSfDu",
    "33ynPLSQsUvePNaTdyK3rGZaNhAyfeAmbT",
    "3NKpWcnyZtEKttoQECAFTnmkxMkzgbT4WX",
    "3Dq1CBvAbQ5AxGCNT4byE8PhNQExZcR6Q2",
  ];

  var GOLDADDR_MAINNET_P2PKH_ADDRESSES = [
    "GTzPo1WcjcRyxc3nXszUaXE81CCAnAthsk",
    "GQvEW6Vcbhmivm2fRpipbEdnfidTpsVNds",
    "GXKnBnzArv3hVDZnbhsaQ1xhzHBk9dR3xT",
    "GZwTvza8wmqFAfwSZv8Mzh59wKafweuFaL",
    "GNq5AYF8ZRNkLtkiXKhRSFXExMCmRgN9Dm",
    "GfrxYpKfYVFj9z2Simzoq3n5EC8q67aZ77",
    "GLMWBKDqpCnSEkg6rFqK56bA7FfSLUrUxD",
    "GQHVRnxSWYdfa9v51uTdRDgAHtiX8oT4bm",
    "GJjKSWMn4U6XW1RTgCsAjtmAXGAcbiooLe",
    "GY9MgiA4VaRKEgjbXkcTxZ4HcxLC5hRgaB",
    "GZofLS7gDxVKE9X5T1PMUfMypF6GvsyxpY",
    "GexcFJMDsXuZD47Lqt5ukkCWn2EJdm8D5z",
    "Gb725fABhkka794BCuVvgRcAFokwho7E19",
    "GMZkQZ1V9T3rZG4wMKMpH9hJ3hCi5D4DV7",
    "GQvArjnNBk6pWHGNcNsiL78gKkCMs2yAs4",
    "GfELpwXKZW7DdorE2VheSJ6DsWfzCEnw9B",
    "GgR41YVmEnorDL3y8FMGCRpfeEK9RVJqMZ",
    "GL8gsvGvJSDZNgBKSpJZrQYY9Lg741pSMY",
    "GeUj1CdUzqXEtCQG339mTvkij1G8AZ7Prf",
    "GVyugmkg2MN5wZoEFubVEGNf93k5zDJufb",
  ];

  var GOLDADDR_MAINNET_P2SH_ADDRESSES = [
    "ARvM2P3J5uUqh6xVAazhJe9KZdL288fWy4",
    "ANrBjU2HwzpafFwN4Xj3KMYzE9mKE2gbCv",
    "AVFjRAWrDD6ZDiUVEQso88suYiKbWBmK6Q",
    "AXsRAN6pJ4t6uAr9Cd8aiozMVkiXFdTwE3",
    "ALm2PumouiRc5PfRA2heANSSWnLckQB9xg",
    "AdnunBrLtnJatUw9MV12ZAhGndGgT8vw6p",
    "AJHTQgkXAVqHyFaoUxqXoDWMfgoHkVWg7E",
    "ANDSfAV7rqgXJepmecTr9LbMrKrNXL43t9",
    "AGfGfstTQm9PEWLAJusPU1gN5hJTwMyLV8",
    "AW5Jv5gjqsUAyBeJATcggfyVBPU3Sk1Bqv",
    "AXjcZoeMaFYAxeRn5iPaCnHBNgE8GJYzuu",
    "ActZUfsuDpxQwZ23Ub68Us7iLTN9xptz4o",
    "AZ2yK2gs43oRqdxsqcW9QYXMpEto1z9asR",
    "AKVhdvYAVk6iHkydz2N31GcVc8LZNuLC6W",
    "ANr867K3Y39gEnB5F5sw4E3stBLDAn6W5R",
    "AdAJ4K3zuoA5NJkvfChsAR1RRwoqVNALzu",
    "AeM1Ev2Sb5rhwpxfkxMUvYjsCfSzhkensN",
    "AJ4e7HobejGR7B625XJnaXTjhmoxPhB2tv",
    "AcQgEaAAM8a6chJxfk9zC3fvHSPyRaZtSk",
    "ATurv9HMNeQwg4hvtcbhxPHrhUswL3G7Fc",
  ];
  var LEGACY_ADDRESSES = flatten([LEGACY_MAINNET_P2PKH_ADDRESSES, LEGACY_MAINNET_P2SH_ADDRESSES]);

  var GOLDADDR_ADDRESSES = flatten([GOLDADDR_MAINNET_P2PKH_ADDRESSES, GOLDADDR_MAINNET_P2SH_ADDRESSES]);

  var GOLDADDR_ADDRESSES_NO_PREFIX = GOLDADDR_ADDRESSES.map(function (address) {
    var parts = address.split(":");
    return parts[1];
  });

  var MAINNET_ADDRESSES = flatten([
    LEGACY_MAINNET_P2PKH_ADDRESSES,
    LEGACY_MAINNET_P2SH_ADDRESSES,
    GOLDADDR_MAINNET_P2PKH_ADDRESSES,
    GOLDADDR_MAINNET_P2SH_ADDRESSES,
  ]);

  var P2PKH_ADDRESSES = flatten([LEGACY_MAINNET_P2PKH_ADDRESSES, GOLDADDR_MAINNET_P2PKH_ADDRESSES]);

  var P2SH_ADDRESSES = flatten([LEGACY_MAINNET_P2SH_ADDRESSES, GOLDADDR_MAINNET_P2SH_ADDRESSES]);

  var BITCOIN_GOLD_ADDRESSES = flatten([MAINNET_ADDRESSES]);

  function flatten(arrays) {
    return [].concat.apply([], arrays);
  }

  describe("#isValidAddress()", function () {
    it("it should return false for invalid inputs", function () {
      var INVALID_INPUTS = [
        undefined,
        null,
        {},
        [],
        1,
        "",
        "some invalid address",
        "st1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX",
        "1mnPqav648RV2hCyFCpUMeh6mBBwjNc1DUC",
      ];
      INVALID_INPUTS.forEach(function (address) {
        assert.isFalse(btgaddr.isValidAddress(address));
      });
    });
    it("it should return true for any valid Bitcoin Gold address", function () {
      BITCOIN_GOLD_ADDRESSES.forEach(function (address) {
        assert.isTrue(btgaddr.isValidAddress(address));
      });
    });
  });

  describe("#detectAddressFormat()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.detectAddressFormat();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.detectAddressFormat("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.detectAddressFormat("st1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("it should detect a legacy address' format correctly", function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.strictEqual(btgaddr.detectAddressFormat(address), btgaddr.Format.Legacy);
      });
    });
    it("it should detect a goldaddr address' format correctly", function () {
      GOLDADDR_ADDRESSES.forEach(function (address) {
        assert.strictEqual(btgaddr.detectAddressFormat(address), btgaddr.Format.Goldaddr);
      });
    });
  });

  describe("#detectAddressType()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.detectAddressType();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.detectAddressType("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.detectAddressType("somt1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("should detect a P2PKH address' type correctly", function () {
      P2PKH_ADDRESSES.forEach(function (address) {
        assert.strictEqual(btgaddr.detectAddressType(address), btgaddr.Type.P2PKH);
      });
    });
    it("should detect a P2SH address' type correctly", function () {
      P2SH_ADDRESSES.forEach(function (address) {
        assert.strictEqual(btgaddr.detectAddressType(address), btgaddr.Type.P2SH);
      });
    });
  });

  describe("#toLegacyAddress()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.toLegacyAddress();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.toLegacyAddress("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.toLegacyAddress("some t1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("should translate legacy address format to itself correctly", function () {
      assert.deepEqual(LEGACY_ADDRESSES.map(btgaddr.toLegacyAddress), LEGACY_ADDRESSES);
    });
    it("should translate goldaddr address format to legacy format correctly", function () {
      assert.deepEqual(GOLDADDR_ADDRESSES.map(btgaddr.toLegacyAddress), LEGACY_ADDRESSES);
    });
  });

  describe("#toGoldAddress()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.toGoldAddress();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.toGoldAddress("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.toGoldAddress("some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("should translate legacy address format to goldaddr format correctly", function () {
      assert.deepEqual(LEGACY_ADDRESSES.map(btgaddr.toGoldAddress), GOLDADDR_ADDRESSES);
    });
    it("should translate goldaddr address format to itself correctly", function () {
      assert.deepEqual(GOLDADDR_ADDRESSES.map(btgaddr.toGoldAddress), GOLDADDR_ADDRESSES);
    });
  });

  describe("#isLegacyAddress()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.isLegacyAddress();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isLegacyAddress("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isLegacyAddress("some t1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("should return true for a legacy address", function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.isTrue(btgaddr.isLegacyAddress(address));
      });
    });
    it("should return false for a goldaddr address", function () {
      GOLDADDR_ADDRESSES.forEach(function (address) {
        assert.isFalse(btgaddr.isLegacyAddress(address));
      });
    });
  });

  describe("#isGoldAddress()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.isGoldAddress();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isGoldAddress("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isGoldAddress("some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("should return false for a legacy address", function () {
      LEGACY_ADDRESSES.forEach(function (address) {
        assert.isFalse(btgaddr.isGoldAddress(address));
      });
    });
    it("should return true for a goldaddr address", function () {
      GOLDADDR_ADDRESSES.forEach(function (address) {
        assert.isTrue(btgaddr.isGoldAddress(address));
      });
    });
  });

  describe("#isP2PKHAddress()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.isP2PKHAddress();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isP2PKHAddress("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isP2PKHAddress("some it1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("should return true for a P2PKH address", function () {
      P2PKH_ADDRESSES.forEach(function (address) {
        assert.isTrue(btgaddr.isP2PKHAddress(address));
      });
    });
    it("should return false for a P2SH address", function () {
      P2SH_ADDRESSES.forEach(function (address) {
        assert.isFalse(btgaddr.isP2PKHAddress(address));
      });
    });
  });

  describe("#isP2SHAddress()", function () {
    it("should fail when called with an invalid address", function () {
      assert.throws(function () {
        btgaddr.isP2SHAddress();
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isP2SHAddress("some invalid address");
      }, btgaddr.InvalidAddressError);
      assert.throws(function () {
        btgaddr.isP2SHAddress("some int1LuPdPkGH5QoNSewQrr8EzNbM27ktPdgQX");
      }, btgaddr.InvalidAddressError);
    });
    it("should return false for a P2PKH address", function () {
      P2PKH_ADDRESSES.forEach(function (address) {
        assert.isFalse(btgaddr.isP2SHAddress(address));
      });
    });
    it("should return true for a P2SH address", function () {
      P2SH_ADDRESSES.forEach(function (address) {
        assert.isTrue(btgaddr.isP2SHAddress(address));
      });
    });
  });
});
