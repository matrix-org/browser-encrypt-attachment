describe("DecryptAttachment", function() {
    var testVectors = [
        ["", {
            "hashes": {
                "sha256": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU"
            },
            "key": {
                "alg": "A256CTR",
                "k": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                "key_ops": ["encrypt", "decrypt"],
                "kty": "oct"
            },
            "iv": "AAAAAAAAAAAAAAAAAAAAAA"
        }, ""],
        ["nZxRAVw962fwUQ5/", {
            "hashes": {
                "sha256": "geLWS2ptBew5aPLJRTK+QnI3Krdl3UaxN8qfahHWhfc"
            }, "key": {
                "alg": "A256CTR",
                "k": "__________________________________________8",
                "key_ops": ["encrypt", "decrypt"],
                "kty": "oct"
            }, "iv": "/////////////////////w"
        }, "SGVsbG8sIFdvcmxk"]
    ];

    testVectors.forEach(function (vector) {
        var inputCiphertext = vector[0];
        var inputInfo = vector[1];
        var want = vector[2];
        it("decrypts " + JSON.stringify([inputCiphertext, inputInfo]), function() {
            return decryptAttachment(decodeBase64(inputCiphertext), inputInfo).then(function(got) {
                assertEq(encodeBase64(new Uint8Array(got)), want);
            });
        });
    });
});
