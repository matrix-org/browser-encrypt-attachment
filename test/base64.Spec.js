
function assertEq(got, want) {
    gotJSON = JSON.stringify(got);
    wantJSON = JSON.stringify(want);
    if (wantJSON != gotJSON) {
        throw new Error("Want " + wantJSON + " got " + gotJSON);
    }
}

describe("Base64", function() {
    var testVectors = [
        [[], ""],
        [[255], "/w"],
        [[255,255], "//8"],
        [[255,255,255], "////"],
        [[0,1,2,3,4,5,6,7,8,9], "AAECAwQFBgcICQ"],
    ];

    for (var i = 0; i < testVectors.length; i++) {
        (function () {
            var input = testVectors[i][0];
            var want = testVectors[i][1];
            it("encodes " + JSON.stringify(input) + " correctly", function() {
                got = encodeBase64(new Uint8Array(input));
                assertEq(got, want);
            });
        })();
    }
    for (var i = 0; i < testVectors.length; i++) {
        (function () {
            var input = testVectors[i][1];
            var want = testVectors[i][0];
            it("decodes " + JSON.stringify(input) + " correctly", function() {
                got = Array.prototype.slice.call(decodeBase64(input))
                assertEq(got, want);
            });
        })();
    }
});
