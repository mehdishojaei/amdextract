// General test for all cases.

/* exceptsPaths: p3 */
define('name', ["p1", "p2", "p3", "p4"], function (a, b, c) {
    /**
     * a.fetch() must not be encountered as code.
     */
    b.fetch();
    // c.fetch() must not be encountered as code.
});
