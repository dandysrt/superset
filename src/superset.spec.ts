import {SuperSet} from "./superset";

function iterator() {
    let value = 0;
    let done = false;
    return {
        next() {
            value++;
            if(value > 5) {done = true;}
            return {value, done};
        }
    };
}

const customIterable = {
    [Symbol.iterator]: iterator
};

const TYPE_VALUE_ARRAY = [
    ["Array", [1, 2, 3, 4, 5]],
    ["Set", new Set([1, 2, 3, 4, 5])],
    ["SuperSet", new SuperSet([1, 2, 3, 4, 5])],
    ["Iterable", customIterable]
];


describe("SuperSet", function () {
    let superset: SuperSet;

    beforeEach(function () {
        superset = new SuperSet([4, 5, 6]);
    });

    it("can be used interchangeably with a Set", function () {
        const expectSet = function (candidate: Set<any>) {
            console.info(candidate);
        }

        expect(() => expectSet(new SuperSet([1, 2, 3, 4, 5]))).not.toThrow();
    });

    describe("union", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns combination of values within instance of %s and SuperSet",
            function (_: string, value: any) {
                expect(superset.union(value)).toMatchObject(new SuperSet([1, 2, 3, 4, 5, 6]));
            }
        );

        it("uniquifies argument being unioned", function () {
            expect(superset.union([6, 7, 7, 8, 8, 8])).toMatchObject(new SuperSet([4, 5, 6, 7, 8]));
        });

        it("cannot union non-iterable argument", function () {
            expect(() => superset.union(6 as any)).toThrow(TypeError("Argument must be of type 'Iterable'"));
        });
    });

    describe("complement", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns values in SuperSet not contained within instance of %s",
            function (_: string, value: any) {
                expect(superset.complement(value)).toMatchObject(new SuperSet([6]));
            }
        );

        it("uniquifies argument used for complement", function () {
            expect(superset.complement([1, 1, 2, 2, 2, 3, 4, 5])).toMatchObject(new SuperSet([6]));
        });

        it("cannot complement non-iterable argument", function () {
            expect(() => superset.complement(1 as any)).toThrow(TypeError("Argument must be of type 'Iterable'"));
        });
    });

    describe("difference", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns values not shared between instance of %s and SuperSet",
            function (_: string, value: any) {
                expect(superset.difference(value)).toMatchObject(new SuperSet([1, 2, 3, 6]));
            }
        );

        it("uniquifies argument used for difference", function () {
            expect(superset.difference([1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5])).toMatchObject(new SuperSet([1, 2, 3, 6]));
        });

        it("cannot provide a difference with non-iterable argument", function () {
            expect(() => superset.difference(1 as any)).toThrow(TypeError("Argument must be of type 'Iterable'"));
        });
    });

    describe("intersection", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns values contained within instance of %s and SuperSet",
            function (_: string, value: any) {
                expect(superset.intersection(value)).toMatchObject(new SuperSet([4, 5]));
            }
        );

        it("uniquifies argument used for intersection", function () {
            expect(superset.intersection([1, 1, 2, 2, 2, 3, 3, 4, 4, 5])).toMatchObject(new SuperSet([4, 5]));
        });

        it("cannot provide an intersection with non-iterable arguments", function () {
            expect(() => superset.intersection(1 as any)).toThrow(TypeError("Argument must be of type 'Iterable'"));
        });
    });

    describe("cartesian", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns a cartesian product from instance of %s",
            function (_: string, value: any) {
                expect(superset.cartesian(value)).toMatchObject(new SuperSet([
                    [4, 1],
                    [4, 2],
                    [4, 3],
                    [4, 4],
                    [4, 5],
                    [5, 1],
                    [5, 2],
                    [5, 3],
                    [5, 4],
                    [5, 5],
                    [6, 1],
                    [6, 2],
                    [6, 3],
                    [6, 4],
                    [6, 5]
                ]));
            }
        );

        it("uniquifies argument used for cartesian product", function () {
            expect(superset.cartesian([1, 2, 1, 2, 2, 1, 1])).toMatchObject(new SuperSet([
                [4, 1],
                [4, 2],
                [5, 1],
                [5, 2],
                [6, 1],
                [6, 2]
            ]));
        });

        it("cannot provide a cartesian product with non-iterable arguments", function () {
            expect(() => superset.cartesian(1 as any)).toThrow(TypeError("Argument must be of type 'Iterable'"));
        });
    });

    describe("subsetOf", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns false with instance of %s when SuperSet values are not contained within instance",
            function (_: string, value: any) {
                const superset = new SuperSet([1, 2, 3, 4, 5, 6, 7]);
                expect(superset.subsetOf(value)).toBe(false);
            }
        );

        it.each(TYPE_VALUE_ARRAY)(
            "returns true with instance of %s when SuperSet values are contained within instance",
            function (_: string, value: any) {
                const superset = new SuperSet([1, 2, 3]);
                expect(superset.subsetOf(value)).toBe(true);
            }
        );

        it("cannot determine if non-iterable argument is contained within SuperSet", function () {
            expect(() => superset.subsetOf(1 as any)).toThrow(TypeError("Argument must be of type 'Iterable'"));
        });
    });

    describe("supersetOf", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns false with instance of %s when instance values are not contained within SuperSet",
            function (_: string, value: any) {
                expect(superset.supersetOf(value)).toBe(false);
            }
        );

        it.each(TYPE_VALUE_ARRAY)(
            "returns true with instance of %s when instance values are contained within SuperSet",
            function (_: string, value: any) {
                const sut = new SuperSet([1, 2, 3, 4, 5, 6, 7]);
                expect(sut.supersetOf(value)).toBe(true);
            }
        );

        it("cannot determine if SuperSet is contained within non-iterable argument", function () {
            expect(() => superset.supersetOf(1 as any)).toThrow(TypeError("Argument must be of type 'Iterable'"));
        });
    });

    describe("toArray", function () {
        it.each(TYPE_VALUE_ARRAY)(
            "returns an array from SuperSet instance created from %s",
            function (_: string, value: any) {
               const sut = new SuperSet(value);
               expect(sut.toArray()).toMatchObject([1, 2, 3, 4, 5]);
            }
        );
    });
});
